// Demo Project, generating static files to "/docs/" from templates and public assets using
// (a-h) templ. For command line parsing we use nice/cli
//
// - "github.com/a-h/templ"
// - "github.com/SuperPaintman/nice/cli".
package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/SuperPaintman/nice/cli"
	"github.com/knackwurstking/ui/internal/app"
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

		// Create output directory if it doesn't exist
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			return fmt.Errorf("failed to create output directory: %w", err)
		}

		// Generate main index.html
		layout := app.Layout()
		indexPath := filepath.Join(outputDir, "index.html")
		file, err := os.Create(indexPath)
		if err != nil {
			return fmt.Errorf("failed to create index.html: %w", err)
		}
		defer file.Close()

		if err := layout.Render(cmd.Context(), file); err != nil {
			return fmt.Errorf("failed to render layout: %w", err)
		}

		fmt.Printf("Generated static files to %s/\n", outputDir)
		return nil
	}
}

func serveCmd(cmd *cli.Command) cli.ActionRunner {
	return func(cmd *cli.Command) error {
		// For now, just print a message. Could be extended to start a file server
		fmt.Println("Serve command not implemented yet")
		fmt.Println("Use 'python3 -m http.server 8000' or similar in the docs directory")
		return nil
	}
}
