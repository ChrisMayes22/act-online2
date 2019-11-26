import React, { Component } from 'react';
import classes from './selectionTest.css';
import uniqid from 'uniqid';


class selectionTest extends Component {

    constructor(props){
        super(props)
        this.selectionHandler.bind(this);
    }

    state = {
        offsets: [],
        body: [<p className={classes.bodyParagraph} key={uniqid('key-')} id={uniqid('highlight-container-')}>
                    <span id={uniqid('span-')}>this is <em id={uniqid('em-')}>emphasized</em> text A</span>
                </p>,
                <p className={classes.bodyParagraph} key={uniqid('key-')} id={uniqid('highlight-container-')}>
                    <span id={uniqid('span-')}>this is <em id={uniqid('em-')}>emphasized</em> text B</span>
                </p>,
                <p className={classes.bodyParagraph} key={uniqid('key-')} id={uniqid('highlight-container-')}>
                    <span id={uniqid('span-')}>this is <em id={uniqid('em-')}>emphasized</em> text C</span>
                </p>,
                <p className={classes.bodyParagraph} key={uniqid('key-')} id={uniqid('highlight-container-')}>
                    <span id={uniqid('span-')}>this is <em id={uniqid('em-')}>emphasized</em> text D</span>
                </p>] 
                //text array will be received as props in real application
    }

    componentDidMount(){
        
        
        // TODO: Rebuild the highlight app using this framework.
        // this.expectedLengths = this.state.text.map(el => el[0].length);
    }

    componentDidUpdate(){
        window.getSelection().empty();
    }

    

    getJSXNodeFromIds(ids, container){
        if(container.props.id === ids[ids.length-1]){
            return container;
        }
        let currentNode = container;
        ids.forEach(el => {
            const ch = currentNode.props.children
            currentNode = Array.isArray(ch) ? ch.find(child => child.props && child.props.id === el) : ch
            console.log('CURRENT NODE', currentNode);
        })
        //TODO: Keep working on this fn
        console.log('CONTAINER PROPS', container.props);
    }

    selectionHandler(e){
        e.preventDefault()
        const select = window.getSelection(e)
        const anchorParentId = select.anchorNode.parentNode.attributes.id.nodeValue;
        const branchIds = this.getBranchIds(select.anchorNode, []);
        const container = {...this.state.body.find(el => el.props.id === branchIds[0])};
        this.getJSXNodeFromIds(branchIds, container);        
        // console.log(select);
        // if(!this.nullCasesHandler(select))
        //     return null;
        // const anchorParent = this.getParentBodyP(select.anchorNode);
        // const focusParent = this.getParentBodyP(select.focusNode);
        // const selectPkg = {
        //     anchor: select.anchorNode,
        //     anchorOffset: select.anchorOffset,
        //     anchorParent,
        //     anchorParentId: anchorParent.attributes.id.nodeValue, 
        //     focus: select.focusNode,
        //     focusOffset: select.focusOffset,
        //     focusParent,
        //     focusParentId: focusParent.attributes.id.nodeValue
        // }
        // if(selectPkg.anchorParentId === selectPkg.focusParentId){
        //     const checkedPkg = this.checkOffsetsHandler(selectPkg, true);
        //     this.singlePUpdateOffsetsHandler(checkedPkg);
        // } else {
        //     const checkedPkg = this.checkOffsetsHandler(selectPkg, false);
        //     this.multiPUpdateOffsetsHandler(checkedPkg);
        // }
    }

    getBranchIds(node, arr){
        if(!node){
            console.log('WARNING! no parent for targeted element found.')
            return null;
        }
        if(node.attributes && node.attributes.id && node.attributes.id.nodeValue.includes('highlight-container-')){
            arr.push(node.attributes.id.nodeValue)
            return arr.reverse();
        }
        if(node.attributes && node.attributes.id){
            arr.push(node.attributes.id.nodeValue);
        } else {
            console.log('WARNING: NODE WITH NO ID -- ', node)
        }
        return this.getBranchIds(node.parentNode, arr);
    }

