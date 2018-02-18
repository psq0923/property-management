<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>社区维修服务</title>
<style type="text/css">
<!--
a:link {
	color: #000000;
	text-decoration: none;
}

a:visited {
	text-decoration: none;
	color: #333333;
}

a:hover {
	text-decoration: none;
	color: #FF6600;
}

a:active {
	text-decoration: none;
	color: #FF6600;
}

.STYLE100 {
	font-size: 14px;
	font-weight: bold;
}
-->
</style>

<script language="javascript" type="text/javascript">
	
</script>
<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
<!-- 引用js文件，js文件名与jsp页面名字一致 -->
<script type="text/javascript" src="js/RepairSave.js"></script>
</head>

<body style="margin:0;">
	<center>
		<table width="991" border="0" cellspacing="0" cellpadding="0">
			<tbody>
				<tr>
					<td>





						<title>无标题文档</title>
						<style type="text/css">
/* common styling */
.menu {
	font-family: arial, sans-serif;
	width: 991px;
	height: 42px;
	position: relative;
	margin: 0;
	font-size: 15px;
	font-weight: bold;
	margin: 3px 0;
	background: #fff;
	position: relative;
}

.menu ul {
	padding: 0;
	margin: 0;
	list-style-type: none;
}

.menu ul li {
	float: left;
	border-left: 1px solid #fff;
	width: 126px;
}

.menu ul li a,.menu ul li a:visited {
	display: block;
	float: left;
	width: 126px;
	text-decoration: none;
	padding: 0 0 0 5px;
	height: 42px;
	line-height: 30px;
	color: #fff;
	background: url(imgs/bg_01.jpg);
}

.menu ul li ul {
	display: none;
}
/* specific to non IE browsers */
.menu ul li:hover a {
	color: #FC8741;
	background: url(imgs/bg_01.jpg);
}

.menu ul li:hover ul {
	display: block;
	position: absolute;
	width: 991px;
	top: 42px;
	left: 0;
	background: #fff;
	color: #4e4e4e;
}

.menu ul li:hover ul.right_side li {
	float: right;
	border: 0;
	border-left: 1px solid #eee;
}

.menu ul li:hover ul.left_side li {
	float: left;
	border: 0;
	border-left: 1px solid #eee;
}

.menu ul li:hover ul li a.hide {
	background: #fff;
	color: #4e4e4e;
}

.menu ul li:hover ul li:hover a.hide {
	background: #fff;
	color: #4e4e4e;
}

.menu ul li:hover ul li ul {
	display: none;
}

.menu ul li:hover ul li a {
	display: block;
	background: #fff;
	color: #4e4e4e;
}

.menu ul li:hover ul li a:hover {
	background: #fff;
	color: #F01;
}

.menu ul li:hover ul li:hover ul {
	display: block;
	position: absolute;
	left: 0;
	top: 30px;
	color: #4e4e4e;
	background: #fff;
}

.menu ul li:hover ul.right li {
	float: right;
}

.menu ul li:hover ul li:hover a.hide {
	color: #4e4e4e;
	background: #fff;
}

.menu ul li:hover ul li:hover ul li a {
	color: #4e4e4e;
	background: #fff;
}

