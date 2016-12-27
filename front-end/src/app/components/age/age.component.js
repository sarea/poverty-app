export var povertyAge = {
	controller: PovertyAge,
	controllerAs: 'vm',
	templateUrl: 'app/components/age/age.html'
};

function PovertyAge($state) {
	'ngInject';

	var vm = this;
	vm.$state = $state;

	vm.sendFilterInfo = sendFilterInfo;
    vm.age = ['*', 'All'];
    vm.familyBorough = vm.$state.params.familyBorough;

	function sendFilterInfo(){
		var filter = vm.familyBorough+','+vm.age;
		vm.$state.go('results.filter', {filter: filter});
	}

}
