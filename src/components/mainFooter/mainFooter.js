import React from 'react';
import classes from './mainFooter.css';
import Navbar from '../../containers/navbar/navbar';

const mainFooter = (props) => {
    return(
        <div className = {classes.footContainer}>
            <div className={classes.flexStartContainer}>
                <Navbar questionsArr = { props.questionsArr } selectButton = {props.selectButton}/>
            </div>
            <div className={classes.flexEndContainer}>
                <button className = {classes.flagButton} children='FLAG' onClick = {props.flagButton}/>
            </div>
        </div>
    )
}

export default mainFooter
