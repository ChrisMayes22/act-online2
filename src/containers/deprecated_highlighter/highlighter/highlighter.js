import React, { Component } from 'react';
import classes from './highlighter.css';
import MainHeader from '../../../components/mainHeader/mainHeader';


class Highlighter extends Component {

    constructor(props){
        super(props)
        this.selectionHandler.bind(this);
    }

    state = {
        offsets: [],
        text: [['This is an example paragraph (PARAGRAPH A)'],
        ['This is an example paragraph (PARAGRAPH B)'],
        ['This is an example paragraph (PARAGRAPH C)'],
        ['This is an example paragraph (PARAGRAPH D)']] 
                //text array will be received as props in real application
    }

    componentDidMount(){
            this.expectedLengths = this.state.text.map(el => el[0].length);
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

    addOffsetFromParentStart(child, parent, offset){
        let offsetFromParentStart = 0;
            parent.childNodes.forEach(c => {
                if(child.textContent === c.textContent)
                    offset += offsetFromParentStart;
                offsetFromParentStart += c.textContent.length;
            });
        return offset
    }

    checkOffsetsHandler(select, singleParent){
       select.anchorOffset = this.addOffsetFromParentStart(select.anchor, select.anchorParent, select.anchorOffset);
       select.focusOffset = this.addOffsetFromParentStart(select.focus, select.focusParent, select.focusOffset);
        if(singleParent){
            if(select.anchorOffset > select.focusOffset){
                [select.anchorOffset, select.focusOffset] = [select.focusOffset, select.anchorOffset];
            }
        } else {
            const focusIndex = select.focusParentId[select.focusParentId.length-1];
            const anchorIndex = select.anchorParentId[select.anchorParentId.length-1];
            if(focusIndex > anchorIndex){
                select = {
                    startParent: select.anchorParent,
                    endParent: select.focusParent,
                    start: { parentIndex: anchorIndex, offset: select.anchorOffset },
                    end: { parentIndex: focusIndex, offset: select.focusOffset }
                }
            } else {
                select = {
                    startParent: select.focusParent,
                    endParent: select.anchorParent,
                    start: { parentIndex: focusIndex, offset: select.focusOffset },
                    end: { parentIndex: anchorIndex, offset: select.anchorOffset }
                }
            }
        }
        return select;
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
        console.log(select);
        if(!this.nullCasesHandler(select))
            return null;
        const anchorParent = this.getParentBodyP(select.anchorNode);
        const focusParent = this.getParentBodyP(select.focusNode);
        const selectPkg = {
            anchor: select.anchorNode,
            anchorOffset: select.anchorOffset,
            anchorParent,
            anchorParentId: anchorParent.attributes.id.nodeValue, 
            focus: select.focusNode,
            focusOffset: select.focusOffset,
            focusParent,
            focusParentId: focusParent.attributes.id.nodeValue
        }
        if(selectPkg.anchorParentId === selectPkg.focusParentId){
            const checkedPkg = this.checkOffsetsHandler(selectPkg, true);
            this.singlePUpdateOffsetsHandler(checkedPkg);
        } else {
            const checkedPkg = this.checkOffsetsHandler(selectPkg, false);
            this.multiPUpdateOffsetsHandler(checkedPkg);
        }
    }

    multiPUpdateOffsetsHandler(select){ 
        const offsets = [...this.state.offsets];
        const prevStart = offsets[select.start.parentIndex] || [];
        const prevEnd = offsets[select.end.parentIndex] || [];
        const startChildren = [...select.startParent.childNodes];
        const startParentLength = startChildren.reduce((sum, childNode) => {
            return sum + ((childNode.innerText && childNode.innerText.length) || childNode.length);
        }, 0);
        offsets[select.start.parentIndex] = 
            prevStart[0] ? 
            prevStart.map(el => {
                if(select.start.offset <= el.anchorOffset) { 
                    return null;
                } else if(select.start.offset <= el.focusOffset) {
                    select.start.offset = el.anchorOffset;
                    return null;
                } else { 
                    return el;
                }
            }).filter(el => el)
            .concat([{ anchorOffset: select.start.offset, focusOffset: startParentLength }])
            :
            [{ anchorOffset: select.start.offset, focusOffset: startParentLength }];

        offsets[select.end.parentIndex] = 
            prevEnd[0] ? 
            prevEnd.map(el => {
                if(select.end.offset >= el.focusOffset) { 
                    return null;
                } else if(select.end.offset <= el.focusOffset) {
                    select.end.offset = el.focusOffset;
                    return null;
                } else { 
                    return el;
                }
            }).filter(el => el)
            .concat([{ anchorOffset: 0, focusOffset: select.end.offset }])
            :
            [{ anchorOffset: 0, focusOffset: select.end.offset }];


        if(select.start.parentIndex - select.end.parentIndex !== 1){
            this.expectedLengths.forEach((el, i) => {
                if(i > select.start.parentIndex && i < select.end.parentIndex){
                    console.log('i', i)
                    el = [];
                    offsets[i] = el.concat([{ anchorOffset: 0, focusOffset: this.expectedLengths[i] }])
                }
            })
        }

        this.setState({ offsets })
    }

    singlePUpdateOffsetsHandler(select){
        const offsets=[...this.state.offsets];
        const index = select.focusParentId[select.focusParentId.length-1];
        const currentNodeOffsets = offsets[index] || [];
        if(currentNodeOffsets[0]){
            for(let i = 0; i < offsets[index].length; i++){
                let prevAnchor = currentNodeOffsets[i].anchorOffset;
                let prevFocus = currentNodeOffsets[i].focusOffset;
                if(select.anchorOffset < prevAnchor && select.focusOffset > prevFocus){
                    currentNodeOffsets[i] = null;
                } else if(select.anchorOffset < prevAnchor && select.focusOffset > prevAnchor) {
                    select.focusOffset = prevFocus;
                    currentNodeOffsets[i] = null;
                } else if(select.focusOffset > prevFocus && select.anchorOffset < prevFocus){
                    select.anchorOffset = prevAnchor;
                    currentNodeOffsets[i] = null;
                }
            }
        }
        offsets[index] = currentNodeOffsets.filter(el => el);
        const i = offsets[index].findIndex(el => select.anchorOffset < el.anchorOffset);
        if(i !== -1){
            offsets[index].splice(i, 0, {anchorOffset: select.anchorOffset, focusOffset: select.focusOffset});
        } else {
            offsets[index].push({anchorOffset: select.anchorOffset, focusOffset: select.focusOffset});
        }
        this.setState({offsets})
    }
    
    highlightRangeHandler(text, index){
        if(!this.state.offsets[index])
            return <p className={classes.bodyParagraph} key={`bodyP${index}key`} id={`bodyP${index}`} children={text}/>
        let pBody = [];
        const splitText = this.state.text[index][0].split('');
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

    clearOffsetsHandler(){
        const offsets = [];
        this.setState({ offsets });
    }

    render(){

        return(
            <React.Fragment>
                <MainHeader
                    testActive = {true} prevDisabled={true} nextDisabled={true} clearHighlight = {() => this.clearOffsetsHandler()}/>
                <div onMouseUp={(event) => this.selectionHandler(event)}>
                    {this.state.text.map((el, i) => {
                        return this.highlightRangeHandler(el, i)
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default Highlighter;