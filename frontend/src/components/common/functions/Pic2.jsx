import React from 'react';
import useStore from '../../../store/zustore';
import Form from 'react-bootstrap/Form';

const Pic2 = () => {
    const handlePicChange = useStore((state) => state.handlePicChange);

    let reader;

    const setPreviewImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (reader && reader.readyState === FileReader.LOADING) {
                reader.abort();
            }

            reader = new FileReader();

            reader.onerror = (error) => {
                console.error('FileReader error: ', error);
            };

            reader.onloadend = () => {
                handlePicChange(reader.result);
            };

            reader.readAsDataURL(file);
        }
};

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
                type="file"
                onChange={setPreviewImg}
            />
        </Form.Group>
    );
};
export default Pic2;
