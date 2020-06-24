import React from 'react';
import DbScreenCard from './DbScreenCard.js'
import DbInitModal from './DbInitModal.js'
import DbList from './DbList.js'

function DbScreen() {
    return (
        <div style={{height: '100%'}}>
			<DbScreenCard />
			<DbInitModal/>
			<DbList/>
        </div>
    );
}

export default DbScreen;
