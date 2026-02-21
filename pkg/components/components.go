package components

import (
	"strings"

	"github.com/a-h/templ"
)

type BaseProps struct {
	ID         string
	Style      []string // Style e.g. `[]string{"color: red", "font-size: 20px"}`
	Class      []string
	Attributes templ.Attributes
}

func (p *BaseProps) GetStyles() string {
	return strings.Join(p.Style, "; ")
}

func (p *BaseProps) GetClasses() string {
	return strings.Join(p.Class, " ")
}

func (p *BaseProps) GetAttributes() templ.Attributes {
	attrs := templ.Attributes{}

	if p.ID != "" {
		attrs["id"] = p.ID
	}
	if len(p.Class) > 0 {
		attrs["class"] = p.GetClasses()
	}
	if len(p.Style) > 0 {
		attrs["style"] = p.GetStyles()
	}

	for k, v := range p.Attributes {
		attrs[k] = v
	}

	return attrs
}
