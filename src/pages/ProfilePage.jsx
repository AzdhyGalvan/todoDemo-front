import { Layout, Avatar, Descriptions, Form , Button,message,Upload} from "antd";
import {FormItem} from '../components'
import {useState} from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { editUserWs } from "../services/user-ws";

const { Content } = Layout;

function ProfilePage(props) {
    const [isEdit,setIsEdit] = useState(false)
    const [imageUrl,setImageUrl] = useState('')
  //{user,handleLogout,aunthentication}

const configUpload={
    name:'image',
    action:'http://localhost:5005/api/upload/single',
    onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
    
        if (info.file.status === 'done') {
            console.log("que es el info",info)
            setImageUrl(info.file.response.url.uri)
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
}


const onFinish = (values) => {
    editUserWs({...values,imageUrl})
    .then(res=>{

        const {status,data,errorMessage} = res;

        if(status){
            props.authentication(data.user)
            console.log("que es mi data",data)
        }
        else{
            console.log("Error actualizar",errorMessage)

        }
    })
}

  return (
    <Content>
      {/**Avatar o una tag para mostrar la iamgen del uisuario */}
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={props.user.imageUrl}

      />
      <Button onClick={()=>setIsEdit(prevState=> !prevState)} >
        Editar Perfil
      </Button>

        {isEdit ? "Se puede editar" : "no se puede"} 


      {/**puede se una card para mostrar la info del usuario */}
      <>
      <Descriptions title="User Info">
        <Descriptions.Item label="Nombre:">{`${props.user.firstName} ${props.user.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="email">{props.user.email}</Descriptions.Item>
        <Descriptions.Item label="rol">{props.user.role}</Descriptions.Item>
      </Descriptions>
      </>

      <Form onFinish={onFinish}>
        <FormItem
        label='Nombre'
        name='firstName'
        />
         <FormItem
        label='Apellido'
        name='lastName'
        />
         <FormItem
        label='Correo'
        name='email'
        disabled
        value={props.user.email}
        />
         <FormItem
        label='Correo'
        name='email'
        disabled
        value={props.user.role}
        />
        <Upload {...configUpload}>

        <Button icon={<UploadOutlined/>}> Click para autualicar</Button>
        </Upload>

        <FormItem
        type='button'
        button_text='Editar'
        wrapperCol={{
            offset: 8,
            span: 16,
          }}
  
        />

      </Form>
      
    </Content>
  );
}

export default ProfilePage;
