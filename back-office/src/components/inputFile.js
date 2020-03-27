import React, { useState,useEffect,Fragment } from 'react';
import { Input} from 'antd';

function inputFile(props){
    onchange=(e)=>{
        if((e.target.files !== null)&&(e.target.files !== undefined)) {
        let files=e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(files)
        reader.onload=(x)=>{
            props.dataSource(x.target.result)

        }
    }   else {
        console.log("componet input file boucle else ? ")
    }
    }
return (
    <div style={{width:"50%",height:20}}>
        <Input type="file" accept="image/*,audio/*,video/*"/>
    </div>
)
}

export default inputFile