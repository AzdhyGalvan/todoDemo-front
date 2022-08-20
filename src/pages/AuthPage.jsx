import { Form,Modal} from 'antd';
import { FormItem } from '../components';
import { Link,Navigate,useLocation,useNavigate } from 'react-router-dom';
//me traigo mis servicios !! LoginWS SignupWS
import { loginWs, signupWs} from '../services/auth-ws'

const AuthPage = (props) => {


const location = useLocation()
console.log('Que es location',props)
const navigate = useNavigate()



  const onFinish = (values) => {

    if(location.pathname === '/signup' && values.password !==values.confirmPassword){
      return Modal.error({content:"Tus contraseñas no coiciden"})
    }

    //forma dinamica para validar el login
    const service = location.pathname === '/signup' ? signupWs(values) : loginWs(values)


    service
    .then(res=>{
      const{ data,status,errorMessage} = res
      if (status){
        console.log("el data",data)
        props.authentication(data.user)
        Modal.success({content:"Todo chido ya pudiste entrar"})
        navigate('/profile')
        return;
      }else{
        //pueden guardar el errorMessage en un state para mostrrlo en el html
        Modal.error({content:errorMessage})
      }
      
    })
   
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
     
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/** CON IF TERNARIO
       *  {location.pathname === '/signup' ?
    <>
      <FormItem
      label='Nombre'
      name='firstName'
      type='text'
      />
      
      <FormItem
      label='Apellido(s)'
      name='lastName'
      type='text'
      />
    </> : null
    }
       */}



    {location.pathname === '/signup' &&
    <>
      <FormItem
      label='Nombre'
      name='firstName'
      type='text'
      />
      
      <FormItem
      label='Apellido(s)'
      name='lastName'
      type='text'
      />
    </>
    }
      <FormItem
        label="Email"
        name="email"
        type='text'
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu correo!',
          },
        ]}
      />
  
   

      <FormItem
        label="Password"
        name="password"
        type='password'
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu password!',
          },
        ]}
      />
      
      {location.pathname === '/signup' &&
        <FormItem
        label='Confirma tu contraseña'
        name='confirmPassword'
        type='password'
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu  password!',
          },
        ]}
        
        />
      }
       

      <FormItem
      button_text='Guardar'
      name='button'
      type='button'
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        
      />
        
        {location.pathname === '/signup' ? 
        <p>Si ya tienes cuenta,<Link to='/login'> ingresa</Link></p>
        :
        <p>Si aun no tienes cuenta,<Link to='/signup'> registrate</Link></p>
      }



      
    </Form>
  );
};

export default AuthPage;