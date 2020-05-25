import React, {Component} from 'react';
import MainNav from "../MainNav";
import queryString from 'query-string';

class Main extends Component{
    state = {
    	username: ''
    }

	componentDidMount(){
		const values = queryString.parse(this.props.location.search);
		
		this.setState({
			username: values.username
		})
		
	}


    render() {
        return(
            <div>
                <MainNav username={this.state.username}/>
            </div>
        )
    }
}

export default Main;
