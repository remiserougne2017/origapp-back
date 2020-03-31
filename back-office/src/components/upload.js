import React, { useState } from 'react'
import { Upload, Button,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadComp(props){
    const fileList = [];
    

    const propsUp = {
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      action:'/bo/upload',
      // headers: {'Content-Type':'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin' : "*"},
      listType: 'picture',
      defaultFileList: [...fileList],

      onChange(info) {
        if (info.file.status !== 'uploading') {
          
          console.log("upload Comp INFO!",info.file.response.imagePath);
          props.dataSource(info.file.response.imagePath)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return(
      <div>
        <Upload {...propsUp}>
          <Button>
            <UploadOutlined /> Sélectionnez un fichier
          </Button>
        </Upload>
      </div>
    );
}

export default UploadComp