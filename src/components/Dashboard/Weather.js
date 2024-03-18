import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loc from "../../assets/location.svg";


function Weather({ data, setData}) {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
          const response = await axios.get(url);
          setData(response.data);
          console.log(response.data);
        });
      } catch (error) {
        setError('Error fetching weather data.');
      }
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <div className="app">
      {error && <div className="error">{error}</div>}
      <div className="cont">
        <div className="top">
          <div className="location">
          {data.main ? <p>{data.name}, {data.sys.country}</p> : null}
            
          </div>
          <div>
            <img src={loc} />
          </div>
          <div className='temp2'>
            <p>Temperature</p>
          </div>
          <div className="temp">
            {data.main ? <p>{Math.ceil((data.main.temp.toFixed()-32)*5/9)}°C</p> : null}
          </div>
          <div className='hum'>
          <p>Humidity</p>
          </div>
          <div className="hum2">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
