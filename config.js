// 个人网站配置文件
// 在这里修改你的个人信息，网站会自动更新

const personalInfo = {
    // 基本信息
    name: "郑力浩",
    title: "Envision Energy - PMO", // 你的职业/身份
    description: "PMO of O&M Projects of India Region",
    
    // 关于我部分
    about: "我是一名充满热情的开发者，拥有多年的编程经验。我热爱学习新技术，喜欢解决复杂的问题，并且始终追求代码的优雅和效率。我相信技术可以改变世界，希望通过我的工作为社会创造价值。",
    age: 24,
    location: "Shanghai, China",
    education: "UoM - MSc in REaCT - 2023",
    
    // 联系信息
    email: "lihao.zheng.kg@gmail.com",
    phone: "+86 15267138751",
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/lihao-zheng-keepgrowing",
    
    // 技能列表
    skills: [
        {
            name: "MATLAB",
            level: "精通",
            icon: "fab fa-html5"
        },
        {
            name: "Solidworks",
            level: "精通",
            icon: "fab fa-js-square"
        },
        {
            name: "VS Code",
            level: "熟练",
            icon: "fab fa-react"
        },
        {
            name: "Power BI",
            level: "熟练",
            icon: "fab fa-node-js"
        },
        {
            name: "Python",
            level: "熟练",
            icon: "fab fa-python"
        },
        {
            name: "GitHub",
            level: "熟练",
            icon: "fab fa-git-alt"
        }
    ],
    
    // 项目列表
    projects: [
        {
            title: "个人博客系统",
            description: "使用React和Node.js开发的现代化博客系统，支持文章发布、评论和用户管理功能。",
            image: "fas fa-blog",
            demo: "https://your-blog-demo.com",
            github: "https://github.com/yourusername/blog-system"
        },
        {
            title: "在线购物网站",
            description: "全栈电商网站，包含商品展示、购物车、支付和订单管理等功能。",
            image: "fas fa-shopping-cart",
            demo: "https://your-shop-demo.com",
            github: "https://github.com/yourusername/ecommerce"
        },
        {
            title: "任务管理应用",
            description: "基于Vue.js的任务管理工具，支持团队协作和项目跟踪。",
            image: "fas fa-tasks",
            demo: "https://your-tasks-demo.com",
            github: "https://github.com/yourusername/task-manager"
        }
    ]
};

// 导出配置供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = personalInfo;
}
