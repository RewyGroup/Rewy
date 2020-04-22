import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import CategoryForm from './components/Category/CategoryForm';
import {useSelector,useDispatch} from 'react-redux';
import RewyNavbar from './utils/RewyNavbar';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
    <RewyNavbar/>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
    </Switch>
    </Router>
    </div>
  );
}

export default App;
