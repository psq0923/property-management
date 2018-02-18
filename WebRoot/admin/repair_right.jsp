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
<%-- <script type="text/javascript" src="admin/js/repair_right.js"></script> --%>
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
			<li><a>用户报修</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
			</ul>


			<ul class="toolbar1">
			</ul>

		</div>

        <form action="repairupdate.action" method="post">
		<table class="tablelist">
			<thead>
				<tr>
					<th><input name="" type="checkbox" value="" checked="checked" /></th>
					<th>编号<i class="sort"><img src="admin/images/px.gif" /></i></th>
					<th>报修人ID</th>
					<th>报修人姓名</th>
					<th>手机号码</th>
					<th>楼号</th>
					<th>层号</th>
					<th>门牌号</th>
					<th>报修物品</th>
					<th>报修时间</th>
					<th>描述</th>
					<th>报修状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<s:iterator value="showrepairs" var="shrep">
			<tbody>
				<tr>
					<td><input name="" type="checkbox" value="" /></td>
					<td><s:property value="#shrep.id"/></td>
					<td><s:property value="#shrep.user_id"/></td>
					<td><s:property value="#shrep.username"/></td>
					<td><s:property value="#shrep.mobile"/></td>
					<td><s:property value="#shrep.building_id"/></td>
					<td><s:property value="#shrep.floor_num"/></td>
					<td><s:property value="#shrep.room_num"/></td>
					<td><s:property value="#shrep.goods_name"/></td>
					<td><s:property value="#shrep.repair_time"/></td>
					<td><s:property value="#shrep.remark"/></td>
					<s:if test="#shrep.status==0">
						<td>已修</td>
					</s:if>
					<s:else>
						<td>未修</td>
					</s:else>
					<td>
					<a style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px;" href="xianshi.action?id=<s:property value="id"/>">处理</a>
					<!-- <cite><input name="repair.status" type="radio"
					value="0" />已修&nbsp;&nbsp;&nbsp;&nbsp;<input
					name="repair.status" type="radio" value="1" checked />未修</cite> -->&nbsp;&nbsp;&nbsp;&nbsp; 
					<!-- <a href="">计算费用</a> -->
					</td> 
				</tr>
					
			</tbody>
			 </s:iterator>
		</table>
		</form>

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
