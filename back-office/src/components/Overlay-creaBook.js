import React, { useState,useEffect } from 'react';
import '../App.css';
import { Modal, Button,Card, Form, Input,Tag,p} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, } from 'reactstrap';
import Tags from './Tags';
// import DropZone from './dropZone'
import Upload from './upload'
import InputFileCustom from './inputFile'


function ModalForm(props) {

const [visible,setVisible] = useState(true);
const [title,setTitle] = useState('');
const [authors,setAuthors] = useState('');
const [illustrators,setIllustrators]=useState('');
const [desc,setDesc]=useState('');
const [image,setImage]=useState();
const [errorMEssage,setErrorMessage]=useState({})

console.log("IDBOOK!",props.dataBook)

const dataSource = (img)=>{
  setImage(img)
  console.log("IMAGE OVERLAY",img)
}

const handleOk = async () => {

  // if (title == "" ){
  //   setErrorMessage({...errorMEssage, title :"Le titre est obligatoire"})
  // }else if(desc==""){
  //   setErrorMessage({...errorMEssage, desc:"La description est obligatoire"})
  // }else {
    // Les champs obligatoires sont remplis, on envoie
    //création d'un envoie de fichier
    var data = new FormData();

    // data.append('bookData',{
    //   "title":title,
    //   "authors":authors,
    //   "illustrators": illustrators,
    //   "desc": desc,
    //   'img' : image
    // });
    data.append('imageData',image)

    var creaBook = await fetch('http://192.168.1.28:3000/bo/creaBook',{
     method: 'POST',
    //  mode: 'no-cors',
    //  headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //  body: `title=${title}&authors=${authors}&illustrators=${illustrators}&desc=${desc}&img=${image}`
     body: data
   });

  //   console.log("REMPLI",authors,illustrators)  
  //   var creaBook = await fetch('http://192.168.1.28:3000/bo/creaBook',{
  //    method: 'POST',
  //    mode: 'no-cors',
  //    headers: {'Content-Type':'application/x-www-form-urlencoded',
  //    'Access-Control-Allow-Origin' : "*"
  //   },
  //    body: `title=${title}&authors=${authors}&illustrators=${illustrators}&desc=${desc}`
  //  });

  //  var resp = await creaBook.json()
   console.log('RESP',creaBook)
  // }
};  

 const handleCancel = () => {
   setErrorMessage({})
    setAuthors('')
    setIllustrators('')
    setDesc('') 
    props.handleClickParent(false)
  };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
  };
  const { TextArea } = Input;
        return (
    <Modal
    title="Nouveau Livre"
    visible={props.visible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
      <div >
        <p className="form" >Titre du livre:</p>
        <Input className="input" style={{marginBottom:20}}
        onChange={(e)=>{setTitle(e.target.value);setErrorMessage({...errorMEssage, title:""})}}
        value={props.dataBook?props.dataBook.title : title}/>
         {errorMEssage.title?<p className="alert">{errorMEssage.title}</p>:null}
         <p className="form">Auteurs:</p>
        <Input className="input" name="authors" placeholder="Séparés par des virgules"
          style={{marginBottom:20}}
          onChange={(e)=>{setAuthors(e.target.value)}}
          value={props.dataBook?props.dataBook.authors:authors}/>
         <p className="form">Illustrateurs:</p>
        <Input className="input" name="illustrators" placeholder="Séparés par des virgules"
          style={{marginBottom:20}} 
          onChange={(e)=>{setIllustrators(e.target.value)}}
          value={props.dataBook?props.dataBook.illustrators:illustrators}/>
         <p className="form">Image de couverture:</p>    
          {/* <DropZone/> */}
          {/* <Upload dataImage={dataImage}></Upload> */}
          <InputFileCustom dataSource={dataSource}></InputFileCustom>
         <p style={{marginTop:35}}className="form">Résumé de l'ouvrage:</p>
        <TextArea className="input" name="description" rows={4}
          style={{marginBottom:20}} 
          onChange={(e)=>{setDesc(e.target.value)}}
          value={props.dataBook?props.dataBook.description:desc} />
           {errorMEssage.desc?<p className="alert">{errorMEssage.desc}</p>:null}
         <p className="form">Catégories:</p>
        <Tags></Tags>
     </div>
</Modal>
      )
};



export default ModalForm