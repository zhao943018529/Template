import React from 'react';
import {render} from 'react-dom';
import fetchData from './fetch';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			status:0,
			movies:null,
			message:null,
		};
		this.handleClickCallback = (event)=>this.handleClick(event);
	}

	handleClick(event){
		fetchData('/api/v2/movie/in_theaters',[()=>this.setState({status:1}),data=>this.setState({
			status:2,
			movies:data,
		}),err=>this.setState({status:3,message:err.response})]);
		event.preventDefault();
	}
	

	render(){

		let status = this.state.status;
		let content;
		if(status===1){
			content=(<div>Loading...</div>);
		}else if(status===2){
			content=(<div>
				{this.state.movies}
				</div>)
		}else if(status===3){
			content=(<div>{this.state.message}</div>);
		}

		return (
			<div className="container">
				<button onClick={this.handleClickCallback}>Fetch Data</button>
				{content}
			</div>
		);
	}
}

render(<App />,
	document.getElementById('root'));


