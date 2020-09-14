import React, {useEffect, useState} from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view';
import {UserState} from "../../../context/userContext";

function QueryResultContainer({queryString}) {
    const {user} = UserState(); 
    const sql = require('../../../queries-Robert/execQuery'); 
    const [result, setResult] = useState({})    

    useEffect(() => {
        async function runQuery() {
            if(queryString !== ''){
                try {
                    let response = await sql.executeQuery(queryString, user.db_obj, false)
                    setResult(response)
                } catch (error){
                    console.log(error)
                }
              }
        }
      runQuery();
    }, [queryString])

    
    
    return (
        <>
            { Object.keys(result).length === 0 ? 
            null
            :
            <ReactJson 
                name={false}
                collapsed={2}
                src={result}
            />}
        </>
    );  
}

export default QueryResultContainer;