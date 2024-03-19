
import "./Dashboard.css";
import Weather from "./Weather";
import { useState, useEffect } from "react";
import CustomLineChart from "../CustomLineChart.js";
import Tdsgraph from '../Tdsgraph.js';
import Ec from '../Ec.js';
import EC from './EC.js';
import logo from '../../assets/IOT Kisaan Logo - coloured.svg';
import Tempgauge from "./Tempgauge.js";
import TDSgauge from "./TDSgauge.js";
import Card from "./Card.js";
import { FaWrench } from 'react-icons/fa';

function Dashboard() {
  const [data, setData] = useState({});
  const [data2, setData2] = useState(null);
  const [minValue1, setMinValue1] = useState(parseInt(localStorage.getItem('optimal_temperature_min')) || 0);
  const [maxValue1, setMaxValue1] = useState(parseInt(localStorage.getItem('optimal_temperature_max')) || 100);
  const [minValue2, setMinValue2] = useState(parseInt(localStorage.getItem('optimal_tds_min')) || 0);
  const [maxValue2, setMaxValue2] = useState(parseInt(localStorage.getItem('optimal_tds_max')) || 100);
  const [minValue3, setMinValue3] = useState(parseInt(localStorage.getItem('optimal_ec_min')) || 0);
  const [maxValue3, setMaxValue3] = useState(parseInt(localStorage.getItem('optimal_ec_max')) || 100);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.thingspeak.com/channels/2474084/feeds.json?results=2'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData2(responseData);
        console.log(responseData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch data every 15 seconds
    return () => clearInterval(interval);
  }, []);


  const [activeComponent, setActiveComponent] = useState('CustomLineChart');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'CustomLineChart':
        return <CustomLineChart />;
      case 'Tdsgraph':
        return <Tdsgraph />;
      case 'Ec':
        return <Ec />;
      default:
        return null;
    }
  };
  const determineQuality = (value, min, max) => {
    if (value >= min && value <= max) {
      return 'Good';
    } else if (value < min) {
      return 'Bad';
    } else {
      return 'Average';
    }
  };

  const temperatureQuality = data2 ? determineQuality(data2.feeds[1].field1, minValue1, maxValue1) : '';
  const tdsQuality = data2 ? determineQuality(data2.feeds[1].field3, minValue2, maxValue2) : '';
  const ecQuality = data2 ? determineQuality(data2.feeds[1].field2, minValue3, maxValue3) : '';
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Good':
        return '#C0D4B8';
      case 'Average':
        return '#ECD379';
      case 'Bad':
        return '#DB6B57';
      default:
        return '#000000'; // Default color (black) in case of unexpected quality value
    }
  };
const handleClick = () => {
  window.location.href = '/manualcontrol';
}

  return (

    <div className="dashboard">
      <div className='logo' >
        <img src={logo} alt="logo" />
      </div>
      <div className='box'>
        <span>Overall Quality</span>
        <div className="quality" id="q1">
          <span style={{ color: getQualityColor(
            temperatureQuality === 'Good' && tdsQuality === 'Good' && ecQuality === 'Good' ? 'Good' :
            temperatureQuality === 'Bad' || tdsQuality === 'Bad' || ecQuality === 'Bad' ? 'Bad' :
            'Average'
          )}}>
            {temperatureQuality === 'Good' && tdsQuality === 'Good' && ecQuality === 'Good' ? 'Good' :
            temperatureQuality === 'Bad' || tdsQuality === 'Bad' || ecQuality === 'Bad' ? 'Bad' :
            'Average'}
          </span>
          <div className="quality" id="q2">
            <div>
              <span id="a1">Temperature</span>
              <span id="a2" style={{ color: getQualityColor(temperatureQuality) }}>{temperatureQuality}</span>
            </div>
            <div>
              <span id="a3">TDS</span>
              <span id="a4" style={{ color: getQualityColor(tdsQuality) }}>{tdsQuality}</span>
            </div>
            <div>
              <span id="a5">EC</span>
              <span id="a6"style={{ color: getQualityColor(ecQuality) }}>{ecQuality}</span>
            </div>
          </div>
          <button className="wrench"
          onClick={handleClick}
          >
          <FaWrench /> Manual Control
        </button>
        </div>
      </div>
      <div className='val'>
        <div className='showval' style={{ backgroundColor: getQualityColor(temperatureQuality) }}>
          <span>Temperature</span>
          <div >
            {/* {data2?<p>{Math.ceil(data2.feeds[1].field1)}</p> : null} */}
            <Tempgauge temperatureQuality={temperatureQuality}/>
          </div>
        </div>
        <div className='showval' id="c2" style={{ backgroundColor: getQualityColor(tdsQuality) }}>
          <span>TDS</span>
          <div >
            {/* {data2?<p>{data2.feeds[1].field3}</p> : null} */}
            <TDSgauge  tdsQuality={tdsQuality}/>
          </div>
        </div>
        <div className='showval' id="c3" style={{ backgroundColor: getQualityColor(ecQuality) }}>
          <span>EC</span>
          <div  >
            {/* {data2?<p>{data2.feeds[1].field2}</p> : null} */}
            <EC ecQuality={ecQuality}/>
          </div>
        </div>
        <div className='setval'>
          <span>Set Optimal Temperature</span>
          <Card
            maxval={maxValue1}
            setMaxValue={setMaxValue1}
            minval={minValue1}
            setMinValue={setMinValue1}
            storageKey="optimal_temperature"
          />
        </div>
        <div className='setval'>
          <span>Set Optimal TDS</span>
          <Card
            maxval={maxValue2}
            setMaxValue={setMaxValue2}
            minval={minValue2}
            setMinValue={setMinValue2}
            storageKey="optimal_tds"
          />
        </div>
        <div className='setval'>
          <span>Set Optimal EC</span>
          <Card
            maxval={maxValue3}
            setMaxValue={setMaxValue3}
            minval={minValue3}
            setMinValue={setMinValue3}
            storageKey="optimal_ec"
          />
        </div>

      </div>
      <div className='box' id='trans'>
        <Weather data={data} setData={setData} />
      </div>
      <div className='chart'>
        {renderComponent()}

      </div>

      <button className="switch1" onClick={() => setActiveComponent('CustomLineChart')}>TEMP</button>
      <button className="switch2" onClick={() => setActiveComponent('Tdsgraph')}>TDS</button>
      <button className="switch3" onClick={() => setActiveComponent('Ec')}>EC</button>



    </div>
  );
}

export default Dashboard;