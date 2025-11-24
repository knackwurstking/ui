package ui

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// MiddlewareCache sets appropriate cache headers for static assets with version parameters
func MiddlewareCache() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			// Check for version query parameter (e.g., ?v=1763969451)
			query := ctx.Request().URL.Query()
			if version := query.Get("v"); version != "" {
				// Set long cache headers for cached assets
				ctx.Response().Header().Set("Cache-Control", "public, max-age=31536000, immutable")
				ctx.Response().Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
			}

			return next(ctx)
		}
	}
}
