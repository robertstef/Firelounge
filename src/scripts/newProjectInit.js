
const {exec} = require('child_process');


/*
    Requirements:
    - a project directory (i.e. a path)
        - we get this from the user


    firebase init

    select features
    - this will be done prior
        - get this from the user

    We want to create a brand new project, how can we tell firebase to do this?
    - firebase projects:create
        - user can name it whatever they want
        - but the id must be unique (how do we get this unique id?)

        Then we need to provide an id:
        - project name?

        projectName - my-new-project
        projectID - projectName-hexValue


    At then end:
    - create a firebase.json (config file that lists the projects configuration) (CHECK)
    - .firebaserc - stores the project aliases (CHECK)

 */

module.exports = {
    newProjectInit_function: function(requestBody) {
        const filePath = requestBody.path;

    }
};
