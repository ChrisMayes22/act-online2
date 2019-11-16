import React from 'react';
import classes from './passages.css';
import figureOneUrl from '../../assets/p2fig1.png';
import figureTwoUrl from '../../assets/p2fig2.png';

const passageTwo = () => {
    return(
        <React.Fragment>
            <div className={classes.passageTitle}>Passage 2</div>
            <p>
                When the nucleus of an atom of a radioactive isotope undergoes 
                certain types of decay, the atom transforms into an atom of a 
                different isotope. An isotope’s <em>half-life</em>  is the time 
                it takes for half of any given number of its nuclei to decay. An isotope’s  
                <em>decay constant</em>, λ, depends on the isotope’s rate of decay. Table 1
                gives the value of λ (in yr<sup>-1</sup>) for 8 isotopes of different elements.
            </p>
            <table>
                <tr>
                    <th>Element</th>
                    <th>Isotope</th>
                    <th>λ (yr<sup>-1</sup>)</th>
                </tr>
                <tr>
                    <td>Nickel</td>
                    <td>Ni-63</td>
                    <td>0.0069</td>
                </tr>
                <tr>
                    <td>Titanium</td>
                    <td>Ti-44</td>
                    <td>0.010</td>
                </tr>
                <tr>
                    <td>Strontium</td>
                    <td>Sr-90</td>
                    <td>0.024</td>
                </tr>
                <tr>
                    <td>Hydrogen</td>
                    <td>H-3</td>
                    <td>0.056</td>
                </tr>
                <tr>
                    <td>Sulfur</td>
                    <td>S-35</td>
                    <td>2.9</td>
                </tr>
                <tr>
                    <td>Iron</td>
                    <td>Fe-59</td>
                    <td>5.7</td>
                </tr>
                <tr>
                    <td>Phosphorous</td>
                    <td>P-32</td>
                    <td>18</td>
                </tr>
                <tr>
                    <td>Iodine</td>
                    <td>P-32</td>
                    <td>I-131</td>
                </tr>
            </table>
            <p>
                Figures 1 and 2 show, for each of 6 of the isotopes listed in 
                Table 1, the change over time in the number of the nuclei remaining,  
                <em>N</em><sub>t</sub> in a sample containing 1,000 of the nuclei.
            </p>
            <p>
                (Note: in Figure 1, the unit of time is <em>years</em>; in Figure 2,
                the unit of time is <em>days</em>.)
            </p>
            <img src={figureOneUrl} className={classes.figure} alt="figure 1"/>
            <p className={classes.figureLabel}>Figure 1</p>
            <img src={figureTwoUrl} className={classes.figure} alt="figure 2"/>
            <p className={classes.figureLabel}>FIgure 2</p>
        </React.Fragment>
    )
}

export default passageTwo;