import React from 'react';
import SecondaryManageNav from './SecondaryManageNav'
import TopManageNav from './TopManageNav'

function ManageScreen(props) {
    return (
        <div>
        	<TopManageNav username={props.username}/>
            <SecondaryManageNav />
        </div>
    );
}

export default ManageScreen;