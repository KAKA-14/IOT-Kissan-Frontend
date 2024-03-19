import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const Card = ({ minValue, setMinValue, maxValue, setMaxValue, storageKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Load values from local storage on component mount
  useEffect(() => {
    const storedMinValue = localStorage.getItem(`${storageKey}_min`);
    const storedMaxValue = localStorage.getItem(`${storageKey}_max`);
    if (storedMinValue !== null) {
      setMinValue(parseInt(storedMinValue));
    }
    if (storedMaxValue !== null) {
      setMaxValue(parseInt(storedMaxValue));
    }
  }, [storageKey, setMinValue, setMaxValue]);

  const handleMinChange = (e) => {
    const newValue = parseInt(e.target.value);
    setMinValue(newValue);
    localStorage.setItem(`${storageKey}_min`, newValue);
  };

  const handleMaxChange = (e) => {
    const newValue = parseInt(e.target.value);
    setMaxValue(newValue);
    localStorage.setItem(`${storageKey}_max`, newValue);
  };

  const toggleSlicer = () => {
    setIsOpen(!isOpen);
  };
  console.log(`${storageKey}_min`);
  const slicerValueText = `${localStorage.getItem(`${storageKey}_min`)} - ${localStorage.getItem(`${storageKey}_max`)}`;

  const slicerValueRef = React.createRef();

  return (
    <div className="slicer-container">
      <FaPencilAlt
        className="slicer-icon"
        onClick={() => {
          toggleSlicer();
          if (!isOpen) {
            slicerValueRef.current.style.width = 'auto';
          } else {
            slicerValueRef.current.style.width = '100px'; // Reset width when closing
          }
        }}
      />
      <div className="slicer-value" ref={slicerValueRef}>
        {slicerValueText}
      </div>
      {isOpen && (
        <div className="slicer-popup">
          <input
            type="number"
            value={minValue}
            onChange={handleMinChange}
            style={{ width: '50px', height: '1px', margin: '2px' }}
          />
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            style={{ width: '50px', height: '1px', margin: '2px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
