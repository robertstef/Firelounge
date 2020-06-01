import React from 'react';
import {UserDispatch} from "../context/userContext";

export default function DispTest() {
    const dispatch = UserDispatch();

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

            {/* EG 3: Remove project*/}
            <button onClick={() => dispatch({type: 'removeProj',
                args:"123"})}>
                Remove Project
            </button>


        </div>
    )
}