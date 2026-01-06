# PROJECT REPORT: Interactive Movie Application
**Subject**: Multimedia (UAS)  
**Project Title**: Web-Based Interactive Movie Platform using Next.js

---

## 1. Introduction

### 1.1 Background
The digital entertainment landscape is evolving, with interactive storytelling gaining popularity through platforms like Netflix's *Black Mirror: Bandersnatch*. These experiences allow viewers to actively participate in the narrative by making choices that influence the plot. This project aims to bring this immersive experience to the web platform, leveraging modern web technologies to ensure performance, smooth transitions, and scalability.

### 1.2 Objectives
The primary objective of this project is to develop a web-based "Interactive Movie" application that allows users to:
1. Watcch seamless video content.
2. Make decisions at critical plot points.
3. Experience different narrative branches and endings based on their choices.

### 1.3 Scope
The application focuses on a specific narrative scenario involving a student facing a dilemma in a classroom setting. The key technical features include:
- **Seamless Video Playback**: Smooth transitions between video clips.
- **Branching Narrative**: Logic to handle multiple storylines and endings.
- **User Interface**: Clean overlays for decision-making without interrupting immersion.

---

## 2. Theoretical Framework

### 2.1 Next.js Framework
The project is built using [Next.js](https://nextjs.org/), a React framework that offers server-side rendering and static site generation. The **App Router** architecture is used for efficient routing and layout management, ensuring fast load times and SEO friendliness.

### 2.2 React & Component-Based Architecture
The user interface is constructed using **React**, breaking down the application into reusable components. This modular approach allows for easier maintenance and scalability. Key libraries include:
- **Framer Motion**: For smooth animations of UI elements (e.g., choice overlays).
- **Lucide React**: For scalable vector icons.

### 2.3 State Management (Zustand)
To manage the complex state of the application—tracking which video is playing, user choices, and narrative history—**Zustand** is employed. It offers a lightweight and performant alternative to Redux, minimizing boilerplate code while providing global state access.

### 2.4 Graph Theory in Storytelling
The narrative structure is modeled as a **Directed Graph**. Each video clip represents a "node," and user choices represent "edges" connecting these nodes. This ensures that the story flow is deterministic and can be easily visualized or modified.

---

## 3. System Design

### 3.1 Architecture Overview
The application follows a frontend-centric architecture:
- **Root Page (`page.tsx`)**: Entry point.
- **InteractiveFilm Component**: The core container that manages the game loop.
- **CustomVideoPlayer Component**: Wrapper around the HTML5 `<video>` tag for enhanced control and events.
- **Data Layer (`story-data.ts`)**: JSON-like structure defining the graph.

### 3.2 Narrative Flowchart (Mermaid)

```mermaid
graph TD
    Intro[Intro <br/> (scene_01_intro)] -->|Auto| Scene1[Scene 1: Dosen Datang]
    
    Scene1 --> Choice1{Choice}
    Choice1 -->|Ambil Pulpen| Scene2A[Scene 2A: Cek Kaki]
    Choice1 -->|Diam Saja| Scene3[Scene 3: Situasi Genting]
    
    Scene2A -->|Auto| Scene3A[Ending A]
    
    Scene3 --> Choice2{Choice}
    Choice2 -->|Lari Semua| Scene3A2[Ending Panic]
    Choice2 -->|Keluar Tertib| Scene3B[Ending Tertib]
    
    style Intro fill:#f9f,stroke:#333,stroke-width:2px
    style Scene1 fill:#bbf,stroke:#333
    style Scene2A fill:#dfd,stroke:#333
    style Scene3 fill:#dfd,stroke:#333
    style Scene3A fill:#faa,stroke:#333
    style Scene3A2 fill:#faa,stroke:#333
    style Scene3B fill:#faa,stroke:#333
```

### 3.3 Data Structure (`StoryNode`)
The story is defined in `src/data/story-data.ts` using the following interface:

```typescript
type StoryNode = {
  id: string;
  videoSrc: string; // File path: e.g., "small/Scene-1.m4v"
  nextDefault?: string; // Auto-transition ID
  choices?: {
    label: string;
    nextId: string;
  }[];
  isEnding?: boolean;
};
```

---

## 4. Implementation Details

### 4.1 Video Player (`CustomVideoPlayer.tsx`)
A custom wrapper was built to handle HTML5 video events precisely.
- **Handling Metadata**: The player preloads video metadata (`preload="auto"`) to minimize loading time.
- **Event Listeners**: It listens for the `onEnded` event to trigger transitions or show choice overlays.
- **Demo Mode**: A debug feature allowing developers to seek through the video using native controls.

### 4.2 Game Loop (`InteractiveFilm.tsx`)
This component orchestrates the experience:
1. **Initialize**: Loads the initial node (Intro).
2. **Play**: Renders the video component with the current source.
3. **Wait**: Upon `onEnded`, checks if `nextDefault` exists.
   - If **Yes**: Automatically updates the state to the next node.
   - If **No**: Sets `showChoices` to true, displaying the overlay.
4. **Interact**: User clicks a button -> State updates to `nextId`.

### 4.3 UI/UX Design
- **Tailwind CSS**: Used for rapid styling, ensuring a dark, cinematic theme.
- **Overlays**: Choice buttons appear with a fade-in animation using Framer Motion to avoid jarring jumps.
- **Responsiveness**: The player scales to fit different screen sizes while maintaining aspect ratio.

### 4.4 Challenges & Solutions
**Issue**: Video "stuck" or not updating when changing sources.  
**Solution**: Used React's `key` prop on the `<video>` element (`key={src}`). This forces React to unmount and remount the video element whenever the source changes, ensuring a clean state.

**Issue**: Large video file sizes.  
**Solution**: Videos were compressed to `.m4v` and stored in the `public/` directory for local development. For production, the system supports loading from a CDN via environment variables (`NEXT_PUBLIC_VIDEO_HOST`).

---

## 5. Conclusion

### 5.1 Summary of Achievements
The project successfully delivers a working prototype of an interactive movie. All critical paths in the storyboard function correctly, from the introduction to the various endings. The system is robust enough to handle additional scenes and branches simply by updating the data file, without changing the core code.

### 5.2 Future Improvements
- **Video Preloading**: Implement advanced preloading logic to fetch the *next possible* videos in the background while the current one plays.
- **Inventory System**: Add state to track items collected (e.g., "HasPen: true") which unlocks special choices later in the story.
- **Deployment**: Migrate large video assets to cloud object storage (AWS S3 or Cloudinary) for better global performance.
