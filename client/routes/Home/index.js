import React from 'react';
import Select from '../../controls/Select';

const options=[{
    id:1111,
    value:'aaaaaa',
    displayName:'aaaaa',
    description:'asdfasfsdfsd',
},{
    id:2222,
    value:'bbbbbb',
    displayName:'cccccc',
    description:'asdfasfdasfdqerqdfs',
},{
    id:3333,
    value:'ccccc',
    displayName:'dddddd',
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
                <Select options={options}  onValueChange={this.onValueChange} value={this.state.value}/>
            </div>);
    }
}