import { useRef } from "react";
// import { DirectionalLightHelper } from "three";

const Lights = () => {
    const drectRef = useRef()
    // useHelper(drectRef, DirectionalLightHelper, 'cyan')
    return(
        <>
            <directionalLight ref={drectRef} intensity={1} />
            <ambientLight intensity={2.3} />
        </>
    )
}

export default Lights;