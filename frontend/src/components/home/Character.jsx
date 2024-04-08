import React, { useRef, useState,useContext } from "react";
// import { useQuery, useQueryClient } from 'react-query';
import { useSpring, animated, config } from "@react-spring/three";
import { useFrame } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import useStore from "../../store/zustore";
import { modalUse } from "../../pages/Home";
import { GlobalContext } from "../../App";
const Boy = React.lazy(() => import('../models/Boy'));
const Girl = React.lazy(() => import('../models/Girl'));

function Character(currentAction) {

  const {setZoomed, setProximity,setModalState} = useContext(GlobalContext)
    const {setModal} = useContext(modalUse)

    const[near,setNear]=useState(false);

    const myMesh = useRef();
    const { scale } = useSpring({
      scale: [0.05, 0.05, 0.05], 
      config: config.default
    });
  
    useFrame(({ clock }) => {
      const time_position = 5 * clock.getElapsedTime();
      const oscillation_position = Math.sin(time_position);
      
    });

    const checkIntersectionWithBox = () => {
      const modelBoundingBox = new Box3().setFromObject(myMesh.current);

      const boxBoundingBox1= new Box3().setFromCenterAndSize(new Vector3(0, 0, 1), new Vector3(5, 5, 5));
      const boxBoundingBox2= new Box3().setFromCenterAndSize(new Vector3(5, 0, 1), new Vector3(5,5,5));
      const boxBoundingBox3= new Box3().setFromCenterAndSize(new Vector3(6, 0, -4), new Vector3(5,5,5));
      const boxBoundingBox4= new Box3().setFromCenterAndSize(new Vector3(-3, 0, 3), new Vector3(5,5,5));
      const boxBoundingBox5= new Box3().setFromCenterAndSize(new Vector3(-5, 0, -4), new Vector3(5,5,5));
  
      if (modelBoundingBox.intersectsBox(boxBoundingBox1)) {
  
        setProximity("deposit")
      } else if (modelBoundingBox.intersectsBox(boxBoundingBox2)) {
  
        setProximity("cabinet")
      } else if (modelBoundingBox.intersectsBox(boxBoundingBox3)) {
   
        setProximity("frame")
      } else if (modelBoundingBox.intersectsBox(boxBoundingBox4)) {
  
        setProximity("donate")
      } else if (modelBoundingBox.intersectsBox(boxBoundingBox5)) {
 
        setProximity("music")
      }
      else {
        setProximity("none")
        setModal(false)
        setZoomed(false)
        setModalState("none")
      }
    };
  
    useFrame(() => {
      checkIntersectionWithBox();
    });
  
    // const handleGenderChange = useStore(state => state.handleGenderChange);
    // const handleSetGender = (gender) => {
    //   handleGenderChange(gender); // Zustand 스토어 업데이트
    //   localStorage.setItem('gender-settings', JSON.stringify({ gender }));
    // };

    const handleSetGender = sessionStorage.getItem('gender')
    return (
      <>
      <animated.mesh
        scale={scale}
        ref={myMesh}
        position={[0, -0.5, 0]}
      >
      {handleSetGender === 'male' && <Boy action={currentAction}/>}
      {handleSetGender === 'female' && <Girl action={currentAction}/>}
        
      </animated.mesh>
    </>
    );
}

export default Character;