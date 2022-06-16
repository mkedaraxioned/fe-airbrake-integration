import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddClient from './pages/AddClient';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Team from './pages/Team';
import { RootState } from './store';
export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    user.name ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/add-client' element={<AddClient />} />
              <Route path='/team' element={<Team />} />
            </>
          ) : (
            <Route path='/login' element={<Login />} />
          )}
          <Route path='*' element={isLoggedIn ? <Dashboard /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
