import React, { useState } from 'react';
import './index.scss';

const AvatarUserLoader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5 MB");
        setFile(null);
      } else if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a JPEG or PNG image.");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  // const handleUpload = async () => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('image', file);

  //     try {
  //       const response = await axios.post('/api/upload', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       setSuccess(true);
  //       console.log('Upload successful:', response.data);
  //     } catch (err) {
  //       setError('Upload failed. Please try again.');
  //       console.error('Error uploading file:', err);
  //     }
  //   }
  // };

  return (
    <div>
      <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Upload successful!</p>}
      {/* <button onClick={handleUpload} disabled={!file}>Upload Image</button> */}
    </div>
  );
};

export default AvatarUserLoader;
