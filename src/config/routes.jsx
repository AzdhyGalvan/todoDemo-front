//importar mis pages
import { AuthPage,ProfilePage} from '../pages'

const routes =(props)=>{
return[
    {
    path:'/', //Homepages
    element:<h1>Este es el home </h1>
    },
    {
        path:'/login',
        element:<AuthPage {...props}/>
    },
    {
        path:'/signup',
        element:<AuthPage  {...props}/>
    },
    {
        path:'/profile',
        element:<ProfilePage {...props}  />
    }

]

}

export default routes