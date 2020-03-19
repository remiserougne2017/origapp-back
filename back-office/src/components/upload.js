import React, { useState } from 'react'
import { Upload, Button,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadComp(props){
    const [image,setImage]=useState()
    const fileList = [];
    

    const propsUp = {
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      action:'http://192.168.1.28:3000/bo/upload',
      headers: {'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin' : "*"},
      listType: 'picture',
      defaultFileList: [...fileList],

      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log("INFO!",info.file, info.fileList);
          setImage(info.file)
          props.dataImage(info.file)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    console.log("IMAGE",image)
    return(
      <div>
        <Upload {...propsUp}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </div>
    );
}

export default UploadComp