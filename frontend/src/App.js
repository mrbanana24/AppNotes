import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './screens/Register';
import Login from './screens/Login';
import MainPage from './screens/MainPage';
import ArchivePage from './screens/ArchivePage';

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/mainpage" element={<MainPage />} /> 
        <Route path="/archive" element={<ArchivePage />} /> 
      </Route> 
    </Routes>
  );
}

export default App;
