import React from 'react';
import {connect} from './wrap';

class FirstComponent extends React.Component{
    constructor(props){
        super(props);
        this.handleClickCallback=()=>this.handleClick();
    }

    handleClick(){
        setTimeout(()=>{
            this.props.dispatch({
                type:1,
            });
            setTimeout(()=>{
                this.props.dispatch({
                    type:2,
                    payload:{
                        name:'123mutouren',
                        age:11,
                        description:'js is best program language!!!!',
                    }
                });
            },2000);
        },0);
    }

    render(){
        let user =this.props.user;
        let content;
        if(user.status===0){
            content=(<div>initial</div>);
        }else if(user.status===1){
            content=(<div>Loading....</div>);
        }else if(user.status===2){
            content=(<div>
                name:{user.user.name}<br/>
                age:{user.user.age}<br/>
                description:{user.user.description}
                </div>);
        }else if(user.status===3){
            content=(<div>Error:{user.message}</div>)
        }

        return (<div>
                <h2>Welcome</h2>
                <button onClick={this.handleClickCallback}>change</button>
                {content}
            </div>);
    }
};

function mapStateToProps(state){
    return {user:state.user};
};

export default connect(mapStateToProps)(FirstComponent);


