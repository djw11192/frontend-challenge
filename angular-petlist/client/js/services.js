angular.module('petlist.services', [])
  .factory('PetFactory', ['$http', PetFactory])

function PetFactory($http){
  return {
    setUrl: setUrl
  }

  function setUrl(listData){
    var searchArr = listData.data.search;
    searchArr.forEach(function(listItem){
      listItem.title = listItem.title.trim()//trim takes away and leading or ending spaces
        .replace(/[^a-zA-Z0-9\s]/g, '')//take out non-alpha numeric characters
        .replace(/\s+/g, '-')//replace spaces with dashes
        .toLowerCase()
    })
    //return searchArr;
  }
}
