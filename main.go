// Demo Project, generating static files to "/docs/" from templates and public assets using
// (a-h) templ. For command line parsing we use nice/cli
//
// - "github.com/a-h/templ"
// - "github.com/SuperPaintman/nice/cli".
package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/SuperPaintman/nice/cli"
	"github.com/knackwurstking/ui/internal/app"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	app := cli.App{
		Name:   "ui",
		Usage:  cli.Usage("Generate static web app from templates"),
		Action: cli.ActionFunc(rootCmd),
		Commands: []cli.Command{
			{
				Name:   "generate",
				Usage:  cli.Usage("Generate static files to docs directory"),
				Action: cli.ActionFunc(generateCmd),
			},
			{
				Name:   "serve",
				Usage:  cli.Usage("Serve the generated files locally"),
				Action: cli.ActionFunc(serveCmd),
			},
		},
		CommandFlags: []cli.CommandFlag{
			cli.HelpCommandFlag(),
		},
	}

	app.HandleError(app.Run())
}

func rootCmd(cmd *cli.Command) cli.ActionRunner {
	return func(cmd *cli.Command) error {
		fmt.Println("UI Static Site Generator")
		fmt.Println("Use 'ui generate' to build static files")
		fmt.Println("Use 'ui serve' to serve the files locally")
		return nil
	}
}

func generateCmd(cmd *cli.Command) cli.ActionRunner {
	return func(cmd *cli.Command) error {
		outputDir := "docs" // Fixed output directory for now
		if err := generateStaticFiles(outputDir); err != nil {
			return fmt.Errorf("failed to generate static files: %w", err)
		}
		return nil
	}
}

func serveCmd(cmd *cli.Command) cli.ActionRunner {
	return func(cmd *cli.Command) error {
		dir := "docs"

		// Check if directory exists
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			fmt.Printf("Directory %s does not exist. Running 'ui generate' first...\n", dir)
			if err := generateStaticFiles(dir); err != nil {
				return fmt.Errorf("failed to generate static files: %w", err)
			}
		}

		// Create Echo instance
		e := echo.New()

		// Middleware
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.CORS())

		// Serve static files
		e.Static("/*", dir)

		// Start server
		addr := "localhost:8080"
		fmt.Printf("Serving %s at http://%s\n", dir, addr)
		fmt.Println("Press Ctrl+C to stop the server")

		return e.Start(addr)
	}
}

func generateStaticFiles(outputDir string) error {
	// Create output directory if it doesn't exist
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	// Generate main index.html
	app := app.App()
	indexPath := filepath.Join(outputDir, "index.html")
	file, err := os.Create(indexPath)
	if err != nil {
		return fmt.Errorf("failed to create index.html: %w", err)
	}
	defer file.Close()

	ctx := context.Background()
	if err := app.Render(ctx, file); err != nil {
		return fmt.Errorf("failed to render app: %w", err)
	}

	fmt.Printf("Generated static files to %s/\n", outputDir)
	return nil
}
