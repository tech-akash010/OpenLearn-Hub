# 🎓 OpenLearn Hub

<div align="center">

![OpenLearn Hub](https://img.shields.io/badge/OpenLearn-Hub-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

**A Revolutionary Community-Driven Educational Platform**

[Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 🌟 Overview

**OpenLearn Hub** is a next-generation educational platform that democratizes access to quality learning resources. Built with modern web technologies, it provides a seamless experience for students, teachers, and online educators to share, discover, and organize educational content across multiple learning paths.

### 🎯 Vision

To create an open, collaborative ecosystem where knowledge flows freely between learners and educators, structured intelligently, and accessible to everyone.

---

## ✨ Features

### 📚 **Multi-Path Content Organization**

- **Subject-wise Navigation**: Browse by Computer Science, Mathematics, Physics, Chemistry, and more
- **University Curriculum**: Content organized by university, semester, department, and subject
- **YouTube Channel Integration**: Curated playlists from educational channels (CodeWithHarry, Khan Academy, etc.)
- **Course Platform Links**: Direct integration with Udemy, Coursera, NPTEL, edX, and YouTube courses
- **Competitive Exam Prep**: Dedicated paths for JEE, NEET, and other exams

### 👥 **Subscription & Follow System**

- **Follow Your Favorite Creators**: Subscribe to teachers, online educators, and community contributors
- **Organized Subscriptions Page**: Clean, row-based layout with expandable topics
- **Real-time Updates**: Get notified when creators you follow upload new content
- **Smart Filtering**: Filter subscriptions by subject, sort by recent/popular

### 🔐 **Role-Based Access Control**

Four distinct user roles with unique capabilities:

1. **Students** 
   - Access community notes freely
   - Upload notes after verification
   - Follow educators and peers

2. **Teachers**
   - Verified institutional affiliation
   - Upload course-linked content
   - Build follower community

3. **Online Educators**
   - Link to YouTube/platform channels
   - Share course materials
   - Verified teaching credentials

4. **Community Contributors**
   - Trust-level based system (Bronze → Silver → Gold)
   - Contribute free educational content
   - Earn reputation through quality

### 📖 **Trending Notes & Discovery**

- **Dual Tabs**: Separate "Community Notes" (free) and "Course Notes" (enrollment required)
- **Smart Filtering**: By subject, institution, badge type, and rating
- **Multiple Sort Options**: Recent, Popular, Top Rated, Most Downloaded
- **Enhanced Content Cards**: Rich metadata display with creator info, stats, and follow buttons

### 🎓 **Course Enrollment Integration**

- **Platform Agnostic**: Works with Udemy, Coursera, NPTEL/SWAYAM, edX, YouTube
- **Smart Gatekeeper**: Modal shows enrollment links for course-specific content
- **Direct Search Links**: Automatically generates course search URLs for each platform
- **University Course Support**: Special handling for institutional course content

### 🔍 **Advanced Browse Paths**

Navigate content through 5 different organizational hierarchies:
- Subject → Topic → Subtopic
- University → Semester → Department → Subject → Topic
- Channel → Playlist → Topic
- Platform → Instructor → Course → Topic
- Exam → Year → Subject → Topic

### 🤝 **Community Features**

- **Follow Creators**: Build your personalized learning network
- **Creator Profiles**: Detailed stats, ratings, and content overview
- **Expandable Topics**: Click to expand topics and see all related notes
- **Interactive Cards**: Hover effects, smooth animations, and instant navigation

### 🎨 **Modern UI/UX**

- **Premium Design**: Glassmorphism, gradients, and smooth animations
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Dark Mode Ready**: Eye-friendly interface
- **Accessibility**: WCAG compliant with semantic HTML
- **Performance Optimized**: Lazy loading, code splitting, and efficient rendering

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x or yarn >= 1.22.x
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tech-akash010/OpenLearn-Hub.git
   cd OpenLearn-Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

### Deploy to Vercel

```bash
vercel deploy
```

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.x** - UI library with hooks and concurrent features
- **TypeScript 5.x** - Type-safe development
- **Vite 5.x** - Lightning-fast build tool and dev server

### Styling & UI
- **TailwindCSS 3.x** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons
- **Custom Components** - Reusable, accessible UI components

### Routing & Navigation
- **React Router v6** - Client-side routing with hash routing
- **Protected Routes** - Role-based access control

### State Management
- **React Hooks** - useState, useEffect, useContext
- **LocalStorage** - Persistent user data and preferences
- **Service Layer** - Centralized business logic

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Enhanced type checking
- **Vite HMR** - Hot Module Replacement for instant updates

### Deployment
- **Vercel** - Optimized hosting with edge functions
- **Custom Headers** - Security and caching strategies
- **SPA Routing** - Seamless client-side navigation

---

## 📁 Project Structure

```
OpenLearn-Hub/
├── components/           # Reusable React components
│   ├── Layout.tsx       # Main app layout with navigation
│   ├── EnhancedContentCard.tsx
│   ├── FollowButton.tsx
│   ├── SubscriptionCreatorRow.tsx
│   └── CourseGatekeeperModal.tsx
├── pages/               # Route-based page components
│   ├── TrendingNotesPage.tsx
│   ├── SubscriptionsPage.tsx
│   ├── BrowseByPathPage.tsx
│   └── HubExplorer.tsx
├── services/            # Business logic layer
│   ├── authService.ts
│   ├── subscriptionService.ts
│   └── trustLevelService.ts
├── data/                # Mock data and constants
│   └── demoContents.ts
├── types.ts             # TypeScript type definitions
├── App.tsx              # Root component with routing
├── index.css            # Global styles and Tailwind
└── vercel.json          # Deployment configuration
```

---

## 🎨 Key Features in Detail

### 1. **Subscription System**

The subscription page provides a clean, organized view of all followed creators:

```typescript
// Each creator gets a compact row with:
- Avatar, name, role, and verification badge
- Quick stats: total notes, followers, rating
- Follow/Unfollow button
- Expandable topics for both community and course notes
- Direct navigation to individual notes
```

**Expandable Topics**: Click on any topic (e.g., "React") to see all notes:
- React Basics
- React Hooks
- Context API
- Advanced Patterns

### 2. **Course Gatekeeper Modal**

When users click on course-linked content, a beautiful modal appears with:

- Course name and provider
- Direct "Buy/Enroll" button with platform-specific URL
- Support for: Udemy, Coursera, NPTEL, edX, YouTube
- Helpful tips for enrolled students

### 3. **Smart Content Cards**

Every content card displays:
- Title with ellipsis for long titles
- Type badge (Free/Course/Paid)
- Simplified organization paths (max 2 paths, 2 levels each)
- Creator info with follow button
- Engagement stats: views, likes, downloads
- Upload time and verification status

### 4. **Role-Based Features**

Different roles see different capabilities:

| Feature | Student | Teacher | Online Educator | Community |
|---------|---------|---------|-----------------|-----------|
| View Content | ✅ | ✅ | ✅ | ✅ |
| Upload Notes | After Verification | ✅ | ✅ | Silver+ Only |
| Follow Others | ✅ | ✅ | ✅ | ✅ |
| Course Links | ❌ | ✅ | ✅ | ❌ |
| Trust Level | ❌ | ❌ | ❌ | ✅ |

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=OpenLearn Hub
VITE_API_URL=your_api_url_here
```

### Vercel Configuration

The `vercel.json` includes:
- Security headers (XSS protection, frame options)
- Aggressive caching for static assets
- SPA routing configuration
- Build optimization settings

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue with detailed reproduction steps
2. **Suggest Features**: Share your ideas in the discussions
3. **Submit PRs**: Follow our coding standards and include tests
4. **Improve Docs**: Help us make documentation better
5. **Share Feedback**: Tell us about your experience

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Keep components small and focused

---

## 📊 Statistics

- **50+ Components**: Reusable, well-documented React components
- **15+ Pages**: Comprehensive coverage of all features
- **5 Learning Paths**: Multiple ways to organize content
- **4 User Roles**: Tailored experiences for each role
- **100% TypeScript**: Full type safety
- **Mobile First**: Responsive on all devices

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ayon**
- GitHub: [@tech-akash010](https://github.com/tech-akash010)
- Project: [OpenLearn-Hub](https://github.com/tech-akash010/OpenLearn-Hub)

---

## 🙏 Acknowledgments

- **Lucide Icons** - Beautiful iconography
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **Vite** - Lightning-fast tooling
- **Vercel** - Seamless deployment

---

## 🔮 Future Roadmap

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Quiz and assessment system
- [ ] Live video lectures
- [ ] Discussion forums
- [ ] Gamification and badges
- [ ] Analytics dashboard

---

<div align="center">

**Made with ❤️ by the OpenLearn Team**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/tech-akash010/OpenLearn-Hub/issues) • [Request Feature](https://github.com/tech-akash010/OpenLearn-Hub/issues)

</div>
