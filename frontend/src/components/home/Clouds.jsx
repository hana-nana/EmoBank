import { Cloud } from "@react-three/drei"

const Clouds = () => {
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
        depth={50}
        color="white"
        segments={30}
      />
      <Cloud
        position-x={-1}
        position-z={10}
        scale={5}
        opacity={0.1}
        speed={0.6}
        width={10}
        height={10}
        depth={50}
        color="white"
        segments={30}
      />
    </group>
  )
}

export default Clouds