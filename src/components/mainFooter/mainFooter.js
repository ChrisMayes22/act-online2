import React from 'react';
import classes from './mainFooter.css';
import Navbar from '../navbar/navbar';

const mainFooter = (props) => {
    return(
        <div className = {classes.footContainer}>
            <Navbar/>
        </div>
    );
}

export default mainFooter;