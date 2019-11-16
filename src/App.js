import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as urls from './constants/urls';
import QuestionsView from './containers/questionsView';
// import classes from './App.css';


const App = () => {

  return (
    <Switch>
      <Route path={urls.QUESTIONS_VIEW} component={QuestionsView}/>
    </Switch>
  );
}

export default App;
