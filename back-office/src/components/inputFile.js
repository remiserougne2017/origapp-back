import React, { useState,useEffect,Fragment } from 'react';
import {  Input} from 'antd';

function inputFile(props){
console.log("TYPE media?")
    // const [typeFile,setFileType]=useState()

    onchange=(e)=>{
        console.log("INFO!",e.target.files[0]);
        let files=e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(files)
        reader.onload=(x)=>{
            console.log("img Data",x.target.result)
            props.dataImage(x.target.result)

        }
    }
return (
    <div style={{width:"50%",height:20}}>
        <Input type="file" accept="image/*,audio/*,video/*"/>
    </div>
)
}

export default inputFile