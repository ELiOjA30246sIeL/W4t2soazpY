// 代码生成时间: 2025-10-06 00:00:25
import React, { useState } from 'react';

// 定义依赖项接口
interface Dependency {
  name: string;
  dependencies: string[];
}

// 依赖关系分析器组件
const DependencyAnalyzer: React.FC = () => {
  // 状态：依赖项数组
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  // 状态：依赖项分析结果
  const [analysisResult, setAnalysisResult] = useState<string[]>([]);

  // 添加依赖项的处理函数
  const handleAddDependency = (name: string, dependencies: string[]): void => {
    if (!name) return;
    if (!dependencies.length) return;

    const existingDependency = dependencies.find((dep) => dep === name);
    if (existingDependency) {
      console.error(`Error: Dependency ${name} cannot depend on itself.`);
      return;
    }

    const newDependency: Dependency = { name, dependencies };
    setDependencies([...dependencies, newDependency]);
  };

  // 分析依赖关系并找出循环依赖
  const analyzeDependencies = (): void => {
    const dependencyGraph: Record<string, string[]> = {};
    dependencies.forEach((dep) => {
      dependencyGraph[dep.name] = dep.dependencies;
    });

    const visited = new Set<string>();
    const stack = new Set<string>();
    const cycles: string[] = [];

    const visit = (node: string) => {
      if (stack.has(node)) {
        const cycle = [...stack].reverse().join(' -> ');
        cycles.push(cycle);
        return;
      }

      if (visited.has(node)) return;
      visited.add(node);
      stack.add(node);

      if (dependencyGraph[node]) {
        dependencyGraph[node].forEach((neighbor) => visit(neighbor));
      }

      stack.delete(node);
    };

    dependencies.forEach((dep) => {
      visit(dep.name);
    });

    setAnalysisResult(cycles);
  };

  return (
    <div>
      <h1>Dependency Analyzer</h1>
      <div>
        <button onClick={() => analyzeDependencies()}>
          Analyze Dependencies
        </button>
      </div>
      <div>
        {analysisResult.length > 0 ? (
          <ul>
            {analysisResult.map((cycle, index) => (
              <li key={index}>{cycle}</li>
            ))}
          </ul>
        ) : (
          <p>No cycles detected.</p>
        )}
      </div>
    </div>
  );
};

export default DependencyAnalyzer;