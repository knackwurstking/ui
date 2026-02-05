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
	// Set cache headers for assets with version query parameters
	setAssetCacheHeaders := func(ctx echo.Context) {
		// For assets with version query params, allow long-term caching
		ctx.Response().Header().Set("Cache-Control", "private, max-age=31536000")
		ctx.Response().Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
	}

	// Set cache headers for pages in additionalPaths
	setPageCacheHeaders := func(ctx echo.Context) {
		// For pages passed through additionalPaths, allow caching but not online freshness
		// This allows offline use while still allowing some cache control
		ctx.Response().Header().Set("Cache-Control", "no-cache")
		ctx.Response().Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
	}

	enablePathChecking := false
	if len(additionalPaths) > 0 {
		enablePathChecking = true
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			if enablePathChecking {
				path := strings.TrimRight(ctx.Request().URL.Path, "/")
				if slices.Contains(additionalPaths, path) {
					setPageCacheHeaders(ctx)
					return next(ctx)
				}
			}

			// Check for version query parameter (e.g., ?v=1763969451)
			if version := ctx.Request().URL.Query().Get("v"); version != "" {
				setAssetCacheHeaders(ctx)
			}

			return next(ctx)
		}
	}
}
