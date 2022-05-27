SHELL := /bin/bash
.ONESHELL:
.EXPORT_ALL_VARIABLES:
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

INPUT_NAME ?= ivanka

help:
	@printf "Usage: make [target] [VARIABLE=value]\nTargets:\n"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

hooks: ## Setup pre commit.
	@pre-commit install
	@pre-commit gc
	@pre-commit autoupdate

validate: ## Validate files with pre-commit hooks
	@pre-commit run --all-files

open: ## Open repository
	@open $(shell git config --get remote.origin.url)

install: ## Install module dependencies
	@npm install

build: ## Run build
	@npm run build
	@npm run pack

# run: build
run: ## Run action locally
	@npm run exec

test: ## Run tests
	@npm run test:jest
