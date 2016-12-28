export var povertyResults = {
	controller: PovertyResults,
	controllerAs: 'vm',
	templateUrl: 'app/components/results/results.html'
};

function PovertyResults($state, $document) {
	'ngInject';
	var vm = this;
	vm.$state = $state;
	vm.$onInit = init;
	vm.parseFilterUrl = parseFilterUrl;
	vm.stateTo = stateTo;
	vm.shortDescription = shortDescription;

	vm.filters = vm.$state.params.filter;	
	vm.listAfterFilter = [];
	vm.colors = [
        "#e6007e",
		"#0fa4cc",
		"#f99b01",
		"#bdd400",
		"#4663D9"
    ];


	function getResultList() {
		var keys = parseFilterUrl(0);
		for(var i = 0; i < vm.list.length; i++){
			if(	(keys[0] === vm.list[i].filterFamily || vm.list[i].filterFamily === "*") &&
				(keys[1] === vm.list[i].filterCity || vm.list[i].filterFamily=== "*") && 
				(keys[2] === vm.list[i].filterAge || vm.list[i].filterFamily=== "*") ){
				vm.listAfterFilter.push(vm.list[i])
			}
		}
	}

	function parseFilterUrl(startAt){
		var fitlerResult = []
		var filters = vm.filters.split(",");
		for (var i = startAt; i < filters.length; i+=2){
			fitlerResult.push(filters[i]);
		}
		return fitlerResult;
	}

	function shortDescription(list) {
		if(list.description.length <= 30)
			return list.description;
		var desc = list.description.slice(0, 30) + "...";
		return desc;
	}

	function stateTo() {
		var width = $document[0].getElementById("result").offsetWidth;
		if(width < 440){
			return 'family';
		}else {
			return 'filters';
		}
	}

	function init() {
		getResultList();
	}

	vm.list = [{
		'subtitle': 'Subtitle',
		'category': 'category',
		'name': 'Name Provision',
		'description': 'description description description description description description description description ',
		'action': 'action',
		'filterCity': '*',
		'filterAge': '*',
		'filterFamily': '*'
	},{
		'subtitle': 'Subtitle1',
		'category': 'category1',
		'name': 'Name Provision1',
		'description': 'description1',
		'action': 'action1',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle2',
		'category': 'category2',
		'name': 'Name Provision2',
		'description': 'description2',
		'action': 'action2',
		'filterCity': '*',
		'filterAge': '*',
		'filterFamily': '*'
	},{
		'subtitle': 'Subtitle3',
		'category': 'category3',
		'name': 'Name Provision3',
		'description': 'description3',
		'action': 'action3',
		'filterCity': 'NW',
		'filterAge': '3',
		'filterFamily': 'AK'
	},{
		'subtitle': 'Subtitle4',
		'category': 'category4',
		'name': 'Name Provision4',
		'description': 'description4',
		'action': 'action4',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle',
		'category': 'category',
		'name': 'Name Provision',
		'description': 'description',
		'action': 'action',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle1',
		'category': 'category1',
		'name': 'Name Provision1',
		'description': 'description1',
		'action': 'action1',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle2',
		'category': 'category2',
		'name': 'Name Provision2',
		'description': 'description2',
		'action': 'action2',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle3',
		'category': 'category3',
		'name': 'Name Provision3',
		'description': 'description3',
		'action': 'action3',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	},{
		'subtitle': 'Subtitle4',
		'category': 'category4',
		'name': 'Name Provision4',
		'description': 'description4',
		'action': 'action4',
		'filterCity': '',
		'filterAge': '',
		'filterFamily': ''
	}];


}
