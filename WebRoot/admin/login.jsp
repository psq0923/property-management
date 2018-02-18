<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

<title>欢迎登录后台管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="admin/js/jquery.js"></script>
<script src="admin/js/cloud.js" type="text/javascript"></script>

<script language="javascript">
	$(function() {
		$('.loginbox').css({
			'position' : 'absolute',
			'left' : ($(window).width() - 692) / 2
		});
		$(window).resize(function() {
			$('.loginbox').css({
				'position' : 'absolute',
				'left' : ($(window).width() - 692) / 2
			});
		})
	});
</script>
</head>

<body
	style="background-color:#1c77ac; background-image:url(images/light.png); background-repeat:no-repeat; background-position:center top; overflow:hidden;">

	<div id="mainBody">
		<div id="cloud1" class="cloud"></div>
		<div id="cloud2" class="cloud"></div>
	</div>


	<div class="logintop">
		<span>欢迎登录后台管理界面平台</span>
		<ul>
			<li><a href="#">回首页</a></li>
			<li><a href="#">帮助</a></li>
			<li><a href="#">关于</a></li>
		</ul>
	</div>

	<%
     String username = "";
     String password = "";
     //获取当前站点的所有Cookie
     Cookie[] cookies = request.getCookies();
     for (int i = 0; i < cookies.length; i++) {  
         if ("username".equals(cookies[i].getName())) {
             username = cookies[i].getValue();
         } else if ("password".equals(cookies[i].getName())) {
             password = cookies[i].getValue();
         }
     }
 	%>
	
	<div class="loginbody">

		<span class="systemlogo"></span>

		<div class="loginbox" style="height:350px;">
			<form action="Login.action" method="post">
				<ul>
					<li>
					<input name="au.username" type="text" class="loginuser"
						value="admin" onclick="JavaScript:this.value=''" /></li>
					<li><input name="au.password" type="text" class="loginpwd"
						value="密码" onclick="JavaScript:this.value=''" /></li>
					<li>
						<input name="verifyCode" id="verifyCode" type="text" class="loginpwd" value="验证码" onclick="JavaScript:this.value=''" />
						<em><img border=0 src="verifyCode.action"></em></li>
					<li><input name="" type="submit" class="loginbtn" value="登录" />
						<label><input name="is_remember" type="checkbox" value="y"/>记住密码</label> 
							</li>
				</ul>
			</form>

		</div>

	</div>

	<div class="loginbm"></div>
</body>
</html>
