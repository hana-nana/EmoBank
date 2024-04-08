import { useEffect } from "react";
import { useRef, useState } from "react"
import { DropDown } from "./DropDown";
import UseDetectClose from "@/components/common/hooks/UseDetectClose.jsx";
import useStore from "../../../store/zustore";

const GenderDropDown = () => {
    const dropDownRef = useRef()
    const [Identify, setIdentify] = useState('');
    const genderList = ['남성','여성']
    const {handleGenderChange} = useStore((state) => state)
    const [isOpen, setIsOpen] = UseDetectClose(dropDownRef, false);

    useEffect(() => {
        switch (Identify) {
            case '남성':
                handleGenderChange('male');
                break
            case '여성':
                handleGenderChange('female');
                break
            default:
                break
        }
    },[Identify])

    return(
        <div ref={dropDownRef}>
        <input 
        style={{width:'100px', textAlign: 'left', backgroundColor: 'black', color: 'gray'}}
        onClick={() => setIsOpen(!isOpen)}
        value={Identify || '성별 선택   ▼'}
        required
        
         />
    
        {isOpen && //오픈되었을때
          <>
            {genderList.map((value, index) => (
              <DropDown key={index} value={value} setIsOpen={setIsOpen} setIdentify={setIdentify} isOpen={isOpen} />
              ))}
           </>
       
        }
         </div>
    )
}
export default GenderDropDown