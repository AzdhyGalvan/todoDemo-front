import { useEffect,useState } from "react";
import "./App.css";
import routes from "./config/routes";
import {Routes,Route, useNavigate} from 'react-router-dom'
import { Navbar } from "./components";
import {logoutWs} from './services/auth-ws'
import {Modal} from 'antd'
import { Content } from "antd/lib/layout/layout";

//importar los componentes/funciones que sean globales 
function App() {
 
//unciones globales

const [user,setUser] = useState(null)

const navigate = useNavigate()

function authentication(user){
  setUser(user)
}

function handleLogout(){
  //ejecutar el endpoint para hacer logout y borrar el state

  Modal.confirm({
    title:"Cerrar Sesion",
    content:"Estas seguro que deseas cerrar sesion",
    onOk(){
      logoutWs().then((res) => {
        const { data, status, errorMessage } = res;
        if (status) {
          Modal.success({content:data.successMessage});
          navigate('/')
          setUser(null);
        } else {
          alert(errorMessage);
        }
      });
    }
  })


  
}



  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout}/>
    <Routes>
      {routes({user,handleLogout,authentication}).map(({path,element},index_route)=><Route key={path} {...{path,element}} />)}
    </Routes>


    </div>
  );
}

export default App;
