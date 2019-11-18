import React, { Component } from 'react';
import MainHeader from '../../components/mainHeader/mainHeader';
import GradedAnswers from '../../components/gradedAnswers/gradedAnswers';
import checkAnswers from '../../utils/checkAnswers';
import { firstEleven } from '../../data/answers';
import { test } from '../../data/scoreScales';
import { connect } from 'react-redux'; 

class DirectionsView extends Component {

    render(){
        return(
            <React.Fragment>
                <MainHeader
                    prevDisabled={true}
                    nextDisabled={true}
                    pageTitle='Results'
                />
                <main>
                    <GradedAnswers
                        numCorrect={this.props.scorePkg.numCorrect}
                        scaledScore={this.props.scorePkg.scaledScore}
                        missedQuestions={this.props.scorePkg.missedQuestions}
                    />
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        scorePkg: checkAnswers(state.studentRes, firstEleven, test)
    }
};

export default connect(mapStateToProps, null)(DirectionsView);