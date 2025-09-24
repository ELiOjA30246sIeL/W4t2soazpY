// 代码生成时间: 2025-09-24 12:25:11
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { ExcelJS, workbook, worksheet, column, table, chart, ChartType } from 'exceljs';
import { Base64 } from 'js-base64';

// Excel表格自动生成器组件
const ExcelTableGenerator: React.FC = () => {
  // 用于存储生成的Excel数据
  const [excelData, setExcelData] = useState<{}[]>([]);
  // 用于存储Excel工作簿
  const [workbookRef, setWorkbookRef] = useState<workbook | null>(null);

  // 生成Excel表格的函数
  const generateExcelTable = async () => {
    try {
      // 创建一个新的Excel工作簿
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('My Sheet');

      // 向工作表添加列
      ws.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'dob', width: 10 },
      ];

      // 向工作表添加数据
      const mockData: {}[] = [];
      for (let i = 1; i <= 10; i++) {
        mockData.push({
          id: i,
          name: `Person ${i}`,
          dob: '1990-01-01',
        });
      }
      ws.addRow(mockData);

      // 设置工作簿引用
      setWorkbookRef(wb);
      setExcelData(mockData);
    } catch (error) {
      console.error('Error generating Excel table:', error);
    }
  };

  // 下载Excel文件的函数
  const downloadExcel = () => {
    try {
      if (!workbookRef) throw new Error('Workbook not initialized');

      // 将数据转换为Excel文件并下载
      workbookRef.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'table.xlsx');
      });
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <div>
      <button onClick={generateExcelTable}>Generate Table</button>
      <button onClick={downloadExcel} disabled={!workbookRef}>Download Excel</button>
    </div>
  );
};

export default ExcelTableGenerator;
