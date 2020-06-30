

/*
Used to insert a project into the users .json file
path: path to the admin key

*/
module.exports = {
    insertDatabase_function: function (filepath, dbName, username, active_proj, dbURL) {
    	var fs = window.require('fs');
		const path = window.require('path');
		const {remote} = window.require('electron')

        return new Promise((resolve, reject) => {

        	try {
        		var json = fs.readFileSync(`${path.join(remote.app.getAppPath(), 'src/Users/' + username + '.json')}`)	
        		json = JSON.parse(json)
                
                //TODO: check to see if the projects actually supports databases        		

        		if(json['projs'][active_proj]['database'] === undefined) {
        			json['projs'][active_proj]['database'] = {}
                    json['projs'][active_proj]['database']['all'] = {}
                    
        		}

                
        		//TODO: add check to see if db is already in there
				json['projs'][active_proj]['database']['active'] = dbName
                json['projs'][active_proj]['database']['all'][dbName] = { 'path': filepath}	
				if(dbURL !== '') {
					json['projs'][active_proj]['database']['all'][dbName]['url'] = dbURL
				}
				

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