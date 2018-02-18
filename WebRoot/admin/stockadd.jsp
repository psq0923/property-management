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

<title>物品添加</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
 <script type="text/javascript" src="lihelinjs/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="lihelinjs/Building_add.js"></script>
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="stock/findAllGoods.action">物品库存管理</a></li>
			<li><a>添加库存</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>添加库存</span>
		</div>
		<form action="stock/saveGoods.action" method="post">
			<ul class="forminfo">
				<li ><label>编号</label> <input type="text" style="background-color:#cfcfcf" name="good.goods_name"
					class="dfinput"  value="系统给予" disabled/> </li>
				<li><label>物品名称</label><input type="text" name="good.goods_name"
					class="dfinput" /><span id="lay_name"></span> </li>
				<li><label>物品库存量</label><input type="text" name="good.storage"
					class="dfinput" /><span id="lay_name"></span> </li>
				<li><label>物品价格</label><input type="text" name="good.price" 
					class="dfinput" /><span id="lay_name"></span> </li>
				<li><label>&nbsp;</label> <input type="submit" class="btn"
					value="提交"></li>
			</ul>
		</form>


	</div>
</body>
</html>
