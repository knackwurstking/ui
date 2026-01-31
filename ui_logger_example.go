package ui

import (
	"fmt"
	"os"
)

func ExampleLogger() {
	// Create a logger for the "main" group
	mainLogger := NewLogger("main")

	// Create a verbose logger for the "debug" group
	debugLogger := NewLoggerWithVerbose("debug")

	// Regular logging
	mainLogger.Info("Application started")
	mainLogger.Warn("This is a warning")
	mainLogger.Error("This is an error")

	// Verbose logging (will only show if verbose mode is enabled)
	debugLogger.Debug("Debug message - this won't show in regular mode")
	debugLogger.Info("Normal info message")

	// Enable verbose mode to show debug messages
	debugLogger.verbose = true
	debugLogger.Debug("This debug message will now show")

	// Example of using printf directly
	mainLogger.printf("Direct printf message")

	// Example with arguments
	mainLogger.Info("User %s logged in at %s", "john_doe", "10:30:45")

	fmt.Println("Logger example completed successfully")

	// Output should look something like:
	// [2025-01-01 10:30:45] [main] Application started
	// [2025-01-01 10:30:45] [main] This is a warning
	// [2025-01-01 10:30:45] [main] This is an error
	// [2025-01-01 10:30:45] [debug] Normal info message
	// [2025-01-01 10:30:45] [debug] This debug message will now show
	// [2025-01-01 10:30:45] [main] Direct printf message
	// [2025-01-01 10:30:45] [main] User john_doe logged in at 10:30:45
}

func main() {
	ExampleLogger()
	os.Exit(0)
}

