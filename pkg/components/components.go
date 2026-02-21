package components

import (
	"fmt"
	"strings"

	"github.com/a-h/templ"
)

type Props struct {
	attributes map[string]string
}

func NewProps(kv ...templ.KeyValue[string, string]) *Props {
	props := &Props{}
	props.Set(kv...)
	return props
}

func (p *Props) initialize() {
	if p.attributes == nil {
		p.attributes = map[string]string{}
	}
}

func (p *Props) Attributes() templ.Attributes {
	p.initialize()

	attrs := templ.Attributes{}
	for k, v := range p.attributes {
		attrs[k] = v
	}
	return attrs
}

func (p *Props) Get(k string) (value string, ok bool) {
	p.initialize()

	value, ok = p.attributes[k]
	return value, ok
}

func (p *Props) Set(kv ...templ.KeyValue[string, string]) {
	p.initialize()

	for _, a := range kv {
		p.attributes[a.Key] = a.Value
	}
}

func (p *Props) GetStyle() string {
	p.initialize()

	s, ok := p.attributes["style"]
	if !ok {
		return ""
	}
	return fmt.Sprintf("%s", s)
}

func (p *Props) SetStyle(styles ...string) {
	p.initialize()

	s, ok := p.attributes["style"]
	if !ok {
		p.attributes["style"] = ""
	}

	p.attributes["style"] = fmt.Sprintf("%s; %s", s, strings.Join(styles, "; "))
}

func (p *Props) GetClass() string {
	p.initialize()

	c, ok := p.attributes["class"]
	if !ok {
		return ""
	}
	return fmt.Sprintf("%s", c)
}

func (p *Props) SetClass(classes ...string) {
	p.initialize()

	c, ok := p.attributes["class"]
	if !ok {
		p.attributes["class"] = ""
	}

	p.attributes["class"] = fmt.Sprintf("%s %s", c, strings.Join(classes, " "))
}
