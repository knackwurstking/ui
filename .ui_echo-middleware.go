// NOTE: Removed
package ui

import (
	"net/http"
	"slices"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

// EchoMiddlewareCache sets appropriate cache headers for static assets with version parameters
//
// This middleware configures cache headers to tell the browser to check the network first
// before using cached versions, ensuring users always get the latest content.
func EchoMiddlewareCache(additionalPaths []string) echo.MiddlewareFunc {
	setCacheHeaders := func(ctx echo.Context) {
		// Set cache headers to check network first before using cached version
		ctx.Response().Header().Set("Cache-Control", "public, must-revalidate")
		ctx.Response().Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
	}

	enablePathChecking := false
	if len(additionalPaths) > 0 {
		enablePathChecking = true
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			if enablePathChecking {
				if slices.Contains(additionalPaths, strings.TrimRight(ctx.Request().URL.Path, "/")) {
					setCacheHeaders(ctx)
					return next(ctx)
				}
			}

			// Check for version query parameter (e.g., ?v=1763969451)
			if version := ctx.Request().URL.Query().Get("v"); version != "" {
				setCacheHeaders(ctx)
			}

			return next(ctx)
		}
	}
}
