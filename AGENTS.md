# UI Library Development Guidelines

## Build/Lint/Test Commands
- Build: `npm run build` - Compiles TypeScript and builds minified JS/CSS
- Lint: `npx eslint lib/` - Checks JavaScript/TypeScript code style
- Test: No specific test command found - Check `test/` directory for test files

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Follow ESNext module syntax and conventions
- Import paths should be relative or from node_modules
- All code must pass TypeScript compilation and ESLint checks
- Use camelCase for variables and functions
- Use PascalCase for class names and components
- Use kebab-case for CSS class names
- All public APIs should be documented with JSDoc comments
- Use meaningful, descriptive names for variables and functions
- Prefer explicit type annotations over implicit inference
- Handle errors with proper try/catch blocks and error objects
- Follow CSS naming conventions (BEM or similar)
- Use consistent indentation (2 spaces for TypeScript, 4 for CSS)