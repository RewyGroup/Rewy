import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import RewyNavbar from './utils/RewyNavbar';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import QuestionListPage from './pages/QuestionListPage';
import QuestionPage from './pages/QuestionPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <div>
      <Router>
    <RewyNavbar/>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage}/>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/question/create" component={CreateQuestionPage} />
      <Route exact path="/question/all" component={QuestionListPage} />
      <Route exact path="/profile" component={ProfilePage}/>
      <Route exact path={"/question/category/:category"} component={QuestionListPage}/>
      <Route exact path={"/question/:questionId"} component={QuestionPage}/>

    </Switch>
    </Router>
    </div>
  );
}

export default App;
