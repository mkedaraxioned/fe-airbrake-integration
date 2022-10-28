import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddClient from './pages/AddClient';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Reports from './pages/reports';
import Setting from './pages/Setting';
import Team from './pages/Team';
import { RootState } from './redux';
import ManageTask from './templates/manageTask';
import ProjectTaskDetails from './templates/projectTaskDetail';
import airbrake from './utils/airbrake';
import PropTypes from 'prop-types';

const ErrorFallback = () => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      {/* <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );
};

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: RootState) => state.rootSlices.user);

  useEffect(() => {
    user.profile?.name ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  const ThorowErr = () => {
    throw new Error('BOOM 2+');
  };

  // const [explode, setExplode] = React.useState(false)
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          // airbrake.notify(error);
          airbrake.notify({
            error: error,
          });
          console.log('err ', error);
          console.log('errInfo ', errorInfo);
        }}
        // onReset={() => } // reset the state of your app
        // resetKeys={[]}
      >
        <ThorowErr></ThorowErr>
        <BrowserRouter>
          {isLoggedIn && <Header />}
          <Routes>
            {isLoggedIn && user.profile?.role === 'ADMIN' && (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/add-client' element={<AddClient />} />
                <Route path='/team' element={<Team />} />
                <Route
                  path='/projects/:projectId/'
                  element={<ProjectTaskDetails />}
                />
                <Route
                  path='/projects/:projectId/manage/'
                  element={<ManageTask />}
                />
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path='/dashboard/:timeCardId/' element={<Dashboard />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/login' element={<Login />} />
                <Route path='/reports' element={<Reports />} />
              </>
            )}
            <Route path='*' element={isLoggedIn ? <Dashboard /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
  // return (
  //   <ErrorBoundary
  //      FallbackComponent={MyFallbackComponent}
  //      onError={(error, errorInfo) => errorService.log({ error, errorInfo })}
  //      onReset={() => {
  //        // reset the state of your app
  //      }}
  //   >
  //      <MyErrorProneComponent />
  //   </ErrorBoundary>
  // );
};
