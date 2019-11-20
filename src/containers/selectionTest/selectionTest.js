import React, { Component } from 'react';
import classes from './selectionTest.css';

class selectionTest extends Component {

    constructor(props){
        super(props)
        this.selectionHandler.bind(this);
    }

    state = {
        offsets: [],
        text: ['This is a paragraph detailing important information about the test A.',
            'This is a paragraph detailing important information about the test C.',
            'This is a paragraph detailing important information about the test D.',
            'This is a paragraph detailing important information about the test E.']
    }

    componentDidMount(){
        this.expectedLengths = this.state.text.map(el => el.length);
    }

    getOffsetsHandler(select, index){
        const anchor = select.anchorNode;
        const focus = select.focusNode;
        const anchorParent = anchor.parentNode;
        const focusParent = focus.parentNode;
        let anchorOffset = select.anchorOffset;
        let focusOffset = select.focusOffset;
        if(focusParent.attributes.id.nodeValue === anchorParent.attributes.id.nodeValue){
            console.log('ANCHOR PARENT LENGTH', anchorParent.childNodes[0]);
            console.log('FOCUS PARENT LENGTH', focusParent.childNodes[0]);
            if(anchorParent.childNodes.length !== this.expectedLengths[index]){
                let offsetFromParentStart = 0;
                console.log('update Offsets conditional entered')
                for(let i = 0; i < anchorParent.childNodes.length; i++){
                    const currentNode = anchorParent.childNodes[i];
                    if(anchor.textContent === currentNode.textContent){
                        console.log('anchorOffset grown')
                        anchorOffset += offsetFromParentStart;
                    };
                    if(focus.textContent === currentNode.textContent){
                        focusOffset += offsetFromParentStart;
                    }
                    offsetFromParentStart += currentNode.textContent.length;
                }
            }
            
        }
        const forward = anchorOffset < focusOffset;
        if(!forward){
            [anchorOffset, focusOffset] = [focusOffset, anchorOffset];
        }
        return {
            anchorOffset,
            focusOffset
        }
    }

    selectionHandler(e){
        e.preventDefault()
        const select = window.getSelection(e)
        if(select.isCollapsed)
            return null;
        const index = select.anchorNode.parentElement.attributes[1].nodeValue //id of anchorNode
        const selectionOffsets = this.getOffsetsHandler(select, index);
        let anchorOffset = selectionOffsets.anchorOffset;
        let focusOffset = selectionOffsets.focusOffset;
        const offsets=[...this.state.offsets];
        const currentNodeOffsets = offsets[index] || [];
        if(currentNodeOffsets[0]){
            for(let i = 0; i < offsets[index].length; i++){
                let prevAnchor = currentNodeOffsets[i].anchorOffset;
                let prevFocus = currentNodeOffsets[i].focusOffset;
                // console.log('PREV ANCHOR', prevAnchor, 'PREV FOCUS', prevFocus, 'CURRENT ANCHOR', anchorOffset, 'CURRENT FOCUS', focusOffset);
                if(anchorOffset < prevAnchor && focusOffset > prevFocus){
                    currentNodeOffsets[i] = null;
                } else if(anchorOffset < prevAnchor && focusOffset > prevAnchor) {
                    focusOffset = prevFocus;
                    currentNodeOffsets[i] = null;
                } else if(focusOffset > prevFocus && anchorOffset < prevFocus){
                    anchorOffset = prevAnchor;
                    currentNodeOffsets[i] = null;
                }
            }
        }
        offsets[index] = currentNodeOffsets.filter(el => el);
        const i = offsets[index].findIndex(el => anchorOffset < el.anchorOffset);
        if(i !== -1){
            offsets[index].splice(i, 0, {anchorOffset, focusOffset});
        } else {
            offsets[index].push({anchorOffset, focusOffset});
        }
        console.log('OFFSETS', offsets)
        console.log('i', i)
        this.setState({offsets})
    }
    
    highlightRangeHandler(text, index){
        if(!this.state.offsets[index])
            return <p className={classes.bodyParagraph} key={`paragraph${index}`} id={index} children={text}/>
        let pBody = [];
        const splitText = this.state.text[index].split('');
        this.state.offsets[index].forEach((el, i, arr) => {
            const start = (arr[i-1] && arr[i-1].focusOffset) || 0;
            const highlightBegin = el.anchorOffset;
            const highlightEnd = el.focusOffset;
            const beginning = splitText.slice(start, highlightBegin).join('');
            const middle = splitText.slice(highlightBegin, highlightEnd).join('');
            pBody.push(beginning);
            pBody.push(<span className={classes.red} id={index} key={`span${i}intext${this.state.text[0][0]}`}>{middle}</span>);
            if(!arr[i+1]){
                const end = splitText.slice(highlightEnd).join('');
                pBody.push(end);
            }
        })
        
        return(
            <p className={classes.bodyParagraph} key={`paragraph${index}`} id={index}>
                {pBody}
            </p>
        )
    }

    render(){

        return(
            <div onMouseUp={(event) => this.selectionHandler(event)}>
                {this.state.text.map((el, i) => {
                    return this.highlightRangeHandler(el, i)
                })}
            </div>
        );
    }
}

export default selectionTest;