    // addOffsetFromParentStart(child, parent, offset){
    //     let offsetFromParentStart = 0;
    //         parent.childNodes.forEach(c => {
    //             if(child.textContent === c.textContent)
    //                 offset += offsetFromParentStart;
    //             offsetFromParentStart += c.textContent.length;
    //         });
    //     return offset
    // }

    // checkOffsetsHandler(select, singleParent){
    //    select.anchorOffset = this.addOffsetFromParentStart(select.anchor, select.anchorParent, select.anchorOffset);
    //    select.focusOffset = this.addOffsetFromParentStart(select.focus, select.focusParent, select.focusOffset);
    //     if(singleParent){
    //         if(select.anchorOffset > select.focusOffset){
    //             [select.anchorOffset, select.focusOffset] = [select.focusOffset, select.anchorOffset];
    //         }
    //     } else {
    //         const focusIndex = select.focusParentId[select.focusParentId.length-1];
    //         const anchorIndex = select.anchorParentId[select.anchorParentId.length-1];
    //         if(focusIndex > anchorIndex){
    //             select = {
    //                 startParent: select.anchorParent,
    //                 endParent: select.focusParent,
    //                 start: { parentIndex: anchorIndex, offset: select.anchorOffset },
    //                 end: { parentIndex: focusIndex, offset: select.focusOffset }
    //             }
    //         } else {
    //             select = {
    //                 startParent: select.focusParent,
    //                 endParent: select.anchorParent,
    //                 start: { parentIndex: focusIndex, offset: select.focusOffset },
    //                 end: { parentIndex: anchorIndex, offset: select.anchorOffset }
    //             }
    //         }
    //     }
    //     return select;
    // }

    // nullCasesHandler(select){
    //     if(select.isCollapsed){
    //         console.log('select was collapsed');
    //         return null;
    //     }
    //     if(select.anchorNode.attributes && select.anchorNode.attributes.class.nodeValue.includes(classes.bodyParagraph)){
    //         console.log('anchorNode was bodyP')
    //         return null
    //     }
    //     if(select.focusNode.attributes && select.focusNode.attributes.class.nodeValue.includes(classes.bodyParagraph)){
    //         console.log('focusNode was bodyP')
    //         return null
    //     }
    //     const anchor = select.anchorNode;
    //     const focus = select.focusNode;
    //     let anchorParentP = this.getParentBodyP(anchor);
    //     const focusParentP = this.getParentBodyP(focus);
    //     if(!anchorParentP || !focusParentP){
    //         console.log('selection was not within bodyP')
    //         return null;
    //     }
    //     if(anchor.parentNode.attributes.id.nodeValue === focus.parentNode.attributes.id.nodeValue){
    //         if(anchor.parentNode.attributes.class.nodeValue.includes(classes.highlight)){
    //             console.log('selection was within existing highlight')
    //             return null;
    //         }
    //     }
    //     return true;
    // }

    // multiPUpdateOffsetsHandler(select){ 
    //     const offsets = [...this.state.offsets];
    //     const prevStart = offsets[select.start.parentIndex] || [];
    //     const prevEnd = offsets[select.end.parentIndex] || [];
    //     const startChildren = [...select.startParent.childNodes];
    //     const startParentLength = startChildren.reduce((sum, childNode) => {
    //         return sum + ((childNode.innerText && childNode.innerText.length) || childNode.length);
    //     }, 0);
    //     offsets[select.start.parentIndex] = 
    //         prevStart[0] ? 
    //         prevStart.map(el => {
    //             if(select.start.offset <= el.anchorOffset) { 
    //                 return null;
    //             } else if(select.start.offset <= el.focusOffset) {
    //                 select.start.offset = el.anchorOffset;
    //                 return null;
    //             } else { 
    //                 return el;
    //             }
    //         }).filter(el => el)
    //         .concat([{ anchorOffset: select.start.offset, focusOffset: startParentLength }])
    //         :
    //         [{ anchorOffset: select.start.offset, focusOffset: startParentLength }];

