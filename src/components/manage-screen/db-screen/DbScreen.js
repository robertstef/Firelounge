import React from 'react';
import DbScreenCard from './DbScreenCard.js'
import DbInitModal from './DbInitModal.js'

function DbScreen() {
    return (
        <div style={{height: '100%'}}>
			<DbScreenCard />
			<DbInitModal/>
        </div>
    );
}

export default DbScreen;
