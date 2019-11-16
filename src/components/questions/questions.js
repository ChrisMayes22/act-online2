import React from 'react';
import classes from './questions.css'
import PassageOne from '../passages/passageOne';
import PassageTwo from '../passages/passageTwo';
import question2ImageUrlA from '../../assets/deicer1.png';
import question2ImageUrlB from '../../assets/deicer2.png';
import question2ImageUrlC from '../../assets/deicer3.png';
import question2ImageUrlD from '../../assets/deicer4.png';
import question7ImageUrlA from '../../assets/p2q1a.png';
import question7ImageUrlB from '../../assets/p2q1b.png';
import question7ImageUrlC from '../../assets/p2q1c.png';
import question7ImageUrlD from '../../assets/p2q1d.png';

class Question {
    constructor(id, passage, prompt, A, B, C, D, E){
        this.id = id;
        this.flagged = false;
        this.selected = false;
        this.answered = false;
        this.passage = passage;
        this.content = {
            prompt,
            A,
            B,
            C,
            D,
            E: E || null
        };
        this.studentResponse = null;
    }
}


/* 
    <span>A: </span>,
    <span>B: </span>,
    <span>C: </span>,
    <span>D: </span>
*/

const questionsArray = [
    new Question(
        1, 
        <PassageOne/>,
        `According to Figure 1, for any submersion time after 0 days, what is the 
        order of the 4 deicers, from the deicer that produced the greatest average percent 
        change in cylinder length to the deicer that produced the least average percent change in cylinder length?`,
        <span>A. MgCl, CaCl<sub>2</sub>, NaCl, Ca(OH)<sub>2</sub></span>,
        <span>B. MgCl<sub>2</sub>, NaCl, CaCl<sub>2</sub>, Ca(OH)<sub>2</sub></span>,
        <span>C. Ca(OH)<sub>2</sub>, NaCl, CaCl<sub>2</sub>, MgCl<sub>2</sub></span>,
        <span>D. Ca(OH)<sub>2</sub>, NaCl, MgCl<sub>2</sub>, CaCl<sub>2</sub></span>,
    ), 
    new Question(
        2,
        <PassageOne/>,
        `Which of the following diagrams best shows how pressure was applied to a cylinder to determine its CS ?`,
        <span>A.<img className={classes.answerImage} src={question2ImageUrlA} alt="cylinder diagram"/></span>,
        <span>B.<img className={classes.answerImage} src={question2ImageUrlB} alt="cylinder diagram"/></span>,
        <span>C.<img className={classes.answerImage} src={question2ImageUrlC} alt="cylinder diagram"/></span>,
        <span>D.<img className={classes.answerImage} src={question2ImageUrlD} alt="cylinder diagram"/></span>,
    ),
    new Question(
        3,
        <PassageOne/>,
        `The change in the mass of the cylinders was caused by the absorption of the deicer into the concrete. 
        Based on Figure 2, the cylinders submerged in which deicer had absorbed, on average, the greatest mass of deicer at 250 days?`,
        <span>A. MgCl<sub>2</sub></span>,
        <span>B. CaCl<sub>2</sub></span>,
        <span>C. NaCl</span>,
        <span>D. Ca(OH)<sub>2</sub></span>
    ),
    new Question(
        4,
        <PassageOne/>,
        `Based on the information provided, how many grams of solid NaCl would have had to be dissolved in water to 
        prepare 1,000 grams of the NaCl deicer?`,
        <span>A. 15 g</span>,
        <span>B. 30 g</span>,
        <span>C. 150</span>,
        <span>D. 300</span>
    ),
    new Question(
        5,
        <PassageOne/>,
        `In the studies, it is most likely that the cylinders were submerged in deicers at 4°C because that temperature is:`,
        <span>A. The freezing point of all four deicers</span>,
        <span>B. The freezing point of water</span>,
        <span>C. A typical summer temperature in areas where deicers are used</span>,
        <span>D. A typical winter temperature in areas where deicers are used</span>
    ),
    new Question(
        6,
        <PassageOne/>,
        `For pavement made of the same concrete as the cylinders, the minimum CS that is required to maintain a smooth, uncracked 
        road surface is 25 MPa. Based on the results of Study 2, which deicer(s) could most likely be kept in contact with this concrete 
        continuously for 600 days without lowering the average CS of the concrete below 25 MPa ?`,
        <span>A. NaCl only</span>,
        <span>B. MgCl<sub>2</sub> and CaCl<sub>2</sub> only</span>,
        <span>C. MgCl<sub>2</sub>, NaCl, and Ca(OH)<sub>2</sub> only</span>,
        <span>D. CaCl<sub>2</sub>, NaCl, and Ca(OH)<sub>2</sub> only</span>
    ),
    new Question(
        7,
        <PassageTwo/>,
        `The data in Figure 2 for time = 140 days are best shown 
        by which of the following graphs?`,
        <span>A.<img className={classes.answerImage} src={question7ImageUrlA} alt="graph"/></span>,
        <span>B.<img className={classes.answerImage} src={question7ImageUrlB} alt="graph"/></span>,
        <span>C.<img className={classes.answerImage} src={question7ImageUrlC} alt="graph"/></span>,
        <span>D.<img className={classes.answerImage} src={question7ImageUrlD} alt="graph"/></span>
    ), 
    new Question(
        8,
        <PassageTwo/>,
        `According to Figure 2, for which isotope, S‑35 or P‑32, will the average rate 
        of decay be greater over the first 200 days?`,
        <span>A. S‑35, because at any given time after zero, S‑35 will have the lower </span>,
        <span>B. S‑35, because at any given time after zero, S‑35 will have the higher </span>,
        <span>C. P‑32, because at any given time after zero, P‑32 will have the lower </span>,
        <span>D. P‑32, because at any given time after zero, P‑32 will have the higher </span>,
    ), 
    new Question(
        9,
        <PassageTwo/>,
        `Based on Table 1 and Figure 1, if a sample initially contains 1,000 Ti‑44 atoms, the 
        number of Ti‑44 atoms in the sample 20 yr later will most likely be:`,
        <span>A.  less than 300.</span>,
        <span>B.  between 300 and 600.</span>,
        <span>C.  between 600 and 900.</span>,
        <span>D.  greater than 900.</span>,
    ), 
    new Question(
        10,
        <PassageTwo/>,
        `According to Figure 1, the half‑life of Sr‑90 is approximately:`,
        <span>A.  30 yr.</span>,
        <span>B.  90 yr.</span>,
        <span>C.  160 yr.</span>,
        <span>D.  200 yr.</span>,
    ),
    new Question(
        11,
        <PassageTwo/>,
        <p>
            Based on Figure 2, if a sample contained 2,000 atoms of Fe‑59 at 
            time = 0, at approximately what time will the<em>N</em><sub>t</sub>
            of the sample be 400? 
        </p>,
        <span>A.  40 days</span>,
        <span>B.  60 days</span>,
        <span>C.  80 days</span>,
        <span>D.  100 days</span>,
    )
];


export default questionsArray;