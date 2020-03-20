import React, { useState,useEffect } from 'react';
import '../App.css';
import { Modal,} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomForm from './Form'

function ModalForm(props) {

const [visible,setVisible] = useState(true);
const [title,setTitle] = useState('');
const [authors,setAuthors] = useState('');
const [illustrators,setIllustrators]=useState('');
const [desc,setDesc]=useState('');
const [image,setImage]=useState();
const [errorMEssage,setErrorMessage]=useState({})

const dataImage = (img)=>{
  setImage(img)
  console.log("IMAGE OVERLAY",img)
}
        return (
    <Modal
    title="Nouveau Livre"
    visible={props.visible}
    cancelButtonProps={{ style: { display: 'none' } }}
    okButtonProps={{ style: { display: 'none' } }}
    >
<CustomForm dataImage={dataImage}></CustomForm>
</Modal>
      )
};



export default ModalForm