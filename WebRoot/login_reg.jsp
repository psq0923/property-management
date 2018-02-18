<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>注册登录页面</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录界面</title>

<link rel="stylesheet" type="text/css" href="css/bootstrap8.min.css" />
<link rel="stylesheet" type="text/css" href="css/style8.css" />
<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
<!-- 引用js文件，js文件名与jsp页面名字一致 -->
<script type="text/javascript" src="js/UserSave.js"></script>
<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$('#login').click(function() {
			var name_state = $('#name');
			var psd_state = $('#psd');
			var name = $('#name').val();
			var psd = $('#psd').val();
			if (name == '') {
				name_state.parent().next().next().css("display", "block");
				return false;
			} else if (psd == '') {
				name_state.parent().next().next().css("display", "none");
				psd_state.parent().next().next().css("display", "block");
				return false;
			} else {
				name_state.parent().next().next().css("display", "none");
				psd_state.parent().next().next().css("display", "none");
				$('.login').submit();
			}
		});
		$('#register').click(
				function() {
					var username_state = $('#username');
					var password_state = $('#password');
					var affirm_psd_state = $('#affirm_psd');
					var username = $('#username').val();
					var password = $('#password').val();
					var affirm_psd = $('#affirm_psd').val();
					if (username == '') {
						username_state.parent().next().next().css("display",
								"block");
						return false;
					} else if (password == '') {
						password_state.parent().next().next().css("display",
								"block");
						return false;
					} else if (affirm_psd == '') {
						affirm_psd_state.parent().next().next().css("display",
								"block");
						return false;
					} else if (password != affirm_psd) {
						return false;
					} else {
						$('.register').submit();
					}
				})
	})

	function ok_or_errorBylogin(l) {
		var content = $(l).val();
		if (content != "") {
			$(l).parent().next().next().css("display", "none");
		}
	}

	function ok_or_errorByRegister(r) {
		var affirm_psd = $("#affirm_psd");
		var password = $("#password");
		var affirm_psd_v = $("#affirm_psd").val();
		var password_v = $("#password").val();
		var content = $(r).val();
		if (content == "") {
			$(r).parent().next().next().css("display", "block");
			return false;
		} else {
			$(r).parent().next().css("display", "block");
			$(r).parent().next().next().css("display", "none");
			if (password_v == "") {
				$(password).parent().next().css("display", "none");
				$(password).parent().next().next().css("display", "none");
				$(password).parent().next().next().css("display", "block");
				return false;
			}
			if (affirm_psd_v == "") {
				$(affirm_psd_v).parent().next().css("display", "none");
				$(affirm_psd_v).parent().next().next().css("display", "none");
				$(affirm_psd_v).parent().next().next().css("display", "block");
				return false;
			}
			if (password_v == affirm_psd_v) {
				$(affirm_psd).parent().next().css("display", "none");
				$(affirm_psd).parent().next().next().css("display", "none");
				$(password).parent().next().css("display", "none");
				$(password).parent().next().next().css("display", "none");
				$(affirm_psd).parent().next().css("display", "block");
				$(password).parent().next().css("display", "block");
			} else {
				$(affirm_psd).parent().next().css("display", "none");
				$(affirm_psd).parent().next().next().css("display", "none");
				$(password).parent().next().css("display", "none");
				$(password).parent().next().next().css("display", "none");
				$(password).parent().next().css("display", "block");
				$(affirm_psd).parent().next().next().css("display", "block");
				return false;
			}
		}
	}

	function barter_btn(bb) {
		$(bb).parent().parent().fadeOut(1000);
		$(bb).parent().parent().siblings().fadeIn(2000);
	}
</script>
</head>

