export var povertyWelcome = {
	controller: PovertyWelcome,
	controllerAs: 'vm',
	templateUrl: 'app/components/welcome/welcome.html'
};

function PovertyWelcome($state, $document) {
	'ngInject';
	var vm = this;
	vm.$state = $state;
	vm.stateTo = stateTo;
	vm.width = $document[0].getElementById("welcome").offsetWidth;

	function stateTo() {
		if(vm.width < 440){
			vm.$state.go('family');
		}else {
			vm.$state.go('filters');
		}
	}

}
