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

<title>My JSP 'User_form_upd.jsp' starting page</title>

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
			<li><a href="findBuildingPageList.action">楼栋管理</a></li>
			<li><a >修改信息</a></li>
		</ul>
	</div>


	<div class="formbody">

	<div class="formtitle">
	<span>基本信息</span>
	</div>
	<form action="updateBuilding.action"  method="post">
			<ul class="forminfo">
			<li>
				<label>用户id</label> 
				<input type="text" name="building.building_id" 
				value="<s:property value="building.building_id"/>" class="dfinput" />
			 </li>
			
			<li>
			   <label>楼栋名</label> 
			   <input type="text" name="building.building_name"
			   value="<s:property value="building.building_name"/>" class="dfinput" />
					
		    <li>
			  <label>楼层号</label>
			  <select id="room_num"  name="building.room_num"
					class="dfinput" >
					<option >1</option>
					<option >2</option>
					<option >3</option>
					<option >4</option>
					<option >5</option>
					<option >6</option>
					<option >7</option>
					<option >8</option>
					<option >9</option>
					<option >10</option>
					</select>
					
			<li>
			<label>当前状态</label>
			   <cite>
			   <s:if test="building.status==0">
					<input type="radio" name="building.status" checked value="0"/>有效
					<input type="radio" name="building.status" value="1"/>无效
				</s:if>
				<s:else>
					<input type="radio" name="building.status" value="0"/>有效
					<input type="radio" name="building.status" checked value="1"/>无效
				</s:else>
				</cite>
				</li>

				<li><label>&nbsp;</label> 
				<input type="submit" class="btn" value="提交"></li>
			</ul>
		</form>

	</div>
</body>
</html>
