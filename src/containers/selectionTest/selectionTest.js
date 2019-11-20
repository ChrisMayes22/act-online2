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
                //text array will be received as props in real application
    }

    componentDidMount(){
        this.expectedLengths = this.state.text.map(el => el.length);
    }

    componentDidUpdate(){
        window.getSelection().empty();
    }

    getParentBodyP(node){
        if(!node)
            return null;
        if(node.attributes && node.attributes.class.nodeValue.includes(classes.bodyParagraph))
            return node;
        if(node.parentNode.attributes.class.nodeValue.includes(classes.bodyParagraph))
            return node.parentNode;
        return this.getParentBodyP(node.parentNode);
    }

    getOffsetsHandler(select){
        let focusNode, anchorNode;
        ({ focusNode, anchorNode } = select);
        let anchorParentP = this.getParentBodyP(anchorNode);
        const focusParentP = this.getParentBodyP(focusNode);
        let anchorOffset = select.anchorOffset;
        let focusOffset = select.focusOffset;
        if(focusParentP.attributes.id.nodeValue === anchorParentP.attributes.id.nodeValue){
            if(anchorParentP.childNodes.length !== 1){
                let offsetFromParentStart = 0;
                for(let i = 0; i < anchorParentP.childNodes.length; i++){
                    const currentNode = anchorParentP.childNodes[i];
                    if(anchorNode.textContent === currentNode.textContent){
                        anchorOffset += offsetFromParentStart;
                    };
                    if(focusNode.textContent === currentNode.textContent){
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

    nullCasesHandler(select){
        if(select.isCollapsed){
            console.log('select was collapsed');
            return null;
        }
        if(select.anchorNode.attributes && select.anchorNode.attributes.class.nodeValue.includes(classes.bodyParagraph)){
            console.log('anchorNode was bodyP')
            return null
        }
        if(select.focusNode.attributes && select.focusNode.attributes.class.nodeValue.includes(classes.bodyParagraph)){
            console.log('focusNode was bodyP')
            return null
        }
        const anchor = select.anchorNode;
        const focus = select.focusNode;
        let anchorParentP = this.getParentBodyP(anchor);
        const focusParentP = this.getParentBodyP(focus);
        if(!anchorParentP || !focusParentP){
            console.log('selection was not within bodyP')
            return null;
        }
        if(anchor.parentNode.attributes.id.nodeValue === focus.parentNode.attributes.id.nodeValue){
            if(anchor.parentNode.attributes.class.nodeValue.includes(classes.highlight)){
                console.log('selection was within existing highlight')
                return null;
            }
        }

        return true;
    }

    selectionHandler(e){
        e.preventDefault()
        const select = window.getSelection(e)
        if(!this.nullCasesHandler(select)){
            console.log('null returned')
            return null;
        }
        this.updateOffsetsHandler(select);
        // console.log('INDEX', index);
        // let anchorOffset, focusOffset;
        // ({anchorOffset, focusOffset } = this.getOffsetsHandler(select, index) || {anchorOffset: null, focusOffset: null});
        // if(!anchorOffset && !focusOffset)
        //     return null;
        // const offsets=[...this.state.offsets];
        // const currentNodeOffsets = offsets[index] || [];
        // if(currentNodeOffsets[0]){
        //     for(let i = 0; i < offsets[index].length; i++){
        //         let prevAnchor = currentNodeOffsets[i].anchorOffset;
        //         let prevFocus = currentNodeOffsets[i].focusOffset;
        //         if(anchorOffset < prevAnchor && focusOffset > prevFocus){
        //             currentNodeOffsets[i] = null;
        //         } else if(anchorOffset < prevAnchor && focusOffset > prevAnchor) {
        //             focusOffset = prevFocus;
        //             currentNodeOffsets[i] = null;
        //         } else if(focusOffset > prevFocus && anchorOffset < prevFocus){
        //             anchorOffset = prevAnchor;
        //             currentNodeOffsets[i] = null;
        //         }
        //     }
        // }
        // offsets[index] = currentNodeOffsets.filter(el => el);
        // const i = offsets[index].findIndex(el => anchorOffset < el.anchorOffset);
        // if(i !== -1){
        //     offsets[index].splice(i, 0, {anchorOffset, focusOffset});
        // } else {
        //     offsets[index].push({anchorOffset, focusOffset});
        // }
        // this.setState({offsets})
    }

    updateOffsetsHandler(select){
        console.log(select);
        const anchorParentP = this.getParentBodyP(select.anchorNode);
        const focusParentP = this.getParentBodyP(select.focusNode);
        if(focusParentP.attributes.id.nodeValue === anchorParentP.attributes.id.nodeValue){
            let anchorOffset, focusOffset;
            ({ anchorOffset, focusOffset } = this.getOffsetsHandler(select) || {anchorOffset: null, focusOffset: null});
            if(!anchorOffset && !focusOffset)
                return null;
            const offsets=[...this.state.offsets];
            const focusParentPId = focusParentP.attributes.id.nodeValue;
            const index = focusParentPId[focusParentPId-1]
            const currentNodeOffsets = offsets[index] || [];
            if(currentNodeOffsets[0]){
                for(let i = 0; i < offsets[index].length; i++){
                    let prevAnchor = currentNodeOffsets[i].anchorOffset;
                    let prevFocus = currentNodeOffsets[i].focusOffset;
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
            this.setState({offsets})
        }
    }
    
    highlightRangeHandler(text, index){
        if(!this.state.offsets[index])
            return <p className={classes.bodyParagraph} key={`bodyP${index}key`} id={`bodyP${index}`} children={text}/>
        let pBody = [];
        const splitText = this.state.text[index].split('');
        this.state.offsets[index].forEach((el, i, arr) => {
            const start = (arr[i-1] && arr[i-1].focusOffset) || 0;
            const highlightBegin = el.anchorOffset;
            const highlightEnd = el.focusOffset;
            const beginning = splitText.slice(start, highlightBegin).join('');
            const middle = splitText.slice(highlightBegin, highlightEnd).join('');
            pBody.push(beginning);
            pBody.push(<span 
                        className={classes.highlight} 
                        id={`p${index}highlightSpan${i}`} 
                        key={`p${index}highlightSpan${i}key`}
                        children={middle}
                        />)
            if(!arr[i+1]){
                const end = splitText.slice(highlightEnd).join('');
                pBody.push(end);
            }
        })
        
        return(
            <p className={classes.bodyParagraph} key={`paragraph${index}`} id={`bodyP${index}`}>
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