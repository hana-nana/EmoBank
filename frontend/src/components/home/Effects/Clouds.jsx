import React, { useEffect } from 'react';
import { Cloud } from "@react-three/drei"

const Clouds = () => {

  useEffect(() => {

  }, []); 


  return(
    <group position={[0, -10, 0]}>
      <Cloud
        position-x={-1}
        position-z={-10}
        scale={5}
        opacity={0.1}
        speed={0.6}
        width={10}
        height={10}
        depth={20}
        color="green"
        segments={10}
      />
      <Cloud
        position-x={-1}
        position-z={10}
        scale={5}
        opacity={0.08}
        speed={0.6}
        width={10}
        height={10}
        depth={20}
        color="green"
        segments={10}
      />
    </group>
  )
}

export default Clouds