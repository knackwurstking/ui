package ui

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v4"
)

type EchoRoute struct {
	Method  string
	Path    string
	Handler echo.HandlerFunc
}

func NewEchoRoute(method string, path string, handler echo.HandlerFunc) *EchoRoute {
	return &EchoRoute{
		Method:  method,
		Path:    path,
		Handler: handler,
	}
}

func RegisterEchoRoutes(e *echo.Echo, serverPathPrefix string, routes []*EchoRoute) {
	registerFn := func(
		cb func(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route,
		path string,
		handler echo.HandlerFunc,
	) {

		cb(path, handler)

		if !strings.HasSuffix(path, "/") {
			cb(path+"/", handler)
		}
	}

	for _, route := range routes {
		var cb func(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route

		switch route.Method {
		case http.MethodGet:
			cb = e.GET
		case http.MethodPost:
			cb = e.POST
		case http.MethodPut:
			cb = e.PUT
		case http.MethodDelete:
			cb = e.DELETE
		case http.MethodPatch:
			cb = e.PATCH
		default:
			panic("unhandled method: " + route.Method)
		}

		path := filepath.Join(serverPathPrefix, route.Path)
		registerFn(cb, path, route.Handler)
	}
}
