import React, { Component } from 'react';
import classes from './timer.css';

class Timer extends Component {

    state = {
        minute: '40',
        second: '00',
    }

    componentDidMount() {
        this.interval = setInterval(() => {
          this.runTimerHandler(this.state.minute, this.state.second)
          if(+this.state.minute <= 0 && +this.state.second <= 0)
            clearInterval(this.interval);
        }, 1000)
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    
      runTimerHandler(strMinute, strSecond){
          let minute = +strMinute;
          let second = +strSecond;
          second = !second ? "59" : String(second-1);
          second = second.length === 1 ? "0" + second : second; 
          minute = second === "59" ? String(minute-1) : String(minute);
          minute = minute.length === 1 ? "0" + minute : minute;
          this.setState({minute, second})
      }

      render() {
          return <div className={classes.timer} children={`${this.state.minute}:${this.state.second}`}/>
      }
}

export default Timer;