import React from 'react';
import {Map} from 'immutable'; 
import {fetchData} from '../utilities/fetch';
import LightTip from '../controls/LightTip';

const LOGIN_TYPE ="login";

const REGISTER_URL='/api/register';
const VALI_URL='/api/valiUsername';

export default class RegisterAndLogin extends React.Component{
    constructor(props){
        super(props);
        //1loading 2success 3error
        this.state={
                username:Map({
                    value:'',
                    validation:'',
                }),
                nickname:Map({
                    value:'',
                    validation:'',
                }),
                password:Map({
                    value:'',
                    validation:'',
                }),
                phone:Map({
                    value:'',
                    validation:'',
                }),
                email:Map({
                    value:'',
                    validation:'',
                }),
                status:0,
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

    handleValueChange(key, value) {
        let change = this.state[key].set('value', value);
        this.setState({
            [key]: change,
        });
    }

    createFormForLogin() {
        let { username, password } = this.state;
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let username = (
            <div className="form-group">
                <label htmlFor="username-r">Username</label>
                <input type="text" name="username" onChange={this.handleValueChange.bind(this,'username')} className={username.validation ? invaliClassName : className}
                    value={username.value} id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                <div className="invalid-feedback">
                    {username.validation}
                </div>
            </div>
        );

        let password = (
            <div className="form-group">
                <label htmlFor="password-r">Your Password</label>
                <input type="password" name="password" value={password.value} onChange={this.handleValueChange.bind(this,'password')} className={password.validation ? invaliClassName : className} id="password-r" placeholder="Password" />
                <div className="invalid-feedback">
                    {password.validation}
                </div>
            </div>
        );

        return [username, password];
    }

    createFormForRegister() {
        let { nickname, phone, email } = this.state;
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let nickname = (
            <div className="form-group">
                <label htmlFor="nickname-r">Your Nickname</label>
                <input type="text" name="nickname" value={nickname.value} onChange={this.handleValueChange.bind(this,'nickname')} className={nickname.validation ? invaliClassName : className} id="nickname-r" placeholder="your name or your nickname" />
                <div className="invalid-feedback">
                    {nickname.validation}
                </div>
            </div>
        );
        let phone = (
            <div className="form-group">
                <label htmlFor="phone-r">Your Phone</label>
                <input type="number" name="phone" value={phone.value} onChange={this.handleValueChange.bind(this,'phone')} className={phone.validation ? invaliClassName : className} id="phone-r" aria-describedby="phoneHelp" placeholder="phone number" />
                <div className="invalid-feedback">
                    {phone.validation}
                </div>
            </div>
        );
        let email = (
            <div className="form-group">
                <label htmlFor="email-r">Your Email</label>
                <input type="email" name="email" value={email.value} onChange={this.handleValueChange.bind(this,'email')} className={email.validation ? invaliClassName : className} id="email-r" aria-describedby="emailHelp" placeholder="email" />
                <div className="invalid-feedback">
                    {email.validation}
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
        let content;
        if(this.props.type===LOGIN_TYPE){
            content = this.createFormForLogin();
        }else{
            content = this.createFormForRegister();
        }

        return (
            <form onSubmit={this.submitEventCallback}>
                {content}
                <button type="submit" disabled={this.state.status===1} className="btn btn-primary">Submit</button>
            </form>
        );
    }
}