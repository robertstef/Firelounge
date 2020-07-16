/* Defines the content for the add project page */
import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import CustomizedTable from "./Table"


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