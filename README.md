# Creative Portfolio Website

A modern and interactive portfolio website built with Next.js, featuring stunning animations and effects using GSAP, Three.js, and Framer Motion.

## Features

- Interactive 3D background with Three.js
- Custom cursor with trail effect
- Smooth scroll animations
- Gradient text animations
- Responsive design
- Contact form with Firebase integration
- Modern UI with glassmorphism effects

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Three.js
- GSAP
- Framer Motion
- Firebase
- Particles.js

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Firestore Database
   - Copy your Firebase configuration
   - Create a `.env.local` file based on `.env.example`
   - Add your Firebase configuration values to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

1. Update personal information in `src/app/page.tsx`
2. Modify the color scheme in `src/app/globals.css`
3. Add your projects in the Projects section
4. Customize animations and effects in respective components

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (Vercel recommended):
```bash
vercel
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── ContactForm.tsx
│   │   └── CustomCursor.tsx
│   ├── utils/
│   │   └── firebase.ts
│   ├── page.tsx
│   └── layout.tsx
├── styles/
└── public/
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
## Powered by Rial
