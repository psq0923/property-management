$(function(){
	$("#update").hide();
	$("#close").click(function(){
		$("#update").fadeOut("slow");
	});
	$(".update").click(function(){
		$("#update").fadeIn("slow");
		var charge_sta = $(this).parent().prev().text();
		var charge_type = $(this).parent().prev().prev().text();
		var ser_type = $(this).parent().prev().prev().prev().text();
		var server_id = $(this).parent().prev().prev().prev().prev().text();
		var a = "<form action='updateServer_type.action' method='post'>";
			a+="<table style='background-color: #CDCDCD;'><tr><td><label style='text-align:center'>编号</label></td><td><label style='text-align:center'>服务类型</label></td><td><label style='text-align:center'>收费项目</label></td><td><label style='text-align:center'>收费</label></td><td><label style='text-align:center'>操作</label></td></tr><br>";
			a+="<tr style='background-color: #CDCDCD;'><td><input type='text' name='server_type.server_id' value='"+ server_id +"' readonly style='background-color: #CDCDCD;'></td><td><input type='text' name='server_type.ser_type'  value='"+ ser_type +"'style='background-color: #CDCDCD;'></td><td><input type='text' name='server_type.charge_type' value='"+ charge_type +"'style='background-color: #CDCDCD;'></td><td><input type='text' name='server_type.charge_sta' value='"+ charge_sta +"'style='background-color: #CDCDCD;' ></td><td style='background-color: #CDCDCD;'><input type='submit' value='修改' style='border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold;  border-radius: 3px;''></td></tr><br>";
			a+="</table></form>";  
	$("#updateuser").html(a);
	});
	
});