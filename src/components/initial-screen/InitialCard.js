import React from 'react';
import Card from "@material-ui/core/Card";
import FlexTag from "./FlexTag";
import Typography from "@material-ui/core/Typography";


function InitialCard(){
    return(
        <div>
            <Card
                style={{
                    width: 300,
                    margin:'auto',
                    paddingLeft:15,
                    paddingBottom: 15,
                }}
            >
                <h3>
                    Opench Firebase
                </h3>
                <Typography variant={'body2'} style={{marginLeft:5}}>
                    Lorem ipsum dolor sit amet, sea everti indoctum cu. Scribentur theophrastus
                    cu nec. Sit dolore aliquip vituperatoribus in, movet neglegentur suscipiantur eum ne.
                    Noluisse temporibus et vel, wisi causae electram ex est, eos quas phaedrum praesent in.
                </Typography>
                <div style={{marginTop: 60}}/>
                <div style={{display: 'flex', justifyContent:'center',}}>
                    <FlexTag
                        title={"Sign-in With Google"}/>
                </div>
            </Card>
        </div>
    )
}

export default InitialCard;
