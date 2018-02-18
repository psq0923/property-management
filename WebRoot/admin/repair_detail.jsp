<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
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
<script type="text/javascript" src="admin/js/repairupdate.js"></script>
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
			<li><a>维修费单据</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
			</ul>


			<ul class="toolbar1">
			</ul>

		</div>

		
		<table class="tablelist">
			<thead>
				<tr>
					<th><input name="" type="checkbox" value="" checked="checked" /></th>
					<th>编号</th>
					<th>ID<i class="sort"><img src="admin/images/px.gif" /></i></th>
					<th>服务类型</th>
					<th>物品</th>
					<th>使用数量</th>
					<th>费用</th>
					<!-- <th>操作</th> -->
				</tr>
			</thead>
			<%int i=0; %>
			<tbody>
			<s:iterator value="details" var="det">
				<tr>
					<td><input name="" type="checkbox" value="" /></td>
					<td><%=i++ %></td>
					<td><s:property value="#det.id"/></td>
					<td>
					<s:iterator value="server_ts" var="sts">
						<s:if test="#sts.server_id==#det.server_id">
							<s:property value="#sts.ser_type"/>
						</s:if>
					</s:iterator>
					</td>
					<td>
					<s:iterator value="goodss" var="gds">
					
					 <s:if test="#gds.goods_id==#det.goods_id">
						<s:property value="#gds.goods_name"/>
					</s:if>
					</s:iterator> 
					</td>
					<td>
						<s:property value="#det.number"/>
					</td>
					<td>
						<s:iterator value="server_ts" var="sts">
							<s:if test="#sts.server_id==#det.server_id">
								<s:property value="#sts.charge_sta"/>
							</s:if>
					 	</s:iterator>
					</td>
					
					<!-- 
					<td>
					<a class="update" >处理</a></td> -->
				</tr>
				</s:iterator>
			</tbody>
			 
		</table>

        <div class="tip">
			<div class="tiptop">
				<span>提示信息</span><a></a>
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
