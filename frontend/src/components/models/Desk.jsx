/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 desk.glb 
Author: Freepoly.org (https://sketchfab.com/blackrray)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/old-office-desk-freepolyorg-07d6b79745424a5285d0305a2646d52f
Title: Old Office Desk-Freepoly.org
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Desk(props) {
  const { nodes, materials } = useGLTF('/resources/desk.glb')
  return (
    <>
    <pointLight
      args={['gold', 5,1.2,1]}
      position={[2,4,5.3]}
      rotation-x={Math.PI/2}
    />
    <pointLight
      args={['gold', 5,1.2,1]}
      position={[-3.3,4,5.4]}
      rotation-x={Math.PI/2}
    />
    
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.903}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[2.519, 0.43, 13.779]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes['clockk_5_������006_0'].geometry} material={materials['.006']} />
            <mesh geometry={nodes['clockk_5_������001_0'].geometry} material={materials['.001']} />
            <mesh geometry={nodes['clockk_5_������002_0'].geometry} material={materials['.002']} />
            <mesh geometry={nodes['clockk_5_������003_0'].geometry} material={materials['.003']} />
            <mesh geometry={nodes['clockk_5_������004_0'].geometry} material={materials['.004']} />
            <mesh geometry={nodes['clockk_5_������005_0'].geometry} material={materials['.005']} />
            <mesh geometry={nodes['clockk_5_������007_0'].geometry} material={materials['.007']} />
            <mesh geometry={nodes['clockk_5_������008_0'].geometry} material={materials['.008']} />
            <mesh geometry={nodes['clockk_5_������009_0'].geometry} material={materials['.009']} />
            <mesh geometry={nodes['clockk_5_������010_0'].geometry} material={materials['.010']} />
          </group>
        </group>
      </group>
    </group>
    </>
  )
}
export default Desk;
useGLTF.preload('/resources/desk.glb')
