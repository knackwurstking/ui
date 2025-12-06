package ui

import (
	"net/http"
	"slices"
	"time"

	"github.com/labstack/echo/v4"
)

// EchoMiddlewareCache sets appropriate cache headers for static assets with version parameters
func EchoMiddlewareCache(additionalPaths []string) echo.MiddlewareFunc {
	setCacheHeaders := func(ctx echo.Context) {
		// Set long cache headers for cached assets
		ctx.Response().Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		ctx.Response().Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			// Check for version query parameter (e.g., ?v=1763969451)
			path := ctx.Request().URL.Path
			if slices.Contains(additionalPaths, path) {
				setCacheHeaders(ctx)
			} else {
				query := ctx.Request().URL.Query()
				if version := query.Get("v"); version != "" {
					setCacheHeaders(ctx)
				}
			}

			return next(ctx)
		}
	}
}
