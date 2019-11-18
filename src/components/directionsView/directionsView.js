import React from 'react';
import MainHeader from '../../components/mainHeader/mainHeader';
import classes from './directionsView.css';

const directionsView = () => {
    return(
        <React.Fragment>
            <MainHeader
                prevDisabled={true}
                pageTitle='Directions'
            />
            <main className={classes.contentContainer}>
            <h1>SCIENCE TEST DIRECTIONS</h1>
                <h2>You will have 35 minutes to complete this section.</h2>
                <section className={classes.directions}>
                    <p>
                        Read each Science passage through carefully using the scrollbar before you begin to answer the questions 
                        that accompany it. After reading a passage, choose the best 
                        answer, select the circle next to it, then select the <strong>Next</strong> button.
                        You may refer to the passages as often as necessary.
                    </p>
                    <p>
                        You are NOT permitted to use a calculator on this section. You ARE permitted to use scratch paper,
                        which will be collected at the end of the test.
                    </p>
                    <p>
                        Select the <strong>Next</strong> Button to proceed.
                    </p>
                </section>
            </main>
        </React.Fragment>
    );
}

export default directionsView