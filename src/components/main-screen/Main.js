import React, { useEffect, useState } from 'react';
import MainNav from "../MainNav";
import LoginAlert from "./LoginAlert";
const ui = require('../../scripts/userInfo');

function Main() {
    const [showModal, setShowModal] = useState(true)

    useEffect( () => {
        async function fetchUsername() {
            let user = await ui.user_info();

            if(user.name !== undefined || user.name !== '' ) {
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
