import React from 'react';
import {UserState} from "../context/userContext";

export default function StateTest() {

    const {user} = UserState();
    // const projs = user.projs;
    // let items = [];

    /* for EG2/3 */
    /*
    for (let i of Object.keys(projs)) {
        items.push(<p>{i}: {user.projs[i].name}</p>)
    }
    */

    return (
        <div>


            {/* EG 1: Display current active proj and change active proj*/}

            <h1>{`Username: ${user.uname}`}</h1>
            {/*
            <h1>{`Active project name: ${user.act_proj.name}`}</h1>
            <h1>{`Active project path: ${user.act_proj.path}`}</h1>
            */}



            {/* EG 2: Display current projects and add a project
            {items.map((item, idx) => (
                item
            ))}
            */}


            {/* EG 3: Remove project
                {items.map((item, index) => (
                    item
                ))}
            */}
        </div>
    );
}