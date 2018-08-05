import React from 'react';

export default class ListView extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let category = this.props.match.params.category;

        return (
            <div className="list-container">
                {category}
            </div>
        );
    }
}