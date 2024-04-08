import { useBounds } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect,useContext, useState, useRef } from "react";
import { GlobalContext } from "../../../App";
import { modalUse } from "../../../pages/Home";
import { useFrame } from '@react-three/fiber';
import { useNavigate } from "react-router";
import * as THREE from 'three'

export function Focus({children}) {
  const bounds = useBounds()
  const { camera } = useThree();
  const {pressedKey,proximity,setZoomed,zoomed,setPressedKey,modalState,setModalState}= useContext(GlobalContext)
  const { setModal}=useContext(modalUse)
  const [start, setStart] = useState(true)

  const navigate = useNavigate();
  const sound = new Audio('/sounds/hope.mp3')
  const bgm = useRef(sound)
  bgm.current.loop = true


  const playMusic = () => {
    if (bgm) {
      setStart(!start)
        if (start) {bgm.current.play()
         
        console.log('music on')
        
        }
        if (!start) {bgm.current.pause()
          
        console.log('music off')
        }
    }
  }

  const each = new Audio('/sounds/Select.mp3')
  const playEach = () => {
    each.play()
  }

  const onClick = async (e) => {
    playEach()
    
    if((proximity === 'deposit' && e.object.position.x===-1)){
      e.stopPropagation()
     
      bounds.refresh(e.object).to({position:[1,5,2.5],target:[2.05,4,4]})
      setZoomed(true)
      setModal(true)
      
    }
    if((proximity === 'cabinet'&& e.object.position.x===5)){
      
      e.stopPropagation()
      bounds.refresh(e.object).clip().fit().to({position:[6,5,0.5],target:[10,4,0.5]})
      setZoomed(true)
      setModal(true)
      setTimeout(() => {
        navigate("/userpagemain");
      }, 1200);
    }
    if((proximity === 'frame'&& e.object.position.x===7.5)){
     
      e.stopPropagation()
      bounds.refresh(e.object).to({position:[3.5,5.5,-4],target:[7.5,5,-4]})
      setZoomed(true)
      setModal(true)
      setTimeout(() => {
        navigate("/userpagemain/userpagesavinglist");
      }, 1200);
    }
    if((proximity==="donate")){
      e.stopPropagation()
    
      bounds.refresh(e.object).to({position:[-4.3, 4.2, 1.5], target:[-1,2,7]})
      setZoomed(true)
      setModal(true)
    }
    if((proximity==="music")) {
    
      playMusic()
      e.stopPropagation()
      setZoomed(true)
      setModal(true)
    }
  }

  useEffect(()=>{
    if((pressedKey=='interact'||modalState==="exit") && zoomed == true){
      setPressedKey('test')
      bounds.refresh().to({position:[-10,10,-10],target:[-6,6,-6],rotation:[0,-10,0]})
      setZoomed(false)
      setModal(false)
      setModalState("")
    }
  })


  useFrame(()=>{
    if(!zoomed){
      camera.position.set(-10, 10, -10);
      camera.rotation.set(0,0,0);
      camera.lookAt(-6, 6, -6);
    }
  })


  return (
    <group onClick={onClick}>
      {children}
    </group>

  );
}