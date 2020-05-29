import React from 'react';
import DeployScreenCard from './DeployScreenCard.js'

function DeployScreen(props) {
    return (
        <div>
            <DeployScreenCard 
            	username={props.username} 
            	currProject={props.currProject} 
			/>
        </div>
    );
}

export default DeployScreen;
