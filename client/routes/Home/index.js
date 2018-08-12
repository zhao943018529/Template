import React from 'react';
import Select from '../../controls/Select';

const options=[{
    id:1111,
    value:'google',
    displayName:'google',
    description:'asdfasfsdfsd',
},{
    id:2222,
    value:'baidu',
    displayName:'baidu',
    description:'asdfasfdasfdqerqdfs',
},{
    id:3333,
    value:'alibaba',
    displayName:'alibaba',
    description:'afddsafasdfas',
},{
    id:4444,
    value:'facebook',
    displayName:'facebook',
    description:'afddsafasdfas',
}
,{
    id:5555,
    value:'tesla',
    displayName:'tesla',
    description:'afddsafasdfas',
},{
    id:6666,
    value:'tenxun',
    displayName:'tenxun',
    description:'asdfasfdasfdqerqdfs',
},{
    id:7777,
    value:'meituan',
    displayName:'meituan',
    description:'afddsafasdfas',
},{
    id:8888,
    value:'weibo',
    displayName:'weibo',
    description:'afddsafasdfas',
}
,{
    id:9999,
    value:'twwiter',
    displayName:'twwiter',
    description:'afddsafasdfas',
}];

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value:undefined,
        };
        this.onValueChange= this._onValueChange.bind(this);
    }

    _onValueChange(value){
        this.setState({
            value:value,
        });
    }

    render(){
        return (<div>
            Home
                <Select Options={options} Style={{width:320}} onValueChange={this.onValueChange} Value={this.state.value}/>
            </div>);
    }
}