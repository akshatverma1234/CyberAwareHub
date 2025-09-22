const CaseStudyRejectionEmail = (username, caseStudyTitle, aiText) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Case Study Submission Update</title>
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
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .header-icon {
      font-size: 48px;
      margin-bottom: 15px;
      display: block;
    }
    .header h1 { 
      font-size: 28px; 
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p {
      font-size: 16px;
      opacity: 0.9;
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
    .message-box {
      background: #f8f9fa;
      border-left: 4px solid #ff6b6b;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .message-box p {
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 1.7;
    }
    .title-highlight { 
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .title-highlight strong {
      color: #856404;
      font-size: 16px;
    }
    .encouragement {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      padding: 25px;
      border-radius: 10px;
      margin: 25px 0;
      text-align: center;
    }
    .encouragement p {
      font-size: 16px;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 25px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 500;
      margin-top: 10px;
      transition: transform 0.2s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .footer { 
      background: #2c3e50;
      color: white;
      text-align: center; 
      padding: 25px 30px;
      font-size: 14px;
    }

    @media (max-width: 600px) {
      .email-container { margin: 10px; }
      .header, .content { padding: 25px 20px; }
      .header h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <span class="header-icon">📝</span>
      <h1>Submission Update</h1>
      <p>Thank you for contributing to our community</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hello ${username},</div>
      
      <div class="message-box">
        <p>${aiText}</p>
      </div>
      
      <div class="title-highlight">
        <strong>Submitted Case Study:</strong><br>
        "${caseStudyTitle}"
      </div>
      
      <div class="encouragement">
        <p><strong>Don't let this discourage you!</strong></p>
        <p>We believe in your potential and would love to see your revised submission or hear about another cybersecurity experience you'd like to share.</p>
        <a href="https://cyber-aware-hub-cnm3.vercel.app/community-stories" class="cta-button">Submit Another Story</a>
      </div>
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CyberSec Community | Building Tomorrow's Security Experts</p>
     
    </div>
  </div>
</body>
</html>
  `;
};

export default CaseStudyRejectionEmail;
