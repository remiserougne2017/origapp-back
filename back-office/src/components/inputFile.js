import React, { useState,useEffect,Fragment } from 'react';
import {  Input} from 'antd';

function inputFile(props){
    console.log("///////////////////////// OUT ON CHANGE", props.dataObject)
    // console.log("Input file est executé ")
    // const [typeFile,setFileType]=useState()
    onchange=(e)=>{
        // console.log("On change est executé ")
        console.log("///////////////////////// IN ON CHANGE", props.dataObject)
        // console.log("////////////////////",e.target.files)
        if(e.target.files !== null) {
        // console.log("INFO!",e.target.files[0]);
        let files=e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(files)
        reader.onload=(x)=>{
            // console.log("img Data",x.target.result)
            props.dataImage(x.target.result,props.dataObject.index,props.dataObject.type)

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