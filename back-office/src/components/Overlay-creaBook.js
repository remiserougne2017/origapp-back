import React, { useState,useEffect } from 'react';
import '../App.css';
import { Modal, Input} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import Tags from './Tags';
import Upload from './upload'


function ModalForm(props) {

const [visible,setVisible] = useState(true);
const [title,setTitle] = useState('');
const [authors,setAuthors] = useState('');
const [illustrators,setIllustrators]=useState('');
const [desc,setDesc]=useState('');
const [image,setImage]=useState();
const [errorMEssage,setErrorMessage]=useState({})
const [urlImage,setUrlImage]= useState("")
const  [category,setCategory]=useState([])
const [arrayTag,setArrayTag]=useState([])

//function parent inputFile custom
const dataSource = (img)=>{
  setImage(img)
  setUrlImage("")
  console.log("IMAGE OVERLAY",img)
}
//fonction parent TAG
const tagsBook =(arrayTags)=>{
  var newArray = arrayTags.map(t=>{
    return t._id
  })
  setArrayTag(newArray)
  console.log("Parent Tags",newArray)
}

useEffect(()=>{
  if(props.dataBook){
    setTitle(props.dataBook.title)
    setAuthors(props.dataBook.authors)
    setIllustrators(props.dataBook.illustrators)
    setDesc(props.dataBook.description)
    setUrlImage(props.dataBook.coverImage)
  }
},[props.dataBook])

const creaUpdateBook= async ()=>{

  console.log("UpdateCreaBook",props.dataBook,title,arrayTag)
  var fetchRoute
  if(props.dataBook){
    console.log("updateBook")
    fetchRoute = `updateBook/${props.dataBook.id}`
  }else{
    console.log("CreaBook")
    fetchRoute=`creaBook/${props.publisher}`
  }


    // data.append('imageData',image)
console.log("FETCH UPDATE OU CREA?",fetchRoute)
    var creaBook = await fetch(`/bo/${fetchRoute}`,{
     method: 'POST',
    //  mode: 'no-cors',
     headers: {'Content-Type':'application/x-www-form-urlencoded'},
     body: `title=${title}&authors=${authors}&illustrators=${illustrators}
     &desc=${desc}&img=${urlImage}&category=${arrayTag}&image64=${image}`
    //  body: data
   });
}

const handleOk = async () => {
    console.log("fiel obl",title,desc,authors,image,urlImage)
  if (title == ""|| desc==""||authors==""||(image=="" && urlImage=="")){
    console.log("erreur champs obl")
    setErrorMessage({...errorMEssage, title :"Le titre, le(s) auteur(s), une image et une description sont obligatoires"})
  }else{
    creaUpdateBook()
    props.handleClickParent(false)
    setErrorMessage({})
    setAuthors()
    setIllustrators()
    setDesc() 
    setImage()
    setUrlImage()
    setTitle()
    setCategory([])
  }


};  

 const handleCancel = () => {
  setErrorMessage({})
  setAuthors()
  setIllustrators()
  setDesc() 
  setImage()
  setUrlImage()
  setTitle()
  setCategory([])
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
        value={title}/>
         {errorMEssage.title?<p className="alert">{errorMEssage.title}</p>:null}
         <p className="form">Auteurs:</p>
        <Input className="input" name="authors" placeholder="Séparés par des virgules"
          style={{marginBottom:20}}
          onChange={(e)=>{setAuthors(e.target.value)}}
          value={authors}/>
         <p className="form">Illustrateurs:</p>
        <Input className="input" name="illustrators" placeholder="Séparés par des virgules"
          style={{marginBottom:20}} 
          onChange={(e)=>{setIllustrators(e.target.value)}}
          value={illustrators}/>
        <p className="form">Image de couverture:</p>    
        <div style={{display:"flex", flexDirection:"row", height:37}}>
          {/* <DropZone/> */}
          <Upload dataSource={dataSource}></Upload>
          {/* <InputFileCustom dataSource={dataSource}></InputFileCustom> */}
          <p style={{margin:5}}>ou</p>
          <Input className="input" name="urlImage" 
          onChange={(e)=>{setUrlImage(e.target.value);setImage()}} placeholder="url de l'image"
          value={urlImage}/>
        </div>
         <p style={{marginTop:35}}className="form">Résumé de l'ouvrage:</p>
        <TextArea className="input" name="description" rows={4}
          style={{marginBottom:20}} 
          onChange={(e)=>{setDesc(e.target.value)}}
          value={desc} />
           {errorMEssage.desc?<p className="alert">{errorMEssage.desc}</p>:null}
         <p className="form">Catégories:</p>
         {props.dataBook?  <Tags selectedTags={props.dataBook.category} tagsBook={tagsBook}></Tags> : <Tags selectedTags={[]}  tagsBook={tagsBook}></Tags>}
     </div>
</Modal>
      )
};

function mapStateToProps(state) {
  return { token: state.token,
           publisher: state.publisher
   }
}

export default connect(mapStateToProps,null)(ModalForm)

