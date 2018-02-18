<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>网站后台管理系统</title>

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

<script type="text/javascript">
	$(document).ready(function() {
		$(".click").click(function() {
			$(".tip").fadeIn(200);
		});

		$(".tiptop a").click(function() {
			$(".tip").fadeOut(200);
		});

		$(".sure").click(function() {
			$(".tip").fadeOut(100);
		});

		$(".cancel").click(function() {
			$(".tip").fadeOut(100);
		});

	});
</script>
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="admin/index.jsp">首页</a></li>
			<li><a>物品库存管理</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
				<li class="">
				<a href="admin/stockadd.jsp">
				<span><img src="admin/images/t01.png" /></span>添加</a>
				</li>
			</ul>


			<ul class="toolbar1">
			</ul>

		</div>

		<table class="tablelist">
			<thead>
				<tr>
					<th><input name="" type="checkbox" value="" checked="checked" /></th>
					<th>编号<i class="sort"><img src="admin/images/px.gif" /></i></th>
					<th>物品名称</th>
					<th>物品数量</th>
					<th>物品价格</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
			<s:iterator value="goods" var="good">
				<tr>
					<td><input name="" type="checkbox" value="" /></td>
					<td><s:property value="goods_id"/></td>
					<td><s:property value="goods_name"/></td>
					<td><s:property value="storage"/></td>
					<td><s:property value="price"/></td>
					<td><a style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px;"  href="stock/findByIdGoods.action?id=<s:property value="goods_id"/>">查看</a> 
					<a style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px;" class="tablelink" style="cursor:pointer;" onclick="javascript:return confirm('确认删除吗？');" href="stock/deleteGoods.action?id=<s:property value="goods_id"/>"> 删除</a></td>
				</tr>
			</s:iterator>
			</tbody>
		</table>



		<div class="tip">
			<div class="tiptop">
				<span>查看信息</span><a></a>
			</div>

			<div class="tipinfo">
				<span><img src="admin/images/ticon.png" /></span>
				<div class="tipright">
					<p>是否确认对信息的修改 ？</p>
					<cite>如果是请点击确定按钮 ，否则请点取消。</cite>
				</div>
			</div>

			<div class="tipbtn">
				<input name="" type="button" class="sure" value="确定" />&nbsp; <input
					name="" type="button" class="cancel" value="取消" />
			</div>
		</div>
	</div>

	<script type="text/javascript">
		$('.tablelist tbody tr:odd').addClass('odd');
	</script>
    
</body>
</html>
