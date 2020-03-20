import React, { useState,useEffect,Fragment } from 'react';
import '../App.css';
import { Modal, Button,Card, Form, Input,p,Select} from 'antd';
import {DeleteOutlined } from '@ant-design/icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, } from 'reactstrap';


function OverlayContent(props) {

const [title,setTitle] = useState('');
const [page,setPage] = useState('');
const [media,setMedia]=useState('');
const [errorMEssage,setErrorMessage]=useState({})
const { Option } = Select;
const [inputMedia, setInputMedia] = useState([{ 
    idBook:'',
    type: '', 
    title: '',
    text:'',
    source:'',
    duration:'',
     }
  ])


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
    console.log("inputFields", inputMedia);
  console.log("OK",media,title,page);
  props.handleClickParent();
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
        copyInputMedia[index].source = event.target.value;
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
      console.log(inputMedia)
    const copyInputMedia = [...inputMedia];
    copyInputMedia.splice(index, 1);
    setInputMedia(copyInputMedia);
  };


  console.log("//////////",inputMedia)

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

        <Button
            type="primary"
            onClick={() => handleAddFields()}
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
                    <p className="form" >Type de media (work in progress)</p>
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
                    <p className="form" >Source du media (pour les vidéos, les images et les audios)</p>
                    <Input
                        type="text"
                        name = 'mediaSource'
                        onChange={event => handleInputChange(index, event)}
                        value={inputField.source}
                        />
                </div>
                <div>
                    <p className="form" >Duration</p>
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
        page:page,
        media:inputMedia
    }
        )}
</div>
</Modal>
      )
};



export default OverlayContent