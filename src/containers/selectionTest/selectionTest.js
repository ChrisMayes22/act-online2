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
    }


    componentDidUpdate(){
        window.getSelection().empty();
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
        const branchArr = [];
        let searching = true;
        let currentNode = container;
        while(searching){
            if(currentNode.props){
                if(currentNode.props.id === newJSX.props.id){
                    branchArr.push(newJSX);
                    searching = false;
                } else if(Array.isArray(currentNode.props.children)) {
                    branchArr.push(currentNode);
                    const targetIndex = currentNode.props.children.findIndex(el => el.props && ids.includes(el.props.id));
                    currentNode = currentNode.props.children[targetIndex];
                } else {
                    branchArr.push(currentNode);
                    currentNode = currentNode.props.children;
                }
            } else {
                console.log('ERR: Current node does not have props.')
                searching = false;
            }
        }
        function buildChildrenRecursively(branchArr, ids){
            if(branchArr.length === 1){
                return branchArr[0]
            }
            const parent = {...branchArr[branchArr.length-2]};
            const child = {...branchArr[branchArr.length-1]};
            if(parent.props){
                if(Array.isArray(parent.props.children)){
                    const targetIndex = parent.props.children.findIndex(el => el.props && ids.includes(el.props.id));
                    parent.props= {
                        ...parent.props,
                        children: [...parent.props.children]
                    }
                    parent.props.children[targetIndex] = child;
                } else {
                    parent.props = {
                        ...parent.props,
                        children: child
                    }
                }
            } else {
                return null;
            }
            branchArr[branchArr.length-2] = parent;
            branchArr.pop();
            return buildChildrenRecursively(branchArr, ids);
        }
        return buildChildrenRecursively(branchArr, ids);
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
                    const containerReplacement = this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                    this.updateHighlights(containerReplacement);
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
                        const containerReplacement = this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                        this.updateHighlights(containerReplacement);
                    } else {
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
                        const containerReplacement = this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                        this.updateHighlights(containerReplacement);
                    }
                }
            } else {
                const anchorJSX = this.getJSXNodeFromIds(anchorBranchIds, container);
                const focusJSX = this.getJSXNodeFromIds(focusBranchIds, container);
                const focusId = focusJSX.props.id;
                const anchorId = anchorJSX.props.id;
                const parent = this.getLowestCommonParentJSX(anchorBranchIds, focusBranchIds, container);
                const parentText = this.getTextFromJSX(parent);
                const anchorText = this.getTextFromJSX(anchorJSX);
                const focusText = this.getTextFromJSX(focusJSX);
                console.log('PARENT TEXT', parentText);
                console.log('ANCHOR TEXT', select.anchorNode.textContent);
                console.log('FOCUS TEXT', select.focusNode.textContent);
                // if(parent.props.id === focusId || parent.props.id === anchorId){
                //     const child = parent.props.id === focusId ? anchorJSX : focusJSX;
                //     const childText = this.getTextFromJSX(child);
                //     const childIndex = parentText.indexOf(childText);
                //     const anchorIndex = parentText.indexOf(select.anchorNode.textContent);
                //     const focusIndex = parentText.indexOf(select.focusNode.textContent);
                //     console.log('PARENT TEXT', parentText);
                //     console.log('CHILD TEXT', childText);
                //     console.log('CHILD INDEX', childIndex);
                //     console.log('ANCHOR INDEX', anchorIndex);
                //     console.log('FOCUS INDEX', focusIndex);
                //     if(typeof(child.props.children) === 'string'){
                //         console.log('CHILD IS STRING');
                //         console.log('SELECT.ANCHOR', select.anchorNode);
                //         console.log('SELECT.FOCUS', select.focusNode);
                //         console.log('CHILD', child);
                //         console.log('PARENT', parent);
                //     }
                // }
                // console.log(focusId, 'FOCUS ID')
                // console.log(anchorId, 'ANCHOR ID')
                // console.log('ANCHOR IDS', anchorBranchIds);
                // console.log('FOCUS IDS', focusBranchIds);
                // console.log('PARENT', parent);
                // console.log('CONTAINER', container)
            }
        } else {
            console.log('Anchor and Focus do not share parent');
        }
    }

    getTextFromJSX(JSX){
        const outputArr = [];
        if(JSX.props){
            if(Array.isArray(JSX.props.children)){
                JSX.props.children.forEach(el => {
                    if(typeof(el) === 'string'){
                        outputArr.push(el);
                    } else {
                        console.log('Recursion called in getTextFromJSX');
                        const child = this.getTextFromJSX(el);
                        outputArr.push(child);
                    }
                })
            } else if (!(typeof(JSX.props.children) === 'string')) {
                console.log('Recursion called in getTextFromJSX');
                const child = this.getTextFromJSX(JSX.props.children);
                outputArr.push(child);
            } else {
                outputArr.push(JSX.props.children);
            }
        } else if(typeof(JSX) === 'string') {
            outputArr.push(JSX);
        }
        const output = outputArr.join(' ');
        return output;
    }


    getLowestCommonParentJSX(idsOne, idsTwo, container){
        const parentId = idsOne.map((el, i) => {
            if(!(idsTwo.includes(el))){
                return idsOne[i-1]
            } else {
                return null
            }
        }).filter(el => el);
        if(!parentId[0]){
            parentId[0] = idsTwo.map((el, i) => {
                if(!(idsOne.includes(el))){
                    return idsTwo[i-1]
                } else {
                    return null;
                }
            }).filter(el => el)[0];
        }
        let nestedLayers = idsOne.findIndex(el => el === parentId[0]);
        let currentNode = container;
        while(nestedLayers > 0){
            if(currentNode.props && currentNode.props.children){
                if(Array.isArray(currentNode.props.children)){
                    const nextNode = currentNode.props.children.find(el => el.props && idsOne.includes(el.props.id));
                    if(nextNode === -1){
                        console.log('ERR: ARRAY NODE DOES NOT INCLUDE TARGET CHILD NODE');
                        return null;
                    }
                    currentNode = nextNode;
                    nestedLayers--
                } else if(!(typeof(currentNode.props.children) === 'string')){
                    currentNode = currentNode.props.children;
                    nestedLayers--;
                } else {
                    console.log('ERR: ELEMENT IS A STRING');
                    console.log('CURRENT NODE', currentNode);
                    break;
                }
            } else {
                console.log('ERR: ELEMENT DOES NOT HAVE CHILDREN');
            }
        }

        return currentNode;
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

    updateHighlights(newContainer){
        const newBody = [...this.state.body];
        const targetIndex = newBody.findIndex(el => el.props.id === newContainer.props.id);
        newBody[targetIndex] = newContainer;
        this.setState({ body: newBody })
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