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
          var searchArr = response.data.search
          formatList(searchArr)
          vm.petlist = searchArr;
        })
    }

    function formatList(listData){
      listData.forEach(function(listItem){
        //add "url" to listData object and use formatted titles for values
        listItem.url = listItem.title.trim()//trim takes away and leading or ending spaces
          .replace(/[^a-zA-Z0-9\s]/g, '')//take out non-alpha numeric characters
          .replace(/\s+/g, '-')//replace spaces with dashes
          .toLowerCase()

        //Capitalize first letter of First Name
        listItem.user.first = listItem.user.first[0].toUpperCase() + listItem.user.first.substr(1);
        //Only show first letter of last name and capitalize it
        listItem.user.last = listItem.user.last[0].toUpperCase();

        //shorten the description to 48 characters
        var maxLength = 48;
        var shortDescription = listItem.description.substr(0, maxLength+1);
        //shorten again if 48th character is in a word
        if(shortDescription.charAt(48) !== " " && shortDescription.length > 47){
          listItem.description = shortDescription.substr(0, Math.min(shortDescription.length, shortDescription.lastIndexOf(" "))) + "..."
        }
      })
    }



    init();
  }
