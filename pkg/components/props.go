package components

import (
	"fmt"
	"strings"
	"sync"

	"github.com/a-h/templ"
)

type Props struct {
	mu         sync.RWMutex
	once       sync.Once
	attributes map[string]string
}

func NewProps(kv ...templ.KeyValue[string, string]) *Props {
	props := &Props{}
	props.Set(kv...)
	return props
}

func (p *Props) initialize() {
	p.once.Do(func() {
		p.attributes = map[string]string{}
	})
}

func (p *Props) Attributes() templ.Attributes {
	p.initialize()
	p.mu.RLock()
	defer p.mu.RUnlock()

	attrs := templ.Attributes{}
	for k, v := range p.attributes {
		attrs[k] = v
	}
	return attrs
}

func (p *Props) Get(k string) (value string, ok bool) {
	p.initialize()
	p.mu.RLock()
	defer p.mu.RUnlock()

	value, ok = p.attributes[k]
	return value, ok
}

func (p *Props) Has(k string) bool {
	p.initialize()
	p.mu.RLock()
	defer p.mu.RUnlock()

	_, ok := p.attributes[k]
	return ok
}

func (p *Props) Set(kv ...templ.KeyValue[string, string]) {
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	for _, a := range kv {
		p.attributes[a.Key] = a.Value
	}
}

func (p *Props) Delete(k string) {
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	delete(p.attributes, k)
}

func (p *Props) Merge(other *Props) {
	if other == nil {
		return
	}
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	for k, v := range other.attributes {
		p.attributes[k] = v
	}
}

func (p *Props) Clear() {
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	p.attributes = map[string]string{}
}

func (p *Props) GetStyle() string {
	p.initialize()
	p.mu.RLock()
	defer p.mu.RUnlock()

	s, ok := p.attributes["style"]
	if !ok {
		return ""
	}
	return s
}

func (p *Props) SetStyle(styles ...string) {
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	if len(styles) == 0 {
		return
	}

	current, ok := p.attributes["style"]
	if !ok {
		p.attributes["style"] = ""
	}

	p.attributes["style"] = strings.TrimSpace(fmt.Sprintf("%s; %s", current, strings.Join(styles, "; ")))
}

func (p *Props) GetClass() string {
	p.initialize()
	p.mu.RLock()
	defer p.mu.RUnlock()

	c, ok := p.attributes["class"]
	if !ok {
		return ""
	}
	return c
}

func (p *Props) SetClass(classes ...string) {
	p.initialize()
	p.mu.Lock()
	defer p.mu.Unlock()

	if len(classes) == 0 {
		return
	}

	current, ok := p.attributes["class"]
	if !ok {
		p.attributes["class"] = ""
	}

	p.attributes["class"] = strings.TrimSpace(fmt.Sprintf("%s %s", current, strings.Join(classes, " ")))
}
