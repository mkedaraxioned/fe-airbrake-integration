import React from 'react';
import { Route } from 'react-router';
import { ERole } from '../../constants/enum';

const PrivateRoute = ({ element, role, ...rest }: any) => {
  if (role && role.indexOf(ERole.ADMIN) === -1) {
    console.log('Hello NORMAL USER');
    // role not authorised so redirect to home page
    // return <Redirect to={{ pathname: '/'}} />
  }
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
