# Draw2Dev Frontend Architecture

## Project Overview

Draw2Dev is a marketing site showcasing a hand-drawn notebook aesthetic with complex SVG animations. The site demonstrates the concept of transforming sketches into production code through a carefully orchestrated visual experience.

## Architecture Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE FLOW                     │
├─────────────────────────────────────────────────────────────────┤
│  Logo Reveal → Main Layout → Hero Animation → User Actions     │
│    (0-3s)       (3s fade)     (3.5s start)    (modal triggers) │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT HIERARCHY                        │
├─────────────────────────────────────────────────────────────────┤
│  App.tsx                                                        │
│  └── Home.tsx (orchestrates experience)                        │
│      ├── LogoReveal.tsx (anime.js SVG animation)               │
│      ├── NavButton.tsx × N (rough.js rectangles)               │
│      ├── HeroAnimation.tsx (3-stage pen→arrow→code)            │
│      └── Modal.tsx (react-spring, dual variants)               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        ANIMATION SYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Logo (anime.js timeline)                             │
│  ├── Draw SVG paths via stroke-dashoffset                      │
│  └── Erase with white overlay animation                        │
│                                                                 │
│  Phase 2: Layout Reveal (CSS transitions)                      │
│  ├── Staggered fade-in of navigation                           │
│  └── Hero area becomes visible                                 │
│                                                                 │
│  Phase 3: Hero Animation (anime.js + CSS)                      │
│  ├── Pen draws sketch (stroke animation)                       │
│  ├── Arrow jitters between elements (path swapping)            │
│  └── Monitor displays typing code (CSS keyframes)              │
│                                                                 │
│  Phase 4: User Interaction (react-spring)                      │
│  ├── Modal entrance/exit animations                            │
│  └── Form validation and success states                        │
└─────────────────────────────────────────────────────────────────┘
```

## Technical Stack

### Core Technologies
- **React 18**: Component architecture with hooks
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast build tool with optimal bundling
- **Tailwind CSS**: Utility-first styling with custom design tokens

### Animation Libraries
- **anime.js (27.6kB)**: SVG path animations, timeline orchestration
- **@react-spring/web (55.9kB)**: Modal animations, smooth transitions  
- **rough.js (9.27kB)**: Hand-drawn canvas/SVG rendering

### Typography & Assets
- **Caveat Font (~25kB)**: Hand-written body text (OFL-1.1)
- **Jeju Hallasan**: Logo font via Google Fonts
- **Custom SVG paths**: Hand-drawn icons and graphics

## Component Design Patterns

### 1. **Stateful Orchestration** (`Home.tsx`)
```tsx
// Coordinates animation phases with state management
const [animationPhase, setAnimationPhase] = useState({
  logoComplete: false,
  layoutVisible: false,
  heroStarted: false
});

// Manages modal state for user interactions
const [modalState, setModalState] = useState({
  isOpen: false,
  variant: 'waitlist' | 'contact'
});
```

### 2. **Memoized Canvas Operations** (`NavButton.tsx`, `Modal.tsx`)
```tsx
// Prevents expensive rough.js recreation
const roughInstance = useMemo(() => {
  if (canvasRef.current) {
    return rough.canvas(canvasRef.current);
  }
  return null;
}, [canvasRef.current]);
```

### 3. **Timeline-Based Animation** (`LogoReveal.tsx`, `HeroAnimation.tsx`)
```tsx
// Coordinated multi-element animations
const timeline = anime.timeline({
  complete: onComplete,
  // Sequential path drawing with staggered delays
});
```

### 4. **Accessible Form Components** (`Modal.tsx`)
```tsx
// Focus management and keyboard navigation
useEffect(() => {
  if (isOpen) {
    previousFocusRef.current = document.activeElement;
    firstFocusableRef.current?.focus();
  } else {
    previousFocusRef.current?.focus();
  }
}, [isOpen]);
```

## Performance Optimizations

### Bundle Size Management
- **Total estimated size**: 127.8kB gzipped (under 150kB limit)
- **Code splitting**: Vendor, animations, and graphics chunks
- **Tree shaking**: Only import used parts of libraries
- **Asset optimization**: SVG paths over bitmap images

### Animation Performance
- **GPU acceleration**: CSS transforms and opacity changes
- **Memoization**: Expensive calculations cached with useMemo
- **Cleanup**: Proper timer and animation cleanup on unmount
- **Reduced motion**: Respects user accessibility preferences

### Memory Management
```tsx
// Cleanup patterns throughout components
useEffect(() => {
  return () => {
    clearTimeout(timer);
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current = null;
    }
  };
}, [dependencies]);
```

## Accessibility Strategy

### Screen Reader Support
- **Semantic HTML**: Proper roles and ARIA labels
- **Alternative text**: Descriptive content for visual elements
- **Focus management**: Keyboard navigation and focus trapping

### Motion Accessibility
```tsx
const prefersReducedMotion = useMemo(() => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}, []);

