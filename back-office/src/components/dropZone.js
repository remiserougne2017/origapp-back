import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone'
import request from "superagent";

function MyDropzone() {
    const onDrop = (files) => {
            // POST to a test endpoint for demo purposes
            const req = request.post('https://httpbin.org/post');
        
            files.forEach(file => {
              req.attach(file.name, file);
            });
        
            req.end();
          }
    
    return(
    <Dropzone  
     onDrop={acceptedFiles =>{console.log(acceptedFiles); onDrop()}}>
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
//   const onDrop = useCallback((acceptedFiles) => {
//       console.log("HEO FILE 1")
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader()

//       reader.onabort = () => console.log('file reading was aborted')
//       reader.onerror = () => console.log('file reading has failed')
//       reader.onload = () => {
//       // Do whatever you want with the file contents
//         const binaryStr = reader.result
//         console.log("HEHO FILE2",binaryStr)
//       }
//       reader.readAsArrayBuffer(file)
// //     })
//   }, [])
        
// const onDrop = (files) => {
//     // POST to a test endpoint for demo purposes
//     const req = request.post('https://httpbin.org/post');

//     files.forEach(file => {
//       req.attach(file.name, file);
//     });

//     req.end();
//   }

//   return (
//     <div className="App">
//       <ReactDropzone
//         // onDrop={onDrop}
//       >
//         Drop your best gator GIFs here!!
//       </ReactDropzone>
//     </div>
//   );

//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

//   return (
//     <div {...getRootProps()} style={{height:100, border: '0.5px solid gray'}}>
//       <input {...getInputProps()}
//         onDrop={()=>{console.log("DROP!!")}}
//        style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}/>
//       {
//         isDragActive ?
//           <p>Sélectionnez vos fichiers</p> :
//           <p style={{textAlign:"center", marginTop:10}}>Glissez/Déposer votre fichier ou cliquer</p>
//       }
//     </div>
//   )
}

export default MyDropzone