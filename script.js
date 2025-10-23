// 个人网站主要JavaScript文件

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化网站
    initializeWebsite();
    setupEventListeners();
    
    // 延迟加载个人信息，确保config.js完全加载
    setTimeout(() => {
        loadPersonalInfo();
    }, 100);
    
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
    // 检查personalInfo是否已加载
    if (typeof personalInfo === 'undefined') {
        console.error('personalInfo未定义，请检查config.js文件是否正确加载');
        return;
    }
    
    // 更新基本信息
    updateElement('user-name', personalInfo.name);
    updateElement('hero-name', personalInfo.name);
    updateElement('hero-subtitle', personalInfo.title);
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
    
    if (typeof personalInfo === 'undefined' || !personalInfo.skills) {
        console.error('personalInfo.skills未定义');
        return;
    }
    
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
    
    if (typeof personalInfo === 'undefined' || !personalInfo.projects) {
        console.error('personalInfo.projects未定义');
        return;
    }
    
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
    e.preventDefault(); // 阻止默认提交
    
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // 直接发送到Gmail
    sendToGmailDirectly(formObject);
}

// 直接发送到Gmail
function sendToGmailDirectly(formData) {
    const { name, email, message } = formData;
    
    // 创建邮件内容
    const subject = `来自个人网站的新消息 - ${name}`;
    const body = `您收到一条来自个人网站的新消息：

发件人：${name}
邮箱：${email}

消息内容：
${message}

---
此邮件由个人网站自动生成
时间：${new Date().toLocaleString('zh-CN')}`;
    
    // 创建mailto链接
    const mailtoLink = `mailto:lihao.zheng.kg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 显示成功消息和多种发送选项
    showEmailOptions(mailtoLink, subject, body, name, email);
    
    // 发送自动回复给访客
    sendAutoReplyToVisitor(name, email);
}

// 发送自动回复给访客
function sendAutoReplyToVisitor(visitorName, visitorEmail) {
    if (visitorEmail && visitorName) {
        const autoReplySubject = '感谢您的留言 - 郑力浩';
        const autoReplyBody = `您好 ${visitorName}！

感谢您通过我的个人网站联系我。我已经收到您的消息，会尽快回复您。

此邮件为自动回复，请勿直接回复。

祝好！
郑力浩
Envision Energy - PMO
邮箱：lihao.zheng.kg@gmail.com
电话：+86 15267138751`;
        
        // 创建自动回复的mailto链接
        const autoReplyLink = `mailto:${visitorEmail}?subject=${encodeURIComponent(autoReplySubject)}&body=${encodeURIComponent(autoReplyBody)}`;
        
        // 延迟打开自动回复邮件
        setTimeout(() => {
            window.open(autoReplyLink);
        }, 2000);
        
        console.log('自动回复邮件已准备发送给访客');
    }
}

// 旧的多服务邮件发送函数已删除，现在只使用直接发送到Gmail的方式

// 发送自动回复
function sendAutoReply() {
    const visitorEmail = document.getElementById('form-email').value;
    const visitorName = document.getElementById('form-name').value;
    
    if (visitorEmail && visitorName) {
        // 创建自动回复邮件链接
        const subject = encodeURIComponent('感谢您的留言 - 郑力浩');
        const body = encodeURIComponent(`您好 ${visitorName}！

感谢您通过我的个人网站联系我。我已经收到您的消息，会尽快回复您。

此邮件为自动回复，请勿直接回复。

祝好！
郑力浩
Envision Energy - PMO
邮箱：lihao.zheng.kg@gmail.com
电话：+86 15267138751`);
        
        // 打开邮件客户端
        const mailtoLink = `mailto:${visitorEmail}?subject=${subject}&body=${body}`;
        
        // 注意：这需要用户手动发送，或者使用其他邮件服务
        console.log('自动回复邮件内容已准备，请手动发送给访客');
    }
}

// 显示邮件发送选项
function showEmailOptions(mailtoLink, subject, body, name, email) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // 创建内容容器
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideInUp 0.3s ease-out;
    `;
    
    content.innerHTML = `
        <h3 style="margin-top: 0; color: #333;">📧 邮件发送选项</h3>
        <p style="color: #666; margin-bottom: 20px;">请选择您偏好的邮件发送方式：</p>
        
        <div style="margin-bottom: 20px;">
            <button onclick="tryOpenMailClient('${mailtoLink}')" style="
                width: 100%;
                padding: 12px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-bottom: 10px;
                font-size: 16px;
            ">📱 使用邮件客户端发送</button>
            
            <button onclick="copyEmailContent('${encodeURIComponent(subject)}', '${encodeURIComponent(body)}')" style="
                width: 100%;
                padding: 12px;
                background: #28a745;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-bottom: 10px;
                font-size: 16px;
            ">📋 复制邮件内容</button>
            
            <button onclick="openGmailWeb('${encodeURIComponent(subject)}', '${encodeURIComponent(body)}')" style="
                width: 100%;
                padding: 12px;
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-bottom: 20px;
                font-size: 16px;
            ">🌐 使用Gmail网页版</button>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 15px;">
            <p style="font-size: 14px; color: #666; margin: 0;">
                <strong>收件人：</strong>lihao.zheng.kg@gmail.com<br>
                <strong>主题：</strong>${subject}
            </p>
        </div>
        
        <button onclick="closeEmailModal()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        ">×</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 存储模态框引用
    window.currentEmailModal = modal;
}

// 尝试打开邮件客户端
function tryOpenMailClient(mailtoLink) {
    try {
        // 尝试直接打开mailto链接
        window.location.href = mailtoLink;
        showMessage('✅ 正在打开邮件客户端...', 'success');
        closeEmailModal();
    } catch (error) {
        console.error('无法打开邮件客户端:', error);
        showMessage('❌ 无法打开邮件客户端，请尝试其他选项', 'error');
    }
}

// 复制邮件内容
function copyEmailContent(subject, body) {
    const emailContent = `收件人: lihao.zheng.kg@gmail.com\n主题: ${decodeURIComponent(subject)}\n\n内容:\n${decodeURIComponent(body)}`;
    
    navigator.clipboard.writeText(emailContent).then(() => {
        showMessage('✅ 邮件内容已复制到剪贴板！', 'success');
        closeEmailModal();
    }).catch(err => {
        console.error('复制失败:', err);
        showMessage('❌ 复制失败，请手动复制内容', 'error');
    });
}

// 打开Gmail网页版
function openGmailWeb(subject, body) {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=lihao.zheng.kg@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    showMessage('✅ 正在打开Gmail网页版...', 'success');
    closeEmailModal();
}

// 关闭邮件模态框
function closeEmailModal() {
    if (window.currentEmailModal) {
        window.currentEmailModal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (window.currentEmailModal && window.currentEmailModal.parentNode) {
                window.currentEmailModal.parentNode.removeChild(window.currentEmailModal);
                window.currentEmailModal = null;
            }
        }, 300);
    }
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
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10001;
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
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
