// we need to get the active project

//var user_json = require('../Users/' + username + '.json');

var user_json = require("../Users/testusername.json");

var active_proj = user_json.activeProject;

var test = '/Users/jacksonschuler/WebstormProjects/opench-firebase';

var active_path = user_json.projects[active_proj].path.toString();


const {exec} = require('child_process');

exec('ls -a', {cwd: test}, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
