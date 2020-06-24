

/*
Used to insert a project into the users .json file
path: path to the admin key

*/
module.exports = {
    insertDatabase_function: function (filepath, dbName, username, active_proj) {
    	var fs = window.require('fs');
		const path = window.require('path');
		const {remote} = window.require('electron')

        return new Promise((resolve, reject) => {

        	
        	var db_obj = {
        		[dbName]: filepath
        	}

        	try {
        		var json = fs.readFileSync(`${path.join(remote.app.getAppPath(), 'src/Users/' + username + '.json')}`)	
        		json = JSON.parse(json)
        		
        		//get active project
        		console.log(active_proj)
        		console.log(json['projs'][active_proj])

        		if(json['projs'][active_proj]['database'] === undefined) {
        			json['projs'][active_proj]['database'] = []
        		}

        		//TODO: add check to see if db is already in there
				json['projs'][active_proj]['database'].push(db_obj)        		
        		
				fs.writeFileSync(`${path.join(remote.app.getAppPath(), 'src/Users/' + username + '.json')}`, JSON.stringify(json), function(err) {
	    		if (err) {
	        			reject(new Error(err));
	    			}
	    			resolve('Ok');
				})

        	} catch (err) {
        		reject(new Error(err));
        	}
        });
    }
};