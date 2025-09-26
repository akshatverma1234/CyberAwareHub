const CommunityArticleSubmissionEmail = (username, articleTitle) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Story Received</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 1px solid #eee; margin-bottom: 20px; }
    .header h1 { color: #2196F3; }
    .content { text-align: center; }
    .content p { font-size: 16px; line-height: 1.5; }
    .highlight { font-weight: bold; color: #2196F3; }
    .footer { text-align: center; font-size: 14px; color: #777; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📥 Article Submitted</h1>
    </div>
    <div class="content">
      <p>Hi ${username},</p>
      <p>We’ve successfully received your article titled <span class="highlight">"${articleTitle}"</span>.</p>
      <p>Our team will review your submission shortly. You’ll receive an update once it’s approved or rejected.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CyberSec Community. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

export default CommunityArticleSubmissionEmail;
