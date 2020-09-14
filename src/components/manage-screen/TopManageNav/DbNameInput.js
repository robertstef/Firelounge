import React from "react";
import TextField from "@material-ui/core/TextField";
import {UserState} from '../../../context/userContext'
import InfoIcon from '@material-ui/icons/Info';
import Chip from '@material-ui/core/Chip';



   // chip label that states if there is another db defined
   const db_chip = <Chip 
   variant="outlined" 
   icon={<InfoIcon/> }
   label='Database already defined for this project.' 
   color='secondary'
   style={{marginTop: '10px'}}
 />

/*
Text field use to get the Name of a Database
Props:
    input = callback function to update the name
*/
export default function DbNameInput(props) {
    const {user} = UserState();  
    //dbName = the value displayed in the text field    
    const [dbName, setdbName] = React.useState('');
    const [dbURL, setdbURL] = React.useState('');
    
    const handleInput = (event) => {
      //update the text display
      if(event.target.id === 'manage-db-stepper-input-url') {
        setdbURL(event.target.value);
        //update the value stored in the stepper state
        props.url(event.target.value)
      } else {
        setdbName(event.target.value); 
        //update the value stored in the stepper state
        props.input(event.target.value)
      }
    }

    return(
        <div style={{marginTop:10}}> 
            <p> Give a display name for your Database in Firelounge </p>
            <TextField  
                style={{width:'80%'}}
                id="db-name"
                id={'manage-db-stepper-input-name'}
                size={'small'}
                placeholder="..."
                variant={"outlined"}
                color={'secondary'}
                value={dbName}
                onChange={handleInput}
            />
            <p> Give the URL for your database if it's not the default</p>
            <TextField  
                style={{width:'80%'}}
                id={'manage-db-stepper-input-url'}
                size={'small'}
                placeholder="..."
                variant={"outlined"}
                color={'secondary'}
                value={dbURL}
                onChange={handleInput}
            />
             { (Object.keys(user.act_proj_db_list).length === 0) ?  null : db_chip }
        </div>
    )
}
