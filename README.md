# 体重管理健康实验室

用科学的方法，了解身体的反馈。

## 功能特点

- **8 个体重管理实验协议**：含糖饮料清零、晚饭后不吃零食、每日步数 8000+、蛋白质早餐、晚饭提前、盘子法、酒精限制、零食替换
- **14 天实验周期**：每天记录晨起体重、饥饿感、完成情况
- **本地数据存储**：使用 LocalStorage 保存数据，无需登录
- **智能报告生成**：对比完成日与未完成日的体重趋势，给出个性化建议
- **极简设计**：健康、理性、不焦虑的界面风格

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
weight-lab/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx           # 应用入口
    ├── App.tsx             # 主组件
    ├── index.css           # 全局样式
    ├── types.ts            # TypeScript 类型定义
    ├── data/
    │   └── protocols.ts    # 实验协议数据
    ├── components/
    │   ├── Home.tsx        # 首页
    │   ├── Experiment.tsx  # 实验记录页面
    │   └── Report.tsx      # 实验报告页面
    └── hooks/
        └── useStorage.ts   # LocalStorage 钩子
```

## 技术栈

- React 18
- TypeScript
- Vite
- LocalStorage 数据持久化

## 记录内容

每天可记录：
- **晨起体重**（公斤）
- **饥饿感**（1-5 分）
- **是否完成实验要求**
- **暴食冲动**（1-5 分，可选）

## 隐私说明

所有数据保存在本地浏览器中，不会上传到任何服务器。
