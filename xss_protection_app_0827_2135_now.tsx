// 代码生成时间: 2025-08-27 21:35:19
import React, { useState } from 'react';
import htmlEscape from 'html-escape';

// 一个简单的XSS防护组件
const XssProtectionApp = () => {
  // 状态用于存储用户输入
  const [userInput, setUserInput] = useState('');
  // 状态用于存储清理后的输入以显示
  const [safeInput, setSafeInput] = useState('');

  // 处理输入变化的函数
# NOTE: 重要实现细节
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 使用htmlEscape清理输入以防止XSS攻击
    const safeValue = htmlEscape(value);
    setUserInput(value);
    setSafeInput(safeValue);
  };

  // 渲染组件
  return (
    <div>
      {/* 用户输入框 */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
      />
      {/* 显示清理后的输入 */}
      <div dangerouslySetInnerHTML={{ __html: safeInput }} />
    </div>
  );
};

export default XssProtectionApp;
# 扩展功能模块