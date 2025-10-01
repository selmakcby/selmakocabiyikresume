# Adyen Application Website

A modern, interactive application website built with Next.js and Tailwind CSS, featuring a professional CV, motivation letter, and an intelligent chatbot. This website showcases my application for a position at Adyen with a sleek Vercel-inspired design.

## ✨ Features

- **Modern Design**: Clean, professional interface with Vercel-style aesthetics
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Navigation**: Smooth transitions between sections
- **CV Section**: Comprehensive curriculum vitae with structured information
- **Motivation Letter**: Professional cover letter tailored for Adyen
- **AI Chatbot**: Interactive chatbot that answers questions about the application
- **Dark Mode Support**: Automatic dark/light mode switching
- **Smooth Animations**: Elegant transitions and hover effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/selmakcby/adyenapplicaiton.git
cd adyenapplicaiton
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
adyenapplicaiton/
├── app/
│   ├── components/
│   │   └── ChatBot.tsx      # Interactive chatbot component
│   ├── globals.css          # Global styles and custom CSS
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎨 Design Features

### Vercel-Inspired Design
- Clean, minimal interface
- Gradient backgrounds and buttons
- Glass morphism effects
- Smooth animations and transitions
- Professional typography

### Color Scheme
- Primary: Blue to purple gradients
- Background: Slate colors with dark mode support
- Accent: Green for user messages in chat
- Text: High contrast for accessibility

## 🤖 Chatbot Features

The integrated chatbot includes:
- **Smart Responses**: Context-aware replies based on user questions
- **Typing Indicators**: Realistic conversation flow
- **Suggested Questions**: Quick-start options for users
- **Message History**: Persistent conversation within session
- **Responsive Design**: Works seamlessly on all devices

### Supported Topics
- Payment systems experience
- Technical skills and tools
- Work experience and achievements
- Interest in Adyen
- Development methodologies
- Career goals and motivations

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Heroicons (SVG)
- **Deployment**: Vercel-ready

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

Automatic dark mode detection based on system preferences with smooth transitions between light and dark themes.

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

The website is currently deployed at: [adyenapplicaiton.vercel.app](https://adyenapplicaiton.vercel.app)

## 📝 Customization

To customize this application for your own use:

1. Update personal information in the CV section
2. Modify the motivation letter content
3. Customize chatbot responses in `app/components/ChatBot.tsx`
4. Adjust colors and styling in `app/globals.css`
5. Update the navigation and footer links

## 🤝 Contributing

Feel free to fork this project and customize it for your own applications. If you make improvements, pull requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS
