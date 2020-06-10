const os = require('os');
const fs = require('fs');
const path = require('path');

let new_proj = os.homedir() + "/FL_testdir/bensnewproject";
let test_proj = os.homedir() + "/FL_testdir/benstestproject";

fs.mkdirSync(new_proj, {recursive: true});
fs.mkdirSync(test_proj, {recursive: true});

let local_path = path.join(__dirname, "/350cmpt.json");
let rawdata = fs.readFileSync(local_path);
let data = JSON.parse(rawdata);

data.projs.bensnewproject.path = new_proj;
data.projs.benstestproject.path = test_proj;

fs.writeFileSync(local_path, JSON.stringify(data));