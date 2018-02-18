<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
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
			<li><a href="#">维修信息</a></li>
			<li><a href="#">查看</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>基本信息</span>
		</div>
		<form action="repairupdate.action" method="post">

			<ul class="forminfo">

				<li><label>ID</label><input name="repair.id" type="text"
					class="dfinput" value="<s:property value="repair.id"/>" /></li>
				<li><label>报修人</label><input name="repair.user_id" type="text"
					class="dfinput" value="<s:property value="repair.user_id"/>" /></li>
				<li><label>报修物品</label><input name="repair.goods_id"
					type="text" class="dfinput"
					value="<s:property value="repair.goods_id"/>" /></li>
				<li><label>报修时间</label><input name="repair.repair_time"
					type="text" class="dfinput"
					value="<s:property value="repair.repair_time"/>" /></li>
				<li><label>报修描述</label><input name="repair.remark" type="text"
					class="dfinput" value="<s:property value="repair.remark"/>" /></li>
				<%-- <li><label>报修状态</label><input name="repair.status" type="text" class="dfinput"  value="<s:property value="repair.status"/>"/></li> --%>
				<li><label>报修状态</label> <cite> <s:if test="repair.status==0">
							<input name="repair.status" type="radio" value="0" checked />已修&nbsp;&nbsp;&nbsp;&nbsp;<input
								name="repair.status" type="radio" value="1" />未修</cite> </s:if> <s:else>
						<input name="repair.status" type="radio" value="0" />已修&nbsp;&nbsp;&nbsp;&nbsp;<input
							name="repair.status" type="radio" value="1" checked />未修</cite>
					</s:else></li>
				<li><label>&nbsp;</label><input type="submit" class="btn"
					value="保存" />
			</ul>


		</form>
	</div>
	<%-- <form action="repairupdate.action" method="post">
	<label>ID</label><input name="repair.id" type="text" class="dfinput"  value="<s:property value="repair.id"/>"/><br>
	<label>报修人</label><input name="repair.user_id" type="text" class="dfinput"  value="<s:property value="repair.user_id"/>"/><br>
    <label>报修物品</label><input name="repair.goods_id" type="text" class="dfinput"  value="<s:property value="repair.goods_id"/>"/><br>
	<label>报修时间</label><input name="repair.repair_time" type="text" class="dfinput"  value="<s:property value="repair.repair_time"/>"/><br>
	<label>报修描述</label><input name="repair.remark" type="text" class="dfinput"  value="<s:property value="repair.remark"/>"/><br>
	<label>报修状态</label><input name="repair.status" type="text" class="dfinput"  value="<s:property value="repair.status"/>"/><br>
	<label>&nbsp;</label><input type="submit" class="btn" value="保存" />  --%>
</body>
</html>
