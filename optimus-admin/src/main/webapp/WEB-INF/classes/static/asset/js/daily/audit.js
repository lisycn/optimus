/*! hx 2016-05-17 13 */
require("app").register.controller("auditController",function($scope,$myhttp,$timeout){function query(){$scope.loading.refresh=!0,$myhttp("loading.refresh",$scope).get("/payment/waitaudits",null,function(result){$scope.orders=result||[]})}function getCheckedOrderIds(){var ids=[];return _.each($scope.checkboxs,function(val,key){val&&ids.push(key)}),ids.join(",")}$scope.loading={refresh:!1,S:!1,F:!1},$scope.orders=[],$scope.checkboxs={},$scope.allIsCheck=!1,$scope.checkAll=function(onlyValid){onlyValid&&($scope.allIsCheck=!_.find($scope.orders,function(o){return!$scope.checkboxs[o.orderId]})),onlyValid||_.each($scope.orders,function(o){$scope.checkboxs[o.orderId]=$scope.allIsCheck})},$scope.check=function(orderId){$scope.checkAll(!0)},$scope.audit=function(type){var param={};return param.orders=getCheckedOrderIds(),param.orders?(param.status=type,$scope.loading[type]=!0,void $myhttp("loading."+type,$scope).get("/account/doaudit",param,function(){console.info("审核成功!"),$scope.refresh()})):void angular.info("请选择要审核的记录!")},$scope.refresh=function(){$scope.checkboxs={},$scope.allIsCheck=!1,query()},$timeout($scope.refresh,300)});