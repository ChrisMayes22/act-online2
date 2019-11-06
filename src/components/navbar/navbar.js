import React, { Component }  from 'react';
import classes from './navbar.css';

class Navbar extends Component {

    state = {
        questionArr: new Array(75).fill(0).map((el, i) => el = {id: i+1, selected: false}),
        start: 0,
        end: 40,
        max: 75,
        priorSelect: null
    }

    rightShift() {
        let end = this.state.end + 20 > this.state.max ? this.state.max : this.state.end + 20;
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
        if(this.state.priorSelect || this.state.priorSelect === 0) 
            arr[this.state.priorSelect].selected = false;
        arr[i].selected = true;
        const newState = {
            ...this.state,
            questionArr: arr,
            priorSelect: i
        }
        this.setState({...newState})
    }

    render() {
        return (
            <div className = {classes.flexContainer}>
            <button 
                className = {classes.navbarButton} 
                children='«' 
                onClick = {() => this.leftShift()}/>
            <button className = {[classes.navbarButton, classes.grayButton].join(' ')} children='instr'/>
                {
                    this.state.questionArr.slice(this.state.start, this.state.end).map((el, i) => {
                        return <button 
                                className = {[classes.navbarButton, el.selected ? classes.selected : ''].join(' ')} 
                                children={el.id}
                                key={`navbarButton${this.state.questionArr[i].id}`}
                                onClick = {() => this.selectButton(i)}
                                />
                    })
                }
            <button 
                className = {[classes.navbarButton, classes.lastButton].join(' ')} 
                children = {'»'}
                onClick = {() => this.rightShift()}/>
        </div>
        );
    }
} 

export default Navbar