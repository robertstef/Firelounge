import React from 'react';
import {UserState} from "../context/userContext";

export default function StateTest() {

    const {user} = UserState();

    return (
        <div>
            {/* EG 1: Display current active proj and change active proj */}

            <h1>{`Active project name: ${user.act_proj.name}`}</h1>
            <h1>{`Active project path: ${user.act_proj.path}`}</h1>


            {/* EG 2: Display current projects and add a project

            {user.projs.map((item, index) => (
                <p>{index + 1}: {item.name}</p>
            ))}
            */}

            {/* EG 3: Remove project
            {user.projs.map((item, index) => (
                <p>{index + 1}: {item.name}</p>
            ))}
            */}
        </div>
    );
}