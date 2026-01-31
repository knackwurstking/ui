package ui

import (
	"testing"
)

func TestLogger(t *testing.T) {
	// Test basic logger creation
	logger := NewLogger("test")
	if logger == nil {
		t.Fatal("Failed to create logger")
	}

	// Test verbose logger creation
	verboseLogger := NewLoggerWithVerbose("test-verbose")
	if verboseLogger == nil {
		t.Fatal("Failed to create verbose logger")
	}

	// Test that verbose logger has verbose flag set
	if !verboseLogger.verbose {
		t.Error("Verbose logger should have verbose flag set to true")
	}

	// Test that regular logger does not have verbose flag set
	if verboseLogger.verbose {
		t.Error("Regular logger should have verbose flag set to false")
	}
}

