/*! hx 2016-05-17 13 */
require("app").register.controller("productsController",function($scope,$myhttp,$timeout){function setProducts(result){$scope.products=result||[],canShelves()}function canShelves(){_.each($scope.products,function(prd){(new Date).getTime();"03"!==prd.status&&"05"!==prd.status||(prd.canEdit=!0,"1"===prd.subjectTag?(prd.btnText="下架",prd.btnClass="btn-warning"):(prd.btnText="上架",prd.btnClass="btn-success"))})}var pagination=$scope.pagination={},allStatus=($scope.condition={},"03,04,05,08,10,13,15,20,99,50");$scope.status=allStatus,$scope.type="";$scope.statuses=[{text:"全部",value:allStatus},{text:"未上架",value:"0"},{text:"已上架",value:"1"},{text:"已开售",value:"05"},{text:"已满标",value:"10"},{text:"还款中",value:"15"},{text:"已完结",value:"20"}],$scope.types=[{text:"全部",value:""}];$scope.loading=!1,$scope.shelvesLoading={},$scope.products=[],$scope.query=function(page){var param={};$scope.loading=!0,param.pageNum=page||1,param.pageSize=10,""!==$scope.status&&("0"===$scope.status?param.subjectTag="0":"1"===$scope.status?param.subjectTag="1":"1"!==$scope.status&&(param.status=$scope.status)),console.info("请求参数",param),$myhttp("loading",$scope).get("/product/list",param,angular.ajaxIsSuccess(function(result){pagination.currentPage=result.pageIndex,pagination.totalPage=result.pageCount,setProducts(result.result)}))},$scope.shelves=function(prd){var param={subjectNo:prd.subjectNo,subjectTag:prd.subjectTag-0?"0":"1"};$scope.shelvesLoading[param.subjectNo]=!0,$myhttp("shelvesLoading."+param.subjectNo,$scope).post("/product/shelves",JSON.stringify(param),angular.ajaxIsSuccess(function(result){prd.subjectTag=param.subjectTag,canShelves()}))},pagination.currentPage=1,pagination.totalPage=1,pagination.onSelect=function(page){$scope.query(page)},$timeout($scope.query,1e3)});