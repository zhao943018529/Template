import React from 'react';
import {render} from 'react-dom';
import fetchData from './fetch';
require('./index.scss');

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

	createItem(item){
		
				let content =(
					<p className="content">
					导演: {item.directors.map(director=>director.name+' ')}
					<br/>
					演员:{item.casts.map(cast=>cast.name+' ')}
					<br/>
					类型:{item.genres.map((genre,index)=>{
						if(index>0)return '/'+genre;
						else return genre;
					})}
					<br/>
					制片国家/地区：中国香港
					<br/>
					上映时间： {item.year}上映
					<br/>
				</p>
				);
				let actors =(
					<div className="actors">
								{item.casts.map(cast=>{
									return <img src={cast.avatars.small} alt={cast.alt}/>;
								})}
								</div>
							);
	return (
		<div key={item.id} className="card-container">
		<div className="left">
			<a className="top" href={item.alt}>
			<img src={item.images.medium} alt=""/>
			</a>
			<div className="bottom">
			<p>评分:<span>{item.rating.average}</span></p>
			<p>星指数: <span>{item.rating.stars}</span></p>
			</div>
		</div>
		<div className="right">
			<h3>{item.title}</h3>
				{content}
				{actors}
		</div>
		</div>);
	}

	createContent(){
		return this.state.movies.subjects.map(subject=>this.createItem(subject));
	}

	render(){

		let status = this.state.status;
		let content;
		if(status===1){
			content=(<div>Loading...</div>);
		}else if(status===2){
			content=this.createContent();
				
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