<body class="login_body">

	<div class="login_div">
		<div class="col-xs-12 login_title">登录</div>
		<form action="login.action" class="login" method="post">
			<div class="nav">
				<div class="nav login_nav">
					<div class="col-xs-4 login_username">用户名:</div>
					<div class="col-xs-6 login_usernameInput">
						<input type="text" id="name" name="user.username" value=""
							placeholder="&nbsp;&nbsp;用户名"
							onblur="javascript:ok_or_errorBylogin(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="nav login_psdNav">
					<div class="col-xs-4">密&nbsp;&nbsp;&nbsp;码:</div>
					<div class="col-xs-6">
						<input type="password" name="user.password" id="psd" value=""
							placeholder="&nbsp;&nbsp;密码"
							onBlur="javascript:ok_or_errorBylogin(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="col-xs-12 login_btn_div">
					<input type="submit" class="sub_btn" value="登录" id="login" />
				</div>
			</div>
		</form>

		<div class="col-xs-12 barter_btnDiv">
			<button class="barter_btn" onClick="javascript:barter_btn(this)">没有账号?前往注册</button>
		</div>
	</div>

	<div class="register_body">
		<div class="col-xs-12 register_title">注册</div>
		<form action="register.action" class="register" method="post">
			<div class="nav">
				<div class="nav register_nav">
					<div class="col-xs-4">用户名:</div>
					<div class="col-xs-6">
						<input type="text" name="user.username" id="username" value=""
							style="border-radius: 5px;border: 1px solid #CCCCCC;" placeholder="&nbsp;&nbsp;用户名"
							onBlur="javascript:ok_or_errorByRegister(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="nav register_psdnav">
					<div class="col-xs-4">密&nbsp;&nbsp;&nbsp;码:</div>
					<div class="col-xs-6">
						<input type="password" name="user.password" id="password" value=""
							style="border-radius: 5px;border: 1px solid #CCCCCC;" placeholder="&nbsp;&nbsp;密码"
							onBlur="javascript:ok_or_errorByRegister(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="nav register_affirm">
					<div class="col-xs-4">确认密码:</div>
					<div class="col-xs-6">
						<input style="border-radius: 5px;height: 35px;font-size: -2px;" type="password" name="repassword" id="affirm_psd" value=""
							placeholder="&nbsp;&nbsp;确认密码"
							onBlur="javascript:ok_or_errorByRegister(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>

				<div class="nav register_psdnav">
					<div class="col-xs-4">电话:</div>
					<div class="col-xs-6">
						<input type="text" name="
							user.mobile" id="mobile"
							style="border-radius: 5px;border: 1px solid #CCCCCC;" value="" placeholder="&nbsp;&nbsp;手机号"
							onBlur="javascript:ok_or_errorByRegister(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="nav register_psdnav">
					<div class="col-xs-4">楼号:</div>
					<div class="col-xs-6">
						<select id="building_id" name="user.building_id">
							<option>请选择</option>
						</select>
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="nav register_psdnav">
					<div class="col-xs-4">楼层:</div>
					<div class="col-xs-6">
						<select id="floor_num" name="user.floor_num"
							onChange="getFloor_num()">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</select>
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>

				<div class="nav register_psdnav">
					<div class="col-xs-4">门牌号:</div>
					<div class="col-xs-6">
						<input type="text" name="user.room_num" id="room_num" value=""
							placeholder="&nbsp;&nbsp;门牌号" style="border-radius: 5px;border: 1px solid #CCCCCC;"
							onBlur="javascript:ok_or_errorByRegister(this)" />
					</div>
					<div class="col-xs-1 ok_gou">√</div>
					<div class="col-xs-1 error_cuo">×</div>
				</div>
				<div class="col-xs-12 register_btn_div">
					<input type="submit" class="sub_btn" value="注册" id="register" />
				</div>
		</form>
		<div class="col-xs-12 barter_register">
			<a href="login_reg.jsp"  style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px; font-color:#cdcdcd" class="barter_registerBtn"
				 style="">已有帐号?返回登录</a>
		</div>
	</div>


</body>
</html>