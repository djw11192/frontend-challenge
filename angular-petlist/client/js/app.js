/* Pseudo code:
1. Build search controller that immediately loads all petlist data
2. create function to build url from title
3. Follow rules: replace spaces with dashes, only alpha numeric characters, no double dashes, all lowercase
4. function for name; seth broomer => Seth B.
5. function for description; at 48th character and above show elipsis. If 48th is in the middle of a word, don't show that word

*/
angular.module('petlist', ['ui.router', 'petlist.services'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('search', {
        url: '/',
        templateUrl: 'templates/search.html'
      })
    })

  .controller('SearchController', SearchController)

  SearchController.$inject = ['$http', 'PetFactory']

  function SearchController($http, PetFactory){
    var vm = this;

    //First make init function to load all pet list data
    init = function(){
      $http.get('/web-api/search.json')
        .then(function(response){
          setUrl(response)
          setName(response)
        })
    }

    function setUrl(listData){
      var searchArr = listData.data.search;
      searchArr.forEach(function(listItem){
        listItem.title = listItem.title.trim()//trim takes away and leading or ending spaces
          .replace(/[^a-zA-Z0-9\s]/g, '')//take out non-alpha numeric characters
          .replace(/\s+/g, '-')//replace spaces with dashes
          .toLowerCase()
      })
    }

    init();
  }
