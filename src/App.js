import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as urls from './constants/urls';
import QuestionsView from './containers/questionsView/questionsView';
import DirectionsView from './components/directionsView/directionsView';
import FeedbackView from './containers/feedbackView/feedbackView';
import SelectionTest from './containers/selectionTest/selectionTest';
import Highlighter from './containers/deprecated_highlighter/highlighter/highlighter'
// import classes from './App.css';


const App = () => {

  return (
    <Switch>
      <Route path={urls.QUESTIONS_VIEW} component={QuestionsView}/>
      <Route path={urls.FEEDBACK_VIEW} component={FeedbackView}/>
      <Route path={'/selectionTest'} component={SelectionTest}/>
      <Route path={'/highlighter'} component={Highlighter}/>
      <Route path={'/'} component={DirectionsView}/>
    </Switch>
  );
}

export default App;
