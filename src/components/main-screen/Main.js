import React, { useEffect, useState } from 'react';
import MainNav from "../MainNav";
import LoginAlert from "./LoginAlert";
import {UserDispatch, UserState} from "../../context/userContext";
const ui = require('../../scripts/userInfo');
const initModule = require('../../scripts/init');

function Main() {
    const dispatch = UserDispatch();
    const {user} = UserState();
    const [showModal, setShowModal] = useState(true)

    useEffect( () => {
        async function fetchUsername() {
            let user_check = await ui.user_info();

            if(user_check.name !== undefined || user_check.name !== '' ) {
                initModule.init_function().then(async (output) => {
                    await dispatch({type: 'createUser', args: output});
                }).catch(err => {
                    console.log(err);
                })
                setShowModal(false)
            }
        }
        fetchUsername();
    }, [])
    
    return(
        <div>
            <MainNav />
            <LoginAlert isOpen={showModal}/>
        </div>
    )
}

export default Main;
