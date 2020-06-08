const { exec } = require('child_process');

/**
 * Calls the firebase projects:list to obtain a list
 * of the current users projects.
 *
 * @param callback: function to process the output of the
 *                  command after execution.
 */
function get_projects() {
    return new Promise((resolve, reject) => {
        exec("firebase projects:list", (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            }
            resolve(stdout);
        })
    })
}

/**
 * Parses the output of "firebase projects:list" into
 * an array of the format:
 *
 * [{name:String, id:String, num:String}, ...]
 *
 * @param projlist: output from call to firebase projects:list
 */
function parse_projlist(projlist) {

    return new Promise((resolve, reject) => {
        let output = projlist.split("\n");
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

        // create array of objects containing name, id, and number
        // for creating a User object
        let proj_objs = [];
        for (let p of projs_revised) {
            if (p.length !== 4 ) { reject("Project list does not contain correct number of elements")}
            let obj = {};
            for (let i = 0; i < p.length; i++) {
                if (i === 0) { obj.name = p[i]}
                else if (i === 1) { obj.id = p[i] }
                else if (i === 2) { obj.num = p[i] }
            }
            proj_objs.push(obj);
        }

        resolve(proj_objs);
    })
}

/**
 * Returns a parsed list of the users firebase projects of the form
 * [{name:String, id:String, num:String}, ...]
 */
export default async function fb_projlist() {
    try {
        let raw_list = await get_projects();
        return await parse_projlist(raw_list);
    }
    catch(err) {
        console.log(err);
    }
}
