

export function Furnitures(props){
    
    return (
        <>

        <mesh position={[6.2,3,0.2]} rotation={[0,4.7,0]}>
        <boxGeometry attach="geometry" args={[3, 4, 2]} />
        <meshBasicMaterial opacity={0} transparent />
        </mesh>
        <mesh position= {[7,3,-1]} rotation={[0,4.7,0]}>
        <boxGeometry attach="geometry" args={[1, 3, 2]} />
        <meshBasicMaterial opacity={0} transparent  />
        </mesh>

        <mesh position= {[-5.9, 0.05, -3.5]} rotasdtion={[0,4.7,0]}>
        <cylinderGeometry attach="geometry" args={[1.3, 0.5, 5]} />
        <meshBasicMaterial opacity={0} transparent  />
        </mesh>
        </>
    )
}