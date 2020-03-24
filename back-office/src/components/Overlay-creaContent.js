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

console.log("OVERLAY",props.idBook)
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



// Gestion de l'overlay
const handleOk = async () => {

  props.handleClickParent();
  var data = new FormData();
  let sendContentCreation = {
    idBook:props.idBook,
    title:title,
    imageContent:imageContent,
    page:page,
    media:inputMedia
}
console.log(sendContentCreation)
  data.append('contentData',JSON.stringify(sendContentCreation));
  var creaContent = await fetch(`${Ip()}/bo/creaContent`,{
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


};  

 const handleCancel = () => {
console.log('cancel')
props.handleClickParent()

  };




// Gestion des champs de l'objet media 

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
    copyInputMedia.push({ title: '', type: '' });
    setInputMedia(copyInputMedia);
  };

  const handleRemoveFields = index => {
    const copyInputMedia = [...inputMedia];
    copyInputMedia.splice(index, 1);
    setInputMedia(copyInputMedia);
  };

  // const dataImage = (img)=>{
  //   setImageContent(img);
  //   console.log("HELLO IM IMAGE CONTENT")

  // }

  
  const dataFieldImage = (img,index,type)=>{
    console.log("dataFieldImage est executé",type, index)
    if(type == 'imageMedia') {
      const copyInputMedia = [...inputMedia];
      copyInputMedia[index].sourceBase64 = img;
      setInputMedia(copyInputMedia);
      console.log("HELLO IM IMAGE MEDIA")
    }
    if(type == 'imageContent') {
      setImageContent(img);
      console.log("HELLO IM IMAGE CONTENT")
  
    }

  }
  

// RETURN GLOBAL
  
        return (
    <Modal
    title="Nouveau Contenu"
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
        <InputFileCustom  dataImage={dataFieldImage}  dataObject={{index:"NoIndex",type:'imageContent'}}></InputFileCustom>

        <Button
            type="primary"
            onClick={() => handleAddFields()}
            style = {{marginTop:40}}
        > Ajouter un media
        </Button>
          {inputMedia.map((inputField, index) => (

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
                <div>
                    <p className="form" >Source du media (si le fichier est sur votre ordinateur)</p>
                    <InputFileCustom dataImage={e => dataFieldImage(e,index,'imageMedia')} dataObject={{index:index,type:'imageMedia'}}></InputFileCustom>
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