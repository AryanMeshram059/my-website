# Design Document

## Overview

This design document outlines the completion of Aryan's portfolio website, maintaining the established premium aesthetic with video backgrounds, glassmorphism effects, gradient typography, and smooth Framer Motion animations. The design will extend the existing visual language across About Me, Projects, and Contact sections while ensuring consistent user experience and performance.

## Architecture

### Component Structure
```
src/
├── components/
│   ├── AboutMe/
│   │   ├── AboutMe.jsx (main container)
│   │   ├── ProfileCard.jsx
│   │   ├── SkillsGrid.jsx
│   │   └── ExperienceTimeline.jsx
│   ├── Projects/
│   │   ├── Projects.jsx (main container)
│   │   ├── ProjectCard.jsx
│   │   └── ProjectFilter.jsx
│   ├── Contact/
│   │   ├── Contact.jsx (main container)
│   │   ├── ContactForm.jsx
│   │   └── SocialLinks.jsx
│   └── shared/
│       ├── AnimatedText.jsx
│       ├── GlassCard.jsx
│       └── SectionDivider.jsx
├── hooks/
│   ├── useTypewriter.js (existing)
│   ├── useScrollAnimation.js
│   └── useIntersectionObserver.js
└── assets/
    ├── heroVideo.mp4 (existing)
    ├── project-images/
    └── icons/
```

### Design System Extension

#### Color Palette (Consistent with Hero)
- **Primary Gradient**: `from-[#A87F17] to-[#FFFFFF]` (gold to white)
- **Background**: `bg-neutral-950`, `bg-zinc-950`, `bg-black` (dark variations)
- **Text Colors**: `text-[#B2A8A8]` (muted), `text-white`, gradient text
- **Glass Effects**: `backdrop-blur-md bg-white/10 border border-white/20`

#### Typography System
- **Headers**: Outfit font family with gradient text effects
- **Body Text**: Outfit for readability
- **Navigation**: Space Grotesk (existing)
- **Accent Text**: Pacifico for special elements

#### Animation Principles
- **Entrance**: `initial={{ opacity: 0, y: 30 }}` with `duration: 1`
- **Stagger**: 0.2s delays between elements
- **Hover**: Scale and glow effects
- **Scroll-triggered**: Intersection Observer based animations

#### Glassmorphism Usage Strategy
- **Selective Application**: Use glassmorphism sparingly for accent elements only
- **Primary Use Cases**: Navigation bar (existing), skill hover states, form focus states
- **Avoid Overuse**: Main content cards use solid backgrounds with subtle borders
- **Detail Enhancement**: Apply glass effects to small interactive elements and overlays

## Components and Interfaces

### About Me Section

#### ProfileCard Component
```jsx
// Visual: Left-aligned card with solid dark background
// Content: Professional photo, name, title, brief bio
// Animation: Slide in from left with fade
// Styling: Solid card with subtle gradient border accent
```

#### SkillsGrid Component
```jsx
// Visual: 3-column grid of technology icons
// Content: Frontend, Backend, Tools categories
// Animation: Staggered entrance, hover scale effects
// Styling: Solid dark cards with subtle glass effect only on hover
```

#### ExperienceTimeline Component
```jsx
// Visual: Vertical timeline with connected dots
// Content: Work experience, education milestones
// Animation: Progressive reveal on scroll
// Styling: Solid dark cards with glass effect only on timeline dots
```

### Projects Section

#### ProjectCard Component
```jsx
// Visual: Card with project image, overlay on hover
// Content: Project title, description, tech stack, links
// Animation: Hover lift effect, image zoom
// Styling: Solid dark card with subtle glass overlay only on hover
```

#### ProjectFilter Component
```jsx
// Visual: Horizontal tab navigation
// Content: Filter buttons (All, Frontend, Full-Stack, etc.)
// Animation: Smooth tab transitions, active state
// Styling: Solid buttons with glass effect only on active state
```

### Contact Section

#### ContactForm Component
```jsx
// Visual: Centered form with solid dark styling
// Content: Name, email, message fields + submit button
// Animation: Field focus animations, submit feedback
// Styling: Solid dark input fields with subtle glass effect only on focus
```

#### SocialLinks Component
```jsx
// Visual: Horizontal row of social media icons
// Content: GitHub, LinkedIn, Twitter, Email links
// Animation: Hover bounce effects
// Styling: Solid dark circular buttons with subtle glass effect on hover
```

## Data Models

### Project Data Structure
```javascript
const projectData = {
  id: string,
  title: string,
  description: string,
  image: string,
  techStack: string[],
  liveUrl?: string,
  githubUrl?: string,
  category: 'frontend' | 'fullstack' | 'backend',
  featured: boolean
}
```

### Skill Data Structure
```javascript
const skillData = {
  category: 'frontend' | 'backend' | 'tools',
  name: string,
  icon: string,
  proficiency?: number, // 1-100 for progress bars
  description?: string
}
```

### Contact Form Data
```javascript
const contactFormData = {
  name: string,
  email: string,
  message: string,
  timestamp: Date
}
```

## Error Handling

### Form Validation
- **Client-side validation** for email format, required fields
- **Visual feedback** with error states and success animations
- **Graceful degradation** if JavaScript fails

### Image Loading
- **Lazy loading** for project images with placeholder effects
- **Fallback images** for broken or missing project screenshots
- **Progressive enhancement** for video backgrounds

### Animation Performance
- **Reduced motion** respect for accessibility preferences
- **Performance monitoring** to ensure 60fps animations
- **Fallback states** for devices with limited animation support

## Testing Strategy

### Component Testing
- **Unit tests** for individual components using React Testing Library
- **Snapshot tests** to catch unintended visual changes
- **Accessibility tests** for keyboard navigation and screen readers

### Integration Testing
- **Form submission** testing with mock API endpoints
- **Navigation flow** testing between sections
- **Animation timing** tests for smooth transitions

### Performance Testing
- **Lighthouse audits** for performance, accessibility, SEO
- **Bundle size analysis** to ensure optimal loading times
- **Cross-browser testing** for consistent experience

### Visual Regression Testing
- **Screenshot comparisons** to maintain design consistency
- **Responsive design** testing across device sizes
- **Animation smoothness** validation across different hardware

## Implementation Phases

### Phase 1: About Me Section
1. Create ProfileCard with personal information
2. Implement SkillsGrid with technology icons
3. Add ExperienceTimeline component
4. Integrate scroll-triggered animations

### Phase 2: Projects Section
1. Design ProjectCard component structure
2. Implement project data management
3. Add filtering and sorting functionality
4. Create hover and interaction effects

### Phase 3: Contact Section
1. Build ContactForm with validation
2. Implement SocialLinks component
3. Add form submission handling
4. Create success/error feedback systems

### Phase 4: Polish and Optimization
1. Performance optimization and lazy loading
2. Accessibility improvements
3. Cross-browser compatibility testing
4. Final animation timing adjustments