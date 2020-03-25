import React, { useState,useEffect,Fragment } from 'react';
import '../App.css';
import { Modal, Button,Card, Form, Input,p,Select} from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, } from 'reactstrap';
import InputFileCustom from './inputFile';
import Ip from './Ip'


function OverlayContent(props) {

const [title,setTitle] = useState('');
const [page,setPage] = useState('');
const [errorMEssage,setErrorMessage]=useState({})
const { Option } = Select;
const [imageContent,setImageContent]=useState("");
const [inputMedia, setInputMedia] = useState([{ 
    type: '', 
    title: '',
    text:'',
    sourceUrl:'',
    sourceBase64:'',
    duration:'',
     }
  ])
  const [inputIndex,setInputIndex]=useState()
  const [sourceFormType,setSourceFormType]=useState("sourceContent")



// Load editable information from DB
useEffect( ()=> {
  async function editContent() {
    if(props.idContent == 'new-content') {
      setTitle("");
      setPage("");
      setImageContent("");
      setInputMedia([{ 
        type: '', 
        title: '',
        text:'',
        sourceUrl:'',
        sourceBase64:'',
        duration:'',
         }])
    } else {
      var contentData = await fetch(`${Ip()}/bo/editContent`, { 
              method: 'POST',
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              body: `idBook=${props.idBook}&idContent=${props.idContent}`
            }
      );
      var contentDataJson = await contentData.json();
      // console.log("//////////////////////",contentDataJson.dataFromBack)
      if(contentDataJson.dataFromBack !== undefined) {
        setTitle(contentDataJson.dataFromBack.title);
        setPage(contentDataJson.dataFromBack.page);
        setImageContent(contentDataJson.dataFromBack.imageContent);
        setInputMedia(contentDataJson.dataFromBack.mediaData)
      }

      }   
    }
      editContent();
},[props.isVisible])


// Liste des medias disponibles dans le form
const mediaType = ['Texte','Image','Audio','Video','Citation']
let mediaDropdown = mediaType.map((type,j) => {
    return(
        <Option 
            key={j}
            value={type}
            >{type}</Option>
    )
})



// Gestion de l'overlay : envoie au DB on ok et cancel
const handleOk = async () => {

  props.handleClickParent();
  var data = new FormData();
  let sendContentCreation = {
    idBook:props.idBook,
    idContent:props.idContent,
    title:title,
    imageContent:imageContent,
    page:page,
    media:inputMedia
}
  data.append('contentData',JSON.stringify(sendContentCreation));
  var creaContent = await fetch(`${Ip()}/bo/saveContent`,{
    method: 'POST',
    body: data
  });

  setInputMedia([{ 
    type: '', 
    title: '',
    text:'',
    sourceUrl:'',
    sourceBase64:'',
    duration:'',
     }]);
  setTitle('');
  setPage('');
  setImageContent('');


};  

 const handleCancel = () => {
console.log('cancel')
props.handleClickParent()

  };




// Gestion des champs du form

const handleInputChange = (index, event) => {
    const copyInputMedia = [...inputMedia];

    if(event.target == undefined) {
        copyInputMedia[index].type = event;
    }
    else {
 
    switch (event.target.name) {
        case 'mediaTitle': 
        copyInputMedia[index].title = event.target.value;
        break;
    
        case 'mediaSource': 
        copyInputMedia[index].sourceUrl = event.target.value;
        break;
    
        case 'mediaText': 
        copyInputMedia[index].text = event.target.value;
        break;
    
        case 'mediaDuration':
        copyInputMedia[index].duration = event.target.value;
        break;

        case 'mediaType':
        copyInputMedia[index].type = event.target.value;
        break;

        default:
        console.log("ERROR")
    }
    }

    setInputMedia(copyInputMedia);
  };

  const handleAddFields = () => {
    const copyInputMedia = [...inputMedia];
    copyInputMedia.push({ 
      type: '', 
      title: '',
      text:'',
      sourceUrl:'',
      sourceBase64:'',
      duration:'',
       });
    setInputMedia(copyInputMedia);
  };

  const handleRemoveFields = index => {
    const copyInputMedia = [...inputMedia];
    copyInputMedia.splice(index, 1);
    setInputMedia(copyInputMedia);
  };


  
  const dataFieldSource = (img,type)=>{
    if(type == 'sourceMedia') {
      const copyInputMedia = [...inputMedia];
      copyInputMedia[inputIndex].sourceBase64 = img;
      setInputMedia(copyInputMedia);
    }
    if(type == 'sourceContent') {
      setImageContent(img);
  
    }

  }
  

// RETURN GLOBAL

        return (
    <Modal
    title="Edition d'un contenu"
    visible={props.isVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
      <div >
        <p className="form" >Titre du contenu:</p>
        <Input className="input" style={{marginBottom:20}}
            onChange={(e)=>{setTitle(e.target.value)}}
            value={title}/>
        <p className="form" >Numero de page :</p>
        <Input className="input" style={{marginBottom:20}}
            onChange={(e)=>{setPage(e.target.value)}}
            value={page}/>
        <p className="form" >image de couverture du contenu:</p>
        <InputFileCustom  dataSource={e => {setSourceFormType('sourceContent');console.log("index, source content",inputIndex);dataFieldSource(e,sourceFormType)}}></InputFileCustom>

        <Button
            type="primary"
            onClick={() => handleAddFields()}
            style = {{marginTop:40}}
        > Ajouter un media
        </Button>
          {inputMedia.map((inputField, index) => { 

            return(
            (
            <Fragment key={`${inputField}~${index}`}>
              <div style = {{marginTop:15, padding:10,backgroundColor:'#ECF0F1',borderRadius:5}}>
                <div style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <p className="form" style = {{marginBottom:10,fontSize:18}}>Nouveau media</p>
                    <DeleteOutlined style={{fontSize: 20,marginLeft:'auto',marginRight:10}}                    
                        onClick={() => handleRemoveFields(index)}
                    />
                </div>
                <div>
                    <p className="form" >Type de media</p>
                    <Select
                        name = 'mediaTitle'
                        defaultValue="Séléctionner"
                        onChange={value => handleInputChange(index, value)}
                        value= {inputField.type}
                         >
                        {mediaDropdown}
                    </Select>
                </div>
                <div>
                    <p className="form" >Titre</p>
                    <Input
                    type="text"
                    name = 'mediaTitle'
                    onChange={event => handleInputChange(index, event)}
                    value={inputField.title}
                    />
                </div>
                <div>
                    <p className="form" >Texte (pour le media texte)</p>
                    <Input
                        type="text"
                        name = 'mediaText'
                        onChange={event => handleInputChange(index, event)}
                        value={inputField.text}
                        />
                </div>
                <div>
                    <p className="form" >Source du media (si url)</p>
                    <Input
                        type="text"
                        name = 'mediaSource'
                        onChange={event => handleInputChange(index, event)}
                        value={inputField.sourceUrl}
                        />
                </div>
                  <div onClick = {() =>{setInputIndex(index);setSourceFormType('sourceMedia') }}>
                      <p className="form" >Source du media (si le fichier est sur votre ordinateur)</p>
                      <InputFileCustom dataSource={e => {console.log("index, source media",inputIndex,sourceFormType);dataFieldSource(e,sourceFormType)}}></InputFileCustom>
                  </div>
                <div>
                    <p className="form" style = {{marginTop:20}} >Duration</p>
                    <Input
                        type="text"
                        name = 'mediaDuration'
                        onChange={event => handleInputChange(index, event)}
                        value={inputField.duration}
                        />
                </div>

              </div>
            </Fragment>
          ))}
          )}
    </div>
    <div>hello Content in creation   {JSON.stringify({
        title:title,
        imageContent:imageContent,
        page:page,
        media:inputMedia
    }
        )}
</div>
</Modal>
      )
};



export default OverlayContent