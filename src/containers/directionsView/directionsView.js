import React, { Component } from 'react';
import MainHeader from '../../components/mainHeader/mainHeader';

class DirectionsView extends Component {
    


    render(){
        return(
            <React.Fragment>
                <MainHeader
                    prevDisabled={true}
                />
                <h1>SCIENCE TEST DIRECTIONS</h1>
                <br/>
                <main>
                    <h3>You will have 35 minutes to complete this section.</h3>
                    <p>
                        SECTION DIRECTIONS: The first screen in this section contains instructions about the science test. 
                        That screen is not part of the scored questions.
                    </p>
                    <p>
                        You may use your scratch paper on this test. You will hand that in to the room supervisor at the end of testing.
                    </p>
                    <p>
                        Select the <strong>Next</strong> Button to proceed.
                    </p>
                </main>
            </React.Fragment>
        );
    }
}

export default DirectionsView