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
	if p.Attributes == nil {
		p.Attributes = templ.Attributes{}
	}

	if p.ID != "" {
		p.Attributes["id"] = p.ID
	}
	if len(p.Class) > 0 {
		p.Attributes["class"] = p.GetClasses()
	}
	if len(p.Style) > 0 {
		p.Attributes["style"] = p.GetStyles()
	}
	return p.Attributes
}
