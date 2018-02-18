<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="s" uri="/struts-tags" %>
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
<script language="JavaScript" src="admin/js/jquery.js"></script>
<script type="text/javascript">
	$(function() {
		//顶部导航切换
		$(".nav li a").click(function() {
			$(".nav li a.selected").removeClass("selected")
			$(this).addClass("selected");
		})
	})
</script>
</head>

<body style="background:url(admin/images/topbg.gif) repeat-x;">

	<div class="topleft">
		<a href="admin/main.jsp" target="_parent"><img src="admin/images/loginlogo6.png"
			title="系统首页" /></a>
	</div>

	<ul class="nav">
		<li><a href="admin/news_add.jsp" target="rightFrame" class="selected"><img
				src="admin/images/icon01.png" title="新闻" />
			<h2>新闻</h2></a></li>
		<li><a href="findBuildingPageList.action" target="rightFrame"><img
				src="admin/images/icon02.png" title="住房管理" />
			<h2>住房管理</h2></a></li>
		<li><a href="stock/findAllGoods.action" target="rightFrame"><img
				src="admin/images/icon03.png" title="物品库存管理" />
			<h2>物品库存管理</h2></a></li>
		<li><a href="findAllDetail.action" target="rightFrame"><img
				src="admin/images/icon04.png" title="维修费单据" />
			<h2>维修费单据</h2></a></li>
		<li><a href="admin/computer.jsp" target="rightFrame"><img
				src="admin/images/icon05.png" title="文件管理" />
			<h2>文件管理</h2></a></li>
		<li><a href="findAccessPageList.action" target="rightFrame"><img
				src="admin/images/icon06.png" title="权限设置" />
			<h2>权限设置</h2></a></li>
	</ul>

	<div class="topright">
		<ul>
			<li><span><img src="admin/images/help.png" title="帮助"
					class="helpimg" /></span><a>帮助</a></li>
			<li><a href="#">关于</a></li>
			<li><a href="admin/login.jsp" target="_parent">退出</a></li>
		</ul>

		<div class="user">
		<s:iterator value="au" var="ass">
			<span><s:property value="#ass.username" /></span>
		</s:iterator>
		</div>

	</div>
</body>
</html>
