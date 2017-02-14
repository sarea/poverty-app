export var povertyResults = {
	controller: PovertyResults,
	controllerAs: 'vm',
	templateUrl: 'app/components/results/results.html'
};

function PovertyResults($state, $document, DataModels, $window, $timeout) {
	'ngInject';
	var vm = this;
	vm.$state = $state;
	vm.$onInit = init;
	vm.parseFilterUrl = parseFilterUrl;
	vm.resultByCategories = resultByCategories;
	vm.checkSubtitleLength = checkSubtitleLength;
	vm.checkNameLength = checkNameLength;
	vm.lengthItem  = lengthItem
	vm.linkify = linkify;
	vm.stateTo = stateTo;
	vm.updateHieghtItem = updateHieghtItem;
	vm.noResult = noResult;
	vm.categoriesUrl = categoriesUrl;

	vm.filters = vm.$state.params.filter;
	vm.list = DataModels.dataResult;
	vm.switch = true;	
	vm.listAfterFilter = [];
	vm.categoryClickedList = [];
	vm.categories = [];
	vm.colors = [
		'#e6007e',
		'#0fa4cc',
		'#f99b01',
		'#bdd400',
		'#4663D9'
	];


	function getResultList() {
		var keys = parseFilterUrl(0);
		for(var i = 0; i < vm.list.length; i++){
			if(	(vm.list[i].gezinssamens.includes(keys[0]) || vm.list[i].gezinssamens[0] === '*') &&
				(keys[1] === vm.list[i].stadsdeel || vm.list[i].stadsdeel === '*') && 
				(keys[2] === vm.list[i].leedtijd || vm.list[i].leedtijd === '*') ){
				vm.listAfterFilter.push({"sizeX":1,"sizeY":7,'content':vm.list[i]})
			}
		}
	}

	function parseFilterUrl(startAt){
		var fitlerResult = []
		var filters = vm.filters.split(',');
		for (var i = startAt; i < filters.length; i+=2){
			fitlerResult.push(filters[i]);
		}
		return fitlerResult;
	}

	function categoriesUrl(category, white){
		
		return "../img/category/"+ category + white +".svg";
	}

	function categoriesList() {
		if(vm.listAfterFilter[0]) {
			vm.categories.push(vm.listAfterFilter[0].content.categorieen);
			for (var i = 1; i < vm.listAfterFilter.length; i++){
				if(!vm.categories.includes(vm.listAfterFilter[i].content.categorieen)){
					vm.categories.push(vm.listAfterFilter[i].content.categorieen);
				}
			}
		}
	}

	function resultByCategories(category) {
		var keys = parseFilterUrl(0);
		vm.listAfterFilter = [];
		if(category === 'all'){
			getResultList();
		}else {
			if(vm.categoryClickedList.includes(category)){
				vm.categoryClickedList.splice(vm.categoryClickedList.indexOf(category), 1);
				if(vm.categoryClickedList.length === 0){
					getResultList();
				}
			}else {
				vm.categoryClickedList.push(category);
			}
			for(var i = 0; i < vm.list.length; i++){
				if(	(vm.list[i].gezinssamens.includes(keys[0]) || vm.list[i].gezinssamens[0] === '*') &&
					(keys[1] === vm.list[i].stadsdeel || vm.list[i].stadsdeel === '*') && 
					(keys[2] === vm.list[i].leedtijd || vm.list[i].leedtijd === '*') &&
					(vm.categoryClickedList.includes(vm.list[i].categorieen)) ){
					vm.listAfterFilter.push({"sizeX":1,"sizeY":7,'content':vm.list[i]})
				}
			}
		}
	}

	function checkSubtitleLength(value) {
		if(value.length == '')
			return 'Onbekende levert';
		if(value.length < 45)
			return value;
		var shortValue = value.slice(0, 45) + '...';
		return shortValue;
	}

	function checkNameLength(value) {
		if(value.length == '')
			return 'Onbekende naam';
		if(vm.width > 1024 && vm.width < 1300 && value.length > 30){
			var shortValue = value.slice(0, 30) + '...';
			return shortValue;
		}
		return value;
	}

	function lengthItem(num) {
		if(num > 1)
			return 'Items';
		return 'Item';
	}

	function linkify(text) {
		var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(urlRegex, function(url) {
			return '<a href="' + url + '" target="_blank">' + 'Hier' + '</a>';
		});
	}

	function updateHieghtItem(index) {
		if(vm.listAfterFilter[index].sizeY === 7){
			$timeout(function() {
				var newHeight = $document[0].getElementsByClassName("result-container")[index].offsetHeight;
				vm.listAfterFilter[index].sizeY = Math.ceil(newHeight/20) + 1;
			}, 50);

		}else {
			vm.listAfterFilter[index].sizeY = 7;
		}		
	}

	function calcWidth() {
		vm.width = $window.innerWidth;
		if(vm.width > 1024) {
			vm.gridsterOpts.columns = 4;
			return; 
		}
		if( vm.width <= 1024 && vm.width > 600) {
			vm.gridsterOpts.columns = 2;
			return;
		}
	}

	function noResult() {
		if(vm.parseFilterUrl(1)[0]==='All' && vm.parseFilterUrl(1)[1]==='All' && vm.parseFilterUrl(1)[2]==='All') {
			return '<h6>Voor <strong>'+vm.parseFilterUrl(1)[0]+'</strong> Probeer het later opnieuw!</h6>'
		} else {
			return '<h6>Voor <strong>'+vm.parseFilterUrl(1)[0]+'</strong> en <strong>'+vm.parseFilterUrl(1)[1]+'</strong> en <strong>'+vm.parseFilterUrl(1)[2]+'</strong> Probeer het later opnieuw!</h6>'
		}
	}

	function stateTo() {
		if(vm.width < 440){
			vm.$state.go('family');
		}else {
			vm.$state.go('filters');
		}
	}

	function init() {
		calcWidth();
		getResultList();
		categoriesList();
	}

	angular.element($window).bind('resize', checkNameLength, function () {
		calcWidth();
	});

	vm.gridsterOpts = {
		columns: 4, // the width of the grid, in columns
		pushing: false, // whether to push other items out of the way on move or resize
		floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
		swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
		width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
		colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
		rowHeight: 20, // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
		margins: [0, 0], // the pixel distance between each widget
		outerMargin: true, // whether margins apply to outer edges of the grid
		sparse: true, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
		isMobile: true, // stacks the grid items if true
		mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
		mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
		minColumns: 1, // the minimum columns the grid must have
		minRows: 2, // the minimum height of the grid, in rows
		maxRows: 100,
		defaultSizeX: 2, // the default width of a gridster item, if not specifed
		defaultSizeY: 1, // the default height of a gridster item, if not specified
		minSizeX: 1, // minimum column width of an item
		maxSizeX: null, // maximum column width of an item
		minSizeY: 1, // minumum row height of an item
		maxSizeY: null, // maximum row height of an item
		resizable: {
			enabled: false
			// handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
			// start: function(event, $element, widget) {}, // optional callback fired when resize is started,
			// resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
			// stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
		},
		draggable: {
			enabled: false // whether dragging items is supported
			// handle: '.my-class', // optional selector for drag handle
			// start: function(event, $element, widget) {}, // optional callback fired when drag is started,
			// drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
			// stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
		}
	}

}