// Show final state without animation if preferred
if (prefersReducedMotion) {
  // Static content display
}
```

### Keyboard Navigation
- **Tab order**: Logical focus progression
- **Escape handling**: Modal dismissal
- **Enter/Space**: Button activation

## Design System

### Color Palette
```css
:root {
  --paper: #FAFAFA;    /* Background */
  --ink: #000000;      /* Text and lines */
  --grey-bg: greys only for backgrounds;
}
```

### Typography Scale
```css
.font-logo { font-family: 'Jeju Hallasan', 'Caveat', cursive; }
.font-handwriting { font-family: 'Caveat', cursive; }
```

### Component Tokens
```css
.sketch-border { /* rough.js integration */ }
.paper-texture { /* subtle noise background */ }
.fade-edges { /* mask-image gradients */ }
```

## State Management Strategy

### Local Component State
- Animation phases and timing
- Form data and validation
- UI interaction states (hover, focus, open/closed)

### No Global State
- **Rationale**: Simple marketing site with minimal shared state
- **Props drilling**: Manageable with current component depth
- **Future**: Could add Context/Redux if complexity grows

## Build & Development

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react(), analyzer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['animejs', '@react-spring/web'],
          graphics: ['roughjs']
        }
      }
    }
  }
});
```

### Development Workflow
1. **Hot Module Replacement**: Instant component updates
2. **TypeScript checking**: Real-time error detection
3. **Bundle analysis**: Size monitoring during development
4. **Accessibility testing**: axe-core integration

## Future Enhancements

### Performance Monitoring
- **Web Vitals**: LCP, FID, CLS tracking
- **Animation profiling**: 60fps validation
- **Bundle monitoring**: Continuous size analysis

### Content Management
- **Sections navigation**: About, Gallery, Updates, Team
- **Dynamic content**: Blog posts, team updates
- **Internationalization**: Multi-language support

### Advanced Interactions
- **Voice commands**: Whisper.cpp integration (when size permits)
- **Gesture recognition**: Touch-based sketch interaction
- **Real-time preview**: Live Draw2Dev demonstration

---

**Architecture Decision Records (ADRs)**

### ADR-001: Animation Library Choice
**Decision**: Use anime.js + react-spring combo
**Rationale**: anime.js excels at SVG paths; react-spring better for React components
**Trade-off**: Two libraries vs unified solution, but optimized for specific use cases

### ADR-002: Bundle Size Strategy  
**Decision**: Exclude Whisper.cpp WASM (31-75MB)
**Rationale**: Exceeds mobile performance constraints
**Alternative**: Server-side speech processing for future versions

### ADR-003: Component Architecture
**Decision**: Single-page orchestration via Home.tsx
**Rationale**: Marketing site with linear experience flow
**Benefit**: Simplified state management and animation coordination

---
*Documentation maintained as of Phase 3 - Core Implementation Complete*