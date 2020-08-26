/**
 * process.env.username : email of Google Account -- used to confirm login                                                                    
 * process.env.userfile_path: filepath to firelounge user file -- used to delete user file / test new user ("" wont delete file)                                                      
 * process.env.project_name : project name - used to confirm project added to firelounge                                                             
 * process.env.project_features: used to know what features to test for                       
 * process.env.project_url: used to confirm where the project is deployed to 
 */

process.env.username = 'Ben@email.com';                                                                     
process.env.userfile_path = '/Users/user-name/Library/Application\\ Support/FireLounge/Users/user.json'     
process.env.project_file_path = '/absolute/path/here';                                                      
process.env.project_name = 'bensnewproject'                                                                 
process.env.project_features = ['hosting', 'database']                                                      
process.env.project_url = 'project url here'                                                                