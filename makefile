.PHONY: all, clean, init, build

all: init build

clean:
	git clean -xfd

init:
	go mod tidy

generate:
	templ generate
	go run . generate
