import { useRef, useEffect, useState } from "react";
import UseDetectClose from "@/components/common/hooks/UseDetectClose.jsx";
import { DropDown } from "@/components/common/functions/DropDown.jsx";
import useStore from "../../../store/zustore";
import NavDropdown from 'react-bootstrap/NavDropdown';



export const ToggleMenu = () => {
    const dropDownRef = useRef();
    const [Identify, setIdentify] = useState('');
    const {handleBankChange} = useStore((state) => state)
    const bankList = ['한국은행 ▼','산업은행 ▼','기업은행 ▼','국민은행 ▼']
  
    const [isOpen, setIsOpen] = UseDetectClose(dropDownRef, false);
    useEffect(() => {
      switch (Identify) {
          case '한국은행 ▼':
              handleBankChange('001-1-81fe2deafd1943');
              break;
          case '산업은행 ▼':
              handleBankChange('002-1-66fe2deafd9968');
              break;
          case '기업은행 ▼':
              handleBankChange('003-1-2156adeafd646e');
              break;
          case '국민은행 ▼':
              handleBankChange('004-1-74fe2deafd3277');
              break;
          default:
              break;
      }
  }, [Identify]);
  
      return(
     
        <div ref={dropDownRef}>
        <input 
        style={{width:'110%'}}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
        value={Identify || '은행 선택 ▼'}
        required
        
         />
    
        {isOpen && //오픈되었을때
          <>
            {bankList.map((value, index) => (
              <DropDown key={index} value={value} setIsOpen={setIsOpen} setIdentify={setIdentify} isOpen={isOpen} />
              ))}
           </>
       
        }
         </div>
      )
  }