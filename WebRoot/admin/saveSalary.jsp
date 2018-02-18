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
			<li><a href="findSalaryPageList.action">薪资管理</a></li>
			<li><a>设置薪资</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>添加薪资信息</span>
		</div>
      <form action="saveSalary.action" method="post">
		<ul class="forminfo">
			<li><label>员工姓名</label>
			<select class="dfinput" name="salary.admin_id">
				<s:iterator value="adminusers" var="name">
					<option value='<s:property value="#name.id"/>'><s:property value="#name.username"/></option>
				</s:iterator>
			</select>
			</li>
			<li><label>月&nbsp;&nbsp;薪</label><input name="salary.salary" type="text" class="dfinput" /></li>
			<!-- <li><label>发放时间</label>
			<input name="salary.grant_time" type="text" class="dfinput" /></li> -->
			<li><label>发放状态</label>
			<cite>
				<input name="salary.status" type="radio" value='0' />已发放
				<input name="salary.status" type="radio" checked value='1' />未发放
			</cite>
			</li>
			<li><br><input type="submit"
				class="btn" value="确认保存" /></li>
		</ul>
      </form>

	</div>
</body>
</html>
