import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone'
import request from "superagent";
import cuid from "cuid";

function MyDropzone() {
    // const onDrop = (files) => {
    //         // POST to a test endpoint for demo purposes
    //         const req = request.post('https://httpbin.org/post');
        
    //         files.forEach(file => {
    //           req.attach(file.name, file);
    //         });
        
    //         req.end();
    //       }
    const [images,setImages]=useState([])
    const onDrop = useCallback(acceptedFiles => {
        // Loop through accepted files
        acceptedFiles.map(file => {
          // Initialize FileReader browser API
          const reader = new FileReader();
          // onload callback gets called after the reader reads the file data
          reader.onload = function(e) {
            // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
            setImages(prevState => [
              ...prevState,
              { id: cuid(), src: e.target.result }
            ]);
          };
          // Read the file as Data URL (since we accept only images)
          reader.readAsDataURL(file);
         
          return file;
        });
        console.log("FILE!!",acceptedFiles)


      }, []);
      
    return(
    <Dropzone  
     onDrop={acceptedFiles =>{console.log(acceptedFiles); onDrop(acceptedFiles)}}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()} 
        style={{height:100, border: '0.5px solid gray'}}>
        <input {...getInputProps()} type="file" />
        <p style={{textAlign:"center", marginTop:10}}>Glissez/Déposer votre fichier ou cliquer</p>
      </div>
    </section>
  )}
</Dropzone>
)
}

export default MyDropzone