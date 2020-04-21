import React, { Component } from 'react';
import classes from './selectionTest.css';
import uniqid from 'uniqid';


class selectionTest extends Component {

    constructor(props){
        super(props)
        this.selectionHandler.bind(this);
    }

    state = {
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

    selectionHandler(e){
        /* Handles data recieved from upClick even using window.getSelection*/
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
                const targetNodeData = {
                    JSX: this.getJSXFromIds(anchorBranchIds, container),
                    start: select.anchorOffset,
                    end: select.focusOffset
                }
                const anchorJSX = this.getJSXFromIds(anchorBranchIds, container);
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
                        const anchorChildrenCopy = [...anchorChildren]
                        for (let i = start+1; i < end; i++){
                            if(!anchorChildrenCopy[i].props || (anchorChildrenCopy[i].props && !anchorChildrenCopy[i].props.id.includes('highlight-span'))){
                                anchorChildrenCopy[i] = <span className={classes.highlight} id={uniqid('highlight-span-')} key={uniqid('key-')}>
                                                        {anchorChildrenCopy[i]}
                                                    </span>
                            }
                        }
                        const anchorArr = anchorIndex < focusIndex  ? this.getUpdatedNode(newAnchor, select.anchorOffset).filter(el => el !== "") 
                                                                    : this.getUpdatedNode(newAnchor, 0, select.anchorOffset).filter(el => el !== "");
                        const focusArr = anchorIndex < focusIndex   ? this.getUpdatedNode(newFocus, 0, select.focusOffset).filter(el => el !== "")
                                                                    : this.getUpdatedNode(newFocus, select.focusOffset).filter(el => el !== "");
                        const left = anchorChildrenCopy.slice(0, start);
                        const firstInsert = anchorIndex < focusIndex ? anchorArr : focusArr;
                        const middle = anchorChildrenCopy.slice(start+1, end);
                        const secondInsert = anchorIndex < focusIndex ? focusArr : anchorArr;
                        const right = anchorChildrenCopy.slice(end+1);
                        const newChildren = left.concat(firstInsert, middle, secondInsert, right);
                        const newJSX = {...anchorJSX};
                        const containerReplacement = this.insertNewJSX(newJSX, newChildren, container, anchorBranchIds);
                        this.updateHighlights(containerReplacement);

                    }
                }
            } else {
                const anchorJSX = this.getJSXFromIds(anchorBranchIds, container);
                const focusJSX = this.getJSXFromIds(focusBranchIds, container);
                const parent = this.getLowestCommonParentJSX(anchorBranchIds, focusBranchIds, container);
                const parentText = this.getTextFromJSX(parent);
                const anchorIndex = parentText.indexOf(select.anchorNode.textContent);
                const focusIndex = parentText.indexOf(select.focusNode.textContent);
                const startObject = {
                    JSX: anchorIndex < focusIndex ? anchorJSX : focusJSX,
                    node: anchorIndex < focusIndex ? select.anchorNode : select.focusNode,
                    offset: anchorIndex < focusIndex ? select.anchorOffset : select.focusOffset
                };
                const endObject = {
                    JSX: anchorIndex < focusIndex ? focusJSX : anchorJSX,
                    node: anchorIndex < focusIndex ? select.focusNode : select.anchorNode,
                    offset: anchorIndex < focusIndex ? select.focusOffset : select.anchorOffset
                };
                const ids = {
                    startIds: anchorIndex < focusIndex ? anchorBranchIds : focusBranchIds,
                    endIds: anchorIndex < focusIndex ? focusBranchIds : anchorBranchIds
                }

                const newParent = this.highlightBetweenNodes(startObject, endObject, parent, ids);
                const newContainer = this.insertNewJSX({
                    ...parent}, 
                    newParent.props.children, 
                    container, 
                    anchorIndex < focusIndex ? focusBranchIds : anchorBranchIds); // Probably want to refactor to differentiate between Ids. Diagram this out.
                this.updateHighlights(newContainer);

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


    getJSXFromIds(ids, container){ 
        /* Takes an array of ids and a container. 
        Returns JSX object associated with the LAST id in ids. */
        if(container.props.id === ids[ids.length-1]){ 
            return container;
        }
        let currentNode = container;
        for(let i = 1; i < ids.length; i++){
            const children = currentNode.props.children
            if(Array.isArray(children)){
                currentNode = children.find(child => { return child.props && child.props.id === ids[i] }) 
            } else {
                currentNode = children;
            }
        }
        return currentNode;
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
                    console.log('IDS', ids);
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

    

    highlightBetweenNodes(start, end, parent, ids){
        const updatedStart = this.getUpdatedNode(start.node.textContent, start.offset).filter(el => el !== "");
        const updatedEnd = this.getUpdatedNode(end.node.textContent, 0, end.offset).filter(el => el !== "");
        const startCopy = {...start.JSX};
        const endCopy = {...end.JSX};
        if(Array.isArray(start.JSX.props.children)){
            const targetIndex = start.JSX.props.children.findIndex(el => el === start.node.textContent);
            startCopy.props = {...startCopy.props};
            startCopy.props.children = [...startCopy.props.children];
            startCopy.props.children[targetIndex] = updatedStart;
        }  else {
            startCopy.props = {
                ...startCopy.props,
                children: updatedStart
            }
        }
        if(Array.isArray(end.JSX.props.children)){
            const targetIndex = end.JSX.props.children.findIndex(el => el === end.node.textContent);
            endCopy.props = {...endCopy.props};
            endCopy.props.children = [...endCopy.props.children];
            endCopy.props.children[targetIndex] = updatedEnd;
        } else {
            endCopy.props = {
                ...endCopy.props,
                children: updatedEnd
            }
        }
        if(parent.props.id === startCopy.props.id){
            const targetIndex = startCopy.props.children.findIndex(el => el.props && el.props.id === endCopy.props.id);
            const newChildren = [...startCopy.props.children];
            newChildren[targetIndex] = endCopy;
            startCopy.props = {
                ...startCopy.props,
                children: newChildren
            }
            parent = startCopy;
        } else if(parent.props.id === endCopy.props.id){
            const targetIndex = endCopy.props.children.findIndex(el => el.props && el.props.id === startCopy.props.id);
            const newChildren = [...endCopy.props.children];
            newChildren[targetIndex] = startCopy;
            endCopy.props = {
                ...endCopy.props,
                children: newChildren
            }
            parent = endCopy;
        } else {
            const startIndex = parent.props.children.findIndex(el => el.props && ids.startIds.includes(el.props.id));
            const endIndex = parent.props.children.findIndex(el => el.props && ids.endIds.includes(el.props.id));
            console.log('START', startIndex, 'END', endIndex);
            // TODO: Use ids list to finds all the nodes between start/end, then nest them in highlights.
            const newChildren = [parent.props.children[startIndex]];
            for(let i = startIndex + 1; i < endIndex; i++){
                const newChild = <span className={classes.highlight} id={uniqid('highlight-span-')} key={uniqid('key-')}>
                                    {parent.props.children[i]}
                                </span>;
                newChildren.push(newChild);
            }
            newChildren.push(parent.props.children[endIndex]);

            const left = parent.props.children.slice(0, startIndex);
            const right = parent.props.children.slice(endIndex + 1);
            const replacementChildren = left.concat(newChildren).concat(right);
            console.log('LEFT', left);
            console.log('NEW CHILDREN', newChildren);
            console.log('RIGHT', right);
            const parentCopy = {...parent};
            parentCopy.props = {
                ...parentCopy.props,
                children: replacementChildren
            };
            parent = parentCopy;
        }
        return parent;
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
        return outputArr.join(' ');
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