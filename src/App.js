import React, { Component } from 'react';
import './App.css';
import classes from './App.css';
import MainHeader from './components/mainHeader/mainHeader';
import MainFooter from './components/mainFooter/mainFooter';
import figureOne from './assets/actdata.png';
import figureTwo from './assets/actdata2.png';
import figureThree from './assets/actdata3.png'


class App extends Component {
  constructor(props) {
    super(props)

    this.selectButton = this.selectButton.bind(this);
  }
  state = {
    questionArr: new Array(75).fill(0).map((el, i) => el = {id: i+1, selected: false, flagged: false}), 
    //Note: question id MUST remain integer corresponding to its index +1!! Consider adding a check for this in future. 
    start: 0,
    end: 40,
    activeIndex: 0
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
            <div className={classes.passageTitle}>Passage 1</div>
            <p> 
              <em>Deicers</em> (mixtures of salt and water that are used on roads to melt ice) can over time cause concrete pavement to deteriorate.
            </p>
            <p>
              Two studies examined how 4 different deicers affected the length, mass, and compressive strength (CS) of identical cylinders made of 
              hardened concrete. (CS is the maximum lengthwise pressure that can be applied to the ends of a cylinder without crushing it.) Each 
              deicer was 15% by mass of Ca(OH)<sub>2</sub>, NaCl, MgCl<sub>2</sub>, or CaCl kept at 4°C<sub>2</sub>.
            </p>
            <div className={classes.sectionTitle}>Study 1</div>
            <p>
              Five of the cylinders were submerged in 4 L of the Ca(OH)<sub>2</sub> deicer. Every 25 days over the next 600 days, the following was done:
            </p>
            <ol>
              <li>
                The 5 cylinders were removed from the deicer and wiped dry.
              </li>
              <li>
                Each cylinder’s length and mass were measured.
              </li>
              <li>
                Two average values were calculated for the 5 cylinders: the average percent change in length relative to the original length and the 
                average percent change in mass relative to the original mass.
              </li>
              <li>
                The cylinders were resubmerged.
              </li>
            </ol>
            <p>
              All of the above procedures were repeated for the other deicers (see Figures 1 and 2).
            </p>
            <img src={figureOne} className={classes.figure} />
            <div className={classes.figureTitle}>Figure 1</div>
            <img src={figureTwo} className={classes.figure}/>
            <div className={classes.figureTitle}>Figure 2</div>
            <div className={classes.sectionTitle}>Study 2</div>
            <p>
              Sixty more of the cylinders were submerged in 20 L of the Ca(OH)<sub>2</sub>  deicer. 
              Every 50 days over the next 600 days, the following was done:
            </p>
            <ol>
              <li>Five cylinders were removed from the deicer and wiped dry.</li>
              <li>Each cylinder’s CS, in megapascals (MPa), was determined.</li>
              <li>The average CS was calculated for the 5 cylinders.</li>
            </ol>
            <p>
              All of the above procedures were repeated for the other deicers. Finally, the CS of 5 more of the cylinders—cylinders 
              that had not been submerged in any deicer—was determined, and their average CS was calculated (see Figure 3).
            </p>
            <img src={figureThree} className={classes.figure}/>
            <div className={classes.figureTitle}>Figure 3</div>
          </div>
          <div className={classes.contentContainer}>
            <p children={`<Insert Question Here>`}/>
            <div>
              <input type='radio' id="A" value='A: answer A'/>
              <label for="A" children="A" />
            </div>
            <div>
              <input type='radio' id="B" value='B: answer B'/>
              <label for="B" children="B"/>
            </div>
            <div>
              <input type='radio' id="C" value='C: answer C'/>
              <label for="C" children="C" />
            </div>
            <div>
              <input type='radio' id="D" value='D: answer D'/>
              <label for="D" children="D" />
            </div>
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
