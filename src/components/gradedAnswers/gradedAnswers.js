import React from 'react';
import classes from './gradedAnswers.css';

const gradedAnswers = props => {
    return(
        <div>
            <p>NUMBER CORRECT:</p>
            <p>{props.numCorrect}</p>
            <p>QUESTIONS MISSED:</p>
            <p>{props.missedQuestions.map(el => <div className={classes.missedQuestion} children={el}/>)}:</p>
            <p>SCALED SCORE:</p>
            <p>{props.scaledScore}</p>
        </div>
    )
}

export default gradedAnswers;