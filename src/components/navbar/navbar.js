import React from 'react';
import classes from './navbar.css';

const navbar = (props) => {
    return(
        <div className = {classes.flexContainer}>
            <button className = {classes.navbarButton} children='«' onClick = {props.leftShift}/>
            <button className = {[classes.navbarButton, classes.grayButton].join(' ')} children='instr'/> 
            {props.questionArr.slice(props.start, props.end).map((el, i) => {
                return <button 
                        className = {[
                            classes.navbarButton, 
                            el.selected ? classes.selected : '',
                            el.flagged ? classes.flagged : '',
                            el.answered ? classes.answered : '',
                        ].join(' ')} 
                        children={el.id}
                        key={`navbarButton${props.questionArr[i].id}`}
                        onClick = {() => props.selectButton(el.id - 1)}
                />
            })}
            <button className = {[classes.navbarButton, classes.lastButton].join(' ')} children = {'»'} onClick = {props.rightShift}/>
        </div>
    );
}

export default navbar;