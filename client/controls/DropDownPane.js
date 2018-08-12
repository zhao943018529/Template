import React from 'react';

export default class DropDownPane extends React.Component {
    constructor(props) {
        super(props);
        this.selectOption = this._selectOption.bind(this);
        this.delayTimer=null;
    }

    _selectOption(event) {
        let target = event.currentTarget;
        let index = parseInt(target.dataset.index);
        let option = this.props.Options[index];
        this.props.onValueChange(option.value);
        event.stopPropagation();
    }

    createNotFound() {
        return (
            <li className="select-item disabled">
                Not Found
            </li>
        );
    }

    createOption(option, index) {
        let isSelected = option.value === this.props.Value;
        let isActive = this.props.ActiveIndex > -1 && this.props.ActiveIndex === index;
        let className = `select-item ${isSelected?"selected":""} ${isActive?"active":""}`;

        return (
            <li role="option" key={option.id} data-index={index} onClick={this.selectOption} className={className}>
                {option.displayName}
            </li>
        );
    }

    render() {
        let content;
        if (this.props.Options.length > 0) {
            content = this.props.Options.map((option, index) => this.createOption(option, index));
        } else {
            content = this.createNotFound();
        }

        return (
            <div style={{ overflow: "auto" }}>
                <ul className="select-dropdown-menu" tabIndex={0}>
                    {content}
                </ul>
            </div>
        );
    }
}