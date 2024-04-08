import Home from "../pages/Home";
import Map from "../pages/Map";
import Forum from "../pages/Forum";
import MyPage from "../pages/MyPage";
// import { Route, Routes } from "react-router-dom";

export const routerInfo = [
    {   
        path: '/',
        element : <Home/>
    },
        
    {    
        path: "/mypage",
        element: <MyPage/>
    },
    
    {   
        path: "/forum",
        element: <Forum/>
    },

    {
        path: "/map",
        element: <Map/>

    },




        // children : [
        //     {
                 
              
        //     }
        // ]
    
]
