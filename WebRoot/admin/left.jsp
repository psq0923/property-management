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

<title>My JSP 'top.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="admin/js/jquery.js"></script>

<script type="text/javascript">
	$(function() {
		//导航切换
		$(".menuson li").click(function() {
			$(".menuson li.active").removeClass("active")
			$(this).addClass("active");
		});

		$('.title').click(function() {
			var $ul = $(this).next('ul');
			$('dd').find('ul').slideUp();
			if ($ul.is(':visible')) {
				$(this).next('ul').slideUp();
			} else {
				$(this).next('ul').slideDown();
			}
		});
	});
</script>
</head>

<body style="background:#f0f9fd;">
	<div class="lefttop">
		<span></span>菜单
	</div>

	<dl class="leftmenu">

		<dd>
			<div class="title">
				<span><img src="admin/images/leftico04.png" /></span>系统管理
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="admin/findUsersPageList.action" target="rightFrame">住户管理</a><i></i></li>
				<li><cite></cite><a href="findAdminPageList.action" target="rightFrame">角色管理</a><i></i></li>
				
					<%-- <s:iterator value="#session.access_id" var="acc_id">
					<s:if test="#acc_id.access_id==1"> --%>
						<li><cite></cite><a href="findAccessPageList.action" target="rightFrame">权限管理</a><i></i></li>
					<%-- </s:if> --%>
					<%-- <s:elseif test="#acc_id.access_id==2">
						<li><cite></cite><a href="findAccessPageList.action" target="rightFrame"><s:property value="#acc_list.access_id"/>权限管理</a><i></i></li>
					</s:elseif>
					<s:elseif test="#acc_id.access_id==10">
						<li><cite></cite><a href="findAccessPageList.action" target="rightFrame"><s:property value="#acc_list.access_id"/>权限管理</a><i></i></li>
					</s:elseif> --%>
					<%-- </s:iterator> --%>
				<li><cite></cite><a href="findPageList.action" target="rightFrame">前台设置</a><i></i></li>
				<li><cite></cite><a href="admin/menu_setting.jsp" target="rightFrame">菜单模块</a><i></i></li>
			</ul>

		</dd>
		
		<%-- <dd>
			<div class="title">
				<span><img src="admin/images/leftico01.png" /></span>系统管理
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="admin/index.jsp" target="rightFrame">首页模版</a><i></i></li>
				<li class="active"><cite></cite><a href="admin/right.jsp"
					target="rightFrame">数据列表</a><i></i></li>
				<li><cite></cite><a href="admin/imgtable.jsp" target="rightFrame">图片数据表</a><i></i></li>
				<li><cite></cite><a href="admin/form.jsp" target="rightFrame">添加编辑</a><i></i></li>
				<li><cite></cite><a href="admin/imglist.jsp" target="rightFrame">图片列表</a><i></i></li>
				<li><cite></cite><a href="admin/imglist1.jsp" target="rightFrame">自定义</a><i></i></li>
				<li><cite></cite><a href="admin/tools.jsp" target="rightFrame">常用工具</a><i></i></li>
				<li><cite></cite><a href="admin/filelist.jsp" target="rightFrame">信息管理</a><i></i></li>
				<li><cite></cite><a href="admin/tab.jsp" target="rightFrame">Tab页</a><i></i></li>
				<li><cite></cite><a href="admin/error.jsp" target="rightFrame">404页面</a><i></i></li>
			</ul>
		</dd> --%>

		<dd>
			<div class="title">
				<span><img src="admin/images/leftico02.png" /></span>员工管理
			</div>
			<ul class="menuson">
				<li><cite></cite>
				<a href="findSalaryPageList.action" target="rightFrame">薪资管理</a><i></i>
				</li>
			</ul>
		</dd>


		<dd>
			<div class="title">
				<span><img src="admin/images/leftico03.png" /></span>基础管理
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="findBuildingPageList.action" target="rightFrame">楼栋管理</a><i></i></li>
			</ul>
		</dd>


		<dd>
			<div class="title">
				<span><img src="admin/images/leftico04.png" /></span>物业费用管理
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="findServerTypePageList.action"
					target="rightFrame">物业费用管理</a><i></i></li>
			</ul>

		</dd>
		<dd>
			<div class="title">
				<span><img src="admin/images/leftico04.png" /></span>物品管理
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="stock/findAllUpkeep.action" target="rightFrame">物品维护管理</a><i></i></li>
				<li><cite></cite><a href="stock/findAllGoods.action" target="rightFrame">物品库存管理</a><i></i></li>
				<li><cite></cite><a href="stock/findAllGoodsgouwu.action" target="rightFrame">购物单管理</a><i></i></li>
			</ul>

		</dd>
		<dd>
			<div class="title">
				<span><img src="admin/images/leftico04.png" /></span>用户报修
			</div>
			<ul class="menuson">
				<li><cite></cite><a href="findAllShowRepair.action" target="rightFrame">报修信息</a><i></i></li>
				<li><cite></cite><a href="findAllDetail.action" target="rightFrame">维修费单据</a><i></i></li>
			</ul>

		</dd>

	</dl>
</body>
</html>
