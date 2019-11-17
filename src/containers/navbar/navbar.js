import React, { Component } from 'react';
import classes from './navbar.css';

class Navbar extends Component {

    state = {
        start: 0,
        end: this.props.questionsArr.length > 40 ? 40 : this.props.questionsArr.length
    }

    rightShiftHandler() {
        let end = this.state.end + 20 > this.props.questionsArr.length ? this.props.questionsArr.length : this.state.end + 20;
        let start = end - 40;
        this.setState({start, end});
    }
    
    leftShiftHandler() {
        let start = this.state.start - 20 < 0 ? 0 : this.state.start - 20;
        let end = start + 40;
        this.setState({start, end});
    }

    render() {
        return (
            <div className = {classes.flexContainer}>
                <button className = {classes.navbarButton} children='«' onClick = {() => this.leftShiftHandler()}/>
                <button className = {[classes.navbarButton, classes.grayButton].join(' ')} children='instr'/> 
                {this.props.questionsArr.slice(this.state.start, this.state.end).map((el, i) => {
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