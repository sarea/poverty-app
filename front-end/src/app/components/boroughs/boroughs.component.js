export var povertyBoroughs = {
	controller: PovertyBoroughs,
	controllerAs: 'vm',
	templateUrl: 'app/components/boroughs/boroughs.html'
};

function PovertyBoroughs($state, $timeout, $window, $document, uibButtonConfig) {
	'ngInject';

	var vm = this;
	vm.$state = $state;

	vm.sendFilterInfo = sendFilterInfo;
	vm.$onInit = init;
	uibButtonConfig.activeClass = 'checked';
    vm.family = vm.$state.params.family;
    vm.borough = ['*', 'All'];


	function init() {
		mapping();
	}

	function sendFilterInfo(){
		var familyBorough = vm.family+','+vm.borough;
        $timeout(function() {
            vm.$state.go('age.familyBorough', {familyBorough: familyBorough});
        }, 700);
	}

	function mapping () {
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
