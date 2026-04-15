# Noor AI Studio 🎥✨

Noor AI Studio is a premium, cinematic AI platform designed specifically for Urdu content creators. It allows users to generate high-quality images, videos, and perfectly lip-synced avatars using advanced AI models.

## 🚀 Features

- **AI Image Generator**: Create stunning visuals from Urdu or English prompts with realistic, anime, and Pakistani cultural styles.
- **AI Video Generator**: Transform text or images into cinematic video scenes.
- **Perfect Lip Sync**: Generate lifelike Urdu dialogue videos with AI avatars where lip movements match the speech perfectly.
- **AI Avatar Creator**: Create digital twins in various styles including Real Human, 3D Pixar, and Cartoon.
- **Story Mode**: Generate complete scene-by-scene storyboards from a single prompt.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Models**: Google Gemini API (@google/genai)
- **Design Theme**: High Density (Cinematic Dark Mode)

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment via GitHub Actions.

1. Go to your GitHub Repository **Settings**.
2. Navigate to **Secrets and variables** > **Actions**.
3. Add a **New repository secret**:
   - Name: `GEMINI_API_KEY`
   - Value: Your Google AI Studio API Key.
4. Go to **Settings** > **Pages**.
5. Under **Build and deployment** > **Source**, select **GitHub Actions**.

Every time you push to the `main` branch, your app will automatically build and deploy!

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd noor-ai-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy

The app follows a **High Density** design theme, prioritizing a professional, information-rich interface with a cinematic dark aesthetic. It uses a custom grid layout with a dedicated sidebar, inspector panel, and timeline for a professional studio feel.

## 📄 License

MIT License - feel free to use this project for your own creations!