.menu ul li:hover ul li:hover ul li a:hover {
	color: #4e4e4e;
	background: #fff;
}
</style><script src="js/AC_RunActiveContent.js" type="text/javascript"></script>





						<table width="991" border="0" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td>

										<div class="menu"></div>
									</td>
								</tr>
							</tbody>
						</table>


						<table width="986" height="530" border="0" cellspacing="0"
							cellpadding="0">
							<tbody>
								<tr>
									<td style="border:1px solid #C8C8C8">




										<table width="986" border="0" cellspacing="0" cellpadding="0"
											style="border-bottom:1px solid #c8c8c8;">
											<tbody>
												<tr>
													<td width="50"><img src="images/p_03.jpg" width="50"
														height="48"></td>
													<td align="left"
														style="border-left:1px solid #C8C8C8; font-size:20px;"><font
														color="#FF0000"><p behavior=""
																scrollamount="4">欢迎使用社区维修服务网在线报修预约平台
															电话报修：110</p></font></td>
													<td width="100" align="center"
														style="border-left:1px solid #C8C8C8"><div
															style="font-size:13px; color:#4C4C4C">在线登记</div></td>
												</tr>
											</tbody>
										</table>

										<form name="submitform" action="admin/repair.action" method="post">
											<input type="hidden" name="sendok" value="ok">
											<table width="986" height="400" border="0" cellspacing="0"
												cellpadding="0">
												<tbody>
													<tr>
														<td width="200" align="center" valign="top">
															<div
																style="margin-top:20px; margin-left:10px; font-size:14px; text-align:left; line-height:22px; color:#4C4C4C;">&nbsp;&nbsp;&nbsp;&nbsp;您好：欢迎致电社区维修服务网，请问有什么可以帮助您？</div>
															<div style="margin-top:10px;">
																<img src="images/p_04.jpg" width="180" height="210">
															</div>
															<div style="margin-top:20px; color:#F00; font-size:20px;">
																<p behavior="alternate" scrollamount="3">
																电话报修：110<br>
																早9：00-晚8:00 </p>
															</div>
														</td>
														<td style="border-left:1px solid #C8C8C8" align="center"
															valign="top">
															<div
																style="margin-top:10px; width:780px; text-align:left; font-size:14px; margin-left:10px; line-height:22px; color:#4c4c4c;">
																尊敬的客户：<br>
																&nbsp;&nbsp;&nbsp;&nbsp;您好！欢迎使用社区维修网上报修预约服务系统，请正确填写以下信息。
															</div>


															<table width="780" height="30" border="0" cellspacing="0"
																cellpadding="0" style="margin-top:30px">

																<tbody>
																	<tr>
																		<td>&nbsp;报修物品：
																		<select id="goods" name="repair.goods_id">
																				<option>请选择</option>
																		</select></td>
																	</tr>
																</tbody>
															</table>
															<table width="780" height="30" border="0" cellspacing="0"
																cellpadding="0" style="margin-top:30px">

																<tbody>
																	<tr>
																		<td width="120"
																			style="font-size:14px; text-align:center">故障现象</td>
																		<td width="660" align="center"><textarea
																				style="width:625px;height:100px" name="repair.remark"
																				cols="49" rows="4" class="STYLE21"></textarea></td>
																	</tr>

																</tbody>
															</table>

															<table height="30" border="0" cellspacing="0"
																cellpadding="0"></table> <!-- 	<table width="780" height="30" border="0"
																	cellspacing="0" cellpadding="0">
																	<tbody>
																		<tr>
																			<td width="120"
																				style="font-size:14px; text-align:center">详细地址</td>
																			<td width="660" align="center"><input name="vip"
																				type="text" style="width:630px;height:30px"></td>
																		</tr>
																	</tbody>
																</table> --> <!-- <table width="780" height="30" border="0"
																	cellspacing="0" cellpadding="0">
																	<table width="780" height="30" border="0"
																		cellspacing="0" cellpadding="0">
																		<tbody>
																			<tr>
																				<td width="120"
																					style="font-size:14px; text-align:center">&nbsp;&nbsp;姓&nbsp;&nbsp;名</td>
																				<td width="660" align="center"><input
																					name="vip" type="text"
																					style="width:312px;height:20px"></td>
																				<td width="120"
																					style="font-size:14px; text-align:center">手&nbsp;&nbsp;机</td>
																				<td width="120" align="center"><input
																					name="shouji" type="text"
																					style="width:200px;height:20px"></td>
																			</tr>
																		</tbody>
																	</table> --> <!-- <table width="780" height="30" border="0"
																		cellspacing="0" cellpadding="0">
																		<table width="780" height="30" border="0"
																			cellspacing="0" cellpadding="0">

																			<td width="122"
																				style="font-size:14px; text-align:center">客户备注</td>
																			<td width="408" align="center"><textarea
																					name="yaoqiu" cols="49" rows="4" class="STYLE21" style="width:625px;height:98px"></textarea></td>
																			

																			</tbody>
																		</table>
																 -->
															<div style="margin-left: 12px;margin-top: 33px;">
																<a href="javascript:check()" class="STYLE100"><input
																	class="STYLE100" type="submit" value="提交" /></a> <input
																	type="reset" class="STYLE100"></input>
																	<a href="home.jsp">返回</a>
															</div>

															</form>



														</td>
													</tr>
												</tbody>
											</table>
									</td>
								</tr>
							</tbody>
						</table>
						</center>
</body>
</html>