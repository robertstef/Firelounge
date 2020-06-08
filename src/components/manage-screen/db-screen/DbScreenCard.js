import React from 'react'
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

function DbScreenCard() {


    const GetData = () => {
        return ('Hellow World')
    };


    return(
        <div style={{height: '100%', width: '100%'}}>
            <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                <GetData/>
            </Card>
        </div>
    )
}

export default DbScreenCard;


