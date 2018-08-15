import React from 'react';
import {Map} from 'immutable'; 
import {fetchData} from '../utilities/fetch';
import LightTip from '../controls/LightTip';

export default class RegisterAndLogin extends React.Component{
    constructor(props){
        super(props);

        this.state={
            values:Map({
                username:'',
                nickname:'',
                password:'',
                phone:'',
                email:'',
            }),
            validation:Map({
                username:'',
                nickname:'',
                password:'',
                phone:'',
                email:'',
            }),
        };
        this.submitEventCallback =this._submitEventCallback.bind(this);
        this.registerSuccess = this._registerSuccess.bind(this);
    }

    _checkUsernameIsUseable(event){
        let username =  event.target.value;
         fetchData('/api/valiUsername',[])
     }

     _submitEventCallback(event) {
        let data = serializeObject(serializeArray(event.target));
        fetchData('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }, [this.registerSuccess]);
        event.preventDefault();
    }

    _registerSuccess(data){
        console.log(data);
    }

    handleValueChange(key,value){
        this.setState({
            
        })
    }

    createFormForLogin() {
        let { username: un_v, password: pw_v } = this.state.validation;
        let { username, password } = this.state.values;
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let username = (
            <div className="form-group">
                <label htmlFor="username-r">Username</label>
                <input type="text" name="username" onBlur={} className={un_v ? invaliClassName : className}
                    value={username} id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                <div className="invalid-feedback">
                    {un_v}
                </div>
            </div>
        );

        let password = (
            <div className="form-group">
                <label htmlFor="password-r">Your Password</label>
                <input type="password" name="password" value={password} className={pw_v ? invaliClassName : className} id="password-r" placeholder="Password" />
                <div className="invalid-feedback">
                    {pw_v}
                </div>
            </div>
        );

        return [username, password];
    }

    createFormForRegister() {
        let { nickname: nn_v, phone: p_v, email: e_v } = this.state.validation;
        let { nickname, phone, email } = this.state.values;
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let nickname = (
            <div className="form-group">
                <label htmlFor="nickname-r">Your Nickname</label>
                <input type="text" name="nickname" value={nickname} className={nn_v ? invaliClassName : className} id="nickname-r" placeholder="your name or your nickname" />
                <div className="invalid-feedback">
                    {nn_v}
                </div>
            </div>
        );
        let phone = (
            <div className="form-group">
                <label htmlFor="phone-r">Your Phone</label>
                <input type="number" name="phone" value={phone} className={p_v ? invaliClassName : className} id="phone-r" aria-describedby="phoneHelp" placeholder="phone number" />
                <div className="invalid-feedback">
                    {nn_v}
                </div>
            </div>
        );
        let email = (
            <div className="form-group">
                <label htmlFor="email-r">Your Email</label>
                <input type="email" name="email" value={email} className={e_v ? invaliClassName : className} id="email-r" aria-describedby="emailHelp" placeholder="email" />
                <div className="invalid-feedback">
                    {e_v}
                </div>
            </div>
        );

        return [
            nickname,
            phone,
            email,
        ];
    }

    render() {
        return (
            <form onSubmit={this.submitEventCallback}>
                <div className="form-group">
                    <label htmlFor="username-r">Username</label>
                    <input type="text" name="username" onBlur={} className="form-control" id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                    <small id="usernameHelp" className="form-text text-muted">.....</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password-r">Your Password</label>
                    <input type="password" name="password" className="form-control" id="password-r" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}