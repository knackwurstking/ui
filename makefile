.PHONY: build

all: init build

clean:
	git clean -xfd

init:
	npm install
	go mod tidy

generate:
	templ generate

build: generate
	npm run build
