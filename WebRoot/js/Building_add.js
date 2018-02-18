$(function(){
	/*$(":submit").click(function(){
		var regphone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!regphone.test($("#uname").val())) { 
			alert('请输入有效的手机号码！'); 
			return false; 
		} 
	});*/
	
	$(":submit").click(function(){
	var reg = /^[\u4E00-\u9FA5]/;   
	if(!reg.test($("#building_name").val())){
		alert('楼栋名请使用中文');  
		$("#lay_name").html("<font style='color:red;margin-right:833px;'>楼房名请使用中文</font>");
		return false;
	}
	
});
	
	/*$(":submit").click(function(){
		var reg = /^[\u4E00-\u9FA5]{2,4}$/;
		if(!reg.test($("#uname").val())){
			alert('用户名请使用2~4位之间的中文');
			return false;
		}
		
	});*/
	
	
	
	/*$(":submit").click(function(){
			var reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
			if(!reg.test($("#uname").val())){
				alert('用户名请使用英文加数字的组合');
				return false;
			}
		});*/
	
	/*$(":submit").click(function(){
		var reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]{2,4}$/;
		if(!reg.test($("#uname").val())){
			alert('用户名请使用2~4位英文加数字的组合');
			return false;
		}
	});*/
	
	
	
	/*$(":submit").click(function(){
		var regphone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!regphone.test($("#username").val())) { 
		//	alert('请输入有效的手机号码！'); 
			$("#lay_phone").html("<font style='color:red'>请输入有效的手机号码</font>");
			return false; 
		}
	});
	*/
	
});