const { exec } = require('child_process');

/**
 * Calls the firebase projects:list to obtain a list
 * of the current users projects.
 *
 * @param callback: function to process the output of the
 *                  command after execution.
 */
function get_projects(callback) {
    exec("firebase projects:list", (error, stdout, stderr) => {
        if (error) {
            console.log(error.message);
            return;
        }
        callback(stdout);
    })
}

/**
 * Parses the output of "firebase projects:list" into
 * an array of the format:
 *
 * [[project name, project id, project number, resource location id], ..., ...]
 *
 * @param callback: a function to use the users project information
 *                  as needed.
 */
function parse_output(callback) {
    get_projects((stdout) => {

        let output = stdout.split("\n");
        output = output.slice(0, -3);

        // get lines containing project info
        let projects = [];
        for (let i = 3; i < output.length; i += 2) {
            projects.push(output[i]);
        }

        // get display name, project id, project number,
        // and resource location id
        let projs_revised = [];
        for (let p of projects) {
            p = p.split('│');
            let temp = [];
            for (let n of p) {
                if (n !== "") {temp.push(n.trim())}
            }
            projs_revised.push(temp);
        }

        callback(projs_revised);
    });
}

/**
 * Displays the users current projects to the console.
 */
function list_projects() {
    parse_output((projects) => {
           for (let p of projects) { console.log(p[0])}
    });
}
