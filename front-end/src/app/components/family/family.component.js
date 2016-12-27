export var povertyFamily = {
	controller: PovertyFamily,
	controllerAs: 'vm',
	templateUrl: 'app/components/family/family.html'
};

function PovertyFamily($state) {
	'ngInject';

	var vm = this;
	vm.$state = $state;
	vm.sendFilterInfo = sendFilterInfo;
    vm.family = ['*', 'All'];

	function sendFilterInfo(){
		var family = vm.family;
		vm.$state.go('boroughs.family', {family: family});
	}
}
