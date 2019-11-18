import React from 'react';
import classes from './mainHeader.css';
import { Link } from 'react-router-dom'
import * as urls from '../../constants/urls'

const mainHeader = (props) => {
    return(
        <div className = {classes.headContainer}>
            <div className = {classes.flexContainer}>
                <button 
                    className = {classes.navButton} 
                    onClick = {props.prevQuestion}
                    disabled={props.prevDisabled}
                    children='Prev'
                />
                {props.testActive ? 
                <button 
                    className = {classes.navButton} 
                    onClick = {props.nextQuestion}
                    disabled={props.nextDisabled}
                    children='Next'
                /> : 
                <Link to={urls.QUESTIONS_VIEW}>
                    <button 
                        disabled={props.nextDisabled}
                        className = {classes.navButton} 
                        onClick = {props.startTest}
                        children='Next'
                    />
                </Link>}
            </div>
            {props.children}
            <div className = {[classes.flexContainer, classes.flexContainer__flexEnd].join(' ')}>
                <button className = {classes.navButton}>Tools</button>
                <button className = {classes.navButton}>Clear Highlight</button>
                <Link to={urls.FEEDBACK_VIEW} onClick={props.endTest}>
                    <button className = {classes.navButton} >End Section</button>
                </Link>    
            </div>
        </div>
    );
}

export default mainHeader;