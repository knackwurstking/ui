package components

import (
	"strings"

	"github.com/a-h/templ"
)

type BaseProps struct {
	ID         string
	Style      []string // Style e.g. `[]string{"color: red", "font-size: 20px"}`
	Class      templ.CSSClasses
	Attributes templ.Attributes
}

func (p *BaseProps) GetStyles() string {
	return strings.Join(p.Style, "; ")
}

func (p *BaseProps) GetClasses() string {
	return p.Class.String()
}
