import React from "react";
import TextField from "@material-ui/core/TextField";

/*
Text field use to get the Name of a Database
Props:
    input = callback function to update the name
*/
export default function DbNameInput(props) {
    //dbName = the value displayed in the text field    
    const [dbName, setdbName] = React.useState('');
    const handleInput = (event) => {
      //update the text display
      setdbName(event.target.value); 
      //update the value stored in the stepper state
      props.input(event.target.value)
    }

    return(
        <div style={{marginTop:10}}>
            <p> Give a display name for your Database in Firelounge </p>
            <TextField  
                style={{width:'80%'}}
                id="outlined-size-small"
                size={'small'}
                placeholder="..."
                variant={"outlined"}
                color={'secondary'}
                value={dbName}
                onChange={handleInput}
            />
        </div>
    )
}
