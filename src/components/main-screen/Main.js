import React, {Component} from 'react';
import MainNav from "../MainNav";
import {UserProvider} from "../../context/userContext";

class Main extends Component{

    render() {
        return(
            <div>
                <UserProvider>
                    <MainNav />
                </UserProvider>
            </div>
        )
    }
}

export default Main;
