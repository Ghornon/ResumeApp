# ResumeCraft - Free Resume Builder

A modern, free, and open-source resume builder that simplifies the process of creating, updating, and sharing your resume. Built with React, TypeScript, and Firebase.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-GPL%20v3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)

## 🚀 Features

-   **Resume Builder**: Create professional resumes with hundreds of free, customizable templates
-   **Mobile Integration**: Fully responsive design optimized for mobile-first experience
-   **Template Customization**: Easy-to-use interface to customize colors, fonts, layouts, and graphic elements
-   **PDF Export**: Generate and download your resume as a PDF
-   **Cloud Storage**: Save your resumes securely with Firebase
-   **Multiple Templates**: Choose from various professionally designed templates
-   **Theme Customization**: Personalize fonts, colors, and formatting to match your style
-   **Real-time Preview**: See changes instantly as you build your resume
-   **User Authentication**: Secure sign-in and sign-up with Firebase authentication

## 📋 Table of Contents

-   [Getting Started](#getting-started)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Development](#development)
-   [Project Structure](#project-structure)
-   [Technology Stack](#technology-stack)
-   [Features in Detail](#features-in-detail)
-   [Contributing](#contributing)
-   [License](#license)

## 🎯 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   Bun or npm package manager
-   Firebase account for backend services

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Resume-app
    ```

2. **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    ```

3. **Configure Firebase**

    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
    - Update `src/config/firebase.ts` with your Firebase credentials
    - Set up Firestore and Authentication in your Firebase project

## 🛠️ Development

### Start the development server

```bash
bun run dev
# or
npm run dev
```

The application will start at `http://localhost:5173`

### Build for production

```bash
bun run build
# or
npm run build
```

### Linting

```bash
# Check for linting errors
bun run lint

# Fix linting errors automatically
bun run lint:fix
```

### Code Formatting

```bash
# Check code formatting
bun run prettier

# Fix code formatting
bun run prettier:fix
```

### Preview production build

```bash
bun run preview
# or
npm run preview
```

## 📁 Project Structure

```text
src/
├── components/          # Reusable React components
│   ├── EditorForm/      # Resume editor form components
│   ├── PDFPreview/      # PDF preview functionality
│   ├── templates/       # Resume templates
│   ├── ThemeForm/       # Theme customization components
│   └── ...
├── pages/               # Page components (Dashboard, Editor, Parser, etc.)
├── layout/              # Layout components (Header, Main layout)
├── store/               # Zustand state management
├── helpers/             # Utility functions and helpers
├── lib/                 # Library code for PDF parsing
├── types/               # TypeScript type definitions
├── config/              # Configuration files (Firebase)
├── styles/              # Global styles (SCSS)
└── assets/              # Static assets and images
```

## 🏗️ Technology Stack

### Frontend

-   **React 18.3**: Modern UI library
-   **TypeScript 5.5**: Type-safe JavaScript
-   **Vite**: Next-generation build tool
-   **React Router 6**: Client-side routing
-   **Material-UI (MUI) 6.1**: UI component library
-   **Zustand 4.5**: Lightweight state management
-   **React PDF**: PDF rendering
-   **Emotion**: CSS-in-JS styling

### Styling

-   **Material UI**: React components that implement Material Design
-   **SCSS**: Preprocessor for advanced styling
-   **PostCSS**: CSS transformation

### Backend & Services

-   **Firebase 10.13**: Authentication, Firestore database, and hosting
-   **React Firebase Hooks**: Firebase integration for React

### Development Tools

-   **ESLint**: Code linting
-   **Prettier**: Code formatting
-   **TypeScript ESLint**: TypeScript-aware linting

## 🎨 Features in Detail

### Resume Builder

Create professional resumes with an intuitive form-based interface. Select from multiple templates and customize every aspect to match your style.

### Template System

The app includes a powerful template engine that allows:

-   Pre-designed professional templates
-   Complete customization of layout and styling
-   Dynamic component rendering
-   Custom theme support

### PDF Export & Preview

-   Real-time PDF preview while editing
-   High-quality PDF export functionality
-   Print-optimized layout

### Resume Parser

Upload existing PDF resumes and automatically extract information:

-   Text extraction from PDFs
-   Section grouping and organization
-   Data structure for further editing

### User Profiles

Manage your professional information with:

-   Personal details management
-   Profile picture support
-   Multiple resume management

## 🔐 Authentication

The app uses Firebase Authentication with support for:

-   Email/password sign-up and sign-in
-   Social login integration
-   Protected routes with AuthGuard
-   Session persistence

## 🚀 Deployment

The application is configured for Firebase Hosting:

```bash
# Deploy to Firebase
firebase deploy
```

Configuration is in `firebase.json` and `firestore.rules`.

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

-   Use TypeScript for type safety
-   Follow ESLint and Prettier configurations
-   Write meaningful commit messages
-   Add comments for complex logic

## 🐛 Troubleshooting

### Common Issues

#### Firebase Configuration Error

-   Ensure your Firebase credentials are correctly set in `.env.local`
-   Verify Firestore and Authentication are enabled in Firebase Console

#### Build Errors

-   Clear node_modules: `rm -rf node_modules && bun install`
-   Clear Vite cache: `rm -rf node_modules/.vite`

#### Port Already in Use

-   The dev server runs on port 5173 by default
-   To use a different port: `bun run dev -- --port 3000`

## 📄 License

This project is open source and available under the [GPL v3 license](LICENSE)

## 📧 Support

For issues, questions, or suggestions, please:

-   Open an issue on GitHub
-   Check existing documentation
-   Review the FAQ section in the application

## 🙏 Acknowledgments

-   Material-UI for the excellent component library
-   Firebase for backend services
-   React community for amazing tools and libraries

---

Happy Resume Building! 🎉
