angular.module('petlist.services', [])
  .factory('PetFactory', ['$http', PetFactory])

function PetFactory($http){
  return {
    setUrl: setUrl
  }

  function setUrl(listData){
    var searchArr = listData.data.search;
    searchArr.forEach(function(listItem){
      var url = listItem.title.trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      console.log(url)
    })
  }
}
