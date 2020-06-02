var fs = require('fs');
const path = require('path');

/*
Endpoint used to insert a project into the users .json file
Request Body formatted as such:     
var body = {
    'path' ='/Users/benbaker/Documents/opench-370-project-dev',
    'name' = undefined,
    'username' = 'testusername'}
Returns status 200 and project id on success - 400 on fail
*/
module.exports = {
    insertProject_function: function (requestBody) {
        var username = requestBody.username;
        let proj_id;
        let proj_name;
        var proj_path = requestBody.path;

        return new Promise((resolve, reject) => {
	       	//get project id from .firebaserc file
	        try {
	        	var firebaserc = fs.readFileSync(proj_path + '.firebaserc')
	        	firebaserc = JSON.parse(firebaserc)
	        	proj_id = firebaserc.projects.default
	        } catch (error){
	        	throw new error ('File not found')
	        	resolve(-1);
	        }
	      
	        var user_json = require('../Users/' + username + '.json');
			//check to see if its already in the file
	        if (user_json.projects.hasOwnProperty(proj_id)) {
	        	console.log('PROJECT EXISTS -- ABORT MISSION')
	        	resolve(-1)
	        }

	        //if no project name provided - use proj_id as name
	        if(requestBody.name === undefined) {
	        	proj_name = proj_id;
	        }
			
	        // get features here
	         try {
	         	//try to read firebase.json file
	        	var featureList = [];
		        var firebasejson = fs.readFileSync(proj_path + 'firebase.json')
				firebasejson = JSON.parse(firebasejson)	        
		        //then check for modules -- push them to list
		        if( firebasejson.hasOwnProperty('hosting')){
		        	featureList.push('hosting')
		        }
		        if( firebasejson.hasOwnProperty('database')){
		        	featureList.push('database')
		        }
	        } catch (error){
	        	throw new error ('File not found')
	        	resolve(-1);
	        }
	        //..... add rest of the features later

	        //package project to write
	        user_json.projects[proj_id] = {
        		name: proj_name,
        		path: proj_path,
        		features: featureList
        	}

        	
        	fs.writeFileSync(`${path.join(__dirname, '../Users/' + username + '.json')}`, JSON.stringify(user_json), function(err) {
	    		if (err) {
	        		//if error resolve with error code
	        		console.log(err);
	        		resolve(-1)
	    			}
	    			//if success resolve with success code
	    			console.log(proj_id)
	    			resolve(proj_id);
				})
        });
    }
};