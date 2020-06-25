import React, {Component} from 'react';
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

/**
 * Generate a random 5 digit hex value to ensure a unique project id
 * @returns {string} - the randomized 5 digit hex value
 */

class NewProjectExpansion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            proj_name: '',
            proj_path: '',
            proj_id: '',
            hex: this.random_hex(),
            isHostingOpen: false,
            hosting: {
                public_dir: '',
                single_page_app: null,
            },
            config: {
                hosting: false,
                database: false,
                storage: false,
                functions: false,
            }
        }
    }

    /**
     * Handler for project naming
     * @param: Event e
     */
    handleProj_Name(e) {
        this.setState({proj_name: e.target.value});
        this.setState({proj_id: `${e.target.value.replace(/\s+/g, '-').toLowerCase()}-` + this.state.hex})
    }


    random_hex() {
        var letters = '0123456789abcdef';
        var hex_val = '';
        for (var i = 0; i < 5; i++) {
            hex_val += letters[Math.floor(Math.random() * 16)];
        }
        return hex_val;
    };



    /**
     * Handler for the state changing of the config and flag variables for the ExpansionPanel for the new project
     * @param: feature: the feature being selected
     */
    handleFeatureSelection(feature) {
        switch(feature) {
            case "hosting":
                this.setState({isHostingOpen: !this.state.isHostingOpen});
                this.setState({config: {...this.state.config, hosting: !this.state.isHostingOpen}});
                break;

            //  more will be added as we increase feature support

            default:
                console.log("Invalid Feature");
        }
    }
    
    /**
     * Handler for the state changing of feature preferences for feature Hosting
     *  @param e: the event
     *  @param pref: the preference being changed
     *         "public-dir" - the public directory choice for hosting
     *         "single-pg" - the choice of whether the user wants hosting to be configured as a single page app
     */
    handleHostingPreferences(e, pref) {
        switch (pref) {
            case "public-dir":
                this.setState({hosting: {...this.state.hosting, public_dir: e.target.value}});
                break;
            case "single-pg":
                this.setState({hosting: {...this.state.hosting, single_page_app: e.target.value}});
                break;
            default:
                console.log("Invalid Preference");
        }
    }

    handlePathSelection = (path) => {
        this.setState({proj_path: path})
    };

    //TODO: get a directory path for the location of the project initialization
    //TODO: components styling (if you dare)
    render() {
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
                        onChange={(e) => this.handleProj_Name(e)}
                    />
                </div>
                <div style={{marginTop: 10}}/>
                <GetPathButtonNewProject path={this.handlePathSelection}/>
                <div style={{marginTop: 10}}/>
                <ExpansionPanel expanded={this.state.isHostingOpen} style={{boxShadow: 'none', WebkitBoxShadow: 'none', MozBoxShadow: 'none'}}>
                    <ExpansionPanelSummary
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <FormControlLabel
                            control={<Checkbox />}
                            onClick={(event) => {event.stopPropagation(); this.handleFeatureSelection("hosting")}}
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
                                    onChange={(e) => this.handleHostingPreferences(e, "public-dir")}
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
                                <Select value={this.state.hosting.single_page_app} onChange={(e) => this.handleHostingPreferences(e, "single-pg")}>
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
                    createCloudProj.createCloudProject_function([this.state.proj_name, this.state.proj_path, this.state.proj_id]).then((output) => {
                        console.log(output); // log the data for the sake of viewing the result
                        const initFirebase = require('../../scripts/createProject/initFirebasejson');
                        initFirebase.initFireBasejson_function(this.state)
                    }).catch(err => {
                        console.log(err);
                    });
                }}>
                    Submit
                </Button>
            </div>
        );
    }
}

export default NewProjectExpansion
