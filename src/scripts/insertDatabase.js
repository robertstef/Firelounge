

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
        		const userDir = remote.app.getPath('userData')
        		let ufile_path = path.join(userDir, "Users/" + `${this._uname}` + ".json")

				var json = fs.readFileSync(ufile_path);
        		json = JSON.parse(json)
                
                //TODO: check to see if the projects actually supports databases        		

        		if(json['projs'][active_proj]['database'] === undefined) {
        			json['projs'][active_proj]['database'] = {}
                    json['projs'][active_proj]['database']['all'] = {}
        		}

                
        		//TODO: add check to see if db is already in there
				json['projs'][active_proj]['database']['active'] = dbName
                json['projs'][active_proj]['admin'] = { 'path': filepath}	
				if(dbURL !== '') {
					json['projs'][active_proj]['database']['all'][dbName]['url'] = dbURL
				}
				

				fs.writeFileSync(ufile_path, JSON.stringify(json), function(err) {
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