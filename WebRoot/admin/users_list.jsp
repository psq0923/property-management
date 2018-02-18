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
<%-- <script type="text/javascript" src="admin/js/jquery.js"></script> --%>
<script type="text/javascript" src="admin/js/jquery-2.1.3.min.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		$(".click").click(function() {
			$(".tip").fadeIn(200);
			/* function getUserid(){
				var user_id = document.getElementById("user_id").innerText;
				$("#delete_id").href="www.baidu.com?userid="+user_id;
				alert($("#delete_id").href);
			}*/
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
			<li><a>住户管理</a></li>
		</ul>
	</div>

	<div class="rightinfo">

		<div class="tools">

			<ul class="toolbar">
			</ul>


			<ul class="toolbar1">
				<%-- <li><span><img src="admin/images/t05.png" /></span>设置</li> --%>
			</ul>

		</div>
		<form action="admin/findUsersByName.action" method="post" style="text-align:center;">
			请输入用户名&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="user.username" class="dfinput" value="" style="width: 265px;"/>
			<input type="submit" class="btn" value="搜索" style="width: 68px;border-radius: 3px;"/><br /><br />
		</form>
		<!-- <input type="button" value="全选" class="btn" id="selectAll" style="width: 43px;font-size: 11px;border-radius: 3px;">  
		<input type="button" value="全不选" class="btn" id="unSelect" style="width: 43px;font-size: 11px;border-radius: 3px;">  
		<input type="button" value="获得选中的所有值" class="btn" id="getValue" style="width: 43px;font-size: 11px;border-radius: 3px;">		
 -->

		<table class="tablelist">
			<thead>
				<tr>
					<th>编号</th>
					<th>ID<i class="sort"><img src="admin/images/px.gif" /></i></th>
					<th>住户名</th>
					<th>密码</th>
					<th>手机</th>
					<th>单元号</th>
					<th>是否有效</th>
					<th>操作</th>
				</tr>
			</thead>
				<% 
					int i=1;
					int pageSize = (Integer)session.getAttribute("pageSize");
					int currentPage = (Integer)session.getAttribute("currentPage");
					i = pageSize*(currentPage-1)+i;
				%>
			<tbody>
				<s:iterator value="#session.users_list" var="user">
				<tr id="list">
					<td><%=i++ %></td>
					<td id="user_id"><s:property value="#user.user_id"/></td>
					<td><s:property value="#user.username"/></td>
					<td><s:property value="#user.password"/></td>
					<td><s:property value="#user.mobile"/></td>
					<td>第<s:property value="#user.building_id"/>单元    |    <s:property value="floor_num"/>层    |    <s:property value="room_num"/>住户</td>
					<s:if test="#user.status==0">
						<td>有效</td>
					</s:if>
					<s:else>
						<td>无效</td>
					</s:else>
					<td><a href="admin/findById.action?id=<s:property value="user_id"/>" class="tablelink">查看</a> 
					<a href="admin/deleteUser.action?id=<s:property value="user_id"/>" class="tablelink" style="cursor:pointer;" onclick="javascript:return confirm('确认删除吗？');"> 删除</a></td>
				</tr>
				</s:iterator>
			</tbody>
		</table>
		<script>
			$(function () {
				//全选或全不选
				$("#all").click(function(){   
					if(this.checked){   
						$("#list :checkbox").prop("checked", true);  
					}else{   
					$("#list :checkbox").prop("checked", false);
					}   
				}); 
				//全选  
				$("#selectAll").click(function () {
					 $("#list :checkbox,#all").prop("checked", true);  
				});  
				//全不选
				$("#unSelect").click(function () {  
					 $("#list :checkbox,#all").prop("checked", false);  
				});  
				//反选 
				$("#reverse").click(function () { 
					 $("#list :checkbox").each(function () {  
						  $(this).prop("checked", !$(this).prop("checked"));  
					 });
					 allchk();
				});
				
				//设置全选复选框
				$("#list :checkbox").click(function(){
					allchk();
				});
			 
				//获取选中选项的值
				$("#getValue").click(function(){
					var valArr = new Array;
					var chk = 0;
					$("#list :checkbox").each(function(){ 
						if($(this).prop("checked")==true){
							valArr[chk] = $(this).val();
							chk++;
						}
					});
					var vals = valArr.join(',');
					alert(vals);
				});
			}); 
			function allchk(){
				var chknum = $("#list :checkbox").size();//选项总个数
				var chk = 0;
				$("#list :checkbox").each(function () {  
					if($(this).prop("checked")==true){
						chk++;
					}
				});
				if(chknum==chk){//全选
					$("#all").prop("checked",true);
				}else{//不全选
					$("#all").prop("checked",false);
				}
			}
		</script>

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
						<a href="admin/findUsersPageList.action?page=1">&nbsp;&nbsp;&nbsp;&nbsp;第一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a href="admin/findUsersPageList.action?page=<s:property value="%{pageBean.currentPage-1}"/>">上一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
					</s:else>
					<s:if test="%{pageBean.currentPage != pageBean.totalPage}">
						<a href="admin/findUsersPageList.action?page=<s:property value="%{pageBean.currentPage+1}"/>">下一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
						<a href="admin/findUsersPageList.action?page=<s:property value="pageBean.totalPage"/>">最后一页</a>
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
				<a href="javascript:void(0);" id="delete_id" onclick="getUserid();">
				<input name="" type="button" class="sure" value="确定" />&nbsp;</a>
				<input name="" type="button" class="cancel" value="取消" />
			</div>

		</div>

	</div>

	<script type="text/javascript">
		$('.tablelist tbody tr:odd').addClass('odd');
	</script>
</body>
</html>
