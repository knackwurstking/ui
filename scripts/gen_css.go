//go:build ignore

package main

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/a-h/templ"
	"github.com/knackwurstking/ui/pkg/css"
)

func main() {
	outputPath := "dist/ui.css"

	outputDir := "dist"
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		fmt.Fprintf(os.Stderr, "failed to create output directory: %v\n", err)
		os.Exit(1)
	}

	var sb bytes.Buffer

	ctx := context.Background()

	components := []struct {
		Name string
		Comp templ.Component
	}{
		{"Theme", css.StylesThemeTemplUI()},
		{"Reset", css.StylesReset()},
		{"Global", css.StylesGlobal()},
		{"Utils", css.StylesUtils()},
		{"Components", css.StylesComponents()},
	}

	for _, c := range components {
		if err := c.Comp.Render(ctx, &sb); err != nil {
			fmt.Fprintf(os.Stderr, "failed to render %s: %v\n", c.Name, err)
			os.Exit(1)
		}
	}

	cssContent := sb.String()
	cssContent = strings.ReplaceAll(cssContent, "<style>", "")
	cssContent = strings.ReplaceAll(cssContent, "</style>", "")
	cssContent = strings.TrimSpace(cssContent)

	if err := os.WriteFile(outputPath, []byte(cssContent), 0644); err != nil {
		fmt.Fprintf(os.Stderr, "failed to write CSS file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Generated %s\n", outputPath)
}
