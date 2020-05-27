/* Defines the content for the add project page */

import React, {Component} from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import CustomizedTable from "./Table"

const theme = createMuiTheme({
    pallette: {
        primary: {
            main: '#ef223c'
        },
        secondary: {
            main: '#8d99ae'
        }
    }
});

class AddProjContent extends Component {

    render() {
        return(
            <div>
                <Typography variant="h6" gutterBottom>
                    Add Projects to Firelounge
                </Typography>
                <CustomizedTable/>
            </div>
        );
    }
}

export default AddProjContent;