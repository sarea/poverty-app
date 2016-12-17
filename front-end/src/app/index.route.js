export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('filters', {
      url: '/filters',
      template: '<poverty-filters></poverty-filters>'
    })
    .state('results', {
      url: '/results',
      template: '<poverty-results></poverty-results>'
    });

  $urlRouterProvider.otherwise('/');
}
