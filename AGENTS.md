# UI Library Agent Guidelines

## Build/Lint/Test Commands
- Build: `npm run build` 
- Lint: `npx eslint lib/`
- Test: `cd test && make` (or run individual tests directly)

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Follow ESNext module syntax and naming conventions
- All components must be exported from lib/index.ts
- CSS files should follow BEM methodology
- Use camelCase for variables and functions
- Use PascalCase for components
- Implement proper TypeScript types for all functions and interfaces
- Handle errors with try/catch blocks where appropriate
- Import statements should be grouped (external, internal, relative)
- Use consistent indentation (2 spaces) and line breaks
- All public APIs must be properly documented with JSDoc comments

## Git Commit Guidelines
- Use semantic git commit messages following the format: `<type>(<scope>): <subject>`
- Commit types: feat, fix, docs, style, refactor, test, chore
- Always use the present tense and imperative mood
- Keep subject line under 50 characters
- Add a blank line after the subject line
- Use the body to explain what and why, not how

## Special Notes
- This is a frontend UI library built with TypeScript and Vite
- CSS is compiled to a single bundle with separate CSS file
- Components are exported via lib/index.ts
- Follow the existing code structure and patterns in the codebase