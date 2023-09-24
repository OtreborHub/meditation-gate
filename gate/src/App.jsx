
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import SessionDashboard from './components/SessionDashboard';

// import React from 'react';


//FUNCTION COMPONENT
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" index element={<Home/>} />
         <Route path="/dashboard" element={<SessionDashboard/>} /> 
      </Routes>
     </BrowserRouter>
  );  
}


//CLASS COMPONENT
// class App extends React.Component{
//   render() {
//     return 
//       <div className='App'>
//         <Header/>
//         <h2> Hello </h2>
//       </div>
//   }
// }



