/*! hx 2016-05-17 13 */
require("app").register.controller("memberAccountFundViewController",function($scope,$timeout,$myhttp,$location){$scope.view={},$scope.userId=$location.search().userId,$scope.loading=!1,$scope.query=function(page){$scope.loading=!0;var param={};param.userId=$scope.userId,console.log(param),$myhttp("loading",$scope).get("/account/overview/subject",param,function(result){$scope.view=result,console.info(result)})},$timeout($scope.query,300)});