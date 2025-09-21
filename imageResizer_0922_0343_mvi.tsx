// 代码生成时间: 2025-09-22 03:43:06
import React, { useState, ChangeEvent } from 'react';

// ImageResizer组件负责处理图片尺寸的批量调整
const ImageResizer: React.FC = () => {
  // 状态：存放用户选择的图片文件
  const [files, setFiles] = useState<File[]>([]);
  // 状态：存放调整后的图片文件
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);
  // 状态：存放尺寸调整选项
  const [resizeOptions, setResizeOptions] = useState({
    width: 100,
    height: 100
  });

  // 处理文件选择事件
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // 调整图片尺寸
  const resizeImages = async () => {
    if (files.length === 0) {
      alert('Please select images to resize.');
      return;
    }

    try {
      const resized = await Promise.all(files.map(file => resizeImage(file, resizeOptions)));
      setResizedFiles(resized);
    } catch (error) {
      console.error('Error resizing images:', error);
      alert('Failed to resize images.');
    }
  };

  // 图片尺寸调整函数
  const resizeImage = async (file: File, options: { width: number; height: number }) => {
    const img = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    canvas.width = options.width;
    canvas.height = options.height;
    ctx.drawImage(img, 0, 0, options.width, options.height);
    return new Promise<File>((resolve, reject) => {
      canvas.toBlob(resolve, 'image/jpeg', 1.0);
    });
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileChange} />
      <button onClick={resizeImages}>Resize Images</button>
      <div>
        {resizedFiles.map((file, index) => (
          <img key={index} src={URL.createObjectURL(file)} alt={`Resized Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageResizer;
