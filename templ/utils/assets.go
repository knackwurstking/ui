package utils

import (
	"fmt"
	"time"

	"github.com/a-h/templ"
)

var (
	// assetVersionCache stores the computed asset version to avoid recomputation
	assetVersionCache string
	// assetVersionComputed tracks if we've already computed the version
	assetVersionComputed bool
)

// AssetURL generates a versioned URL for an asset
//
// This function constructs a URL for an asset with a version parameter
// appended to the base URL for cache-busting purposes.
func AssetURL(serverPathPrefix, assetPath string) templ.SafeURL {
	version := assetVersion()
	baseURL := serverPathPrefix + assetPath

	if version != "" {
		// If a version is available, append it to the base URL as a query parameter
		return templ.SafeURL(fmt.Sprintf("%s?v=%s", baseURL, version))
	}

	// If no version is available, return just the base URL
	return templ.URL(baseURL)
}

// assetVersion returns a version string for cache-busting assets
//
// This function generates a unique version string based on the startup time
// of the application. The version string is used to bust caches by making each
// asset URL unique per deployment/restart.
func assetVersion() string {
	if assetVersionComputed {
		// If the version has already been computed, return the cached version
		return assetVersionCache
	}

	// Generate a version string based on startup time
	startupTime := time.Now().Unix()
	assetVersionCache = fmt.Sprintf("%d", startupTime)
	assetVersionComputed = true
	return assetVersionCache
}
