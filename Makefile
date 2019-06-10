
front-end/dist: front-end/node_modules
	cd front-end && npx gulp build

front-end/node_modules:
	cd front-end && npm install && npx bower install

front-end/dist/CNAME:
	@echo "amsterdamvoorziet.nl" > front-end/dist/CNAME

build: front-end/dist front-end/dist/CNAME
