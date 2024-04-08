import { useState } from 'react';
import useStore from '../../../store/zustore';
import Form from 'react-bootstrap/Form';


const Pic =  () => {
    const {handlePicChange} = useStore((state) => state)
    let [mainImg,setMainImg] = useState(null);
    const setPreviewImg = (event) => {
        const file = event.target.files[0]
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (file) {
           
        reader.onload = function(event) {
            setMainImg(event.target.result)
            handlePicChange(file)
        };
    };  
};

	return(
        <>
        <div>
    
        {/* <img alt="메인사진" src={mainImg} style={{maxWidth:"100px"}}></img> */}
        </div>

            {/* <input
            type="file" 
            id="image" 
            accept="image/*" 
            style={{width:'100%', marginLeft: '-650px'}}
            onChange={setPreviewImg}
            required
                /> */}

        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>통장커버사진</Form.Label>
            <Form.Control
             type="file"
             onChange={setPreviewImg}
             required
             />
      </Form.Group>

            </>
    )}
export default Pic