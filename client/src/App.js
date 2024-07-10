import React from 'react';
import FileUpload from './components/FileUpload';
import UploadedFiles from './components/UploadedFiles';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>File Transfer Application</h1>
      <FileUpload />
      <UploadedFiles />
    </div>
  );
}

export default App;
