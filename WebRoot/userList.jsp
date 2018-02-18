<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/user.js"></script>
  </head>
  
  <body>
    <table>
    	<tr>
    		<td>编号：</td>
    		<td>姓名：</td>
    		<td>密码：</td>
    		<td>电话：</td>
    		<td>操作</td>
    	</tr>
    <s:iterator value="users">
    	<tr>
    		<td><s:property value="uid"/></td>
    		<td><s:property value="uname"/></td>
    		<td><s:property value="upass"/></td>
    		<td><s:property value="tel"/></td>
    		<td>
    			<a href="delete.action?id=<s:property value="uid"/>">删除</a>
    			<a class="update">修改</a>
    		</td>
    	</tr>
    </s:iterator>
    </table>

<div id="update">
	<div align="right" style="background-color: #cdcdcd;">
		<span id="close" style="cursor:pointer">关闭</span>
		<div id="updateuser" align="center"></div>
	</div>
</div>

  </body>
</html>
