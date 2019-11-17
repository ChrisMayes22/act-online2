import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as urls from './constants/urls';
import QuestionsView from './containers/quesionsView/questionsView';
import DirectionsView from './containers/directionsView/directionsView';
// import classes from './App.css';


const App = () => {

  return (
    <Switch>
      <Route path={urls.QUESTIONS_VIEW} component={QuestionsView}/>
      <Route path={'/'} component={DirectionsView}/>
    </Switch>
  );
}

export default App;
