import React from 'react';
import classes from './mainFooter.css';
import Navbar from '../navbar/navbar';

const mainFooter = (props) => {
    return(
        <div className = {classes.footContainer}>
            <Navbar
                leftShift = { props.leftShift }
                rightShift = { props.rightShift } 
                selectButton = { props.selectButton }
                flagButton = { props.flagButton }
                start = { props.start }
                end = { props.end }
                questionArr = { props.questionArr }
            />
            <button className = {classes.flagButton} children='FLAG' onClick = {props.flagButton}/>
        </div>
    )
}

export default mainFooter
