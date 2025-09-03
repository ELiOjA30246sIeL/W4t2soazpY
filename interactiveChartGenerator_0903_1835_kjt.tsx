// 代码生成时间: 2025-09-03 18:35:27
 * interactiveChartGenerator.tsx
 * React组件，用于创建交互式图表生成器
 */

import React, { useState, useEffect, useRef } from 'react';
import './InteractiveChartGenerator.css'; // 引入样式文件
import Chart from 'chart.js/auto'; // 引入Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // 引入所需的Chart.js组件

// 扩展Chart.js以使用CategoryScale等
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  // 定义图表数据类型
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

interface ChartOptions {
  // 定义图表选项类型
  responsive: boolean;
  plugins: any;
}

interface InteractiveChartGeneratorProps {
  // 定义组件props类型
  initialChartData?: ChartData;
  chartOptions?: ChartOptions;
}

const InteractiveChartGenerator: React.FC<InteractiveChartGeneratorProps> = ({
  initialChartData,
  chartOptions = {
    responsive: true,
    plugins: {}
  }
}) => {
  const [chartData, setChartData] = useState<ChartData>(initialChartData ?? {
    labels: [],
    datasets: []
  });
  const [chartInstance, setChartInstance] = useState<ChartJS | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 创建图表实例
    const instance = new ChartJS(canvasRef.current, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });

    setChartInstance(instance);
  }, [chartData, chartOptions]);

  useEffect(() => {
    // 更新图表数据
    if (chartInstance) {
      chartInstance.setData(chartData);
    }
  }, [chartData, chartInstance]);

  const handleAddDataPoint = () => {
    const newLabel = `Label ${chartData.labels.length + 1}`;
    const newDataPoint = Math.floor(Math.random() * 100);
    setChartData(prevChartData => ({
      labels: [...prevChartData.labels, newLabel],
      datasets: prevChartData.datasets.map((dataset, index) => ({
        ...dataset,
        data: [...dataset.data, newDataPoint]
      }))
    }));
  };

  const handleRemoveDataPoint = () => {
    if (chartData.labels.length > 0) {
      setChartData(prevChartData => ({
        labels: prevChartData.labels.slice(0, -1),
        datasets: prevChartData.datasets.map(dataset => dataset.data.slice(0, -1))
      }));
    }
  };

  return (
    <div className='InteractiveChartGenerator'>
      <canvas ref={canvasRef}></canvas>
      <button onClick={handleAddDataPoint}>Add Data Point</button>
      <button onClick={handleRemoveDataPoint}>Remove Data Point</button>
    </div>
  );
};

export default InteractiveChartGenerator;
