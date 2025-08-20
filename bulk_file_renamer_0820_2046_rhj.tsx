// 代码生成时间: 2025-08-20 20:46:59
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFolderOpen } from 'react-icons/fa';
import './bulk_file_renamer.css';

interface FileInfo {
  name: string;
  path: string;
}

const BulkFileRenamer: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    const fileInfos: FileInfo[] = acceptedFiles.map(file => ({
      name: file.name,
      path: URL.createObjectURL(file),
    }));
    setFiles(fileInfos);
  };

  const onRename = async () => {
    if (!newName) {
      setError('New name is required.');
      return;
    }
    try {
      for (const file of files) {
        const oldPath = file.path;
        const newPath = file.path.replace(file.name, `${newName}${file.name.split('.').pop()}`);
        // Simulate file renaming process
        console.log(`Renaming ${oldPath} to ${newPath}`);
        URL.revokeObjectURL(oldPath); // Release the created URL
      }
      setError('');
    } catch (err) {
      setError('An error occurred during file renaming.');
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'application/octet-stream/*',
    onDrop,
  });

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      {isDragActive ? (<p>Drop the files here ...</p>) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
      {files.length > 0 && (
        <div>
          {files.map(file => (
            <img key={file.path} src={file.path} alt={file.name} style={{maxWidth: '100px'}} />
          ))}
          <input type='text' value={newName} onChange={e => setNewName(e.target.value)} placeholder='New name' />
          <button onClick={onRename}>Rename Files</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default BulkFileRenamer;
