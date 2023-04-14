import React, { useState,useEffect } from 'react'
import {  Route,Routes} from "react-router-dom";
import Loginpage from './pages/loginpage/loginpage';
import Chatpage from './pages/chatpage/chatpage';
function App() {
  window.path = "http://localhost:7000"
  return (
   <>
   <Routes>
   <Route  exact path='/' element={<Loginpage/>} />
   <Route  exact path='/login' element={<Loginpage/>} />
   <Route  exact path='/chat' element={<Chatpage/>} />
   </Routes>
   </>
  );
}

export default App;
