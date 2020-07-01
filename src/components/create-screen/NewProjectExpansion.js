import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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

let database_options = {
    rules: '',
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

    const [selectSinglePg, setSinglePg] = useState('');

    const [isDatabaseOpen, setDatabaseOpen] = useState(false);

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
            {/**                            -----HOSTING------                        */}
            <Accordion expanded={isHostingOpen} style={{boxShadow: 'none', WebkitBoxShadow: 'none', MozBoxShadow: 'none'}}>
                <AccordionSummary
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
                </AccordionSummary>
                <AccordionDetails style={{flexDirection: 'column', marginTop: -15}}>
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
                </AccordionDetails>
            </Accordion>

            {/**                            -----DATABASE------                        */}

            <Accordion expanded={isDatabaseOpen} style={{boxShadow: 'none', WebkitBoxShadow: 'none', MozBoxShadow: 'none'}}>
                <AccordionSummary
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        onClick={(event) => {event.stopPropagation(); setDatabaseOpen(!isDatabaseOpen); config.database = !config.database}}
                        onFocus={(event) => event.stopPropagation()}
                        label="Database"
                    />
                </AccordionSummary>
                <AccordionDetails style={{flexDirection: 'column', marginTop: -15}}>
                    <div>
                        <Typography color="textSecondary" variant="body1">
                            What file should be used for Database Rules?
                        </Typography>
                        <div style={{marginTop: 10}}/>
                        <div>
                            <TextField
                                style={{width:'30%'}}
                                id="outlined-size-small"
                                size={'small'}
                                placeholder="(database.rules.json)"
                                variant={"outlined"}
                                color={'secondary'}
                                onChange={(e) => {database_options.rules = e.target.value}}
                            />
                        </div>
                        <div style={{marginTop: 10}}/>
                    </div>
                </AccordionDetails>
            </Accordion>
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
