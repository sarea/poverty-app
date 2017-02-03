export var povertyNavbar = {
	bindings: {
    stateTo: '@',
    status: '@'
	},
	controller: PovertyNavbar,
	controllerAs: 'vm',
	templateUrl: 'app/components/navbar/navbar.html'
};

function PovertyNavbar() {
	'ngInject';
	var vm = this;
}
