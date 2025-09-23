# 🚀 CyberHub – Cybersecurity Knowledge Platform

<div align="center">

<strong>Cyber Awareness Hub</strong>

**An intelligent cybersecurity knowledge-sharing platform empowering communities through education, real-world case studies, AI-driven insights, and collaborative learning.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/)

[🌐 Live Demo](https://cyber-aware-hub-cnm3.vercel.app/) · [📖 Documentation](#-features) · [🐛 Report Bug](https://github.com/akshatverma1234/CyberAwareHub/issues/new) · [💡 Request Feature](https://github.com/akshatverma1234/CyberAwareHub/issues/new)

</div>

## 📖 About The Project

CyberHub addresses the critical need for accessible cybersecurity education by combining expert insights, real-world attack case studies, and community contributions with the power of AI.

Whether you're a cybersecurity professional, student, or enthusiast, CyberHub delivers:

**AI-generated summaries** for quick insights
**Community-driven knowledge sharing**
**Secure content moderation & management**

### 🎯 Why CyberHub?

- **📚 Centralized Knowledge**: Access expert-written articles, detailed case studies, and community insights in one place
- **🤝 Community-Driven**: Users can submit their own cybersecurity experiences and learn from others
- **🔒 Security-First**: Built with industry-standard security practices and RBAC
- **📱 Accessible**: Responsive design ensures learning on any device
- **🚀 Scalable**: Modern tech stack designed for growth and performance

## ✨ Features

### 🧠 AI-Powered Capabilities

- **Automatic Summarization** AI condenses articles & case studies into bullet points for faster learning

- **AI-Powered Email Notifications** Smart, contextual email updates for approvals, rejections, and user submissions

- **Content Insights** Summaries highlight key threats, lessons, and best practices

### 🔐 **Authentication & Access Control**

- **Secure authentication** with Clerk integration
- **Role-based access control (RBAC)** - Admin, Moderator, and Member roles
- **Session management** with automatic logout and security monitoring

### 📄 **Content Management**

- **📚 Articles**: Expert-written cybersecurity knowledge base
- **🕵️ Cyber Attack Case Studies**: Real-world incident analysis with lessons learned
- **👥 Community Stories**: User-submitted experiences with admin moderation

### 👨‍💼 **Admin Dashboard**

- **User Management**: View, edit, and manage user roles and permissions
- **Content Moderation**: Approve/reject community submissions
- **Case Study & Article Management**: Add, update, and delete content

### 🔔 **Notifications & Communication**

- **Email notifications** for submission status updates
- **Email notification on approval** User receives confirmation
- **Email notification on rejection** User receives feedback
- **Admin notification** for new submissions

### 🛡️ **Security Features**

- **API Rate Limiting** with Redis to prevent abuse
- **Input validation** and sanitization
- **CORS protection** and secure headers
- **XSS and CSRF protection** with Next.js defaults
- **Secure route protection** with Next.js middleware

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Tools & Services

![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

</div>

| Category           | Technologies                                                 |
| ------------------ | ------------------------------------------------------------ |
| **Frontend**       | Next.js 14 (App Router), React 18, TailwindCSS, Material-UI, |
| **Backend**        | Next.js API Routes, Mongoose ODM                             |
| **Database**       | MongoDB (Primary), Redis (Caching & Rate Limiting)           |
| **Authentication** | Clerk (OAuth, JWT, Session Management)                       |
| **Email**          | Nodemailer with SMTP integration                             |
| **Deployment**     | Vercel (Frontend), MongoDB Atlas (Database), Redis Cloud     |
| **Development**    | ESLint, Prettie                                              |

</details>

## 🔐 Security Practices

CyberHub implements comprehensive security measures:

### 🛡️ **Authentication & Authorization**

- **Multi-factor authentication** support via Clerk
- **Role-based access control** with granular permissions
- **Session management** with secure JWT tokens
- **Account lockout** protection against brute force

### 🚦 **API Security**

- **Rate limiting** with Redis (100 requests/minute per IP)
- **Input validation** using Joi schemas
- **SQL injection** prevention with parameterized queries
- **XSS protection** with content sanitization
- **CSRF tokens** for state-changing operations

### 🔒 **Data Protection**

- **Encryption at rest** for sensitive data
- **HTTPS enforcement** in production
- **Secure headers** implementation
- **File upload validation** with type/size restrictions
- **Data anonymization** for analytics

### 📊 **Monitoring & Logging**

- **Security event logging** with Sentry integration
- **Failed login attempt tracking**
- **Suspicious activity detection**
- **Regular security audits** and dependency updates

## 📱 Screenshots

<summary><strong>🏠 Homepage & Navigation</strong></summary>
<br/>

![CyberHub Homepage](https://github.com/user-attachments/assets/f7596f9f-072f-42de-b574-b584134a0265)

_Clean, intuitive interface showcasing featured articles and cybersecurity resources_

<br/>

<summary><strong>📖 Articles</strong></summary>
<br/>

![Articles](https://github.com/user-attachments/assets/5eadddf3-9e16-44da-8b46-3a671bf3dc85)

_Comprehensive articles with search, filtering, and categorization_

<summary><strong>🕵️ Case Studies</strong></summary>
<br/>

![Case Studies](https://github.com/user-attachments/assets/56ddee3e-d8b5-4f2a-b0c1-8826aa676304)

_Detailed analysis of real-world cybersecurity incidents_

<summary><strong>👨‍💼 Admin Dashboard</strong></summary>
<br/>

![Admin Dashboard](https://github.com/user-attachments/assets/d7bec11f-d810-4022-b0b9-16ce4e06eda9)

_Powerful admin interface for content and user management_

<summary><strong>👥 Community Submissions</strong></summary>
<br/>

![Community](https://github.com/user-attachments/assets/d3807f37-a5fd-4c05-8fea-7f873c871538)

_User-generated content with moderation workflow_

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/cyberhub)

### **Docker Deployment**

```bash
# Build the Docker image
docker build -t cyberhub .

# Run the container
docker run -p 3000:3000 --env-file .env.local cyberhub
```

### **Manual Deployment**

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions from the cybersecurity community! Here's how you can help:

### **Ways to Contribute**

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit code improvements
- 📚 Add educational content
- 🔍 Security audits and reviews

### **Getting Started**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
6. **Push to the branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🗺️ Roadmap

- [x] **Phase 1: Core Platform** ✅

  - [x] User authentication and RBAC
  - [x] Articles and case studies
  - [x] Admin dashboard
  - [x] Community submissions

- [ ] **Phase 2: Enhanced Features** 🚧

  - [ ] Real-time threat intelligence feeds
  - [ ] Interactive cybersecurity assessments
  - [ ] Gamification and badges system
  - [ ] Mobile application (React Native)

- [ ] **Phase 3: Advanced Analytics** 📊

  - [ ] AI-powered content recommendations
  - [ ] Threat landscape analytics
  - [ ] Custom report generation
  - [ ] API for third-party integrations

- [ ] **Phase 4: Enterprise Features** 🏢
  - [ ] White-label solutions
  - [ ] Advanced compliance reporting
  - [ ] Enterprise SSO integration
  - [ ] Custom training modules

## ❓ FAQ

<details>
<summary><strong>How do I become an admin?</strong></summary>

Admin access is granted by existing administrators. Contact the platform administrators through the contact form or reach out directly.

</details>

<details>
<summary><strong>Can I submit my own cybersecurity case studies?</strong></summary>

Yes! Community members can submit their experiences through the Community section. All submissions go through a moderation process before publication.

</details>

<details>
<summary><strong>Is the platform free to use?</strong></summary>

Yes, CyberHub is completely free for educational and non-commercial use. We believe cybersecurity knowledge should be accessible to everyone.

</details>

<details>
<summary><strong>How is user data protected?</strong></summary>

We implement industry-standard security practices including encryption, secure authentication, and regular security audits. See our [Security Practices](#-security-practices) section for details.

</details>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Akshat Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **[Clerk](https://clerk.com)** for robust authentication services
- **[Vercel](https://vercel.com)** for seamless deployment platform
- **[MongoDB](https://www.mongodb.com)** for flexible database solutions
- **[Tailwind CSS](https://tailwindcss.com)** for beautiful, responsive design
- **[Material-UI](https://mui.com)** for comprehensive component library
- **Cybersecurity Community** for invaluable feedback and contributions

## 📞 Support & Contact

<div align="center">

### 👤 **Akshat Verma** - _Lead Developer_

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vakshat421@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-linkedin)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.com)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-twitter)

</div>

### 💬 Get Help

- 📖 **Documentation**: Check our [Wiki](https://github.com/your-username/cyberhub/wiki)
- 🐛 **Bug Reports**: [Create an Issue](https://github.com/your-username/cyberhub/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a Feature](https://github.com/your-username/cyberhub/issues/new?template=feature_request.md)
- 💬 **Discussions**: [Join our Discussions](https://github.com/your-username/cyberhub/discussions)
- 📧 **Direct Contact**: [vakshat421@gmail.com](mailto:vakshat421@gmail.com)

---

<div align="center">

**Made with ❤️ for the Cybersecurity Community**

⭐ **Star this repository if you find it helpful!** ⭐

![Footer](https://capsule-render.vercel.app/api?type=waving&color=1e40af&height=100&section=footer)

</div>
