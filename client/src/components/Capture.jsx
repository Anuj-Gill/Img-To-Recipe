

import React, { useState } from 'react';

export function Capture() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            console.log('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('your_upload_url', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input for uploading an image file */}
                <input type="file" accept="image/*" capture="camera" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


