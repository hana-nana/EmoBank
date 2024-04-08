import React, { useContext, useState,useEffect } from "react";
import { Stars, Sparkles, KeyboardControls, Bounds, Outlines} from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier'
import { GlobalContext } from "../../App";
import Lights from "./Effects/Lights";
import Controller from 'ecctrl'
import { Ground } from "./Colliders/Ground";
import { Wall } from "./Colliders/Wall";
import { Wall2 } from "./Colliders/Wall2";
import { Wall3 } from "./Colliders/Wall3";
import {Focus} from "./Camera/Focus";
import Over1 from "./Camera/Over1"
import Over2 from "./Camera/Over2"
import Over3 from "./Camera/Over3"
import Over4 from "./Camera/Over4";
import Character from './Character'
import { Furnitures } from './Colliders/Furnitures';
import Dialog from "../common/modals/gameModals/GameDialogForm";
import useStore from "../../store/zustore";

const Gentleman= React.lazy(() => import('../models/Gentleman'));
const Donationman= React.lazy(() => import('../models/Donationman'));
const Lamp = React.lazy(() => import('../models/Lamp'));
const Vault_door = React.lazy(() => import('../models/Vault_door'))
const Chandelier = React.lazy(() => import('../models/Chandelier'))
const Frame1 = React.lazy(() => import('../models/Frames1'))
const Carpet = React.lazy(() => import('../models/Carpet'))
const Cabinet = React.lazy(() => import('../models/Cabinet'))
const Gramophone = React.lazy(() => import('../models/Gramophone'))
const Table = React.lazy(() => import('../models/Table'))
const Desk = React.lazy(() => import('../models/Desk'))


function Game() {
    const {isActive} = useStore()
    const {handleActive} = useStore((state)=>state)
    const [currentAction, setCurrentAction] = useState("idle");
    const [pressedKeys, setPressedKeys] = useState(new Set());
    const {proximity,setPressedKey}= useContext(GlobalContext)
    const {emotion} = useStore()
      const {setModalState}= useContext(GlobalContext)
    const keyboardMap = [
        { name: 'forward', keys: isActive ? ['you cannot move'] : ['ArrowUp', 'KeyW']},
        { name: 'backward', keys: isActive ?  ['you cannot move'] : ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: isActive ? ['you cannot move'] : ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: isActive ? ['you cannot move'] : ['ArrowRight', 'KeyD'] },
        { name: 'interact', keys: ['Escape']}
      ];
  

      const handleKeyDown = (event) => {
        const key = event.code;
        const find=keyboardMap.find((entry) => entry.keys.includes(key))
        if (find!=null){
          const keyMapping = find.name;
          setPressedKeys((prevKeys) => new Set([...prevKeys, keyMapping]));
          setCurrentAction(keyMapping);
          setPressedKey(keyMapping);
          if (keyMapping == 'interact') {
            handleActive(false)
            
          }
        }
      };
      
      const handleKeyUp = (event) => {
        const key= event.code;
        const find=keyboardMap.find((entry) => entry.keys.includes(key))
        if(find!=null){
          const keyMapping = find.name;
          setPressedKeys((prevKeys) => new Set([...prevKeys].filter((k) => k !== keyMapping)));
          if(pressedKeys.size<2)
            setCurrentAction("idle");
        }
      };
    

      useEffect(()=>{ 
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup',handleKeyUp)
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        };
      });
      
    return (
      <>
      <Lights />
      <Stars fade speed={3} radius={50} depth={30} count={1000} factor={8} />
      <Sparkles count={100} position={[0, 3, 0]} scale={18} size={20} speed={0.7} opacity={0.2} color="white"/>
      
      <Bounds observe>
        <Focus>
          <Over1 position={[-1, 4.5, 4.8]}/>
          <Over1 position={[-3 , -0.8, -0.4]}/>
          <Over2 position={[5,5,-0.5]} isNear={proximity}/>
          <Over3 position={[7.5, 5, -4 ]} isNear={proximity}/>
          <Over4 position={[-4.5,4.5,6]}/>
        </Focus>
      </Bounds>
      
        <Physics timeStep="vary">
            <KeyboardControls map={keyboardMap}>
              <Controller disableFollowCam={true} disableFollowCamPos={{ x: -10, y: 10, z: -10}} maxVelLimit={8}>
                <RigidBody colliders={false} gravityScale={4}>
                    <Character currentAction={currentAction} /> 
                </RigidBody>
              </Controller>
            </KeyboardControls>
            <RigidBody colliders={false} gravityScale={4}>
              <Gentleman position={[1,1.8,6.8]}scale= {[0.05,0.05, 0.05]} rotation={[0,3.2,0]} isNear={proximity}/>
            </RigidBody>
            <RigidBody colliders={false} gravityScale={4}>
              <Donationman position={[-4,2,6.8]}scale= {[0.05, 0.05, 0.05]} rotation={[0,3,0]} isNear={proximity}/>
            </RigidBody>

            <Frame1 scale={0.7} rotation={[0, 4.7,0]} position={[7.5, 3.6, -6 ]} />
            <Gramophone scale={0.8}  rotation={[0,3.8,0]} position={[-6.1,3,-3.7]}/>
            <Table scale={1} rotation={[0,0,0]} position={[-5.2,0.5,-3.8]}/>

            <Desk position={[1.5,0,5]} scale={2.7} rotation={[0,3.2,0]} />
            <Desk position={[-4,0,5]} scale={2.7} rotation={[0,3.2,0]} />
            <Carpet scale={4} position={[0,0.5,20]}/>
            <Lamp position={[-2.9,3.2,5.8]} scale={2.5} rotation={[0,1.57,0]} />
            <Lamp position={[2.5,3.2,5.7]} scale={2.5} rotation={[0,1.57,0]} />
            
            <Cabinet scale={1.2} position={[7,0,-1]} rotation={[0, 4.7, 0]}/>
            <Vault_door scale={0.0025} rotation={[0, 0, 0]} position={[-1, 3.3, 7.6]} />
            <RigidBody type="fixed">
              <Ground />
              <Wall position={[8,4.5,0]} rotation={[1.57,0,1.57]}/>
              <Wall position={[0,4.5,8]} rotation={[1.57,0,3.14]}/>
              <Wall2 position={[0,3.5,-8]} rotation={[1.57,0,0]}/>
              <Wall3 position={[0,3,2.5]} rotation={[1.57,0,0]}/>
              <Wall2 position={[-8,3.5,0]} rotation={[1.57,0,1.57]}/>
              <Furnitures />
            </RigidBody>
          </Physics>
          <Ground />

      <Chandelier scale={0.01}  rotation={[0,1,0]} position={[0.5,8,1]}/>
      
      </>
    );
}

export default Game;