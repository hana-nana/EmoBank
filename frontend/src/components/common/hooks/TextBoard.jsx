import {Billboard, Text} from "@react-three/drei";
import {forwardRef} from "react";

export const TextBoard = forwardRef(({text, isNpc}, ref)=> {
  return(
    <Billboard ref={ref}>
      <Text
        fontSize={isNpc ? 0.4 : 0.4}
        color={isNpc ? 0xff71c2 : 0xffffff}
        fontWeight={1000}
      >
        {text}
      </Text>
    </Billboard>
  )
})