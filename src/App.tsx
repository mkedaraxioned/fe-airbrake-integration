import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddClient from './pages/AddClient';
import Dashboard from './pages/Dashboard';
import Home from './pages/Homepage';
import Team from './pages/Team';
export const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-client' element={<AddClient />} />
        <Route path='/team' element={<Team />} />
      </Routes>
    </BrowserRouter>
  </>
);
