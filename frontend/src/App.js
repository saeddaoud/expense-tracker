import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/Footer';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';
import LogninScreen from './screens/LogninScreen';
import NotFound from './screens/NotFound';
import RegistrationScreen from './screens/RegistrationScreen';
import TransactionsScreen from './screens/TransactionsScreen';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/transactions/me'
              component={TransactionsScreen}
            />
            <Route exact path='/login' component={LogninScreen} />
            <Route exact path='/register' component={RegistrationScreen} />
            <Route exact path='/' component={HomeScreen} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
