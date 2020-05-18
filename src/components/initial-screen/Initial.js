<<<<<<< HEAD
import React, {Component} from 'react';
import InitialCard from "./InitialCard";

class Initial extends Component{
    render() {
        return(
            <div style={{padding:20,background: 'linear-gradient(to right bottom, #667eea, #764ba2)',
                minHeight: 538,overflow:'hidden'}}>
                <div style={{marginTop: 50}}/>
                <InitialCard/>
            </div>
        )
    }
=======
import React from 'react';
import Card from '@material-ui/core/Card'
import MainBottomNav from '../MainBottomNav.js'


function Initial() {
    return (
        <div>
            <MainBottomNav />
        </div>
    );
>>>>>>> cfd2b40bbdfdb72514e7e16867c3e3867e8a191f
}

export default Initial;
