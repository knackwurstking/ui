package ui

import (
	"fmt"
	"log"
	"os"
	"time"
)

// Logger represents a simple logger with colorized output and timestamp
type Logger struct {
	group   string
	verbose bool
	logger  *log.Logger
}

// NewLogger creates a new logger instance with the specified group
func NewLogger(group string) *Logger {
	return &Logger{
		group:  group,
		logger: log.New(os.Stdout, "", 0),
	}
}

// NewLoggerWithVerbose creates a new logger instance with verbose mode enabled
func NewLoggerWithVerbose(group string) *Logger {
	return &Logger{
		group:   group,
		verbose: true,
		logger:  log.New(os.Stdout, "", 0),
	}
}

// printf logs a message with timestamp and group prefix (no color)
func (l *Logger) printf(format string, args ...any) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	message := fmt.Sprintf(format, args...)
	l.logger.Printf("[%s] [%s] %s", timestamp, l.group, message)
}

// verbosef logs a verbose message with timestamp and group prefix (with dim and italic formatting)
func (l *Logger) verbosef(format string, args ...any) {
	if l.verbose {
		timestamp := time.Now().Format("2006-01-02 15:04:05")
		message := fmt.Sprintf(format, args...)
		// Use dim and italic formatting for debug messages
		l.logger.Printf("[%s] [%s] \033[37;3m%s\033[0m", timestamp, l.group, message)
	}
}

// warnf logs a warning message with timestamp and group prefix in yellow
func (l *Logger) warnf(format string, args ...any) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	message := fmt.Sprintf(format, args...)
	l.logger.Printf("[%s] [%s] \033[33m%s\033[0m", timestamp, l.group, message)
}

// errorf logs an error message with timestamp and group prefix in red
func (l *Logger) errorf(format string, args ...any) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	message := fmt.Sprintf(format, args...)
	l.logger.Printf("[%s] [%s] \033[31m%s\033[0m", timestamp, l.group, message)
}

// Debug logs a debug message if verbose mode is enabled
func (l *Logger) Debug(format string, args ...any) {
	l.verbosef(format, args...)
}

// Info logs an info message
func (l *Logger) Info(format string, args ...any) {
	l.printf(format, args...)
}

// Warn logs a warning message
func (l *Logger) Warn(format string, args ...any) {
	l.warnf(format, args...)
}

// Error logs an error message
func (l *Logger) Error(format string, args ...any) {
	l.errorf(format, args...)
}
