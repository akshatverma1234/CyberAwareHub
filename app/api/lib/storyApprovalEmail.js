const CaseStudyApprovalEmail = (username, caseStudyTitle, aiText) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Case Study Approved - Congratulations!</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: #2c3e50; 
      line-height: 1.6;
      padding: 20px 0;
    }
    .email-container { 
      max-width: 650px; 
      margin: 0 auto; 
      background: #ffffff; 
      border-radius: 12px; 
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
      position: relative;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,0 1000,100 0,80"/></svg>');
      background-size: cover;
    }
    .header-content {
      position: relative;
      z-index: 1;
    }
    .header-icon {
      font-size: 48px;
      margin-bottom: 15px;
      display: block;
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    .header h1 { 
      font-size: 32px; 
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
      font-weight: 300;
    }
    .content { 
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 25px;
      font-weight: 500;
    }
    .celebration-banner {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 25px 0;
      border: 2px solid #00b894;
    }
    .celebration-banner h2 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 15px;
      font-weight: 600;
    }
    .message-box {
      background: #f8f9fa;
      border-left: 4px solid #00b894;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .message-box p {
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 1.7;
    }
    .title-showcase { 
      background: linear-gradient(135deg, #fff7e6 0%, #ffe4b5 100%);
      border: 2px solid #ffb347;
      padding: 25px;
      border-radius: 12px;
      margin: 25px 0;
      text-align: center;
      position: relative;
    }
    .title-showcase::before {
      content: '⭐';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 5px 10px;
      border-radius: 50%;
      font-size: 20px;
    }
    .title-showcase h3 {
      color: #d35400;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .title-showcase .title {
      font-size: 20px;
      color: #2c3e50;
      font-weight: 600;
      font-style: italic;
    }
    .action-section {
      text-align: center;
      margin: 30px 0;
    }
    .primary-button {
      display: inline-block;
      background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
      color: white;
      padding: 15px 35px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 10px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,184,148,0.3);
    }
    .primary-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,184,148,0.4);
    }
    .secondary-button {
      display: inline-block;
      background: transparent;
      color: #00b894;
      border: 2px solid #00b894;
      padding: 13px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
      margin: 10px;
      transition: all 0.3s ease;
    }
    .secondary-button:hover {
      background: #00b894;
      color: white;
    }
    .stats-section {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      text-align: center;
    }
    .stat-item {
      flex: 1;
      padding: 20px;
    }
    .stat-number {
      font-size: 24px;
      font-weight: 700;
      color: #00b894;
      display: block;
    }
    .stat-label {
      font-size: 12px;
      color: #636e72;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .footer { 
      background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
      color: white;
      text-align: center; 
      padding: 30px;
    }
    .footer-content {
      max-width: 400px;
      margin: 0 auto;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #74b9ff;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    .social-links a:hover {
      color: #0984e3;
    }
    @media (max-width: 600px) {
      .email-container { margin: 10px; }
      .header, .content { padding: 25px 20px; }
      .header h1 { font-size: 28px; }
      .stats-section { flex-direction: column; }
      .primary-button, .secondary-button { 
        display: block; 
        margin: 10px auto; 
        max-width: 250px; 
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="header-content">
        <span class="header-icon">🎉</span>
        <h1>Congratulations!</h1>
        <p>Your case study has been approved and published</p>
      </div>
    </div>
    
    <div class="content">
      <div class="greeting">Hi ${username}! 👋</div>
      
      <div class="celebration-banner">
        <h2>🚀 Your Story is Now Live!</h2>
        <p>Thank you for sharing your expertise with our cybersecurity community.</p>
      </div>
      
      <div class="message-box">
        <p>${aiText}</p>
      </div>
      
      <div class="title-showcase">
        <h3>Published Case Study</h3>
        <div class="title">"${caseStudyTitle}"</div>
      </div>
      
      
      <div class="stats-section">
        <div class="stat-item">
          <span class="stat-number">🔥</span>
          <span class="stat-label">Featured Story</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">🌟</span>
          <span class="stat-label">Community Impact</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">🎯</span>
          <span class="stat-label">Expert Content</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <p>&copy; ${new Date().getFullYear()} CyberSec Community</p>
        <p style="font-size: 14px; margin-top: 5px; opacity: 0.8;">Building Tomorrow's Security Experts Together</p>
        
        <div class="social-links">
          <a href="https://cyber-aware-hub-cnm3.vercel.app/community-stories">Submit Another Story</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
export default CaseStudyApprovalEmail;
