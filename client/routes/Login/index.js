import React from 'react';
import RegisterAndLogin from '../../components/RegisterAndLogin';

export default class LoginView extends React.Component{
    
    render(){
        return (
            <div className="view-login">
                <RegisterAndLogin type='login'/>
            </div>
        );
    }
}