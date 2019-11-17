import checkAnswers from './checkAnswers';
import answers from '../data/answers';
import scoreScale from '../data/scoreScales';

describe('checkAnswers function behaves as expected', function(){

    function makeNextIndexFalse(arr, i) {
        arr[i] = false;
        return checkAnswers(arr, answers, scoreScale);
    }

    describe('numCorrect prop on returned object is as expected', function(){
        test('When checkAnswers is called on array identical to answers array, returned object\'s numCorrect prop is answers.length', function(){
            const scorePkg = checkAnswers([...answers], answers, scoreScale)
            expect(scorePkg.numCorrect).toBe(answers.length);
        });
        test('When checkAnswer is called on an array with n misses, returned object has numCorrect prop set to answers.length - n', function(){
            const wrongAnswers = [...answers];
            for(let i = 0; i < answers.length; i++){
                expect(makeNextIndexFalse(wrongAnswers, i).numCorrect).toBe(answers.length-1-i) 
            }
        });
    });
    describe('missedQuestions prop on returned object is as expected', function(){
        test('When index n on studentRes is wrong, checkAnswer returns object w/ prop missedQuestions that holds an array w/ "#n" somewhere on that array', function(){
            const wrongAnswers = [...answers];
            for(let i = 0; i < answers.length; i++){
                expect(makeNextIndexFalse(wrongAnswers, i).missedQuestions[i]).toBe(`#${i+1}`); 
            }
            const oneWrong = [...answers];
            oneWrong[9] = false;
            const oneWrongPkg = checkAnswers(oneWrong, answers, scoreScale);
            expect(oneWrongPkg.missedQuestions[0]).toBe('#10')
        })
    });
    describe('scaledScore prop on returned object is as expected', function(){
        test('When studentRes contains n errors, scaledScore prop on returned object should match number at scoreScale[n]', function(){
            const wrongAnswers = [...answers];
            for(let i = 0; i < answers.length; i++){
                expect(makeNextIndexFalse(wrongAnswers, i).scaledScore).toBe(scoreScale[answers.length - 1 - i]); 
            }
        })
    })

    
})