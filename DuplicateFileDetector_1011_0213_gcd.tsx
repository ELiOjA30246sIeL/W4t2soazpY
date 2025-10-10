// 代码生成时间: 2025-10-11 02:13:25
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Type definitions for the file data structure
interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

// State for the duplicate file detector component
interface DetectorState {
  files: FileData[];
  duplicates: FileData[][];
};

const DuplicateFileDetector: React.FC = () => {
  // State to keep track of files and duplicates
  const [state, setState] = useState<DetectorState>({
    files: [],
    duplicates: [],
  });

  // Handle dropped files
  const onDrop = (acceptedFiles: File[]) => {
    const fileDataList: FileData[] = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    setState((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...fileDataList],
    }));
    checkForDuplicates(fileDataList);
  };

  // Check for duplicates in the list of files
  const checkForDuplicates = (newFiles: FileData[]): void => {
    const duplicates: FileData[][] = [];
    const allFiles = [...state.files, ...newFiles];
    const fileMap = new Map();

    allFiles.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      if (!fileMap.has(key)) {
        fileMap.set(key, []);
      }
      fileMap.get(key)?.push(file);
    });

    fileMap.forEach((fileList, key) => {
      if (fileList.length > 1) {
        duplicates.push(fileList);
      }
    });

    setState((prevState) => ({
      ...prevState,
      duplicates,
    }));
  };

  // Render the dropzone and duplicates found
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      {isDragActive ? (<p>Drop the files here ...</p>) : (<p>Drag 'n' drop some files here, or click to select files</p>)}
      {state.duplicates.map((duplicateGroup, index) => (
        <div key={index} className='duplicate-group'>
          <p>Duplicates found:</p>
          {duplicateGroup.map((file, idx) => (
            <div key={idx}>{file.name} - Size: {file.size} bytes - Type: {file.type}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DuplicateFileDetector;
