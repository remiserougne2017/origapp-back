import React, { useState} from 'react';
import {Form,Select,Button,Upload,Input,Row,Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
  

  function CustomForm(props){
  

    
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
   
  const normFile = e => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  
    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
  
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        // initialValues={{
        //   'input-number': 3,
        //   'checkbox-group': ['A', 'B'],
        //   rate: 3.5,
        // }}
      > 
      <Form.Item
      name="title"
      label="Titre"
      rules={[
        {
          required: true,
          message: 'Renseigner un titre',
        },
      ]}
    >
        <Input placeholder="Saisir le titre" />
    </Form.Item>
    <Form.Item
      name="authors"
      label="Auteur(s)"
    >
        <Input placeholder="Séparés par des virgules" />
    </Form.Item>
    <Form.Item
      name="illustrators"
      label="Illustrateur(s)">
          <Input placeholder="Séparés par des virgules" />
    </Form.Item>
    <Form.Item
      name="desc"
      label="Description"
      rules={[
        {
          required: true,
          message: 'Ajouter une description',
        },
      ]}>
          <TextArea />
    </Form.Item>
        <Form.Item
          name="upload"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action='http://192.168.1.28:3000/bo/upload'>
            <Button>
              <UploadOutlined />Cliquer pour charger un fichier
            </Button>
          </Upload>
        </Form.Item>  
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
  

  export default CustomForm
  