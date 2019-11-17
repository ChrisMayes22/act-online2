import React from 'react';
import classes from './mainFooter.css';
import Navbar from '../../containers/navbar/navbar';

const mainFooter = (props) => {
    return(
        <div className = {classes.footContainer}>
            <Navbar questionsArr = { props.questionsArr } selectButton = {props.selectButton}/>
            <button className = {classes.flagButton} children='FLAG' onClick = {props.flagButton}/>
        </div>
    )
}

export default mainFooter
