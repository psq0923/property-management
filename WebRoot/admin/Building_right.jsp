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
<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/user_upd.js"></script>

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
			<li><a>楼栋管理</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
				<li class="click"><a href="admin/Building_add.jsp"> <span><img
							src="admin/images/t01.png" /></span>添加
				</a></li>
			</ul>

			<ul class="toolbar1">
			</ul>

		</div>


		<table class="tablelist">
			<thead>
				<tr>
					<th><input name="" type="checkbox" value="" checked="checked" /></th>
					<!-- <th>编号<i class="sort"><img src="admin/images/px.gif" /></i></th> -->
					<th>编号</th>
					<th>楼栋ID</th>
					<th>楼栋名</th>
					<th>楼层号</th>
					<th>是否有效</th>
					<th>操作</th>
				</tr>
			</thead>

			<%
				int i = 1;
				int pageSize = (Integer) session.getAttribute("pageSize");
				int currentPage = (Integer) session.getAttribute("currentPage");
				i = pageSize * (currentPage - 1) + i;
			%>
			<tbody>
				<s:iterator value="#session.building_list" var="buil_list" >
					<tr>
						<td><input name="" type="checkbox" value="" /></td>
						<td><%=i++%></td>
						<td><s:property value="#buil_list.building_id" /></td>
						<td><s:property value="#buil_list.building_name" /></td>
						<td><s:property value="#buil_list.room_num" /></td>
						<s:if test="#buil_list.status==0">
							<td>有效</td>
						</s:if>
						<s:else>
							<td>无效</td>
						</s:else>


						<td>


							<li class="click"><a
								style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px;"
								href="findByIdBuilding.action?id=<s:property value="#buil_list.building_id"/>">修改</a>
								<a
								style="border-radius:23px;width:115px; height:35px; font-size:14px; font-weight:bold; border-radius: 3px;"
								class="tablelink" style="cursor:pointer;"
								onclick="javascript:return confirm('确认删除吗？');"
								href="deleteBuilding.action?id=<s:property value="#buil_list.building_id"/>">删除</a>
						</li>
						</td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
	</div>

	<div class="pagin">
		<table>
			<tr>
				<td width="13%" class="tocenter">共 <i class="blue"><s:property
							value="pageBean.totalPage" /></i> 页
				</td>
				<td width="17%" class="tocenter">共 <i class="blue"><s:property
							value="pageBean.allRow" /></i> 条记录
				</td>
				<td width="15%" class="tocenter">当前第 <i class="blue"><s:property
							value="pageBean.currentPage" /></i> 页
				</td>
				<td colspan="4" width="55%" class="tocenter"><s:if
						test="%{pageBean.currentPage == 1}">&nbsp;&nbsp;&nbsp;&nbsp;第一页&nbsp;&nbsp;&nbsp;&nbsp;上一页&nbsp;&nbsp;&nbsp;&nbsp;</s:if>
					<s:else>
						<a href="findBuildingPageList.action?page=1">&nbsp;&nbsp;&nbsp;&nbsp;第一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a
							href="findBuildingPageList.action?page=<s:property value="%{pageBean.currentPage-1}"/>">上一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</s:else> <s:if test="%{pageBean.currentPage != pageBean.totalPage}">
						<a
							href="findBuildingPageList.action?page=<s:property value="%{pageBean.currentPage+1}"/>">下一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a
							href="findBuildingPageList.action?page=<s:property value="pageBean.totalPage"/>">最后一页</a>
					</s:if> <s:else>下一页&nbsp;&nbsp;&nbsp;&nbsp; 最后一页</s:else></td>
			</tr>
		</table>
	</div>


	<!--  <div class="tip">
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
		
-->
	<script type="text/javascript">
		$('.tablelist tbody tr:odd').addClass('odd');
	</script>
</body>
</html>
