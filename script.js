// 个人网站主要JavaScript文件

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化网站
    initializeWebsite();
    setupEventListeners();
    loadPersonalInfo();
    setupScrollAnimations();
});

// 初始化网站
function initializeWebsite() {
    console.log('个人网站已加载');
}

// 设置事件监听器
function setupEventListeners() {
    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // 联系表单提交
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// 加载个人信息
function loadPersonalInfo() {
    // 更新基本信息
    updateElement('user-name', personalInfo.name);
    updateElement('hero-name', personalInfo.name);
    updateElement('hero-title', personalInfo.title);
    updateElement('hero-description', personalInfo.description);
    updateElement('about-description', personalInfo.about);
    updateElement('age', personalInfo.age);
    updateElement('location', personalInfo.location);
    updateElement('education', personalInfo.education);
    updateElement('email', personalInfo.email);
    updateElement('phone', personalInfo.phone);
    updateElement('footer-name', personalInfo.name);
    
    // 更新链接
    updateLink('github-link', personalInfo.github);
    updateLink('linkedin-link', personalInfo.linkedin);
    
    // 加载技能
    loadSkills();
    
    // 加载项目
    loadProjects();
}

// 更新元素内容
function updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    }
}

// 更新链接
function updateLink(id, url) {
    const element = document.getElementById(id);
    if (element && url) {
        element.href = url;
    }
}

// 加载技能
function loadSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    personalInfo.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item fade-in-up';
        skillElement.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.level}</div>
        `;
        skillsContainer.appendChild(skillElement);
    });
}

// 加载项目
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    personalInfo.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item fade-in-up';
        projectElement.innerHTML = `
            <div class="project-image">
                <i class="${project.image}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank">查看演示</a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// 设置滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.skill-item, .project-item, .about-text, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        message: document.getElementById('form-message').value
    };
    
    // 这里可以添加实际的表单提交逻辑
    // 比如发送到服务器或发送邮件
    console.log('表单数据:', formData);
    
    // 显示成功消息
    showMessage('消息发送成功！我会尽快回复你。', 'success');
    
    // 清空表单
    document.getElementById('contact-form').reset();
}

// 显示消息
function showMessage(text, type = 'info') {
    // 创建消息元素
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    
    // 添加样式
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // 添加到页面
    document.body.appendChild(message);
    
    // 3秒后自动移除
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});
