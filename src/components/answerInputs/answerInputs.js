import React from 'react';
import classes from './answerInputs.css';

const answerInput = (props) => {
    return (
        <React.Fragment>
            <p children={props.prompt}/> 
            <div className={classes.inputBox}>
                <input type='radio' id="A"  name="q1 Answer"/>
                <label for="A" children={props.A} />
            </div>
            <div className={classes.inputBox}>
                <input type='radio' id="B" name="q1 Answer"/>
                <label for="B" children={props.B}/>
            </div>
            <div className={classes.inputBox}>
                <input type='radio' id="C" name="q1 Answer"/>
                <label for="C" children={props.C} />
            </div>
            <div className={classes.inputBox}>
                <input type='radio' id="D" name="q1 Answer"/>
                <label for="D" children={props.D} />
            </div>
        </React.Fragment>
    )
}

export default answerInput;