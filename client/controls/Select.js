import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';

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

    createSelection(){
        let value = this.props.value;
        let option = this.props.options.find(option=>option.value===value);
        let showText = option && option.displayName || placeHolder;

        return (
                <div className="select-selection">
                    <span className="selection-text">
                        {showText}
                    </span>
                    <i className={`fa fa-arrow-${this.state.IsExpanded?"up":"down"}`} aria-hidden="true"></i>
            </div>
        );
    }

    createOptions(){
        let opts = this.props.options.map((option,index)=>this.createOption(option,index));
        return (
            <ul className="select-content">
                {opts}
            </ul>
        );
    }

    createOption(option,index){
        let isActive=option.value===this.props.value;

        return (
            <li key={option.id} data-index={index} onClick={this.selectOption} className={isActive?"select-option active":"select-option"}>
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
        let parentNode = this.props.getPopupContainer ? 
        this.props.getPopupContainer(ReactDOM.findDOMNode(this)) : document.body;
        parentNode.appendChild(mountNode);
        return mountNode;
    }

    render(){

        let panel =this.state.IsExpanded?(
            <Portal getContainer={this.getContainer}>
            {this.createOptions()}
        </Portal>
        ):null;

        return (
            <div class="select-wrap" onClick={this.toggleExpanded}>
                {this.createPlaceholder()}
                {panel}
            </div>
        );
    }
}