.PHONY: all, clean, init, build, serve

all: init build

clean:
	git clean -xfd

init:
	go mod tidy

generate:
	templ generate
	go run . generate

serve: generate
	go run . serve
