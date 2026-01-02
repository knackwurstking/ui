package ui

import (
	"github.com/a-h/templ"
)

// DialogOptions defines the properties for a dialog component
type DialogOptions struct {
	// ID is the unique identifier for the dialog
	ID string

	// Method specifies the HTTP method to use when submitting the form
	Method string

	// Href is the URL to submit the form data to
	Href templ.SafeURL

	// SubmitButtonText is the text displayed on the submit button
	SubmitButtonText string

	// Error is an error that may have occurred, displayed if not nil
	Error error

	// HxSwapOOB is an additional property used for hx-swap-oob directive
	HxSwapOOB string

	// AdditionalActions represents additional actions that can be rendered
	AdditionalActions templ.Component
}
