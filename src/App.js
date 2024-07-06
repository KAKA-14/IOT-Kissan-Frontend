import './App.css';
// import Weather from './components/Weather.js';
import Signup from './components/Login/Signup.js';
import Login from './components/Login/Login.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard.js';
import Testing from './components/Testing/Testing.js';
function App() {
  const info = localStorage.getItem('user');
  const[user, setUser] = useState(JSON.parse(info));
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manualcontrol" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




// // Layout.js

// import React from 'react';
// import './index.css';
// import LiveGaugeChart from './components/LiveGaugeChart';
// import CustomLineChart from './components/CustomLineChart';


// function App() {
//   return (
//     <div className="grid-container">
//       <header>header</header>

//       <main className="main-content">
//         <div className="chart-container">
//           <LiveGaugeChart />
//         </div>
//         <div className="chart-container">
//           <LiveGaugeChart />
//         </div>
//         <div className="chart-container">
//             <LiveGaugeChart />
//         </div>
//         <div className="chart-container-4">
//           <CustomLineChart />
//         </div>
//         <div className="chart-container-5">
//           <CustomLineChart />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;