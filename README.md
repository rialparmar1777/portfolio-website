# Modern Portfolio Website

A stunning, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, interactive UI elements, and a beautiful design that showcases your work effectively.

![Portfolio Preview](public/images/preview.png)

## 🌟 Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive UI**: 
  - Custom cursor effects
  - Smooth scroll animations
  - Interactive project cards
  - Dynamic background effects
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Friendly**: Optimized for search engines
- **PWA Support**: Installable as a Progressive Web App
- **Contact Form**: Integrated EmailJS for seamless communication
- **Dark Mode**: Beautiful dark theme with gradient accents

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email Service**: EmailJS
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your EmailJS configuration:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/         # Static images
│   ├── fonts/          # Custom fonts
│   └── models/         # 3D models
├── src/
│   ├── app/
│   │   ├── components/ # React components
│   │   ├── styles/     # Global styles
│   │   └── page.tsx    # Main page
│   └── types/          # TypeScript types
├── scripts/            # Utility scripts
└── package.json
```

## 🎨 Customization

### Colors and Theme
The portfolio uses a custom color scheme with purple and blue gradients. You can modify the colors in:
- `tailwind.config.js` for global colors
- Individual component files for specific styling

### Content
Update the following files to customize your content:
- `src/app/page.tsx` for main content
- `src/app/components/Projects.tsx` for project details
- `src/app/components/Contact.tsx` for contact information

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Laptops (1024px and up)
- Desktop screens (1280px and up)

## 🔧 Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized animations for mobile devices
- Efficient CSS with Tailwind's JIT compiler

## 📦 Deployment

The portfolio is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Rial Parmar
- LinkedIn: [Rial Parmar](https://www.linkedin.com/in/rial-p-886b38145/)
- GitHub: [@rialparmar1777](https://github.com/rialparmar1777)
- Email: rialparmar007@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [EmailJS](https://www.emailjs.com/) for the email service

---

Made with ❤️ by Rial Parmar
