CXX ?= g++
CXXFLAGS ?= -O2 -std=c++17 -pipe
build: ; @mkdir -p bin && $(CXX) $(CXXFLAGS) -o bin/sol src/main.cpp
check: build
	@pass=0; fail=0; \
	for f in samples/*.in; do \
	  exp="$${f%.in}.out"; got="$$(./bin/sol < $$f)"; \
	  if [ "$$got" = "$$(cat $$exp)" ]; then pass=$$((pass+1)); \
	  else fail=$$((fail+1)); echo "FAIL $$f"; echo "  expected: $$(cat $$exp)"; echo "  got:      $$got"; fi; \
	done; \
	echo "samples: $$pass passed, $$fail failed"; [ $$fail -eq 0 ]
.PHONY: build check
