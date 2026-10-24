# Makefile — fallback copy of the Lab 02 model answer.
# Use ONLY if you no longer have your own Lab 02 work, and say so in your report.
# Verified against GNU Make 3.81 and 4.3.

SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))
.PHONY: all check build test clean ci deps

all: test  ## build and test everything (default)

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

node_modules: package-lock.json
	npm ci
	@touch node_modules

deps: node_modules

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md package-lock.json | $(OUT_DIR) node_modules
	@echo "BUILD $< -> $@"
	@npm run --silent build -- $< $@
	@tr '[:lower:]' '[:upper:]' < $< > $@

check:  ## fail early if there is nothing to build
	@test -d $(SRC_DIR) || { echo "ERROR: source directory $(SRC_DIR) not found"; exit 1; }
	@test -n "$(SOURCES)" || { echo "ERROR: no .md files found in $(SRC_DIR)"; exit 1; }
	@echo "check: $(words $(SOURCES)) source file(s) in $(SRC_DIR)"

build: $(OUTPUTS)  ## build every out-of-date output

test: build  ## verify every output
	@if grep -l '[a-z]' $(OUTPUTS) >/dev/null 2>&1; then \
	   echo "TEST FAILED: lowercase characters remain"; exit 1; \
	 fi
	@echo "TEST PASSED"

clean:  ## remove all generated files
	rm -rf $(OUT_DIR)

ci: clean check test  ## the build server entry point

# Extension answer: self-documenting targets.
help:  ## show this help
	@grep -E '^[a-z][a-zA-Z_-]*:.*?## ' $(MAKEFILE_LIST) \
	 | sed 's/:.*## /\t/' | column -t -s "$$(printf '\t')"
