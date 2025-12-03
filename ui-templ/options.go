package ui

import (
	"fmt"

	"github.com/a-h/templ"
)

type HtmxOptions struct {
	Method          string
	Href            templ.SafeURL
	Trigger         string
	Swap            string
	SwapOOB         string
	Preserve        string
	OnResponseError string
	OnBeforeRequest string
	OnAfterRequest  string
}

func (o *HtmxOptions) Attributes() templ.Attributes {
	a := templ.Attributes{}

	if o.Href != "" {
		method := "get"
		if o.Method != "" {
			method = o.Method
		}
		method = fmt.Sprintf("hx-%s", o.Method)
		a[method] = string(o.Href)
	}

	if o.Trigger != "" {
		a["hx-trigger"] = o.Trigger
	}

	if o.Swap != "" {
		a["hx-swap"] = o.Swap
	}

	if o.SwapOOB != "" {
		a["hx-swap-oob"] = o.SwapOOB
	}

	if o.Preserve != "" {
		a["hx-preserve"] = o.Preserve
	}

	if o.OnResponseError != "" {
		a["hx-on::response-error"] = o.OnResponseError
	}

	if o.OnBeforeRequest != "" {
		a["hx-on::before-request"] = o.OnBeforeRequest
	}

	if o.OnAfterRequest != "" {
		a["hx-on::after-request"] = o.OnAfterRequest
	}

	return a
}

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
