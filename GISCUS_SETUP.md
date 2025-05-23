# Giscus 评论系统配置指南

## 🚨 解决 "giscus is not installed on this repository" 错误

### 步骤1：启用GitHub Discussions

1. 进入你的GitHub仓库：`https://github.com/chengkeshuai/my-blog`
2. 点击 **Settings** 选项卡
3. 滚动到 **Features** 部分
4. 勾选 ✅ **Discussions** 复选框

### 步骤2：安装Giscus GitHub应用

1. 访问 [https://github.com/apps/giscus](https://github.com/apps/giscus)
2. 点击 **Install** 或 **Configure** 按钮
3. 选择 **Only select repositories**
4. 选择你的 `my-blog` 仓库
5. 点击 **Install** 完成安装

### 步骤3：获取配置参数

1. 访问 [https://giscus.app/zh-CN](https://giscus.app/zh-CN)
2. 在 **仓库** 部分输入：`chengkeshuai/my-blog`
3. 等待验证通过（显示绿色勾号 ✅）
4. **页面 ↔️ discussion 映射关系**：选择 `pathname`
5. **Discussion 分类**：选择 `Announcements`
6. 复制生成的完整配置代码

### 步骤4：更新组件配置

在 `src/components/GiscusComments.tsx` 文件中，将以下占位符替换为从giscus.app获取的真实值：

```typescript
// 将这些占位符替换为真实配置
script.setAttribute('data-repo-id', 'YOUR_REPO_ID_HERE')     // 替换为: R_kgDOxxxxxx
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID_HERE') // 替换为: DIC_kwDOxxxxxx
```

**示例配置：**
```typescript
script.setAttribute('data-repo', 'chengkeshuai/my-blog')
script.setAttribute('data-repo-id', 'R_kgDONEPOuA')          // 你的真实repo-id
script.setAttribute('data-category', 'Announcements')
script.setAttribute('data-category-id', 'DIC_kwDONEPOuA4Ca7XM') // 你的真实category-id
```

### 步骤5：验证配置

1. 更新配置后运行：
   ```bash
   npm run build
   npm run dev
   ```

2. 访问本地文章页面：`http://localhost:3000/posts/your-article`
3. 检查评论区是否正常显示

### 故障排除

**如果仍然显示错误：**

1. **检查仓库权限**：确保仓库是公开的，或者你有足够权限
2. **验证Discussions**：确保GitHub仓库的Discussions功能已启用
3. **确认安装**：检查Giscus是否已正确安装到仓库
4. **配置验证**：在giscus.app网站上确认所有配置参数无误

**调试技巧：**
- 打开浏览器开发者工具查看控制台错误
- 确认网络请求是否成功到达giscus.app
- 验证data-repo和data-repo-id是否匹配

### 注意事项

- 仓库必须是**公开的**
- 需要**GitHub账号**才能评论
- 评论数据存储在**GitHub Discussions**中
- 完全**免费**且**隐私友好**
- 支持**Markdown语法**和**表情回应**

## 配置参数说明

- `data-repo`: 你的GitHub仓库地址
- `data-repo-id`: 仓库ID（从giscus.app获取）
- `data-category`: Discussion分类名称
- `data-category-id`: 分类ID（从giscus.app获取）
- `data-mapping`: 页面与discussion的映射方式
- `data-theme`: 主题配色（dark/light/auto等）

## 部署验证

1. 确保配置正确后运行：
   ```bash
   npm run build
   ```

2. 部署到EdgeOne Pages后，访问文章页面验证评论功能

## 注意事项

- 用户需要GitHub账号才能评论
- 评论数据存储在GitHub Discussions中
- 完全免费且隐私友好
- 支持Markdown语法和表情回应 