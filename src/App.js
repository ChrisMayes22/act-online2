import React, { Component } from 'react';
import './App.css';
import classes from './App.css';
import MainHeader from './components/mainHeader/mainHeader';
import MainFooter from './components/mainFooter/mainFooter';
import questionsArr from './components/questions/questions';
import AnswerInputs from './components/answerInputs/answerInputs';


class App extends Component {
  constructor(props) {
    super(props)

    this.selectButton = this.selectButton.bind(this);
    this.storeAnswerHandler = this.storeAnswerHandler.bind(this);
  }
  state = {
    questionArr: questionsArr,
    //Note: question id MUST remain integer corresponding to its index +1!! Consider adding a check for this in future. 
    start: 0,
    end: 40,
    activeIndex: 0,
    answers:[]
  }

  rightShift() {
    let max = this.state.questionArr.length;
    let end = this.state.end + 20 > max ? max : this.state.end + 20;
    let start = end - 40;
    const newState = {
        start,
        end
    }
    this.setState({...newState});
  }

  leftShift() {
      let start = this.state.start - 20 < 0 ? 0 : this.state.start - 20;
      let end = start + 40;
      const newState = {
          start,
          end
      }
      this.setState({...newState});
  }

  selectButton(i){
    const arr = [...this.state.questionArr];
    if(this.state.activeIndex || this.state.activeIndex === 0) 
        arr[this.state.activeIndex].selected = false;
    arr[i].selected = true;
    const newState = {
        ...this.state,
        questionArr: arr,
        activeIndex: i
    }
    this.setState({...newState})
  }

  flagButton(){
    if(isNaN(this.state.activeIndex)) return null;
    let arr = [...this.state.questionArr];
    arr[this.state.activeIndex].flagged = !arr[this.state.activeIndex].flagged;
    this.setState({ questionArr: arr });
  }

  nextQuestion(){
    if(this.state.activeIndex < this.state.questionArr.length-1){
      let newIndex = this.state.activeIndex;
      newIndex++;
      this.selectButton(newIndex);
    }
    return null;
  }

  previousQuestion(){
    if(this.state.activeIndex > 0){
      let newIndex = this.state.activeIndex;
      newIndex--;
      this.selectButton(newIndex);
    }
    return null;
  }

  storeAnswerHandler(response) {
    const answers = [...this.state.answers];
    answers[this.state.activeIndex] = response;
    this.setState({ answers })
  }

  render() {
    return (
      <div className={classes.background}>
        <MainHeader 
          questionNumber = {this.state.activeIndex ? this.state.questionArr[this.state.activeIndex].id : 1} 
          previousQuestion = {() => this.previousQuestion()}
          nextQuestion = {() => this.nextQuestion()}
        />
        <div className={classes.bodyFlex}>
          <div className={classes.contentContainer}>
            {this.state.questionArr[this.state.activeIndex].passage} 
          </div>
          <div className={classes.contentContainer}>
            <AnswerInputs 
              prompt = {this.state.questionArr[this.state.activeIndex].content.prompt}
              A = {this.state.questionArr[this.state.activeIndex].content.A}
              B = {this.state.questionArr[this.state.activeIndex].content.B}
              C = {this.state.questionArr[this.state.activeIndex].content.C}
              D = {this.state.questionArr[this.state.activeIndex].content.D}
              studentResponse = {this.state.answers[this.state.activeIndex]}
              answerIndex={`question#${this.state.activeIndex}`}
              change = {this.storeAnswerHandler}
            />
          </div>
        </div>
        <MainFooter
          leftShift={() => this.leftShift()}
          rightShift={() => this.rightShift()} 
          selectButton={this.selectButton}
          flagButton={() => this.flagButton()}
          start={this.state.start }
          end={this.state.end }
          questionArr={this.state.questionArr}
        />
        
      </div>
    );
  }
}

export default App;
