import './DropDown.css'

export const DropDown = ({ value, setIdentify, setIsOpen, isOpen }) => {
    const ValueClick = () => {
        setIdentify(value)
        setIsOpen(!isOpen)
    }
    return(
        
        <div className="dropdown" onClick={ValueClick}>
            {value}
        </div>
    
      
    )
}
