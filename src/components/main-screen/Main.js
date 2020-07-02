import React, { useEffect, useState } from 'react';
import MainNav from "../MainNav";
import LoginAlert from "./LoginAlert";
import CircularProgress from "./CircularProgress"
import {UserDispatch, UserState} from "../../context/userContext";
const checkLoginStatus = require('../../scripts/checkLoginStatus');
const initModule = require('../../scripts/init');

function Main() {
    const dispatch = UserDispatch();
    const {user} = UserState();
    const [showModal, setShowModal] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        async function fetchUsername() {
            //check if user it logged in -- returns 'Logged In' when user it logged in, '' when user is not logged in
            let user_check = await checkLoginStatus.checkLoginStatus_function();
            if(user_check === 'Logged In' ) {
                //if user is logged in -- start init script
                initModule.init_function().then(async (output) => {
                    await dispatch({type: 'createUser', args: output});
                    setLoading(false)
                    setShowModal(false)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                //user is not logged in -- show dialog to prompt login
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