    //     offsets[select.end.parentIndex] = 
    //         prevEnd[0] ? 
    //         prevEnd.map(el => {
    //             if(select.end.offset >= el.focusOffset) { 
    //                 return null;
    //             } else if(select.end.offset <= el.focusOffset) {
    //                 select.end.offset = el.focusOffset;
    //                 return null;
    //             } else { 
    //                 return el;
    //             }
    //         }).filter(el => el)
    //         .concat([{ anchorOffset: 0, focusOffset: select.end.offset }])
    //         :
    //         [{ anchorOffset: 0, focusOffset: select.end.offset }];


    //     if(select.start.parentIndex - select.end.parentIndex !== 1){
    //         this.expectedLengths.forEach((el, i) => {
    //             if(i > select.start.parentIndex && i < select.end.parentIndex){
    //                 console.log('i', i)
    //                 el = [];
    //                 offsets[i] = el.concat([{ anchorOffset: 0, focusOffset: this.expectedLengths[i] }])
    //             }
    //         })
    //     }

    //     this.setState({ offsets })
    // }

    // singlePUpdateOffsetsHandler(select){
    //     const offsets=[...this.state.offsets];
    //     const index = select.focusParentId[select.focusParentId.length-1];
    //     const currentNodeOffsets = offsets[index] || [];
    //     if(currentNodeOffsets[0]){
    //         for(let i = 0; i < offsets[index].length; i++){
    //             let prevAnchor = currentNodeOffsets[i].anchorOffset;
    //             let prevFocus = currentNodeOffsets[i].focusOffset;
    //             if(select.anchorOffset < prevAnchor && select.focusOffset > prevFocus){
    //                 currentNodeOffsets[i] = null;
    //             } else if(select.anchorOffset < prevAnchor && select.focusOffset > prevAnchor) {
    //                 select.focusOffset = prevFocus;
    //                 currentNodeOffsets[i] = null;
    //             } else if(select.focusOffset > prevFocus && select.anchorOffset < prevFocus){
    //                 select.anchorOffset = prevAnchor;
    //                 currentNodeOffsets[i] = null;
    //             }
    //         }
    //     }
    //     offsets[index] = currentNodeOffsets.filter(el => el);
    //     const i = offsets[index].findIndex(el => select.anchorOffset < el.anchorOffset);
    //     if(i !== -1){
    //         offsets[index].splice(i, 0, {anchorOffset: select.anchorOffset, focusOffset: select.focusOffset});
    //     } else {
    //         offsets[index].push({anchorOffset: select.anchorOffset, focusOffset: select.focusOffset});
    //     }
    //     this.setState({offsets})
    // }
    
    // highlightRangeHandler(text, index){
    //     if(!this.state.offsets[index])
    //         return <p className={classes.bodyParagraph} key={uniqid('key-')} id={uniqid('highlight-container-')} children={text}/>
    //     let pBody = [];
    //     const splitText = this.state.text[index][0].split('');
    //     this.state.offsets[index].forEach((el, i, arr) => {
    //         const start = (arr[i-1] && arr[i-1].focusOffset) || 0;
    //         const highlightBegin = el.anchorOffset;
    //         const highlightEnd = el.focusOffset;
    //         const beginning = splitText.slice(start, highlightBegin).join('');
    //         const middle = splitText.slice(highlightBegin, highlightEnd).join('');
    //         pBody.push(beginning);
    //         pBody.push(<span 
    //                     className={classes.highlight} 
    //                     id={`p${index}highlightSpan${i}`} 
    //                     key={`p${index}highlightSpan${i}key`}
    //                     children={middle}
    //                     />)
    //         if(!arr[i+1]){
    //             const end = splitText.slice(highlightEnd).join('');
    //             pBody.push(end);
    //         }
    //     })
        
    //     return(
    //         <p id={uniqid('highlight-container-')} className={classes.bodyParagraph} key={uniqid('key-')} >
    //             {pBody}
    //         </p>
    //     )
    // }

    render(){

        return(
            <div onMouseUp={(event) => this.selectionHandler(event)}>
                {this.state.body}
            </div>
        );
    }
}

export default selectionTest;