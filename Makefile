
front-end/dist: front-end/node_modules
	cd front-end && npx gulp dist

front-end/node_modules:
	cd front-end && npm install && npx bower install

build: front-end/dist
