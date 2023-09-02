import React from 'react';
import { Login, SignUp } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';

export const App = () => {
  return (
    <div className="App h-full">
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
