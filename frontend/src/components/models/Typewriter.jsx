/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 typewriter.glb 
Author: ArkyVision (https://sketchfab.com/arkyvision)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/underwood-standard-portable-typewriter-f203a8f060f74284833a68203d55a41b
Title: Underwood Standard Portable Typewriter
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Typewriter(props) {
  const { nodes, materials } = useGLTF('/resources/typewriter.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.material_0} />
    </group>
  )
}
export default Typewriter
useGLTF.preload('/resources/typewriter.glb')