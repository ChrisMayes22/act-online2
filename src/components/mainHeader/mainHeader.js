import React from 'react';
import classes from './mainHeader.css';

const mainHeader = (props) => {
    return(
        <div className = {classes.headContainer}>
            <div className = {classes.flexContainer}>
                <button className = {classes.navButton}>Prev</button>
                <button className = {classes.navButton}>Nav</button>
                <button className = {classes.navButton}>Next</button>
            </div>
            <div className = {[classes.flexContainer, classes.flexContainerRow].join(' ')}>
                <button className = {classes.navButton}>Tools</button>
                <button className = {classes.navButton}>Clear Highlight</button>
                <button className = {classes.navButton}>End Section</button>
            </div>
        </div>
    );
}

export default mainHeader;