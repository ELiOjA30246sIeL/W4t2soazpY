// 代码生成时间: 2025-09-05 12:22:03
import React, { useState } from 'react';

// 批量文件重命名组件
const BulkRenameTool: React.FC = () => {
  // 状态：文件列表和新文件名
  const [files, setFiles] = useState<File[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 处理文件输入变化
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles([...Array.from(fileList)]);
    }
  };

  // 批量重命名文件
  const renameFiles = () => {
    if (!newName) {
      setErrorMessage("Please enter a new file name.");
      return;
    }

    try {
      for (const file of files) {
        // 这里模拟重命名过程，实际开发中应调用文件系统API
        file.name = `${newName}${file.name.split('.').pop()}`;
      }
      setErrorMessage(""); // 清除错误信息
    } catch (error) {
      setErrorMessage("An error occurred while renaming files.");
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={renameFiles}>Rename</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default BulkRenameTool;