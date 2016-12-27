export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('welcome', {
      url: '/',
      template: '<poverty-welcome></poverty-welcome>'
    })    
    .state('filters', {
      url: '/filters',
      template: '<poverty-filters></poverty-filters>'
    })
    .state('family', {
      url: '/family',
      template: '<poverty-family></poverty-family>'
    })
    .state('boroughs', {
      url: '/borough',
      template: '<poverty-boroughs></poverty-boroughs>'
    })    
    .state('boroughs.family', {
      url: '/:family',
      template: '<poverty-boroughs></poverty-boroughs>'
    })
    .state('age', {
      url: '/age',
      template: '<poverty-age></poverty-age>'
    })    
    .state('age.familyBorough', {
      url: '/:familyBorough',
      template: '<poverty-age></poverty-age>'
    })
    .state('results', {
      url: '/results',
      template: '<poverty-results></poverty-results>'
      //params : { filter: null }
    })
    .state('results.filter', {
      url: '/:filter',
      template: '<poverty-results></poverty-results>'
      //params : { filter: null }
    });

  $urlRouterProvider.otherwise('/');
}
