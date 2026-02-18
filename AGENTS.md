# AGENTS.md

## Build/Lint/Test Commands

### Build
```bash
make build      # Build the project
make generate   # Generate static files (CSS, templates)
make serve      # Serve generated files locally
```

### Run a Single Test
No tests found in codebase. Add test files with `_test.go` suffix when needed.

### Format
```bash
npx prettier --write .  # Format all files
```

## Code Style Guidelines

### Go Language Rules

**Imports:**
- Standard library imports first (sorted alphabetically)
- Third-party imports next (sorted alphabetically)
- Project internal imports last
- Example: `github.com/knackwurstking/ui/internal/*`

**Naming Conventions:**
- Types (structs, interfaces): PascalCase (e.g., `BaseProps`, `App`)
- Variables/Functions: camelCase (e.g., `generateStaticFiles`, `getClasses`)
- Constants: PascalCase with descriptive names
- Files: Describe purpose; template files use `_templ.go` suffix

**Error Handling:**
- Use wrapped errors with `fmt.Errorf("...: %w", err)`
- Return early on errors when possible
- Check for nil before dereferencing

**Formatting:**
- Use `gofmt` or `gofumpt` for consistent formatting
- Limit line length to 120 characters
- Use tabs for indentation

### Template Files (.templ)
- Located in `pkg/css/` and `internal/app/`
- Use semantic naming (e.g., `component_button_templ.go`)
- Keep components focused on single responsibility

### CSS/Styles
- Generated from `.templ` files using `templ generate`
- Output: `/dist/ui.css` → minified to `/dist/ui.min.css`
- Use existing utility classes rather than writing new CSS

## Project Structure
```
ui/
├── internal/      # Private application logic
│   └── app/       # Template definitions
├── pkg/           # Public packages
│   ├── components/ # Reusable UI components
│   └── css/       # CSS utilities and themes
├── scripts/       # Build scripts
├── dist/          # Generated static assets
└── docs/          # Deployment-ready files
```

## Key Dependencies
- `github.com/a-h/templ` - Template rendering
- `github.com/SuperPaintman/nice/cli` - CLI framework
- `github.com/labstack/echo/v4` - HTTP server

## Cursor/Copilot Rules
None found. Follow the above guidelines.
