// 代码生成时间: 2025-09-06 07:23:34
import React, { useState, useEffect } from 'react';

// ProcessManager组件
// 用于展示和管理进程信息
const ProcessManager: React.FC = () => {
  // 进程列表状态
  const [processes, setProcesses] = useState<Array<{ id: number; name: string; status: string; }>>([]);
  // 错误状态
  const [error, setError] = useState<null | string>(null);
  
  // 获取进程数据的函数
  const fetchProcesses = async () => {
    try {
      // 这里假设有一个API端点提供进程信息
      // 使用fetch API请求进程数据
      const response = await fetch('/api/processes');
      if (!response.ok) {
        throw new Error('Failed to fetch processes');
      }
      const data: Array<{ id: number; name: string; status: string; }> = await response.json();
      setProcesses(data);
    } catch (error) {
      setError('Error fetching processes');
    }
  };

  // 组件挂载时获取进程数据
  useEffect(() => {
    fetchProcesses();
  }, []);

  // 处理进程启动
  const startProcess = (id: number) => {
    // 这里假设有一个API端点用于启动进程
    // 使用fetch API发送启动请求
    fetch(`/api/processes/${id}/start`, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to start process');
        }
        fetchProcesses(); // 重新获取进程列表
      }).catch(error => {
        setError('Error starting process');
      });
  };

  // 处理进程停止
  const stopProcess = (id: number) => {
    // 这里假设有一个API端点用于停止进程
    // 使用fetch API发送停止请求
    fetch(`/api/processes/${id}/stop`, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to stop process');
        }
        fetchProcesses(); // 重新获取进程列表
      }).catch(error => {
        setError('Error stopping process');
      });
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {processes.map(process => (
          <li key={process.id}>
            {process.name} - {process.status}
            <button onClick={() => process.status === 'running' ? stopProcess(process.id) : startProcess(process.id)}
              disabled={process.status === 'running' ? 'disabled' : undefined}>
              {process.status === 'running' ? 'Stop' : 'Start'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessManager;