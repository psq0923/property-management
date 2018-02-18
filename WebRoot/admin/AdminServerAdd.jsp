<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'form.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="admin/js/jquery.js"></script>
<!-- <script type="text/javascript" src="admin/js/AdminServerAdd.js"></script> -->

</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="#">首页</a></li>
			<li><a href="#">表单</a></li>
		</ul>
	</div>
	<div class="formbody">

		<div class="formtitle">
			<span>物业费用类型</span>
		</div>
		<ul class="forminfo">
			<form action="AddServer_type.action" method="post" name="blur_test">
				<li><label>服务类型</label><input id="ser_type" type="text"   
					name="server_type.ser_type" class="dfinput" onblur="chkvalueone(this)"  /></li>
					<span id="lay_phone" style="width: 79px;margin-top: -37px;float: right;margin-right:  541px;" ></span>  
				<li><label>收费项目</label><input id="charge_type" type="text"
					name="server_type.charge_type" class="dfinput"  onblur="chkvaluetwo(this)"/></li> 
					<span id="lay_phone2"style="width: 79px;margin-top: -37px;float: right;margin-right:  541px;" ></span>
				<li><label>收费</label><input id="charge_sta" type="text"
					name="server_type.charge_sta" class="dfinput" onblur="chkvaluethere(this)" /></li> 
					<span id="lay_phone3"style="width: 79px;margin-top: -37px;float: right;margin-right: 541px;" ></span>
				<li><label>&nbsp;</label><a id="ensuer"><input name="" type="submit"    
					class="btn"  style="text-align:center;" value="确认添加" /></a></li>
					<%-- <s:fielderror/> --%>
			</form>       
		</ul>     
	</div>
</body>
<script language="JavaScript">

 
function chkvalueone(txt) {
	
	var reg = /^[\u4E00-\u9FA5]/;   
	var zhi=txt.value;    
 
	   if(!reg.test(zhi)) {  
			  
		  var a= $("#lay_phone").html("<font style='color:red;text-align:center'>请使用中文</font>"); 
			$("#ensuer").html("<input  type='text' id='ensuer' style='text-align: center; color: #FFFFFF;' class='btn' value='确认添加'/>");    
		    }else{
		    	 $("#lay_phone").html("");
		    	 $("#ensuer").html("<input  type='submit' id='ensuer' style='text-align: center;'  class='btn' value='确认添加'/>");       
				
		    }  
}     
function chkvaluetwo(txt) {
/* 	有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ */
	
	var reg = /^[\u4E00-\u9FA5]/;   
	var zhi=txt.value;      
	   
	   if(!reg.test(zhi)) {   
		   
		   $("#lay_phone2").html("<font style='color:red'>请使用中文</font>");
			$("#ensuer").html("<input  type='text' id='ensuer' style='text-align: center;'  class='btn' value='确认添加'/>");    
		    }else{
		    	 $("#lay_phone2").html("");
		    	 $("#ensuer").html("<input  type='submit' id='ensuer' style='text-align: center;'  class='btn' value='确认添加'/>");    
		    } 
}     

function chkvaluethere(txt) {
	/* var reg = /^[\u4E00-\u9FA5]/;  */  
	var money=/^[1-9][0-9]*$/
	var zhi=txt.value;      
	   
	   if(!money.test(zhi)) {
		       
		   $("#lay_phone3").html("<font style='color:red'>请使用数字</font>");
			$("#ensuer").html("<input  type='text' id='ensuer' class='btn' style='text-align: center;' value='确认添加'/>");    
		    }else{
		    	 $("#lay_phone3").html("");  
		    	 $("#ensuer").html("<input  type='submit' id='ensuer' style='text-align: center;'  class='btn' value='确认添加'/>");    
		    } 
}  


     
</script>  

<!-- <script type="text/javascript">
$(document).ready(function() {
		    
		function chkvalue(txt) {
			   if(!reg.test($("#ser_type").val())) 
		     		   alert("文本框里必须填写内容!"); 
		}
			
		
		  
		  
	});
</script> -->



</html>
