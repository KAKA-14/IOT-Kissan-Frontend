import React, { useState } from 'react';
import "./Testing.css";

function Testing() {
    const [fieldsState, setFieldsState] = useState({
        t1: false,
        t2: false,
        t3: false,
        t4: false,
    });

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

    return (
        <div >
            <span className="tt">Test</span>
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