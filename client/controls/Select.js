import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';
import Align from './Align';
import {getElementPos} from '../utilities/Html';

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
        this.selectionRef = React.createRef();
    }

    createSelection(){
        let value = this.props.value;
        let option = this.props.options.find(option=>option.value===value);
        let showText = option && option.displayName || placeHolder;

        return (
            <div className="select-selection" ref={this.selectionRef}>
            <div className="selection-renderer">
                  <span className="selection-text">{showText}</span>
              <div className="select-search">
                <input type="search" className="select-input" />
              </div>
            </div>
            <i className={`fontSize20 fa fa-angle-${this.state.IsExpanded?"up":"down"} select-arrow`} aria-hidden="true"></i>
          </div>
        );
    }

    createDropDown(){
        let opts = this.props.options.map((option,index)=>this.createOption(option,index));
        return (
            <div style={{overflow:"auto"}}>
                <ul className="select-dropdown-menu">
                    {opts}
                </ul>
            </div>
        );
    }

    createOption(option,index){
        let isActive=option.value===this.props.value;

        return (
            <li key={option.id} data-index={index} onClick={this.selectOption} className={isActive?"select-item active":"select-item"}>
               {option.displayName}
            </li>
        );
    }

    createNotFound(){
        return (
            <li className="select-item disabled">
               Not Found
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
        mountNode.className="select-dropdown";
        mountNode.style.position="absolute";
        mountNode.style.top="0";
        mountNode.style.left="0";
        let parentNode = this.props.getPopupContainer ? 
        this.props.getPopupContainer(ReactDOM.findDOMNode(this)) : document.body;
        parentNode.appendChild(mountNode);
        return mountNode;
    }

    render(){
        let IsExpanded = this.state.IsExpanded;
        let panel =IsExpanded?(
            <Portal getContainer={this.getContainer}>
                <Align refObj={this.selectionRef}>
                    {this.createDropDown()}
                </Align>
        </Portal>
        ):null;

        return (
            <div className={IsExpanded?"select-wrap select-focused":"select-wrap"} onClick={this.toggleExpanded}>
                {this.createSelection()}
                {panel}
            </div>
        );
    }
}