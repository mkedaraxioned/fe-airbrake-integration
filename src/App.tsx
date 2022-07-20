import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddClient from './pages/AddClient';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Reports from './pages/reports';
import Team from './pages/Team';
import { RootState } from './store';
import ManageTask from './templates/manageTask';
import ProjectTaskDetails from './templates/projectTaskDetail';
export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    user.profile.name ? setIsLoggedIn(true) : setIsLoggedIn(false);
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
              <Route path='/projects' element={<Projects />} />
              <Route path='/reports' element={<Reports />} />
              <Route
                path='/projects/:project/'
                element={<ProjectTaskDetails />}
              />
              <Route
                path='/projects/:project/manage/'
                element={<ManageTask />}
              />
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
