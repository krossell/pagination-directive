'use strict';

angular.module('mLib').directive('gridPaginator', function(){

  return {
      restrict:'EA',
      templateUrl:'pagination.html',
      replace:true,
      scope:{
        targetcollection:"=",
        count:"@pagecount"              
      },
      link:function(scope,element,attributes){
          
          scope.paginationDisplayNum = 10;
          var scopeRef = scope;
          var flag = false;
          scope.sourceCollection = [];
             scope.$on('pagination:create', function(evt, data){
             scope.createPagination(data);
          });

          scope.createPagination = function(data){
            scope.sourceCollection = data;
            scope.targetcollection = data.slice(0, scope.count);
            scope.pages = Math.ceil( data.length/ scope.count );
            scope.nextBtnDisabled = false;
            scope.prevBtnDisabled = true;
            scope.fullPagesArry = [];
            scope.currentPagesArray = [];
            scope.pageIndexFrom = 0;
            scope.pageIndexTo = scope.paginationDisplayNum; // setting default count
            for(var i=1; i<=scope.pages; i++){ scope.fullPagesArry.push(i) };
            scope.currentPagesArray = scope.fullPagesArry.slice(scope.pageIndexFrom, scope.pageIndexTo);
            //showing the first page 
            scope.getPage(1);
          }

          scope.getPage = function(pageNum){
            var to = pageNum * scope.count;
            var from  = to - scope.count;
            scope.targetcollection = scope.sourceCollection.slice(from, to);
            scope.activePage = pageNum;
          }

          scope.nextPageSet = function(){  
            if(scope.activePage==scope.fullPagesArry.length) return;
            if(scope.activePage == scope.currentPagesArray[scope.currentPagesArray.length-1]){
                scope.pageIndexFrom = scope.pageIndexTo;
                scope.pageIndexTo = scope.pageIndexTo + scope.paginationDisplayNum;
                scope.currentPagesArray = scope.fullPagesArry.slice(scope.pageIndexFrom, scope.pageIndexTo);
            }
            scope.activePage++;
            scope.getPage(scope.activePage);
          };

          scope.prevPageSet = function(){
            if(scope.activePage==1) return;
            if(scope.activePage == scope.currentPagesArray[0]){
              scope.pageIndexTo = scope.pageIndexFrom;
              scope.pageIndexFrom = scope.pageIndexTo - scope.paginationDisplayNum;            
              scope.currentPagesArray = scope.fullPagesArry.slice(scope.pageIndexFrom, scope.pageIndexTo);
            }
            scope.activePage--;
            scope.getPage(scope.activePage);   
          };




      }

  }



})