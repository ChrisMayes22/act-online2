import React, { Component } from 'react';
import classes from './navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

      state = {
        width: 0,
        start: 0,
    }
      
    componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
    }

    rightShiftHandler() {
        let start = this.state.start;
        const buttonsRemaining = (this.props.questionsArr.length) - this.numberOfButtonsHandler(); 
        const numToShift = buttonsRemaining > 10 ? 10 : buttonsRemaining;
        start += numToShift;
        this.setState({start});
    }
    
    leftShiftHandler() {
        let start = this.state.start - 10 < 0 ? 0 : this.state.start - 10;
        this.setState({start});
    }

    numberOfButtonsHandler(){
        let max = this.props.questionsArr.length;
        let num = Math.floor(((this.state.width-320)/30 -4) + this.state.start);
        return num > max ? max : num;
    }

    render() {
        return (
            <div className = {classes.buttonContainer}>
                <button className = {classes.navbarButton} children='«' onClick = {() => this.leftShiftHandler()}/>
                <button className = {[classes.navbarButton, classes.grayButton].join(' ')} children='instr'/> 
                {this.props.questionsArr.slice(this.state.start, this.numberOfButtonsHandler()).map((el, i) => {
                    return <button 
                            className = {[
                                classes.navbarButton, 
                                el.selected ? classes.selected : '',
                                el.flagged ? classes.flagged : '',
                                el.answered ? classes.answered : '',
                            ].join(' ')} 
                            children={el.id}
                            key={`navbarButton${this.props.questionsArr[i].id}`}
                            onClick = {() => this.props.selectButton(el.id - 1)}
                    />
                })}
                <button className = {[classes.navbarButton, classes.lastButton].join(' ')} children = {'»'} onClick = {() => this.rightShiftHandler()}/>
            </div>
        )
    }
} 

export default Navbar;