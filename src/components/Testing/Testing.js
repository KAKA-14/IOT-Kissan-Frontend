import React, { useState, useEffect } from 'react';
import "./Testing.css";
import logo from "../../assets/IOT Kisaan Logo.svg";
import { MdDashboard } from "react-icons/md";
function Testing() {
    const [fieldsState, setFieldsState] = useState({
        t1: true,
        t2: true,
        t3: true,
        t4: true,
    });

    const [data2, setData2] = useState(null);
    const handleClick = () => {
        window.location.href = '/dashboard';
      }
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
        
      }, []);
    const apiKey = 'JEGYEPSC4ZM6190W';
    const baseURL = 'https://api.thingspeak.com/update';

    const toggleField = async (fieldId) => {
        const newState = { ...fieldsState };
        newState[fieldId] = !newState[fieldId];
        setFieldsState(newState);

        const fieldValue = newState[fieldId] ? 1 : 0;
        const url = `${baseURL}?api_key=${apiKey}&field${getFieldNumber(fieldId)}=${fieldValue}`;

        try {
            let response;
            let data;
                response = await fetch(url, { method: 'POST' });
                data=await response.json();
                do{
                    response = await fetch(url, { method: 'POST' });
                    data=await response.json();
                }while(data==0)
            if (!response.ok) {
                throw new Error('Failed to toggle field');
            }
        } catch (error) {
            console.error('Error toggling field:', error);
            // If there's an error, revert the state change
            newState[fieldId] = !newState[fieldId];
            setFieldsState(newState);
        }
    };

    const getFieldNumber = (fieldId) => {
        switch (fieldId) {
            case 't1':
                return 4;
            case 't2':
                return 5;
            case 't3':
                return 6;
            case 't4':
                return 7;
            default:
                return -1; // Invalid field ID
        }
    };
    const [toggle, setToggle] = useState(false);
    const handleToggleChange = () => {
        setToggle(prevToggle => !prevToggle); // Using functional form of setToggle
        
        if (toggle) {
            toggleField('t1'); // 20s on
            setTimeout(() => {
                console.log('t1 on');
            }, 20000);
            toggleField('t1'); // off after 20 seconds

            setTimeout(() => {
                console.log('t2 on');
            },2000);
            toggleField('t2'); // 10s on after 20 seconds

            setTimeout(() => {
            }, 10000);
            toggleField('t2'); // 10s on after 20 seconds

            setTimeout(() => {
                console.log("idle");// off after 30 seconds
            }, 40000);
            // 40s idle
        } else {
            setFieldsState({
                t1: true,
                t2: true,
                t3: true,
                t4: true,
            });
        }
    };
    return (
        <div >
            <button className="dash"
          onClick={handleClick}
          >
          <MdDashboard/> Dashboard
        </button>

                <img className="kk" src={logo} alt="IOT Kissan Logo"  />
            <span className="tt">Manual Control</span>
            <div className="test">
                <div className={`t ${fieldsState.t1 ? 'active' : ''}`} id="t1" onClick={() => toggleField('t1')}>
                    <span>Air Pump</span>
                    <div className='on'>{fieldsState.t1 ? 'Off' : 'On'}</div>

                
                </div>
                <div className={`t ${fieldsState.t2 ? 'active' : ''}`} id="t2" onClick={() => toggleField('t2')}><span>Water Pump</span>
                <div className='on'>{fieldsState.t2 ? 'Off' : 'On'}</div>

                </div>
                <div className={`t ${fieldsState.t3 ? 'active' : ''}`} id="t3" onClick={() => toggleField('t3')}><span>Dosage-A Pump</span>
                <div className='on'>{fieldsState.t3 ? 'Off' : 'On'}</div>
</div>
                <div className={`t ${fieldsState.t4 ? 'active' : ''}`} id="t4" onClick={() => toggleField('t4')}><span>Dosage-B Pump</span>
                <div className='on'>{fieldsState.t4 ? 'Off' : 'On'}</div>
</div>
            </div>
        </div>
    );
}

export default Testing;