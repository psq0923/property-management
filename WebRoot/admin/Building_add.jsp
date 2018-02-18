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

<title>My JSP 'Building_add.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/Building_add.js"></script>
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="findBuildingPageList.action">楼栋管理</a></li>
			<li><a >添加楼栋</a></li>
		</ul>
	</div>

	<div class="formbody">

		<div class="formtitle">
			<span>添加楼栋</span>
		</div> 
		<form action="registerBuilding.action" method="post">
			<ul class="forminfo">
				<!-- <li><label>楼房id</label><input type="hidden" name="building.building_id"
				 class="dfinput" />  <i>多个关键字用,隔开</i></li> -->
					
				<li><label>楼栋名</label><input type="text" name="building.building_name"
					class="dfinput" id="building_name"  /><span id="lay_name"></span> </li>
				 
				 <li><label>楼层号</label>
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
					
				<li><label>当前状态</label>
				<cite>
					<input type="radio" name="building.status" checked value="0"/>有效
					<input type="radio" name="building.status" value="1"/>无效
				</cite>
				</li>

				<li><label>&nbsp;</label> <input type="submit" class="btn"
					value="提交"></li>
			</ul>
		</form>

	</div>
</body>
</html>
