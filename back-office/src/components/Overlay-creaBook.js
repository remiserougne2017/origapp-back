import React, { useState,useEffect } from 'react';
import '../App.css';
import { Modal, Button,Card, Form, Input,Tag} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import Tags from './Tags';
import DropZone from './dropZone'


function ModalForm(props) {

const [visible,setVisible] = useState(true);
const [confirmLoading,setConfirmLoading]= useState(false)

const handleOk = () => {
   
  };

 const handleCancel = () => {
    
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { TextArea } = Input;
        return (
    <Modal
    title="Nouveau Livre"
    visible={visible}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    >
     <div>
      <Form {...layout}>
        <Form.Item label="Titre du livre">
          <Input/>
        </Form.Item>
        <Form.Item label="Auteurs">
            <Input placeholder="Séparés par des virgules"/>
        </Form.Item>
        <Form.Item label="Illustrateurs">
            <Input placeholder="Séparés par des virgules"/>
        </Form.Item>
        <Form.Item label="image de couverture">
            <DropZone></DropZone>
        </Form.Item>
        <Form.Item label="Résumé de l'ouvrage">
        <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Catégories">
        <Tags></Tags>
        </Form.Item>
      </Form>
    </div>
</Modal>
      )
};



export default ModalForm