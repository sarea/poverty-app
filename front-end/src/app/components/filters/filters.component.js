export var povertyFilters = {
	controller: PovertyFilters,
	controllerAs: 'vm',
	templateUrl: 'app/components/filters/filters.html'
};

function PovertyFilters($state, $window, $document, uibButtonConfig) {
	'ngInject';

	var vm = this;
	vm.$state = $state;

	vm.sendFilterInfo = sendFilterInfo;
	vm.$onInit = init;
	uibButtonConfig.activeClass = 'checked';
    vm.family = ['*', 'All'];
    vm.borough = ['*', 'All'];
    vm.age = ['*', 'All'];
    // vm.mapHilightConfig = {
    //     "fade": true,
    //     "alwaysOn": true,
    //     "neverOn": false,
    //     "fill": true,
    //     "fillColor": "#ffffff",
    //     "fillOpacity": 0.4,
    //     "stroke": true,
    //     "strokeColor": "#4d0ec0",
    //     "strokeOpacity": 1,
    //     "strokeWidth": 1,
    //     "shadow": true,
    //     "shadowColor": "#000000",
    //     "shadowOpacity": 0.8,
    //     "shadowRadius": 10
    // }


	function init() {
		mapping();
	}

	function sendFilterInfo() {
		var filter = vm.family+','+vm.borough+','+vm.age;
		vm.$state.go('results.filter', {filter: filter});
	}

	function mapping() {
    var ImageMap = function (map, img) {
        var areas = map.getElementsByTagName('area'),
            length = areas.length,
            coords = [],
            previousWidth = 1349;
        for (var i = 0; i < length; i++) {
            coords[i] = areas[i].coords.split(',');
        }
        this.resize = function () {
            var cLength,
                x = img.offsetWidth / previousWidth;
            for (var i = 0; i < length; i++) {
                cLength = coords[i].length;
                for (var k = 0; k < cLength; k++) {
                    coords[i][k] *= x;
                }
                areas[i].coords = coords[i].join(',');
            }
            previousWidth = img.offsetWidth;
            return true;
        };
        $window.onresize = this.resize;
    },
		imageMap = new ImageMap($document[0].getElementById('map_ID'), $document[0].getElementById('img_ID'));
		imageMap.resize();
		return;
	}


}
