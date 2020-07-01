import React, { useEffect, useState } from 'react';
import MainNav from "../MainNav";
import LoginAlert from "./LoginAlert";
import CircularProgress from "./CircularProgress"
import {UserDispatch, UserState} from "../../context/userContext";
const ui = require('../../scripts/userInfo');
const initModule = require('../../scripts/init');

function Main() {
    const dispatch = UserDispatch();
    const {user} = UserState();
    const [showModal, setShowModal] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        async function fetchUsername() {
            let user_check = await ui.user_info();
            
            if(user_check.name !== undefined || user_check.name !== '' ) {
                initModule.init_function().then(async (output) => {
                    await dispatch({type: 'createUser', args: output});
                    setLoading(false)
                    setShowModal(false)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                setLoading(false)
            }
        }
        fetchUsername();
    }, [])

    if(loading) {
        return(
            <div>
            <MainNav />
            <CircularProgress />
        </div>
        )
    }

    return(
        <div>
            <MainNav />
            <LoginAlert isOpen={showModal}/>
        </div>
    )
}

export default Main;
