import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Applayout } from '../components/adminComponents/Applayout'
import { Dashboard } from '../pages/AdminPages/Dashboard'
import { Candidates } from '../pages/AdminPages/Candidates'
import { Jobs } from '../pages/AdminPages/Jobs'

import { ClientApplayout } from '../components/clientComponents/ClientApplayout'
import { LandingPage } from '../pages/ClientPages/Home'
import { JobsPage } from '../pages/ClientPages/Jobs'
import { Companies } from '../pages/ClientPages/Companies'
import { About } from '../pages/ClientPages/About'
import {AiInterview } from '../pages/ClientPages/Interview'
import { ApplyNow } from '../pages/ClientPages/ApplyNow'
import { Login } from '../pages/auth/login'
import { Signup } from '../pages/auth/Signup'
import { ResumeDashboard } from '../pages/AdminPages/resumeStats'
import { Courses} from '../pages/ClientPages/Courses'
import { ShortlistPage } from '../pages/AdminPages/ShortlistPage'
import { AdminSignup } from '../pages/auth/adminsignup'
import { AdminLogin } from '../pages/auth/adminlogin'


const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Applayout/>,
      children:[
        {
          path:"/",
          element: <Dashboard/>
        },
        {
          path:"/candidates",
          element:<Candidates/>
        },{
          path:'/jobs',
          element:<Jobs/>
        },{
          path:'/:jobId/resumestats',
          element:<ResumeDashboard/>,
        }
        ,{
          path:'/:jobId/resumestats/:status',
          element:<ShortlistPage/>,
        },{
          path:'/adminsignup',
          element: <AdminSignup/>
        },{
          path: '/adminlogin',
          element: <AdminLogin/>
        }
        
      ]
    },
    {
      path: "/",
      element:<ClientApplayout/>,
      children:[
        {
          path:"/home",
          element: <LandingPage/>
        },{
          path:'/clientjobs',
          element:<JobsPage/>,
          
        },{
          path:'/companies',
          element:<Companies/>,

        }
        ,{
          path:'/about',
          element:<About/>
        },{
          path:'/courses',
          element:<Courses/>
        },
        {
          path:'/clientjobs/:applyId',
          element:<ApplyNow/>
        },{
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },{
          path:'/interview',
          element:<AiInterview/>
        }

        
        
       
      ]
    }
  ])

  return(
    <RouterProvider router={router}/>
  )
}

export default App