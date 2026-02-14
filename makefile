.PHONY: all, clean, init, build, serve

all: init build

clean:
	git clean -xfd

init:
	go mod tidy

generate:
	templ generate
	go run . generate
	go run ./scripts/gen_css.go
	npx uglifycss ./dist/ui.css > ./dist/ui.min.css
	npx prettier --write ./dist/ui.css

serve: generate
	go run . serve
