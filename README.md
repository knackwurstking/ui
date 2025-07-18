# UI Library

A modern, lightweight UI library with comprehensive CSS framework and TypeScript utilities for building beautiful web applications.

## 📋 Table of Contents

- [✨ Features](#-features)
    - [🎨 CSS Framework](#-css-framework)
    - [⚡ TypeScript Utilities](#-typescript-utilities)
    - [🔧 Developer Experience](#-developer-experience)
- [📦 Installation](#-installation)
    - [Git Submodule (Recommended)](#git-submodule-recommended)
    - [Direct Clone](#direct-clone)
    - [Download Release](#download-release)
- [🚀 Quick Start](#-quick-start)
    - [CSS Framework Only](#css-framework-only)
    - [TypeScript/JavaScript](#typescriptjavascript)
- [🎨 CSS Framework](#-css-framework-1)
    - [Components](#components)
        - [Buttons](#buttons)
        - [Cards](#cards)
        - [Forms](#forms)
    - [Utility Classes](#utility-classes)
        - [Layout](#layout)
        - [Typography](#typography)
        - [Colors](#colors)
- [⚡ TypeScript Utilities](#-typescript-utilities-1)
    - [Event System](#event-system)
    - [Store Management](#store-management)
    - [WebSocket Handler](#websocket-handler)
    - [Router](#router)
- [🎯 Examples](#-examples)
    - [Complete App Structure](#complete-app-structure)
- [📚 Documentation](#-documentation)
- [🛠️ Development](#️-development)
    - [Build](#build)
    - [Project Structure](#project-structure)
- [🎨 Customization](#-customization)
    - [CSS Variables](#css-variables)
    - [Theme Switching](#theme-switching)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎨 **CSS Framework**

- **Modern color system** with automatic light/dark theme support
- **Semantic components** for buttons, forms, cards, and layouts
- **Comprehensive utility classes** for rapid development
- **Accessibility-first** design with focus management
- **Variable font integration** with Recursive font family
- **Responsive design** with mobile-first approach

### ⚡ **TypeScript Utilities**

- **Event system** for type-safe event handling
- **Local storage** with reactive store management
- **WebSocket handler** for real-time communication
- **Router utilities** for single-page applications
- **Draggable interactions** for enhanced UX
- **Ripple effects** for Material Design-like feedback

### 🔧 **Developer Experience**

- **TypeScript support** with full type definitions
- **Modular architecture** - use only what you need
- **Zero external dependencies** (except Bootstrap Icons)
- **Modern build tools** with Vite and TypeScript
- **Comprehensive documentation** and examples

## 📦 Installation

### Git Submodule (Recommended)

```bash
# Add as submodule to your project
git submodule add https://github.com/knackwurstking/ui.git libs/ui
cd libs/ui
npm install
npm run build
```

### Direct Clone

```bash
# Clone the repository
git clone https://github.com/knackwurstking/ui.git
cd ui
npm install
npm run build
```

### Download Release

1. Go to [Releases](https://github.com/knackwurstking/ui/releases)
2. Download the latest release
3. Extract to your project directory
4. Build if needed: `npm install && npm run build`

## 🚀 Quick Start

### CSS Framework Only

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="libs/ui/dist/ui.min.css" />
    </head>
    <body>
        <div class="container">
            <div class="card elevated">
                <div class="card-body">
                    <h1 class="card-title">Hello World!</h1>
                    <p class="card-description">Welcome to the UI library.</p>
                    <div class="card-actions">
                        <button class="primary">Get Started</button>
                        <button class="secondary outline">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
```

### TypeScript/JavaScript

```typescript
import "./libs/ui/dist/ui.min.css";
import { Store, Events, router } from "./libs/ui/dist/ui.min.js";

// Create a reactive store
const store = new Store<{ count: number }>("app-");
store.set("count", 0);

// Listen to changes
store.addListener("count", (value) => {
    console.log("Count changed:", value);
});

// Update the store
store.set("count", store.get("count") + 1);
```

## 🎨 CSS Framework

### Components

#### Buttons

```html
<!-- Color variants -->
<button class="primary">Primary</button>
<button class="secondary">Secondary</button>
<button class="success">Success</button>
<button class="warning">Warning</button>
<button class="destructive">Destructive</button>

<!-- Style variants -->
<button class="primary outline">Outlined</button>
<button class="secondary ghost">Ghost</button>
```

#### Cards

```html
<div class="card elevated">
    <img src="image.jpg" alt="Card image" class="card-image aspect-video" />
    <div class="card-body">
        <h3 class="card-title">Card Title</h3>
        <p class="card-description">Card content goes here.</p>
        <div class="card-actions">
            <button class="primary">Action</button>
        </div>
    </div>
</div>
```

#### Forms

```html
<form class="flex column gap">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email" />

    <label for="message">Message</label>
    <textarea id="message" placeholder="Your message"></textarea>

    <button type="submit" class="success">Send Message</button>
</form>
```

### Utility Classes

#### Layout

```html
<div class="flex gap align-center justify-between">
    <div class="flex-item">Flexible item</div>
    <div>Fixed item</div>
</div>
```

#### Typography

```html
<h1 class="text-2xl text-bold text-center">Large Bold Centered</h1>
<p class="text-sm text-muted">Small muted text</p>
<span class="text-uppercase text-semibold">Uppercase Semibold</span>
```

#### Colors

```html
<div class="primary">Primary background</div>
<span class="success ghost">Success text color</span>
<div class="warning">Warning background</div>
```

## ⚡ TypeScript Utilities

### Event System

```typescript
import { Events } from "./libs/ui/dist/ui.min.js";

type AppEvents = {
    userLogin: { userId: string; name: string };
    userLogout: { userId: string };
    dataUpdate: { data: any[] };
};

const events = new Events<AppEvents>();

// Add listener
const cleanup = events.addListener("userLogin", (user) => {
    console.log(`Welcome ${user.name}!`);
});

// Dispatch event
events.dispatch("userLogin", { userId: "123", name: "John Doe" });

// Clean up
cleanup();
```

### Store Management

```typescript
import { Store } from "./libs/ui/dist/ui.min.js";

type AppState = {
    user: { id: string; name: string } | null;
    theme: "light" | "dark";
    notifications: string[];
};

const store = new Store<AppState>("myapp-");

// Set values
store.set("theme", "dark");
store.set("user", { id: "123", name: "John" });

// Get values
const currentTheme = store.get("theme"); // 'dark'

// Listen to changes
store.addListener("theme", (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
});

// Update arrays
const notifications = store.get("notifications") || [];
store.set("notifications", [...notifications, "New message!"]);
```

### WebSocket Handler

```typescript
import { WS } from "./libs/ui/dist/ui.min.js";

const ws = new WS("wss://api.example.com/socket");

ws.addListener("open", () => {
    console.log("Connected to server");
    ws.send({ type: "auth", token: "your-token" });
});

ws.addListener("message", (data) => {
    console.log("Received:", data);
});

ws.addListener("close", () => {
    console.log("Connection closed");
});

// Connect
ws.connect();
```

### Router

```typescript
import { router } from "./libs/ui/dist/ui.min.js";

// Define routes
router.addRoute("/home", () => {
    document.body.innerHTML = "<h1>Home Page</h1>";
});

router.addRoute("/about", () => {
    document.body.innerHTML = "<h1>About Page</h1>";
});

// Navigate
router.navigate("/home");

// Get current route
const current = router.getCurrentRoute(); // '/home'
```

## 🎯 Examples

### Complete App Structure

```html
<!DOCTYPE html>
<html data-theme="light">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <link rel="stylesheet" href="libs/ui/dist/ui.min.css" />
    </head>
    <body>
        <!-- App Bar -->
        <header class="app-bar top fixed">
            <div class="app-bar-left">
                <h1 class="text-lg text-bold">My App</h1>
            </div>
            <div class="app-bar-right">
                <button class="ghost" id="theme-toggle">🌙</button>
                <button class="primary">Sign In</button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container" style="margin-top: var(--ui-app-bar-height);">
            <div class="card-grid">
                <div class="card elevated">
                    <div class="card-body">
                        <h2 class="card-title">Feature 1</h2>
                        <p class="card-description">
                            Amazing feature description.
                        </p>
                        <div class="card-actions">
                            <button class="primary">Try Now</button>
                        </div>
                    </div>
                </div>

                <div class="card elevated">
                    <div class="card-body">
                        <h2 class="card-title">Feature 2</h2>
                        <p class="card-description">Another great feature.</p>
                        <div class="card-actions">
                            <button class="secondary">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script type="module">
            import { Store } from "./libs/ui/dist/ui.min.js";

            const store = new Store("app-");
            const themeButton = document.getElementById("theme-toggle");

            // Theme toggle
            themeButton.addEventListener("click", () => {
                const current = store.get("theme") || "light";
                const newTheme = current === "light" ? "dark" : "light";
                store.set("theme", newTheme);
                document.documentElement.setAttribute("data-theme", newTheme);
                themeButton.textContent = newTheme === "light" ? "🌙" : "☀️";
            });
        </script>
    </body>
</html>
```

## 📚 Documentation

- **[CSS Framework Documentation](lib/css/README.md)** - Complete guide to components and utilities
- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[Examples](test/)** - Live examples and test cases

## 🛠️ Development

### Build

```bash
npm run build
```

### Project Structure

```
ui/
├── lib/
│   ├── css/              # CSS framework
│   │   ├── themes/       # Color themes
│   │   ├── components/   # UI components
│   │   ├── utils/        # Utility classes
│   │   └── html/         # HTML element styles
│   ├── utils/            # TypeScript utilities
│   │   ├── events/       # Event system
│   │   ├── store/        # State management
│   │   ├── ws/           # WebSocket handler
│   │   └── router/       # Routing utilities
│   └── index.ts          # Main entry point
├── dist/                 # Built files
├── test/                 # Examples and tests
└── svg/                  # Icon assets
```

## 🎨 Customization

### CSS Variables

```css
:root {
    /* Colors */
    --ui-primary: hsl(210, 85%, 55%);
    --ui-success: hsl(140, 85%, 55%);

    /* Spacing */
    --ui-spacing: 0.5rem;
    --ui-radius: 0.25rem;

    /* Typography */
    --ui-font-size: 1rem;
    --ui-line-height: 1.5;
}
```

### Theme Switching

```typescript
// Manual theme control
document.documentElement.setAttribute("data-theme", "dark");

// System preference detection
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light",
);
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Recursive Font](https://github.com/arrowtype/recursive)** - Variable font family
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Icon set
- **[Vite](https://vitejs.dev/)** - Build tool

---

**Version:** 5.0.1
**Repository:** [github.com/knackwurstking/ui](https://github.com/knackwurstking/ui)
