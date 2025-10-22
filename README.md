# 个人网站

一个现代化、响应式的个人网站模板，专为新手设计，让你可以轻松展示个人信息和项目。

## 🌟 特性

- **响应式设计** - 在手机、平板和电脑上都有完美的显示效果
- **现代化UI** - 使用最新的设计趋势和动画效果
- **易于定制** - 通过配置文件轻松更新个人信息
- **无需编程知识** - 新手友好的设计
- **快速部署** - 可以直接在浏览器中打开使用

## 📁 文件结构

```
D:\Personal Web\
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
├── config.js           # 个人信息配置文件
└── README.md           # 说明文档
```

## 🚀 快速开始

1. **打开网站** - 双击 `D:\Personal Web\index.html` 文件在浏览器中打开
2. **自定义信息** - 编辑 `D:\Personal Web\config.js` 文件来更新你的个人信息

## ✏️ 如何更新个人信息

打开 `D:\Personal Web\config.js` 文件，修改以下信息：

### 基本信息
```javascript
const personalInfo = {
    name: "你的名字",                    // 修改为你的真实姓名
    title: "前端开发者",                 // 修改为你的职业
    description: "我是一名热爱编程的开发者...", // 修改为你的简介
    // ... 其他信息
};
```

### 关于我部分
```javascript
about: "我是一名充满热情的开发者...",    // 修改为你的详细介绍
age: 25,                              // 修改为你的年龄
location: "北京",                      // 修改为你的城市
education: "计算机科学学士",            // 修改为你的学历
```

### 联系信息
```javascript
email: "your.email@example.com",      // 修改为你的邮箱
phone: "+86 123-4567-8900",          // 修改为你的电话
github: "https://github.com/yourusername", // 修改为你的GitHub链接
linkedin: "https://www.linkedin.com/in/lihao-zheng-keepgrowing", // 已更新为你的LinkedIn
```

### 技能列表
```javascript
skills: [
    {
        name: "HTML/CSS",             // 技能名称
        level: "精通",                // 熟练程度
        icon: "fab fa-html5"          // 图标（可以修改为其他FontAwesome图标）
    },
    // 添加更多技能...
];
```

### 项目列表
```javascript
projects: [
    {
        title: "个人博客系统",         // 项目标题
        description: "使用React和Node.js开发的...", // 项目描述
        image: "fas fa-blog",         // 项目图标
        demo: "https://your-blog-demo.com", // 演示链接
        github: "https://github.com/yourusername/blog-system" // GitHub链接
    },
    // 添加更多项目...
];
```

## 🎨 自定义样式

如果你想修改网站的外观，可以编辑 `D:\Personal Web\styles.css` 文件：

- **颜色主题** - 搜索 `#007bff` 并替换为你喜欢的颜色
- **字体** - 修改 `font-family` 属性
- **布局** - 调整 `grid-template-columns` 和 `padding` 等属性

## 📱 响应式设计

网站已经针对不同设备进行了优化：

- **桌面端** - 完整的多列布局
- **平板端** - 自适应的网格布局
- **手机端** - 单列布局，带有汉堡菜单

## 🔧 高级功能

### 添加新技能
在 `config.js` 的 `skills` 数组中添加新对象：
```javascript
{
    name: "新技能",
    level: "熟练",
    icon: "fab fa-新技能图标"
}
```

### 添加新项目
在 `config.js` 的 `projects` 数组中添加新对象：
```javascript
{
    title: "新项目",
    description: "项目描述",
    image: "fas fa-项目图标",
    demo: "演示链接",
    github: "GitHub链接"
}
```

### 修改联系表单
联系表单目前只是展示功能，如果需要实际发送邮件，需要：

1. 设置后端服务器
2. 修改 `script.js` 中的 `handleFormSubmit` 函数
3. 添加邮件发送功能

## 🌐 部署到网上

### 方法1：GitHub Pages（推荐）
1. 在GitHub上创建新仓库
2. 上传 `D:\Personal Web\` 文件夹中的所有文件到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择主分支作为源
5. 访问 `https://你的用户名.github.io/仓库名`

### 方法2：Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 注册账号并登录
3. 拖拽 `D:\Personal Web\` 文件夹到部署区域
4. 获得免费的网站链接

### 方法3：Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 注册账号并登录
3. 导入 `D:\Personal Web\` 项目文件夹
4. 自动部署并获得链接

## 📞 获取帮助

如果你在使用过程中遇到问题：

1. 检查浏览器控制台是否有错误信息
2. 确保所有文件都在 `D:\Personal Web\` 文件夹中
3. 确保 `config.js` 文件格式正确（注意逗号和引号）
4. 尝试刷新浏览器页面

## 🎉 完成！

现在你有了一个完全可定制的个人网站！记得：

- 定期更新你的信息
- 添加新的项目和技能
- 保持内容的时效性
- 分享你的网站链接

祝你使用愉快！🚀
