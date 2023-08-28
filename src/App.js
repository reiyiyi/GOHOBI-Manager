import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Top from './components/top';
import Login from './components/login';
import Signup from './components/signup';
import CreateCycle from './components/createCycle';
import ReportTry from './components/reportTry';
import ReportGohobi from './components/reportGohobi';
import Logout from './components/logout';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Top />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/cycle/create" element={<CreateCycle />}></Route>
              <Route path="/report/try" element={<ReportTry />}></Route>
              <Route path="/report/gohobi" element={<ReportGohobi />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
          </Routes>
      </Router>
  );
};

export default App;
