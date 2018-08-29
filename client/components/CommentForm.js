import React from 'react';
import Dialog from '../controls/Dialog';
import LightTip from '../controls/LightTip';
import { login_open } from '../reducer/LoginRegisterReducer';
import { fetchData } from '../utilities/fetch';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            body: '',
            message: '',
        };

        this.closeDialog = this.closeDialog.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.clearTip = this.clearTip.bind(this);
    }

    handleValueChange(event) {
        let value = event.target.value;
        this.setState({
            body: value,
        });
    }

    handleError(err) {
        this.setState({
            status: 3,
            message: err.message,
        });
    }

    handleSuccess(res) {
        this.setState({
            status: 2,
            body: '',
            message: res.message,
        });
    }

    closeDialog() {
        this.setState({
            status: 0,
        });
    }

    handleSubmit(event) {
        if (!this.state.body) {
            this.setState({
                status: 3,
                message: 'comment not allow submit empty content',
            });
            return;
        }
        fetchData(this.props.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                aid: this.props.aid,
                author: this.props.uid,
                body: this.state.body,
            })
        }, [this.handleSuccess, this.handleError]);
        event.stopPropagation()
    }

    clearTip() {
        this.setState({
            status: 0,
            message: '',
        });
    }

    render() {
        let { status, message } = this.state;

        if (this.props.uid) {
            let tip;
            if (status === 2) {
                tip = (<LightTip type="success" message={message} didUnMount={this.clearTip} />);
            } else if (status === 3) {
                tip = (<LightTip type="failed" message={message} didUnMount={this.clearTip} />);
            }

            return (
                <div className="comment-form">
                    <div className="avatar"></div>
                    <textarea className="content-input" onChange={this.handleValueChange} placeholder="show your point of view"></textarea>
                    <div className="action-box">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
                    {tip}
                </div>
            );
        } else {

            return (
                <div className="comment-form unauthorized">
                    <div className="unauthorized-panel">
                        <button type="button" onClick={() => this.props.dispatch(login_open())} className="btn btn-outline-primary">Login</button>
                        <div className="placeholder">Show your point of view</div>
                    </div>
                </div>
            );
        }
    }
}