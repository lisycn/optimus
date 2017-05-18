/**
 * 查询账户总览信息 
 */
function queryOverview() {
	mui.$get("/account/overview", null, function(data) {
		$("#overviewContainer").html(overviewTmplFunc(data));
		$("#subjectContainer").html(subjectTmplFunc(data));
		if(data.userName){
			$(".mui-title").text(data.userName);
		}
		mui.$resetListStyle();
	});
}

//---------------------------------------------
var overviewTmplFunc = mui.$template($("#overviewTmpl").html());
var subjectTmplFunc = mui.$template($("#subjectTmpl").html());
mui.init({
	swipeBack: true //启用右滑关闭功能
});

function makeDesp(header,body){
	return '<b>'+header+'</b>:'+body;
}
$("#helpBtn").on("tap",function(){
	var msg = [];
	msg.push(makeDesp('当前资产总值','余额+定期产品的投资总额+基金的持有总额'));
	msg.push(makeDesp('昨日收益','基金已确认份额昨日的收益'));
	msg.push(makeDesp('可用余额','现在可用于提现、投资的金额'));
	msg.push(makeDesp('累计收益','所有投资产品的已获收益累计之和'));
	mui.alert(msg.join("<br/>"),"信息说明");
});

queryOverview();
mui.$resetListStyle();
