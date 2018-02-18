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
<script type="text/javascript" src="admin/js/jquery.js"></script>
<script language="javascript">
	$(function() {
		//导航切换
		$(".imglist li").click(function() {
			$(".imglist li.selected").removeClass("selected")
			$(this).addClass("selected");
		})
	})
</script>
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="admin/index.jsp">首页</a></li>
			<li><a>权限管理</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
			</ul>


			<ul class="toolbar1">
			</ul>

		</div>

		<form action="saveAccess.action" method="post" style="text-align:center;">
			<input type="text" name="aac.access_name" class="dfinput" placeholder="请输入权限名称" style="width: 265px;"/>
			<input type="submit" class="btn" value="添加" style="width: 68px;border-radius: 3px;"/><br /><br />
		</form>

		<ul class="classlist">
		<s:iterator value="#session.access_list" var="access">
			<li><span><img src="admin/images/priva.png" /></span>
				<div class="lright" style="margin-top: 23px;">
					<h2>权限名称</h2>
					<p>
					<input type="checkbox" name=""/>&nbsp;<p><s:property value="#access.access_name"/></p></p>
					 <a href='deleteAccess.action?id=<s:property value="#access.access_id"/>' class="enter">删除</a>
				</div>
			</li>
		</s:iterator>
		</ul>

		<div class="clear"></div>

		<div class="pagin">
		<table>
			<tr>
				<td width="13%" class="tocenter">
				                         共
					<i class="blue"><s:property value="pageBean.totalPage" /></i>
				                         页
				</td>
				<td width="17%" class="tocenter">
				                         共
					<i class="blue"><s:property value="pageBean.allRow" /></i>
				                         条记录
				</td>
				<td width="15%" class="tocenter">
				                         当前第
					<i class="blue"><s:property value="pageBean.currentPage" /></i>
				                        页
				</td>
				<td colspan="4" width="55%" class="tocenter">
					<s:if test="%{pageBean.currentPage == 1}">&nbsp;&nbsp;&nbsp;&nbsp;第一页&nbsp;&nbsp;&nbsp;&nbsp;上一页&nbsp;&nbsp;&nbsp;&nbsp;</s:if>
					<s:else>
						<a href="findAccessPageList.action?page=1">&nbsp;&nbsp;&nbsp;&nbsp;第一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a href="findAccessPageList.action?page=<s:property value="%{pageBean.currentPage-1}"/>">上一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</s:else>
					<s:if test="%{pageBean.currentPage != pageBean.totalPage}">
						<a href="findAccessPageList.action?page=<s:property value="%{pageBean.currentPage+1}"/>">下一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a href="findAccessPageList.action?page=<s:property value="pageBean.totalPage"/>">最后一页</a>
					</s:if>
					<s:else>下一页&nbsp;&nbsp;&nbsp;&nbsp; 最后一页</s:else>
				</td>
			</tr>
		</table>
		</div>


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
</body>
</html>
