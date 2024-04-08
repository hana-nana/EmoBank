import { useRef,useContext,useEffect,useState } from 'react'
import { EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

import { GlobalContext } from '../../../App';

function Over2(props) {
  const meshRef = useRef()

  const [isOutlined, setIsOutlined] = useState(false)
  const {zoomed}= useContext(GlobalContext)

  useEffect(() => {

    const near=props.isNear
    
    if(near==="cabinet" && zoomed===false)
      setIsOutlined(true);
    else
      setIsOutlined(false)

  })

  return(
    <>
    <mesh
      {...props}
      ref={meshRef}
      
      scale={1}
    >
      <boxGeometry args={[1.5, 5.5, 3]} />
      <meshPhongMaterial opacity={0} transparent  />
    </mesh>
    {isOutlined &&<Outline mesh={meshRef.current} />}
    </>
  );
}

function Outline({ mesh }) {
  if (!mesh) return null;

  const edges = new EdgesGeometry(mesh.geometry);
  const material = new LineBasicMaterial({ color: 0xffff00, linewidth:5});
  const outline = new LineSegments(edges, material);
  outline.position.set(6.7,3.5,0.9);
  outline.rotation.set(0,0.03,0)
  return <primitive object={outline} />;
}

export default Over2;
