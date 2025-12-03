.PHONY: build

all: init build

init:
	go mod tidy

build:
	npm run build
	templ generate
