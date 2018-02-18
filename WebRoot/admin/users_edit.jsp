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
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="admin/findUsersPageList.action">住户管理</a></li>
			<li><a>基本信息</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>基本信息</span>
		</div>
		<form action="admin/updateUsers.action" method="post">
		<ul class="forminfo">
			<li><label>编号</label>
			<input name="user.user_id" style="border:none" type="text" readonly class="dfinput" value='<s:property value="user.user_id"/>' /></li>
			<li><label>用户名</label>
				<input name="user.username" type="text" class="dfinput" value='<s:property value="user.username"/>' /></li>
			<li><label>密码</label>
				<input name="user.password" type="text" class="dfinput" value='<s:property value="user.password"/>' /></li>
			<li><label>手机号</label>
				<input name="user.mobile" type="text" class="dfinput" value='<s:property value="user.mobile"/>' /></li>
			<li><label>楼栋号</label>
				<input name="user.building_id" type="text" class="dfinput" value='<s:property value="user.building_id"/>' /></li>
			<li><label>楼层号</label>
				<input name="user.floor_num" type="text" class="dfinput" value='<s:property value="user.floor_num"/>' /></li>
			<li><label>房间号</label>
				<input name="user.room_num" type="text" class="dfinput" value='<s:property value="user.room_num"/>' /></li>
			<li>
				<label>是否有效</label>
				<cite>
					<s:if test="user.status==0">
						<input name="user.status" type="radio" value="0" checked />是&nbsp;&nbsp;&nbsp;&nbsp;
						<input name="user.status" type="radio" value="1" />否
					</s:if>
					<s:else>
						<input name="user.status" type="radio" value="0" />是&nbsp;&nbsp;&nbsp;&nbsp;
						<input name="user.status" type="radio" value="1" checked />否
					</s:else>
				</cite>
			</li>
			<li>
				<label>&nbsp;</label>
				<input type="submit" class="btn" value="确认保存" />
			</li>
		</ul>
		</form>

	</div>
</body>
</html>
