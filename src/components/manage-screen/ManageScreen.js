import React from 'react';
import SecondaryManageNav from './SecondaryManageNav'
import TopManageNav from './TopManageNav'


function ManageScreen(props) {
    //holds the current project as selected in the topmanagenav -> project list
    //this value is passed down to content fo the deploy, database, auth pages
    const [currProject, setCurrProject] = React.useState('');

    //callback function which updates the selected project when it is changed in the project list
    //passed down via props from managescreen -> topmanagenav -> projectlist 
    const getSelectedProject = (selectedProject) => {
    	setCurrProject(selectedProject);
    };

    return (
        <div>
        	<TopManageNav username={props.username} getSelectedProject={getSelectedProject}/>
            <SecondaryManageNav username={props.username} currProject={currProject}/>
        </div>
    );
}

export default ManageScreen;