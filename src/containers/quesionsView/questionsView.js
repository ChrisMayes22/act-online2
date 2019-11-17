import React, { Component } from 'react';
import classes from './questionsView.css';
import MainHeader from '../../components/mainHeader/mainHeader';
import MainFooter from '../../components/mainFooter/mainFooter';
import questionsArr from '../../components/questions/questions';
import AnswerInputs from '../../components/answerInputs/answerInputs';
import Timer from '../timer/timer';

class QuestionView extends Component {
  constructor(props) {
    super(props)

    this.selectQuestionHandler = this.selectQuestionHandler.bind(this);
    this.storeAnswerHandler = this.storeAnswerHandler.bind(this);
  }

  state = {
    questionsArr: questionsArr,
    //Note: question id MUST remain integer corresponding to its index +1!! Consider adding a check for this in future. 
    start: 0,
    end: 40,
    activeIndex: 0,
    answers: new Array(questionsArr.length),
  }


  selectQuestionHandler(i){
    if(i >= this.state.questionsArr.length || i < 0){
      console.log(`Warning: index ${i} called, but max index is ${this.state.questionsArr.length-1} and min index is 0. Input ignored.`)
      return null;
    }
    const arr = [...this.state.questionsArr];
    arr[this.state.activeIndex].selected = false;
    arr[i].selected = true;
    this.setState({questionsArr: arr, activeIndex: i})
  }

  flagHandler(){
    if(isNaN(this.state.activeIndex)){
      console.log('Warning: user attempted to flag question, but a question is not selected. Input ignored.') 
      return null;
    }
    let arr = [...this.state.questionsArr];
    arr[this.state.activeIndex].flagged = !arr[this.state.activeIndex].flagged;
    this.setState({ questionsArr: arr });
  }

  storeAnswerHandler(response) {
    const answers = [...this.state.answers];
    answers[this.state.activeIndex] = response;
    if(!this.state.questionsArr[this.state.activeIndex].answered){
      const questionsArr = this.state.questionsArr;
      questionsArr[this.state.activeIndex].answered = true;
      this.setState({ answers, questionsArr })
    } else {
      this.setState({ answers })
    }
  }

  render() {
    return (
      <div className={classes.background}>
        <MainHeader 
          questionNumber = {this.state.activeIndex ? this.state.questionsArr[this.state.activeIndex].id : 1} 
          prevQuestion = {() => this.selectQuestionHandler(this.state.activeIndex - 1)}
          nextQuestion = {() => this.selectQuestionHandler(this.state.activeIndex + 1)}
          prevDisabled = {!this.state.activeIndex}
          nextDisabled = {this.state.activeIndex === this.state.questionsArr.length - 1}
          testActive = {true}
        >
          <Timer/>
        </MainHeader>
        <div className={classes.bodyFlex}>
          <div className={classes.contentContainer}>
            {this.state.questionsArr[this.state.activeIndex].passage} 
          </div>
          <div className={classes.contentContainer}>
            <AnswerInputs 
              prompt = {this.state.questionsArr[this.state.activeIndex].content.prompt}
              A = {this.state.questionsArr[this.state.activeIndex].content.A}
              B = {this.state.questionsArr[this.state.activeIndex].content.B}
              C = {this.state.questionsArr[this.state.activeIndex].content.C}
              D = {this.state.questionsArr[this.state.activeIndex].content.D}
              studentResponse = {this.state.answers[this.state.activeIndex]}
              answerIndex={`question#${this.state.activeIndex}`}
              change = {this.storeAnswerHandler}
            />
          </div>
        </div>
        <MainFooter
          selectButton={this.selectQuestionHandler}
          flagButton={() => this.flagHandler()}
          start={this.state.start }
          end={this.state.end }
          questionsArr={this.state.questionsArr}
        />
        
      </div>
    );
  }
}

export default QuestionView;
