import React from 'react';
import './App.css';
import classes from './App.css';
import MainHeader from './components/mainHeader/mainHeader';
import MainFooter from './components/mainFooter/mainFooter';


function App() {
  return (
    <div className={classes.background}>
      <MainHeader/>
      <div className={classes.bodyFlex}>
        <div className={classes.textContainer}>
          Hello World! How are you?
        </div>
        <div className={classes.answersContainer}>
          Hello World
        </div>
      </div>
      <MainFooter/>
    </div>
  );
}

export default App;
