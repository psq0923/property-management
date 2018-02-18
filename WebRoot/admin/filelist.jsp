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
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="#">首页</a></li>
			<li><a href="computer.jsp">文件管理</a></li>
			<li><a href="#">列表</a></li>
		</ul>
	</div>


	<table class="filetable">

		<thead>
			<tr>
				<th width="25%">名称</th>
				<th width="11%">修改日期</th>
				<th width="10%">类型</th>
				<th width="6%">大小</th>
				<th width="48%"></th>
			</tr>
		</thead>

		<tbody>

			<tr>
				<td><img src="admin/images/f01.png" />Adobe Dreamweaver CS5简体中文绿色</td>
				<td>2013/10/14 17:38</td>
				<td>文件夹</td>
				<td class="tdlast">0 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f01.png" />Adobe Photoshop CS5</td>
				<td>2013/10/14 17:38</td>
				<td>文件夹</td>
				<td class="tdlast">30 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f01.png" />PS形状</td>
				<td>2013/10/14 17:38</td>
				<td>文件夹</td>
				<td class="tdlast">0 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f01.png" />Microsoft Office 2007中文版</td>
				<td>2013/10/14 17:38</td>
				<td>文件夹</td>
				<td class="tdlast">0 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f02.png" />SWiSHmax.rar</td>
				<td>2013/10/14 17:38</td>
				<td>压缩文件</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f02.png" />autodesk3dsmax.zip</td>
				<td>2013/10/14 17:38</td>
				<td>压缩文件</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f02.png" />Adobe Photoshop CS5.rar</td>
				<td>2013/10/14 17:38</td>
				<td>压缩文件</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f03.png" />Thunder7.2.7.3496.exe</td>
				<td>2013/10/14 17:38</td>
				<td>程序</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f03.png" />福昕阅读器_5.1.0.1117.exe</td>
				<td>2013/10/14 17:38</td>
				<td>程序</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f04.png" />libeay32.ai</td>
				<td>2013/10/14 17:38</td>
				<td>设计软件</td>
				<td class="tdlast">125 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f05.png" />php.ini.xls</td>
				<td>2013/10/14 17:38</td>
				<td>电子表格</td>
				<td class="tdlast">120 KB</td>
				<td></td>
			</tr>

			<tr>
				<td><img src="admin/images/f06.png" />pws-php5cgi.reg</td>
				<td>2013/10/14 17:38</td>
				<td>注册表</td>
				<td class="tdlast">100 KB</td>
				<td></td>
			</tr>

		</tbody>




	</table>
</body>
</html>
