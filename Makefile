build: components index.js
	@component build --dev
	@http-server

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test: build
	@./node_modules/.bin/component-test browser

.PHONY: clean
