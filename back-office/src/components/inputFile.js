import React, { useState,useEffect,Fragment } from 'react';
import {  Input} from 'antd';

function inputFile(){
console.log("TYPE media?")
    // const [typeFile,setFileType]=useState()

    onchange=(e)=>{
        console.log("INFO!",e.target.files);
        // let files=e.target.files
        // let reader = new FileReader();
        // reader.readAsDataURL(files)
        // reader.onload=(x)=>{
        //     console.log("img Data",x.target.result)
        // }
    }
return (
    <div style={{width:"50%",height:20}}>
        <Input type="file" accept="image/*,audio/*,video/*"/>
    </div>
)
}

export default inputFile