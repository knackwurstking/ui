package components

import (
	"fmt"
	"strings"

	"github.com/a-h/templ"
)

type Props struct {
	Attributes templ.Attributes
}

func (p *Props) GetStyle() string {
	s, ok := p.Attributes["style"]
	if !ok {
		return ""
	}
	return fmt.Sprintf("%s", s)
}

func (p *Props) SetStyle(styles ...string) {
	s, ok := p.Attributes["style"]
	if !ok {
		p.Attributes["style"] = ""
	}
	p.Attributes["style"] = fmt.Sprintf("%s; %s", s, strings.Join(styles, "; "))
}

func (p *Props) GetClass() string {
	c, ok := p.Attributes["class"]
	if !ok {
		return ""
	}
	return fmt.Sprintf("%s", c)
}

func (p *Props) SetClass(classes ...string) {
	c, ok := p.Attributes["class"]
	if !ok {
		p.Attributes["class"] = ""
	}
	p.Attributes["class"] = fmt.Sprintf("%s %s", c, strings.Join(classes, " "))
}

func (p *Props) GetAttributes() templ.Attributes {
	attrs := templ.Attributes{}

	for k, v := range p.Attributes {
		attrs[k] = v
	}

	return attrs
}
