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

    getUpdatedNode(node, start=0, end=node.length){
        //accepts string (add err checking later)
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

    insertNewJSX(newJSX, newChildren, container, ids){
        newJSX.props = {
            ...newJSX.props,
            children: newChildren
        }
        const branchCopy = this.getJSXLayers(container, ids);
        branchCopy[branchCopy.length-1] = newJSX;
        const newBranch = this.getJSXFromBranchArray(branchCopy);
        const newBody = [...this.state.body];
        const replacedIndex = this.state.body.findIndex(el => el.props.id === ids[0]);
        newBody[replacedIndex] = newBranch;
        this.setState({ body: newBody });
    }

    selectionHandler(e){
        e.preventDefault()
        const select = window.getSelection(e)
        const anchorBranchIds = this.getBranchIds(select.anchorNode, []);
        const focusBranchIds = this.getBranchIds(select.focusNode, []);
        const anchorContainerId = anchorBranchIds[0];
        const focusContainerId = focusBranchIds[0];
        const anchorNodeId = anchorBranchIds[anchorBranchIds.length-1];
        const focusNodeId = focusBranchIds[focusBranchIds.length-1];
        if(anchorContainerId === focusContainerId){
            const container = {...this.state.body.find(el => el.props.id === anchorBranchIds[0])};
            if(anchorNodeId === focusNodeId){
                const anchorJSX = this.getJSXNodeFromIds(anchorBranchIds, container);
                const anchorChildren = anchorJSX.props.children;
                let start = select.anchorOffset;
                let end = select.focusOffset;
                if(typeof(anchorChildren) === 'string'){
                    if(end < start) 
                        [start, end] = [end, start];
                    const newChildren = this.getUpdatedNode(anchorChildren, start, end)
                    const newJSX = {...anchorJSX};
                    this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                } else if (Array.isArray(anchorChildren)){
                    if(end < start) 
                        [start, end] = [end, start];
                    if(select.focusNode === select.anchorNode){
                        const targetNode = select.anchorNode;
                        const targetIndex = anchorChildren.findIndex(el => el === targetNode.textContent);
                        const left = anchorChildren.slice(0, targetIndex);
                        const middle = this.getUpdatedNode(anchorChildren[targetIndex], start, end);
                        const right = anchorChildren.slice(targetIndex+1)
                        const newChildren = left.concat(middle, right);
                        const newJSX = {...anchorJSX};
                        this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                    } else {
                        console.log('Focus is not Anchor');
                        const anchorIndex = anchorChildren.findIndex(el => select.anchorNode.textContent === el);
                        const focusIndex = anchorChildren.findIndex(el => select.focusNode.textContent === el);
                        const newAnchor = anchorChildren[anchorIndex];
                        const newFocus = anchorChildren[focusIndex];
                        const start = anchorIndex > focusIndex ? focusIndex : anchorIndex;
                        const end = anchorIndex > focusIndex ? anchorIndex : focusIndex;
                        for (let i = start+1; i < end; i++){
                            if(!anchorChildren[i].props || (anchorChildren[i].props && !anchorChildren[i].props.id.includes('highlight-span'))){
                                anchorChildren[i] = <span className={classes.highlight} id={uniqid('highlight-span-')} key={uniqid('key-')}>
                                                        {anchorChildren[i]}
                                                    </span>
                            }
                        }
                        const anchorArr = anchorIndex < focusIndex  ? this.getUpdatedNode(newAnchor, select.anchorOffset).filter(el => el !== "") 
                                                                    : this.getUpdatedNode(newAnchor, 0, select.anchorOffset).filter(el => el !== "");
                        const focusArr = anchorIndex < focusIndex   ? this.getUpdatedNode(newFocus, 0, select.focusOffset).filter(el => el !== "")
                                                                    : this.getUpdatedNode(newFocus, select.focusOffset).filter(el => el !== "");
                        const left = anchorChildren.slice(0, start);
                        const firstInsert = anchorIndex < focusIndex ? anchorArr : focusArr;
                        const middle = anchorChildren.slice(start+1, end);
                        const secondInsert = anchorIndex < focusIndex ? focusArr : anchorArr;
                        const right = anchorChildren.slice(end+1);
                        const newChildren = left.concat(firstInsert, middle, secondInsert, right);
                        const newJSX = {...anchorJSX};
                        this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                    }
                }
            }
        }
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