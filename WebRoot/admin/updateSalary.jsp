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
			<li><a>修改薪资</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>更新薪资信息</span>
		</div>
      <form action="updateSalary.action" method="post">
		<ul class="forminfo">
		<table>
			<s:iterator value="salary">	
		<li><label>员工姓名</label>	
		<s:iterator value="au" var="adminname">	
			<input name="salary.admin_id" type="hidden" readonly value='<s:property value="admin_id"/>' /><s:property value="#adminname.username"/>
		</s:iterator>
		</li>
		<li><label>工&nbsp;&nbsp;资</label>	
		<input name="salary.salary" type="text" class="dfinput"  value='<s:property value='salary'/>'/></li>
		<%-- <li><label>发放时间</label>
		<input name="salary.grant_time" type="text" class="dfinput"  value='<s:property value='grant_time'/>'/></li> --%>
		<li><label>发放状态</label>
		<cite>
		<s:if test="status==0">
			<input name="salary.status" type="radio" checked value='0' />已发放
			<input name="salary.status" type="radio" value='1' />未发放
		</s:if>
		</cite>
		<cite>
		<s:else >
			<input name="salary.status" type="radio" value='0' />已发放
			<input name="salary.status" type="radio" checked value='1' />未发放
		</s:else>
		</cite>
		</li>
				</s:iterator>
				<br>
				<li><input type="submit"
				class="btn" value="确认保存" /></li>
				
		</ul>
		</table>
      </form>

	</div>
</body>
</html>
