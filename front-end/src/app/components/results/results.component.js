export var povertyResults = {
	controller: PovertyResults,
	controllerAs: 'vm',
	templateUrl: 'app/components/results/results.html'
};

function PovertyResults($state, $document, DataModels) {
	'ngInject';
	var vm = this;
	vm.$state = $state;
	vm.$onInit = init;
	vm.parseFilterUrl = parseFilterUrl;
	vm.shortDescription = shortDescription;
	vm.linkify = linkify;
	vm.stateTo = stateTo;

	vm.filters = vm.$state.params.filter;
	vm.list = DataModels.dataResult;	
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
			if(	(vm.list[i].gezinssamens.includes(keys[0]) || vm.list[i].gezinssamens[0] === "*") &&
				(keys[1] === vm.list[i].stadsdeel || vm.list[i].stadsdeel === "*") && 
				(keys[2] === vm.list[i].leedtijd || vm.list[i].leedtijd === "*") ){
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

	function shortDescription(korteOmschrijving) {
		if(korteOmschrijving.length == "")
			return "Geen beschrijving beschikbaar!!";
		if(korteOmschrijving.length < 60)
			return korteOmschrijving;
		var desc = korteOmschrijving.slice(0, 60) + "...";
		return desc;
	}

	function linkify(text) {
		var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(urlRegex, function(url) {
			return '<a href="' + url + '" target="_blank">' + 'Here' + '</a>';
		});
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
}
