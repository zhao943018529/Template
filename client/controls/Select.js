import React from 'react';
import ReactDOM from 'react-dom';
import Trigger from './Trigger';
import DropDownPane from './DropDownPane';
import { getElementPos, KeyCode, getFocusedFromBlur } from '../utilities/Html';

const PlaceHolder = "select a value";

export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            IsExpanded: false,
            ActiveIndex: -1,
            Search: '',
        };
        this.selectionRef = React.createRef();
        this.searchRef = React.createRef();
        this.onValueChange = this._onValueChange.bind(this);
        // this.getContainer = this._getContainer.bind(this);
        this.onSearchChange = this._onSearchChange.bind(this);
        this.onInputKeyDown = this._onInputKeyDown.bind(this);
        this.onBlurEvent = this._onBlurEvent.bind(this);
        this.onKeyDown = this._onKeyDown.bind(this);
        this.toggleClick = this._toggleClick.bind(this);
    }

    componentWillUnmount() {
        this.clearDelayTimer();
    }

    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }

    _onInputKeyDown(e) {
        switch (e.keyCode) {
            case KeyCode.Left:
            case KeyCode.Up:
                this.goPrevious();
                e.preventDefault();
                e.stopPropagation();
                break;
            case KeyCode.Down:
            case KeyCode.Right:
                this.goNext();
                e.preventDefault();
                e.stopPropagation();
                break;
            case KeyCode.Enter:
                if (this.state.IsExpanded && this.state.ActiveIndex > -1) {
                    let options = this.filterOptions();
                    let value = options[this.state.ActiveIndex].value;
                    this.onValueChange(value);
                } else {
                    this.setState({
                        IsExpanded: !this.state.IsExpanded,
                        Search: '',
                    });
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case KeyCode.Esc:
                this.setOpenState(false, true);
                e.preventDefault();
                e.stopPropagation();
                break;
            default:
                break;
        }
    }

    goPrevious() {
        this.go();
    }

    goNext() {
        this.go(true)
    }

    go(flag) {
        let options = this.filterOptions();
        if (options && options.length > 0) {
            let index = this.state.ActiveIndex;
            if (flag) {
                index = index >= options.length - 1 ? 0 : index + 1;
            } else {
                index = index > 0 ? index - 1 : options.length - 1;
            }
            this.setState({
                ActiveIndex: index,
            });
        }
    }

    _onBlurEvent(e) {
        let focused = getFocusedFromBlur(e);
        let container = this.selectionRef.current;
        this.delayTimer = setTimeout(() => {
            this.clearDelayTimer();
            this.setOpenState(false, false);
        }, 150);
    }

    filterOptions() {
        if (this.state.Search) {
            return this.props.Options.filter(option => option.value.indexOf(this.state.Search) !== -1);
        } else {
            return this.props.Options;
        }
    }

    createSelection() {
        let value = this.props.Value;
        let option = this.props.Options.find(option => option.value === value);
        let showText = option && option.displayName || this.props.PlaceHolder || PlaceHolder;

        return (
            <div className="select-selection" tabIndex={0} onKeyDown={this.onKeyDown} onClick={this.toggleClick} ref={this.selectionRef}>
                <div className="selection-renderer">
                    <span className="selection-text" style={{ visibility: this.state.Search ? "hidden" : "visible" }}>{showText}</span>
                    <div className="select-search">
                        <input value={this.state.Search} ref={this.searchRef} onKeyDown={this.onInputKeyDown} onChange={this.onSearchChange}
                            onBlur={this.onBlurEvent} type="search" className="select-input" />
                    </div>
                </div>
                <i className={`fontSize20 fa fa-angle-${this.state.IsExpanded ? "up" : "down"} select-arrow`} aria-hidden="true"></i>
            </div>
        );
    }

    _onSearchChange(event) {
        let value = event.target.value;
        this.setState({
            Search: value,
        });
        event.stopPropagation();
    }

    _onValueChange(value) {
        if (value !== this.props.value) {
            this.props.onValueChange(value);
        }
        this.setOpenState(false, true);
    }

    _onKeyDown(e) {
        if (this.state.IsExpanded) {
            this._onInputKeyDown(e);
        } else if (e.keyCode === KeyCode.Enter || e.keyCode === KeyCode.Down) {
            this.setOpenState(true);
            event.preventDefault();
        }
    }

    setOpenState(open, needFocus) {
        if (this.state.IsExpanded === open) {
            return;
        }
        this.setState({
            IsExpanded: open,
            Search: '',
            ActiveIndex: -1,
        }, () => {
            if (open) {
                let input = this.searchRef.current;
                input && input.focus();
            } else if (needFocus) {
                let selection = this.selectionRef.current;
                selection && selection.focus();
            }
        });
    }

    _toggleClick(e) {
        let IsExpanded = this.state.IsExpanded;
        this.setOpenState(!IsExpanded, IsExpanded);
        e.stopPropagation();
    }


    getDropComponent() {
        let options = this.filterOptions();
        return (
            <DropDownPane
                onValueChange={this.onValueChange}
                ActiveIndex={this.state.ActiveIndex}
                Options={options}
                Value={this.props.Value} />
        );
    }

    render() {
        let IsExpanded = this.state.IsExpanded;
        
        return (
            <Trigger
                Visiable={IsExpanded}
                Value={this.props.Value}
                onValueChange={this.onValueChange}
                AlignElement={this.selectionRef}
                PopUp={this.getDropComponent()}
                >
                <div style={this.props.Style} className={IsExpanded ? "select-wrap select-focused" : "select-wrap"}>
                    {this.createSelection()}
                </div>
            </Trigger>
        );
    }
}


// const options=[{
//     id:1111,
//     value:'google',
//     displayName:'google',
//     description:'asdfasfsdfsd',
// },{
//     id:2222,
//     value:'baidu',
//     displayName:'baidu',
//     description:'asdfasfdasfdqerqdfs',
// }];