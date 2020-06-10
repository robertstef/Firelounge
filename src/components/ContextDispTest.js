import React from 'react';
import {UserDispatch} from "../context/userContext";

export default function DispTest() {
    const dispatch = UserDispatch();
    const info = {uname:'robertstefanyshin',
                  act_proj: 'projectid1',
                  projs: {projectid1: {name: "project1", path: "~/Documents", features: ["H"]},
                          projectid2: {name: "project2", path: "~/Documents", features: ["H"]}},
                  fb_projs: [{name: 'roberttestproj', id: 'roberttestproj', num: '74287604654'}]};


    return (
        <div>

            { /* EG 1: Display current active proj and change active proj

            <button onClick={() => dispatch({type: 'setActive',
                                            args:"321"})}>
                Set Active
            </button>
            */}


            {/* EG 2: List projects and add project

            <button onClick={() => dispatch({type: 'addProj',
                args:{name:"Robert Proj", path: "/home/firelounge/", id:"1324"}})}>
                Add Project
            </button>
            */}

            {/* EG 3: Remove project
            <button onClick={() => dispatch({type: 'removeProj',
                args:"123"})}>
                Remove Project
            </button>
            */}

            <button onClick={() => dispatch({type: 'createUser', args: info})}>
                Change User
            </button>


        </div>
    )
}