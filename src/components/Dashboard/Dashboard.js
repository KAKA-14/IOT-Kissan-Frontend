
import "./Dashboard.css";
import Weather from "./Weather";
import { useState,useEffect } from "react";
import CustomLineChart from "../CustomLineChart.js";
import Tdsgraph from '../Tdsgraph.js';
import Ec from '../Ec.js';
import Tempgauge from "./Tempgauge.js";
import TDSgauge from "./TDSgauge.js";
import EC from "./EC.js";
function Dashboard() {
  const [data, setData] = useState({});
  const [data2, setData2] = useState(null);

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





  return (
    
      <div className="dashboard">
        <div className='box'>
          <span>Overall Quality</span>
        </div>
        <div className='val'>
          <div className='showval' id="c1">
            <span>Temperature</span>
          <div>
          {/* {data2?<p>{Math.ceil(data2.feeds[1].field1)}</p> : null} */}
            <Tempgauge/>
          </div>
          </div>
          <div className='showval'id="c2">
            <span>TDS</span>
          <div >
          {/* {data2?<p>{data2.feeds[1].field3}</p> : null} */}
          <TDSgauge/>
          </div>
          </div>
          <div className='showval' id="c3">
            <span>EC</span>
          <div  >
          {/* {data2?<p>{data2.feeds[1].field2}</p> : null} */}
            <EC/>
          </div>
          </div>
          <div className='setval'></div>
          <div className='setval'></div>
          <div className='setval'></div>
        </div>
        <div className='box' id='trans'>
          <Weather data={data} setData={setData}/>
        </div>
        <div className='chart'>
        {renderComponent()}

        </div>

        <button className="switch1" onClick={() => setActiveComponent('CustomLineChart')}>TEMP</button>
        <button className="switch2" onClick={() => setActiveComponent('Tdsgraph')}>TDS</button>
        <button  className="switch3" onClick={() => setActiveComponent('Ec')}>EC</button>

        
      
    </div>
  );
}

export default Dashboard;