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
                    <span id={uniqid('span-')}>this is not emphasized text A</span>
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
        
        // this.expectedLengths = this.state.text.map(el => el[0].length);
    }

    componentDidUpdate(){
        window.getSelection().empty();
    }

    getJSXLayers(parent, ids){
        const layersArr = [{...parent}];
        let currentNode = layersArr[0];
        for(let i = 0; i < ids.length; i++){
            if(currentNode.props){
                const nextNode = currentNode.props.children;
                if(Array.isArray(nextNode)){
                    if(i === ids.length-1){
                        layersArr.push([...nextNode]);
                        break;
                    }
                    const nextIndex = nextNode.findIndex(el => el.props && el.props.id === ids[i+1]);
                    if(!(nextIndex+1)){
                        return null;
                    }
                    layersArr.push([...nextNode]);
                    currentNode = nextNode[nextIndex];
                } else if (!(typeof(nextNode) === 'string')){
                    layersArr.push({...nextNode});
                    currentNode = nextNode;
                } else {
                    layersArr.push(nextNode);
                }
            }
        }
        return layersArr;
    }

    getUpdatedNode(node, start, end){
        //accepts string (add err checking later)
        console.log('NODE', node)
        const left = node.slice(0, start);
        const middle = node.slice(start, end);
        const right = node.slice(end);
        const arr = [
            left, 
            <span className={classes.highlight} id={uniqid('highlight-span-')} key={uniqid('key-')}>
                {middle}
            </span>,
            right];
        return arr;
    }

    selectionHandler(e){
        e.preventDefault()
        const select = window.getSelection(e)
        const anchorBranchIds = this.getBranchIds(select.anchorNode, []);
        const focusBranchIds = this.getBranchIds(select.focusNode, []);
        if(focusBranchIds[focusBranchIds.length-1] === anchorBranchIds[anchorBranchIds.length-1]){
            const container = {...this.state.body.find(el => el.props.id === anchorBranchIds[0])};
            const anchorJSX = this.getJSXNodeFromIds(anchorBranchIds, container);
            const anchorChildren = anchorJSX.props.children;
            let start = select.anchorOffset;
            let end = select.focusOffset;
            if(end < start) 
                [start, end] = [end, start];
            if(typeof(anchorChildren) === 'string'){
                const arr = this.getUpdatedNode(anchorChildren, start, end)
                const newJSX = {...anchorJSX};
                newJSX.props = {
                    ...anchorJSX.props,
                    children: arr
                }
                const branchCopy = this.getJSXLayers(container, anchorBranchIds);
                branchCopy[branchCopy.length-1] = newJSX;
                const newBranch = this.getJSXFromBranchArray(branchCopy);
                const newBody = [...this.state.body];
                const replacedIndex = this.state.body.findIndex(el => el.props.id === anchorBranchIds[0]);
                newBody[replacedIndex] = newBranch;
                this.setState({ body: newBody });
            } else if (Array.isArray(anchorChildren)){
                if(select.focusNode === select.anchorNode){
                    const targetNode = select.anchorNode;
                    const targetIndex = anchorChildren.findIndex(el => el === targetNode.textContent);
                    const left = anchorChildren.slice(0, targetIndex);
                    const middle = this.getUpdatedNode(anchorChildren[targetIndex], start, end);
                    const right = anchorChildren.slice(targetIndex+1)
                    const newChildren = left.concat(middle, right);
                    const newJSX = {...anchorJSX};
                    newJSX.props = {
                        ...anchorJSX.props,
                        children: newChildren
                    }
                    const branchCopy = this.getJSXLayers(container, anchorBranchIds);
                    branchCopy[branchCopy.length-1] = newJSX;
                    const newBranch = this.getJSXFromBranchArray(branchCopy);
                    const newBody = [...this.state.body];
                    const replacedIndex = this.state.body.findIndex(el => el.props.id === anchorBranchIds[0]);
                    newBody[replacedIndex] = newBranch;
                    this.setState({ body: newBody });
                }
            }
        }
        const anchorContainer = {...this.state.body.find(el => el.props.id === anchorBranchIds[0])};
        const focusContainer = {...this.state.body.find(el => el.props.id === focusBranchIds[0])};
        const anchorJSX = this.getJSXNodeFromIds(anchorBranchIds, anchorContainer);
        const focusJSX = this.getJSXNodeFromIds(focusBranchIds, focusContainer);
    }

    getJSXFromBranchArray(branchArr){
        for(let i = branchArr.length-1; i > 0; i--){
            if(Array.isArray(branchArr[i-1])){
                const targetIndex = branchArr[i-1].findIndex(el => el.props && el.props.id === branchArr[i].props.id);
                if(!(targetIndex + 1)){
                    console.log('ERR: ID from array not found in subsequent element');
                    return null;
                }
                branchArr[i-1][targetIndex] = branchArr[i];
            } else { 
                branchArr[i-1] = {
                    ...branchArr[i-1],
                    props: {
                        ...branchArr[i-1].props,
                        children: branchArr[i]
                    }
                }
            }
        }
        return branchArr[0];
    }

    getJSXNodeFromIds(ids, container){
        if(container.props.id === ids[ids.length-1]){
            return container;
        }
        let currentNode = container;
        ids.forEach((el, i) => {
            if(!i)
                return;
            const ch = currentNode.props.children
            currentNode = Array.isArray(ch) ? ch.find(child => { 
                return child.props && child.props.id === el }) : ch
        })
        return currentNode;
    }

    getBranchIds(node, arr){
        if(!node){
            console.log('WARNING! no parent for targeted element found.')
            return null;
        }
        if(node.attributes && node.attributes.id && node.attributes.id.nodeValue.includes('highlight-container')){
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

    

    getOffsetInParent(child, parent, offset){
        let offsetFromParentStart = 0;
            parent.childNodes.forEach(c => {
                if(child.textContent === c.textContent)
                    offset += offsetFromParentStart;
                offsetFromParentStart += c.textContent.length;
            });
        return offset
    }


    render(){

        return(
            <div onMouseUp={(event) => this.selectionHandler(event)}>
                {this.state.body}
            </div>
        );
    }
}

export default selectionTest;