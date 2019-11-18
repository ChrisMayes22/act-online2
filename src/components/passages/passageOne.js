import React from 'react';
import classes from './passages.css';
import figureOne from '../../assets/actdata.png';
import figureTwo from '../../assets/actdata2.png';
import figureThree from '../../assets/actdata3.png';

const passageOne = () => {
    return(
        <div className={classes.passageContainer}>
            <div className={classes.passageTitle}>Passage 1</div>
            <p> 
              <em>Deicers</em> (mixtures of salt and water that are used on roads to melt ice) can over time cause concrete pavement to deteriorate.
            </p>
            <p>
              Two studies examined how 4 different deicers affected the length, mass, and compressive strength (CS) of identical cylinders made of 
              hardened concrete. (CS is the maximum lengthwise pressure that can be applied to the ends of a cylinder without crushing it.) Each 
              deicer was 15% by mass of Ca(OH)<sub>2</sub>, NaCl, MgCl<sub>2</sub>, or CaCl kept at 4°C<sub>2</sub>.
            </p>
            <div className={classes.sectionTitle}>Study 1</div>
            <p>
              Five of the cylinders were submerged in 4 L of the Ca(OH)<sub>2</sub> deicer. Every 25 days over the next 600 days, the following was done:
            </p>
            <ol>
              <li>
                The 5 cylinders were removed from the deicer and wiped dry.
              </li>
              <li>
                Each cylinder’s length and mass were measured.
              </li>
              <li>
                Two average values were calculated for the 5 cylinders: the average percent change in length relative to the original length and the 
                average percent change in mass relative to the original mass.
              </li>
              <li>
                The cylinders were resubmerged.
              </li>
            </ol>
            <p>
              All of the above procedures were repeated for the other deicers (see Figures 1 and 2).
            </p>
            <div className={classes.figureLabel}>Figure 1</div>
            <img src={figureOne} className={classes.figure} alt="figure 1"/>
            <div className={classes.figureLabel}>Figure 2</div>
            <img src={figureTwo} className={classes.figure} alt="figure 2"/>
            <div className={classes.sectionTitle}>Study 2</div>
            <p>
              Sixty more of the cylinders were submerged in 20 L of the Ca(OH)<sub>2</sub>  deicer. 
              Every 50 days over the next 600 days, the following was done:
            </p>
            <ol>
              <li>Five cylinders were removed from the deicer and wiped dry.</li>
              <li>Each cylinder’s CS, in megapascals (MPa), was determined.</li>
              <li>The average CS was calculated for the 5 cylinders.</li>
            </ol>
            <p>
              All of the above procedures were repeated for the other deicers. Finally, the CS of 5 more of the cylinders—cylinders 
              that had not been submerged in any deicer—was determined, and their average CS was calculated (see Figure 3).
            </p>
            <div className={classes.figureLabel}>Figure 3</div>
            <img src={figureThree} className={classes.figure} alt="figure 3"/>
          </div>
    )
}

export default passageOne;