import React, { useEffect, useState } from 'react';
import './UploadedFiles.css';

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  return (
    <div className="uploaded-files">
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedFiles;
