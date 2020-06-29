import React, {useState} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import GetPathButtonNewProject from "./GetPathButtonNewProject";

import {UserDispatch} from "../../context/userContext";

let project_name = "";

let project_path = "";

let project_id = '';

let hosting_options = {
    public_dir: '',
    single_page_app: null,
};

let config = {
    hosting: false,
    database: false,
    storage: false,
    functions: false,
};

export default function NewProjectExpansion(){
    const dispatch = UserDispatch();

    const [isHostingOpen, setHostingOpen] = useState(false);

    const [selectSinglePg, setSinglePg] = useState(null);

    /**
     * Generate a random 5 digit hex value to ensure a unique project id
     * @returns {string} - the randomized 5 digit hex value
     */

    let id_hex = () => {
        var letters = '0123456789abcdef';
        var hex_val = '';
        for (var i = 0; i < 5; i++) {
            hex_val += letters[Math.floor(Math.random() * 16)];
        }
        return hex_val;
    };

    return (
        <div style={{width: '100%',}}>
            {/*style={{boxShadow: 'none', WebkitBoxShadow: 'none', MozBoxShadow: 'none'}}*/}
            <div>
                <TextField
                    style={{width:'80%'}}
                    id="outlined-size-small"
                    size={'small'}
                    placeholder="Enter your project name"
                    variant={"outlined"}
                    color={'secondary'}
                    onChange={(e) => {project_name = e.target.value; project_id = e.target.value.replace(/\s+/g, '-').toLowerCase() + "-" + id_hex();}}
                />
            </div>
            <div style={{marginTop: 10}}/>
            <GetPathButtonNewProject path={(path) => {project_path = path}}/>
            <div style={{marginTop: 10}}/>
            <ExpansionPanel expanded={isHostingOpen} style={{boxShadow: 'none', WebkitBoxShadow: 'none', MozBoxShadow: 'none'}}>
                <ExpansionPanelSummary
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        onClick={(event) => {event.stopPropagation(); setHostingOpen(!isHostingOpen); config.hosting = !config.hosting}}
                        onFocus={(event) => event.stopPropagation()}
                        label="Hosting"
                    />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{flexDirection: 'column', marginTop: -15}}>
                    <div>
                        <Typography color="textSecondary" variant="body1">
                            What do you want to use as your public directory?
                        </Typography>
                        <div style={{marginTop: 10}}/>
                        <div>
                            {/* Will edit the public attribute within the "hosting"*/}
                            <TextField
                                style={{width:'30%'}}
                                id="outlined-size-small"
                                size={'small'}
                                placeholder="(public)"
                                variant={"outlined"}
                                color={'secondary'}
                                onChange={(e) => {hosting_options.public_dir = e.target.value}}
                            />
                        </div>
                        <div style={{marginTop: 10}}/>
                    </div>
                    <div>
                        <Typography color="textSecondary" variant="body1">
                            Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
                        </Typography>
                        <div style={{marginTop: 10}}/>
                        <FormControl variant="outlined" style={{margin:5, minWidth:120}}>
                            <Select value={selectSinglePg} onChange={(e) => {setSinglePg(e.target.value); hosting_options.single_page_app = e.target.value}}>
                                <MenuItem value={null}/>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button onClick={() => {

                const createCloudProj = require('../../scripts/createProject/CreateCloudProject');

                createCloudProj.createCloudProject_function([project_name, project_path, project_id]).then((value) => {
                    if (value === 'SUCCESS') {
                        const initFirebase = require('../../scripts/createProject/initFirebasejson');
                        initFirebase.initFireBasejson_function({
                            proj_name: project_name,
                            proj_path: project_path,
                            proj_id: project_id,
                            hosting: {
                                public_dir: hosting_options.public_dir,
                                single_page_app: hosting_options.single_page_app,
                            },
                            config: {
                                hosting: config.hosting,
                                database: config.database,
                                storage: config.storage,
                                functions: config.functions,
                            }
                        });

                        setTimeout(function(){dispatch({type: 'addProj',
                            args:{name:project_name, path: project_path, id:project_id}}) }, 3000);
                    }
                }).catch(err => {
                    console.log(err)
                });

            }}>
                Submit
            </Button>
        </div>
    );

};
