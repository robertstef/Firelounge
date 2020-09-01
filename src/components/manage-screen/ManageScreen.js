import React from 'react';
import SecondaryManageNav from './SecondaryManageNav'
import TopManageNav from './TopManageNav/TopManageNav'


function ManageScreen() {
    /* Callback used to retrieve the the active tab to toggle display of db list */
    const [activeTab, setActiveTab] = React.useState('');
    const getActiveTab = (event) => {
        setActiveTab(event);   
    }
    
    
    return (
        <div>
            <SecondaryManageNav getActiveTab={getActiveTab}/>
            <TopManageNav activeTab={activeTab}/>
        </div>
    );
}

export default ManageScreen;