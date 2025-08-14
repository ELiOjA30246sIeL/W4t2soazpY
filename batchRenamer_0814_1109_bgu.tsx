// 代码生成时间: 2025-08-14 11:09:54
import React, { useState } from 'react';

// 组件用于显示批量文件重命名工具的UI
const BatchRenamer: React.FC = () => {
  // 状态：文件列表
  const [files, setFiles] = useState<File[]>([]);
  // 状态：输入的新文件名
  const [newName, setNewName] = useState<string>("");
  // 状态：是否显示错误消息
  const [error, setError] = useState<string>("");

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(Array.from(files));
      setError(""); // 重置错误消息
    }
  };

  // 处理文件重命名
  const handleRename = () => {
    if (!files.length || !newName) {
      setError("Please select files and provide a new name.");
      return;
    }

    try {
      // 这里应该是重命名文件的逻辑，使用fs.renameSync或者fs.promises.rename等方法
      // 例如：fs.renameSync(oldPath, newPath)
      // 由于这是一个演示，我们将跳过实际的文件操作
      console.log("Renaming files...");
      console.log(files.map(file => file.name), newName);
      console.log("Files renamed successfully.");
    } catch (error) {
      setError("An error occurred while renaming files.");
    }
  };

  return (
    <div>
      <h1>Batch File Renamer</h1>
      <input type="file" multiple onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new file name"
      />
      <button onClick={handleRename}>Rename</button>
    </div>
  );
};

export default BatchRenamer;