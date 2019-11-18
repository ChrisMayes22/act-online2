import React from 'react';
import classes from './answerInputs.css';

const answerInput = (props) => {
    return (
        <React.Fragment>
            <p children={props.prompt} className={classes.prompt}/> 
            <div className={classes.inputBox}>
                <input type='radio' 
                    id={`A${props.answerIndex}`}  
                    name={props.answerIndex} 
                    checked={props.studentResponse === 'A'}
                    onChange={() => props.change('A')}
                />
                <label htmlFor="A" children={props.A} />
            </div>
            <div className={classes.inputBox}>
                <input type='radio' 
                    id={`B${props.answerIndex}`}  
                    name={props.answerIndex} 
                    checked={props.studentResponse === 'B'}
                    onChange={() => props.change('B')}
                />
                <label htmlFor="B" children={props.B}/>
            </div>
            <div className={classes.inputBox}>
                <input type='radio' 
                    id={`C${props.answerIndex}`}  
                    name={props.answerIndex} 
                    checked={props.studentResponse === 'C'}
                    onChange={() => props.change('C')}
                />
                <label htmlFor="C" children={props.C} />
            </div>
            <div className={classes.inputBox}>
                <input type='radio' 
                    id={`D${props.answerIndex}`}  
                    name={props.answerIndex} 
                    checked={props.studentResponse === 'D'}
                    onChange={() => props.change('D')}
                />
                <label htmlFor="D" children={props.D} />
            </div>
        </React.Fragment>
    )
}

export default answerInput;