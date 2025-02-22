# UWA MIT Study Planner

A modern web application to help UWA MIT (Master of Information Technology) students plan their course selections and study path.

![UWA MIT Study Planner](./public/preview.png)

## Features

- **Interactive Course Planning**
  - Drag-and-drop interface for course selection
  - Real-time validation of course prerequisites
  - Semester-based course organization
  - Support for different specializations (AI, Software Systems, Applied Computing)

- **Smart Course Management**
  - Automatic prerequisite checking
  - Course type tracking (Core, Conversion, Option units)
  - Semester compatibility validation
  - Unit point calculation

- **User-Friendly Interface**
  - Responsive design for all devices
  - Modern UI with Shadcn/ui components
  - Intuitive drag-and-drop interactions
  - Clear visual feedback

- **Study Plan Features**
  - Save study plan as PNG
  - Load predefined study plans
  - Clear and start over option
  - Course statistics and summary

## Tech Stack

- **Frontend Framework**
  - React 18
  - TypeScript
  - Vite

- **State Management**
  - Redux Toolkit
  - React Redux

- **UI Components**
  - Shadcn/ui
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons

- **Drag and Drop**
  - React DnD
  - React DnD HTML5 Backend
  - React DnD Touch Backend

- **Utilities**
  - dom-to-image-more
  - clsx
  - tailwind-merge

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── Main/        # Main content components
│   ├── Modals/      # Modal components
│   ├── Sider/       # Sidebar components
│   └── ui/          # Shadcn UI components
├── data/           # Static data and configurations
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── lib/            # Utility functions
├── redux/          # Redux store and slices
├── styles/         # Global styles and CSS modules
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/uwa-mit-planner.git
cd uwa-mit-planner
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Usage

1. **Select Enrollment Details**
   - Choose your enrollment year
   - Select starting semester
   - Pick your specialization (if applicable)

2. **Plan Your Courses**
   - Drag courses from the sidebar to semester slots
   - System will validate prerequisites and semester restrictions
   - View course statistics in real-time

3. **Save Your Plan**
   - Export your study plan as a PNG image
   - Clear and start over if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UWA MIT Course Coordinators for course information
- Shadcn/ui for the beautiful component library
- The React and TypeScript communities

## Contact

Jack Qin - [fudong.dev](https://fudong.dev)

Project Link: [https://github.com/yourusername/uwa-mit-planner](https://github.com/yourusername/uwa-mit-planner)
