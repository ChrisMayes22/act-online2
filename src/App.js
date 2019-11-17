import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as urls from './constants/urls';
import QuestionsView from './containers/questionsView/questionsView';
import DirectionsView from './components/directionsView/directionsView';
import FeedbackView from './containers/feedbackView/feedbackView';
// import classes from './App.css';


const App = () => {

  return (
    <Switch>
      <Route path={urls.QUESTIONS_VIEW} component={QuestionsView}/>
      <Route path={urls.FEEDBACK_VIEW} component={FeedbackView}/>
      <Route path={'/'} component={DirectionsView}/>
    </Switch>
  );
}

export default App;
