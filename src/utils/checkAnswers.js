function checkAnswers(studentRes, correctAns, scoreScale) {
    if(typeof(studentRes) !== "object" || typeof(correctAns) !== "object"){
        throw new Error('Invalid checkAnswers input: both student response and answer key must be objects');
    }
    if(studentRes.length !== correctAns.length)
        throw new Error('Invalid checkAnswers input: Answer Key and Answers have different lengths');
    const markedAnswers = studentRes.map((el, i) => {
        return el === correctAns[i]
    });

    const numCorrect = markedAnswers.filter(el => el).length;
    const missedQuestions = markedAnswers.reduce((arr, el, i) => {
        if(!el)
            arr.push(`#${i+1}`);
        return arr
    }, []);

    const scorePkg = {
        numCorrect,
        scaledScore: scoreScale[numCorrect],
        missedQuestions
    };

    return scorePkg
}

export default checkAnswers