import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import TransactionsScreen from './screens/TransactionsScreen';

const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/transactions/me'
              component={TransactionsScreen}
            />
            <Route exact path='/register' component={RegistrationScreen} />
            <Route exact path='/' component={HomeScreen} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
