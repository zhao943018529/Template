import React from 'react';
import Portal from '../../controls/Portal'


const placeHolder ="select a value";

export default class Select extends React.Component{

    constructor(props){
        super(props);
        this.state={
            IsExpanded:false,
        };
        this.selectOption=this._selectOption.bind(this);
        this.toggleExpanded =this._toggleExpanded.bind(this);
        this.getContainer =this._getContainer.bind(this);
    }

    createPlaceholder(){
        let value = this.props.value;
        let option = this.props.options.find(option=>option.value===value);
        let showText = option && option.displayName || placeHolder;
        return (
                <div className="selection-placeholder">
                <span className="placeholder-text">
                    {showText}
                </span>

            </div>
        );
    }

    createOptions(){
        let opts = this.props.options.map((option,index)=>this.createOption(option,index));
        return (<ul className="select-content">
            {opts}
        </ul>);
    }

    createOption(option,index){
        let isActive=option.value===this.props.value;

        return (
            <li data-index={index} onClick={this.selectOption} className={isActive?"select-option active":"select-option"}>
                <span className="option-text">{option.displayName}</span>
            </li>
        );
    }

    _selectOption(event){
       let target =  event.currentTarget;
       let index = parseInt(target.dataset.index);
       let option = this.props.options[index];
       this.props.onValueChange(option.value);
       event.stopPropagation();
    }

    _toggleExpanded(event){
        this.setState({
            IsExpanded:!this.state.IsExpanded,
        });
        event.stopPropagation();
    }

    _getContainer(){
        let mountNode = document.createElement('div');
        mountNode.style.position="absolute";
        mountNode.style.top="50%";
        mountNode.style.left="50%";
        mountNode.style.background="#c8c8c8";

        document.body.appendChild(mountNode);
        return mountNode;
    }

    showPanel(){
        if(this.state.IsExpanded){
            return (
                <Portal getContainer={this.getContainer}>
                    {this.createOptions()}
                </Portal>

            );
        }else{
            return null;
        }
    }

    render(){

        return (
            <div class="selection-wrap" onClick={this.toggleExpanded}>
                {this.createPlaceholder()}
                {this.showPanel()}
            </div>
        );
    }
}