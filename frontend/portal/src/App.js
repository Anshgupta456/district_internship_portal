import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Header from './components/Header';
import GovRegister from './pages/GovRegister';
import govResTracker from './pages/govResTracker';
import UniRegister from './pages/UniRegister';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/GovRegister" component={GovRegister} />
        <Route path="/govResTracker" component={govResTracker} />
        <Route path="/UniRegister" component={UniRegister} />
      </Switch>
    </Router>
  );
}

export default App;
