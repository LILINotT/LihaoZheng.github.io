// 邮件服务配置文件
// 用于处理不同网络环境下的邮件发送问题

const emailConfig = {
    // 主要邮件服务配置
    primary: {
        service: 'formspree',
        endpoint: 'https://formspree.io/f/manprwgp',
        method: 'POST'
    },
    
    // 备用邮件服务配置
    backup: {
        service: 'mailto',
        email: 'lihao.zheng.kg@gmail.com',
        subject: '来自个人网站的新消息'
    },
    
    // 国内邮件服务配置（可选）
    china: {
        service: 'netease',
        // 可以配置网易邮箱等国内服务
        endpoint: 'https://your-backend-server.com/send-email'
    },
    
    // 邮件模板
    templates: {
        autoReply: {
            subject: '感谢您的留言 - 郑力浩',
            body: `您好 {name}！

感谢您通过我的个人网站联系我。我已经收到您的消息，会尽快回复您。

此邮件为自动回复，请勿直接回复。

祝好！
郑力浩
Envision Energy - PMO
邮箱：lihao.zheng.kg@gmail.com
电话：+86 15267138751`
        },
        
        notification: {
            subject: '来自个人网站的新消息',
            body: `收到新的网站留言：

姓名：{name}
邮箱：{email}

消息内容：
{message}

时间：{timestamp}`
        }
    }
};

// 检测用户地理位置（简单检测）
function detectUserLocation() {
    // 检测时区来判断可能的地理位置
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isChina = timezone.includes('Shanghai') || 
                   timezone.includes('Beijing') || 
                   timezone.includes('Chongqing') ||
                   timezone.includes('Asia/Shanghai');
    
    return {
        isChina: isChina,
        timezone: timezone
    };
}

// 获取最佳邮件服务
function getBestEmailService() {
    const location = detectUserLocation();
    
    if (location.isChina) {
        // 在中国大陆，优先使用备用方案
        return emailConfig.backup;
    } else {
        // 海外用户，使用主要服务
        return emailConfig.primary;
    }
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { emailConfig, detectUserLocation, getBestEmailService };
}
