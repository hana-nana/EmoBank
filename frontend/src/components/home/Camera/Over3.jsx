import { useRef,useState,useEffect,useContext } from 'react';
import { EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

import { GlobalContext } from '../../../App';

function Over3(props) {
  const meshRef = useRef();

  const [isOutlined, setIsOutlined] = useState(false)
  const {zoomed}= useContext(GlobalContext)

  useEffect(() => {

    const near=props.isNear
    
    if(near==="frame" && zoomed===false)
      setIsOutlined(true);
    else
      setIsOutlined(false)

  })

  return (
    <>
      <mesh {...props} ref={meshRef} scale={1}>
        <boxGeometry args={[2, 3, 4]} />
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
  outline.position.set(8.4,4.99,-2.9);
  return <primitive object={outline} />;
}

export default Over3;
