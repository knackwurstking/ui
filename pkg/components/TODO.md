# TODO

## Looking at your BaseProps type, here are recommendations for improvement:

Key Issues with Current Design

1. Mutable state in getters - GetAttributes() modifies the struct and returns a pointer's result inconsistently
2. No default values - Empty slices vs nil is inconsistent
3. JavaScript handlers aren't handled - You mentioned templ.ComponentScriptCalled but it's not in the base props
4. Type safety - Using generic templ.Attributes loses type safety

Proposed Improvements

✱ Grep "ComponentScriptCalled" in .
→ Read pkg/components/button_templ.go
→ Read pkg/components/container_templ.go

Based on your codebase, here are recommendations for improving the props type:
Recommendations

1. Make `GetAttributes()` immutable - Don't modify the struct internally: [Solved]

```go
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
```

2. Add JavaScript handler support - Add an On\* field pattern for event handlers:

```go
type BaseProps struct {
	ID         string
	Style      []string
	Class      []string
	Attributes templ.Attributes

	// JavaScript handlers
	OnClick    templ.ComponentScript
	OnChange   templ.ComponentScript
	OnInput    templ.ComponentScript
	OnSubmit   templ.ComponentScript
	// Add other common handlers as needed
}
```

3. Initialize slices in constructors - Prevent nil/slice issues:

```go
func (p *BaseProps) Init() *BaseProps {
	if p.Class == nil {
		p.Class = []string{}
	}
	if p.Style == nil {
		p.Style = []string{}
	}
	if p.Attributes == nil {
		p.Attributes = templ.Attributes{}
	}
	return p
}
```

4. Consider using templ.Attributes as the source of truth - Your current
   pattern duplicates data in multiple fields (ID, Class, Style vs Attributes).
   You could simplify by only using Attributes and helper methods for common fields.

5. Add a MergeAttributes helper - For passing through additional attributes:

```go
func (p *BaseProps) MergeAttributes(attrs templ.Attributes) {
	if p.Attributes == nil {
		p.Attributes = attrs
		return
	}
	for k, v := range attrs {
		p.Attributes[k] = v
	}
}
```

The main pain point is that `GetAttributes()` mutates the struct - making it
immutable will make your code more predictable and thread-safe.
