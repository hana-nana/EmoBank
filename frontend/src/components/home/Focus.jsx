import { useBounds } from "@react-three/drei";
import { useEffect } from "react";

export function Focus({children}) {
  const bounds = useBounds()

  const onClick = (e) => {
    console.log(e)
    // e.stopPropagation()
    // bounds.refresh(e.object).clip().fit()
  }

  // const onPointerMissed = (e) => {
  //   if(e.button === 0){
  //     bounds.refresh().fit()
  //   }
  // }

  return(
    <group onClick={onClick}>
      {children}
    </group>
  )
}