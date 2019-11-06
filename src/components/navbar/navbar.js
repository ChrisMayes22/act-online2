import React, { Component }  from 'react';
import classes from './navbar.css';

class Navbar extends Component {

    state = {
        questionArr: new Array(75).fill(0).map((el, i) => el = {id: i+1, selected: false, flagged: false}), 
        //Note: question id MUST remain integer corresponding to its index +1!! Consider adding a check for this in future. 
        start: 0,
        end: 40,
        activeIndex: null
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
        if(!this.state.activeIndex) return null;
        let arr = [...this.state.questionArr];
        arr[this.state.activeIndex].flagged = !arr[this.state.activeIndex].flagged;
        this.setState({ questionArr: arr });
    }

    render() {
        return (
            <React.Fragment>
                <div className = {classes.flexContainer}>
                    <button className = {classes.navbarButton} children='«' onClick = {() => this.leftShift()}/>
                    <button className = {[classes.navbarButton, classes.grayButton].join(' ')} children='instr'/>
                    {this.state.questionArr.slice(this.state.start, this.state.end).map((el, i) => {
                        return <button 
                                className = {[
                                    classes.navbarButton, 
                                    el.selected ? classes.selected : '',
                                    el.flagged ? classes.flagged : '',
                                ].join(' ')} 
                                children={el.id}
                                key={`navbarButton${this.state.questionArr[i].id}`}
                                onClick = {() => this.selectButton(el.id-1)}
                        />
                    })}
                    <button className = {[classes.navbarButton, classes.lastButton].join(' ')} children = {'»'} onClick = {() => this.rightShift()}/>
                </div>
                <button className = {classes.flagButton} children='FLAG' onClick = {() => this.flagButton() }/>
            </React.Fragment>
        );
    }
} 

export default Navbar