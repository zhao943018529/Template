import React from 'react';
import { Map } from 'immutable';
import { fetchData } from '../utilities/fetch';
import LightTip from '../controls/LightTip';
import _ from 'lodash';
import { push } from '../history';
import {failed_status,success_status} from '../reducer/MessageReducer';

const LOGIN_TYPE = "login";

const REGISTER_URL = '/api/register';
const LOGIN_URL = '/api/login';
const VALI_URL = '/api/valiUsername';

export default class RegisterAndLogin extends React.Component {
    constructor(props) {
        super(props);
        //0fetching 1success 2error
        this.state = {
            formData: Map({
                username: Map({
                    value: '',
                    valied: 0,
                    validation: '',
                }),
                nickname: Map({
                    value: '',
                    valied: 0,
                    validation: '',
                }),
                password: Map({
                    value: '',
                    valied: 0,
                    validation: '',
                }),
                phone: Map({
                    value: '',
                    valied: 0,
                    validation: '',
                }),
                email: Map({
                    value: '',
                    valied: 0,
                    validation: '',
                }),
            }),
            status: 0,
            message: '',
        };
        this.submitEventCallback = this._submitEventCallback.bind(this);
        this.postSuccess = this._postSuccess.bind(this);
        this.checkUsernameAvailable = this._checkUsernameAvailable.bind(this);
        this.postError = this._postError.bind(this);
        this.checkUsernameSuccess = this._checkUsernameSuccess.bind(this);
        this.postStart = this._postStart.bind(this);
        this.dealyTimeId = null;
    }

    _checkUsernameAvailable(event) {
        let username = event.target.value;
        fetchData('/api/valiUsername?username=' + username, [this.checkUsernameSuccess, this.postError]);
    }

    _checkUsernameSuccess(result) {
        let fd = this.state.formData.update('username', val => val.merge({
            valied: result.data.used ? 1 : 2,
            validation: result.message,
        }));
        this.setState({
            status: 2,
            formData: fd,
        });
    }

    getData() {
        let data;
        let newFD = this.state.formData;
        if (this.props.type === LOGIN_TYPE) {
            newFD = newFD.filter((v, k) => k === 'username' || k === 'password');
        }
        data = newFD.map(v => v.get('value')).toJSON();
        return data;
    }

    _submitEventCallback(event) {
        let data = this.getData();
        let url = this.props.type === LOGIN_TYPE ? LOGIN_URL : REGISTER_URL;
        fetchData(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }, [this.postSuccess, this.postError]);
        event.preventDefault();
    }

    _postStart() {
        this.setState({
            status: 1,
        });
    }

    _postError(err) {
        this.setState({
            status: 3,
            message: err.message,
        }, () => {
            this.props.dispatch(failed_status(err));
        });
    }

    _postSuccess(result) {
        if (result.status == 200) {
            this.setState({
                status: 2,
                message: result.message,
            }, () => {
                this.props.dispatch(success_status(result));
                push('/' + '?time=' + Date.now());
            });
        } else {
            let formData = this.state.formData;
            _.forIn(result.data, (value, key) => {
                formData = formData.update(key, val => ({
                    value: val.value,
                    valied: 1,
                    validation: value.message,
                }));
            });
            this.setState({
                status: 3,
                formData: formData,
                message: result.message,
            });
        }
    }

    handleValueChange(key, event) {
        let formData = this.state.formData.setIn([key, 'value'], event.target.value);
        this.setState({
            formData: formData,
        });
    }

    computeClassName(field) {
        let className = "form-control";
        if (field.valied === 1) {
            className += " is-invalid";
        }

        if (field.valied === 2) {
            className += " is-valid";
        }

        return className;
    }

    createFormForLogin() {
        let { username, password } = this.state.formData.toJS();
        let u1 = this.computeClassName(username);
        let username_dom = (
            <div key="username" className="form-group">
                <label htmlFor="username-r">Username</label>
                <input type="text" name="username" onBlur={this.props.type === LOGIN_TYPE ? undefined : this.checkUsernameAvailable} onChange={this.handleValueChange.bind(this, 'username')} className={u1}
                    value={username.value} id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                <div className="invalid-feedback">
                    {username.validation}
                </div>
            </div>
        );

        let p1 = this.computeClassName(password);
        let password_dom = (
            <div key="password" className="form-group">
                <label htmlFor="password-r">Your Password</label>
                <input type="password" name="password" value={password.value} onChange={this.handleValueChange.bind(this, 'password')} className={p1} id="password-r" placeholder="Password" />
                <div className="invalid-feedback">
                    {password.validation}
                </div>
            </div>
        );

        return [username_dom, password_dom];
    }

    createFormForRegister() {
        let { nickname, phone, email } = this.state.formData.toJS();
        let n1 = this.computeClassName(nickname);
        let nickname_dom = (
            <div key="nickname" className="form-group">
                <label htmlFor="nickname-r">Your Nickname</label>
                <input type="text" name="nickname" value={nickname.value} onChange={this.handleValueChange.bind(this, 'nickname')} className={n1} id="nickname-r" placeholder="your name or your nickname" />
                <div className="invalid-feedback">
                    {nickname.validation}
                </div>
            </div>
        );
        let p1 = this.computeClassName(phone);
        let phone_dom = (
            <div key="phone" className="form-group">
                <label htmlFor="phone-r">Your Phone</label>
                <input type="number" name="phone" value={phone.value} onChange={this.handleValueChange.bind(this, 'phone')} className={p1} id="phone-r" aria-describedby="phoneHelp" placeholder="phone number" />
                <div className="invalid-feedback">
                    {phone.validation}
                </div>
            </div>
        );
        let e1 = this.computeClassName(email);
        let email_dom = (
            <div key="email" className="form-group">
                <label htmlFor="email-r">Your Email</label>
                <input type="email" name="email" value={email.value} onChange={this.handleValueChange.bind(this, 'email')} className={e1} id="email-r" aria-describedby="emailHelp" placeholder="email" />
                <div className="invalid-feedback">
                    {email.validation}
                </div>
            </div>
        );
        let items = this.createFormForLogin();
        items = items.concat([
            nickname_dom,
            phone_dom,
            email_dom
        ]);

        return items;
    }

    render() {
        let content;
        if (this.props.type === LOGIN_TYPE) {
            content = this.createFormForLogin();
        } else {
            content = this.createFormForRegister();
        }

        return (
            <form onSubmit={this.submitEventCallback}>
                {content}
                <button type="submit" disabled={this.state.status === 1} className="btn btn-primary">Submit</button>
            </form>
        );
    }
}