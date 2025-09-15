const StoryApprovalEmail = (username, storyTitle) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Story Approved</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #4CAF50;
    }
    .content {
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .highlight {
      font-weight: bold;
      color: #4CAF50;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Story Approved!</h1>
    </div>
    <div class="content">
      <p>Hi ${username},</p>
      <p>We’re excited to let you know that your community story <span class="highlight">"${storyTitle}"</span> has been approved and published!</p>
      <p>Thank you for contributing to our community and sharing your valuable insights.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CyberSec Community. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = StoryApprovalEmail;
