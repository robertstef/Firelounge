import React, {Component} from 'react';
import InitialCard from "./InitialCard";

class Initial extends Component{
    render() {
        return(
        	<div style={{padding:20,background: 'linear-gradient(to right bottom, #EF233C, #D90429)',
                minHeight: 538,overflow:'hidden'}}>
                <div style={{marginTop: 50}}/>
                <InitialCard/>
            </div>
        )
    }
}

export default Initial;
