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
			<li><a href="#">首页</a></li>
			<li><a href="#">表单</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>添加员工</span>
		</div>

		<form action="saveAccess.action" method="post">
		<ul class="forminfo">
			<li><label>权限名称</label>
				<input name="au.username" type="text" class="dfinput" /><i>标题不能超过30个字符</i></li>
			<li><label>密码</label>
				<input name="au.password" type="text" class="dfinput" /><i>多个关键字用,隔开</i></li>
			<li><label>邮箱</label>
				<input name="au.email" type="text" class="dfinput" /><i>多个关键字用,隔开</i></li>
			<li><label>角色</label>
				<select class="dfinput" name="au.access_id">
					<s:iterator value="aas" var="aac">
						<option value='<s:property value="access_id"/>'><s:property value="access_name"/></option>
					</s:iterator>
				</select>
			</li>
			<li><label>是否有效</label><cite>
			<input name="au.status" type="radio" value="0" checked="checked" />是&nbsp;&nbsp;&nbsp;&nbsp;
			<input name="au.status" type="radio" value="1" />否</cite></li>
			<li><label>&nbsp;</label>
			<input name="" type="submit" class="btn" value="确认保存" /></li>
		</ul>
		</form>

	</div>
</body>
</html>
