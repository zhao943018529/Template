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
        this.state = {
            formData: Map({
                username: Map({
                    value: '',
                    validation: '',
                }),
                nickname: Map({
                    value: '',
                    validation: '',
                }),
                password: Map({
                    value: '',
                    validation: '',
                }),
                phone: Map({
                    value: '',
                    validation: '',
                }),
                email: Map({
                    value: '',
                    validation: '',
                }),
            }),
            status: 0,
            message: '',
        };
        this.submitEventCallback =this._submitEventCallback.bind(this);
        this.postSuccess = this._postSuccess.bind(this);
        this.checkUsernameIsUseable = this._checkUsernameIsUseable.bind(this);
        this.startPost = this._startPost.bind(this);
        this.postError = this._postError.bind(this);
    }

    _checkUsernameIsUseable(event){
        let username =  event.target.value;
         fetchData('/api/valiUsername',[this.startPost]);
     }

     getData(){
         let data;
         let newFD = this.state.formData;
         if(this.props.type===LOGIN_TYPE){
            newFD.filter((v,k)=>k==='username'||k==='password');
         }
         data=newFD.map(v=>v.get('value')).toJSON();
         return data;
     }

     _submitEventCallback(event) {
         let data = this.getData();
         debugger;
        fetchData('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }, [this.startPost,this.postSuccess,this.postError]);
        event.preventDefault();
    }

    _startPost(){
        this.setState({
            status:1,
        });
    }

    _postError(err){
        console.log(err);
    }

    _postSuccess(data){
        this.setState({
            status:2,
            message:data,
        });
    }

    handleValueChange(key, event) {
        let formData = this.state.formData.setIn([key, 'value'], event.target.value);
        this.setState({
            formData: formData,
        });
    }

    createFormForLogin() {
        let { username, password } = this.state.formData.toJS();
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let username_dom = (
            <div key="username" className="form-group">
                <label htmlFor="username-r">Username</label>
                <input type="text" name="username" onChange={this.handleValueChange.bind(this,'username')} className={username.validation ? invaliClassName : className}
                    value={username.value} id="username-r" aria-describedby="usernameHelp" placeholder="username" />
                <div className="invalid-feedback">
                    {username.validation}
                </div>
            </div>
        );

        let password_dom = (
            <div key="password" className="form-group">
                <label htmlFor="password-r">Your Password</label>
                <input type="password" name="password" value={password.value} onChange={this.handleValueChange.bind(this,'password')} className={password.validation ? invaliClassName : className} id="password-r" placeholder="Password" />
                <div className="invalid-feedback">
                    {password.validation}
                </div>
            </div>
        );

        return [username_dom, password_dom];
    }

    createFormForRegister() {
        let { nickname, phone, email } = this.state.formData.toJS();
        let className = "form-control";
        let invaliClassName = "form-control is-invalid";
        let nickname_dom = (
            <div key="nickname" className="form-group">
                <label htmlFor="nickname-r">Your Nickname</label>
                <input type="text" name="nickname" value={nickname.value} onChange={this.handleValueChange.bind(this, 'nickname')} className={nickname.validation ? invaliClassName : className} id="nickname-r" placeholder="your name or your nickname" />
                <div className="invalid-feedback">
                    {nickname.validation}
                </div>
            </div>
        );
        let phone_dom = (
            <div key="phone" className="form-group">
                <label htmlFor="phone-r">Your Phone</label>
                <input type="number" name="phone" value={phone.value} onChange={this.handleValueChange.bind(this, 'phone')} className={phone.validation ? invaliClassName : className} id="phone-r" aria-describedby="phoneHelp" placeholder="phone number" />
                <div className="invalid-feedback">
                    {phone.validation}
                </div>
            </div>
        );
        let email_dom = (
            <div key="email" className="form-group">
                <label htmlFor="email-r">Your Email</label>
                <input type="email" name="email" value={email.value} onChange={this.handleValueChange.bind(this, 'email')} className={email.validation ? invaliClassName : className} id="email-r" aria-describedby="emailHelp" placeholder="email" />
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
        if(this.props.type===LOGIN_TYPE){
            content = this.createFormForLogin();
        }else{
            content = this.createFormForRegister();
        }
        let tip;
        switch(this.state.status){
            case 2:
            tip=(<LightTip message={this.state.message} type="success"/>);
            break;
            case 3:
            tip=(<LightTip message={this.state.message} type="failed"/>);
            break;
            default:break;
        }

        return (
            <form onSubmit={this.submitEventCallback}>
                {tip}
                {content}
                <button type="submit" disabled={this.state.status===1} className="btn btn-primary">Submit</button>
            </form>
        );
    }
}