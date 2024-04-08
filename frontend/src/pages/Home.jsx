import Game from "../components/home/Game"
import { Canvas } from "@react-three/fiber";
import OnlySave from "../components/common/functions/OnlySave";
import { Loader, OrbitControls } from "@react-three/drei";
import {createContext ,Suspense, lazy, useContext, useState, useEffect } from "react";
import * as THREE from 'three';
import { useThree, useLoader } from "@react-three/fiber";
import Dialogue from "../components/common/modals/Dialogue";
import { Outlet, useNavigate } from "react-router-dom";
import Center from "@/components/common/modals/Center"
import useStore from "../store/zustore";
import { userAccountCheck } from "../services/user";
  
  const BackGround = (props) => {
    const texture = useLoader(THREE.TextureLoader, "/assets/back.png");
    
    const { gl } = useThree();
    
    const formatted = new THREE.WebGLCubeRenderTarget(
      texture.image.height
      ).fromEquirectangularTexture(gl, texture);
      
      return <primitive attach="background" object={formatted.texture} />;
    };
    
    const Scene = lazy(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(import('../components/home/Game')), 5000)
      })
    })
    
    export const modalUse = createContext({
      modalIsOpen: false
    })
    function Home() {
      const [modalIsOpen, setModal] = useState(false)
      useEffect(()=>{
      },[modalIsOpen])

      const navigate=useNavigate();

      useEffect(() => {
        if (sessionStorage.getItem('userId') == null) {
          navigate("/initialpage/authlogin")
        } else {
          async function check() {
            let check = await userAccountCheck(sessionStorage.getItem('userId'))
            if(check.data.statusCode == 400) {
              alert('연결된 계좌가 없어 계좌 생성 페이지로 이동합니다.')
              navigate("/accountscreate")
            }
          } 
          check()
        }
      }, []);


  return (
    <modalUse.Provider value={{modalIsOpen,setModal}}>
        <Canvas camera={{position:[-10,10,-10]}}>
        <BackGround />
        {/* <color attach="background" args={["#1C1C1C"]} /> */}
        <Suspense fallback={null}>
            <Game />
        </Suspense>
        {/* <Clouds /> */}
        </Canvas>
        <Loader />
        <Center/>
        <Dialogue/>
        
        <Outlet />
     

      </modalUse.Provider>
    );
  }
  

export default Home;
