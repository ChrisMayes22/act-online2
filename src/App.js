import React from 'react';
import './App.css';
import classes from './App.css';
import MainHeader from './components/mainHeader/mainHeader';
import MainFooter from './components/mainFooter/mainFooter';


function App() {
  return (
    <div className={classes.background}>
      <MainHeader/>
      <MainFooter/>
    </div>
  );
}

export default App;
