/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 girl.glb 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Girl(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/resources/girl.glb')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    
    const action = props.action.currentAction;
    mixer.stopAllAction();

    if (action === 'forward' || action ==='backward' || action ==='leftward'|| action==='rightward' || action==='run') {
      actions.walking.reset().play();
    } 
    else{
      actions.idle.reset().play();
    }
  }, [props.action.currentAction, actions, mixer]);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="body001" geometry={nodes.body001.geometry} material={materials['Material.008']} skeleton={nodes.body001.skeleton} />
          <skinnedMesh name="hair001" geometry={nodes.hair001.geometry} material={materials['Material.013']} skeleton={nodes.hair001.skeleton} />
          <skinnedMesh name="head001" geometry={nodes.head001.geometry} material={materials['Material.014']} skeleton={nodes.head001.skeleton} />
          <skinnedMesh name="left001" geometry={nodes.left001.geometry} material={materials['Material.009']} skeleton={nodes.left001.skeleton} />
          <skinnedMesh name="left_center001" geometry={nodes.left_center001.geometry} material={materials['Material.010']} skeleton={nodes.left_center001.skeleton} />
          <skinnedMesh name="neck001" geometry={nodes.neck001.geometry} material={materials['Material.016']} skeleton={nodes.neck001.skeleton} />
          <skinnedMesh name="right001" geometry={nodes.right001.geometry} material={materials['Material.009']} skeleton={nodes.right001.skeleton} />
          <skinnedMesh name="right_center001" geometry={nodes.right_center001.geometry} material={materials['Material.010']} skeleton={nodes.right_center001.skeleton} />
          <skinnedMesh name="shirt001" geometry={nodes.shirt001.geometry} material={materials['Material.012']} skeleton={nodes.shirt001.skeleton} />
          <skinnedMesh name="shoe_left001" geometry={nodes.shoe_left001.geometry} material={materials['Material.011']} skeleton={nodes.shoe_left001.skeleton} />
          <skinnedMesh name="skirt001" geometry={nodes.skirt001.geometry} material={materials['Material.018']} skeleton={nodes.skirt001.skeleton} />
        </group>
      </group>
    </group>
  )
}
export default Girl;
useGLTF.preload('/resources/girl.glb')