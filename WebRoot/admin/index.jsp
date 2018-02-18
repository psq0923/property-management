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

<title>My JSP 'top.jsp' starting page</title>

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
</head>

<body>
	<div class="place">
	<span>位置：</span>
	<ul class="placeul">
		<li><a href="admin/index.jsp">首页</a></li>
	</ul>
	</div>

	<div class="mainindex">


		<div class="welinfo">
			<span><img src="admin/images/sun.png" alt="天气" /></span> <b>admin您好，欢迎使用信息管理系统</b>
			<a href="../admin/right.jsp">帐号设置</a>
		</div>

		<div class="welinfo">
			<span><img src="admin/images/time.png" alt="时间" /></span> <i>您上次登录的时间：2017-01-14
				</i> 
		</div>

		<div class="xline"></div>

		<ul class="iconlist">

			<li><img src="admin/images/ico01.png" />
			<p>
					<a href="admin/findUsersPageList.action">住户管理</a>
				</p></li>
			<li><img src="admin/images/ico02.png" />
			<p>
					<a>发布新闻</a>
				</p></li>
			<li><img src="admin/images/ico03.png" />
			<p>
					<a>权限管理</a>
				</p></li>
			<li><img src="admin/images/ico04.png" />
			<p>
					<a>物品管理</a>
				</p></li>
			<li><img src="admin/images/ico05.png" />
			<p>
					<a>小区管理</a>
				</p></li>
			<li><img src="admin/images/ico06.png" />
			<p>
					<a>查询</a>
				</p></li>

		</ul>

		<div class="ibox">
			<a class="ibtn"><img src="admin/images/iadd.png" />添加新的快捷功能</a>
		</div>

		<div class="xline"></div>
		<div class="box"></div>

		<div class="welinfo">
			<span><img src="admin/images/dp.png" alt="提醒" /></span> <b>物业管理系统使用指南</b>
		</div>

		<ul class="infolist">
			<li><span>您可以快速进行文章发布管理操作</span><a class="ibtn">发布新闻</a></li>
			<li><span>您可以快速查询住户</span><a class="ibtn">查询住户</a></li>
			<li><span>您可以进行密码修改、账户设置等操作</span><a class="ibtn">账户管理</a></li>
		</ul>

		<div class="xline"></div>

		<div class="uimakerinfo">
			<b>查看本网站使用指南，您可以了解到更多有关我们小区等相关信息</b>
				
		</div>

		<ul class="umlist">
			<li><a>如何管理住户</a></li>
			<li><a>如何访问网站</a></li>
			<li><a>如何管理员工</a></li>
			<li><a>后台用户设置(权限)</a></li>
			<li><a>系统设置</a></li>
		</ul>


	</div>
</body>
</html>
