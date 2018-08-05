import React from  'react';
import {Link} from 'react-router-dom';
import fetchData from '../utilities/fetch';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.fetchSuccess =this._fetchSuccess.bind(this);
        this.fetchFailed = this._fetchFailed.bind(this);
        this.state={
            status:0,
            categories:[],
            message:'',
        };
    }

    componentDidMount(){
        fetchData('/api/category/getAll',[this.fetchSuccess,this.fetchFailed]);
    }

    _fetchSuccess(data){
        this.setState({
            status:1,
            categories:data,
        });
    }

    _fetchFailed(err){
        this.setState({
            status:3,
            message:err.message,
        });
    }

    handleClick(path,event){
        this.props.history.push(path);
        event.preventDefault();
    }

    render(){
        let status =this.state.status;
        let content;
        if(status===0){
            content = (<div>no data</div>);
        }else if(status===3){
            content = (<div>{this.state.message}</div>);
        }else{
            content = this.state.categories.map(category=>(<a href="javascript:void(0)" onClick={this.handleClick.bind(this,'/channel/'+category.name)}>{category.displayName}</a>));
        }
        return (<div>
                <Link to='/'>Home</Link>
                {content}
            </div>);
    }
}