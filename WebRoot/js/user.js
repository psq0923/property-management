$(function(){
	$("#update").hide();
	$("#close").click(function(){
		$("#update").fadeOut("slow");
	});
	$(".update").click(function(){
		$("#update").fadeIn("slow");
		var upass = $(this).parent().prev().prev().text();
		var uname = $(this).parent().prev().prev().prev().text();
		var uid = $(this).parent().prev().prev().prev().prev().text();
		var tel = $(this).parent().prev().text();
		var a = "<form action='update.action' method='post'>";
			a+="编号：<input type='text' name='user.uid' value='"+ uid +"' readonly><br>";
			a+="姓名：<input type='text' name='user.uname' value='"+ uname +"'><br>";
			a+="密码：<input type='password' name='user.upass' value='"+ upass +"'><br>";
			a+="电话：<input type='text' name='user.tel' value='"+ tel +"'><br>";
			a+="<input type='submit' value='修改'></form>";
	$("#updateuser").html(a);
	});
	
});