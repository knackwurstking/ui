.PHONY: clean, init

all: init 

clean:
	git clean -xfd

init:
	go mod tidy
