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

<title>My JSP 'tab].jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="admin/css/select.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="admin/js/jquery.js"></script>
<script type="text/javascript" src="admin/js/jquery.idTabs.min.js"></script>
<script type="text/javascript" src="admin/js/select-ui.min.js"></script>
<!-- <script type="text/javascript" src="admin/editor/kindeditor.js"></script> -->
<script type="text/javascript" src="admin/editor/kindeditor-min.js"></script>

<link rel="stylesheet" type="text/css" href="../PM/themes/default/default.css" />
<script charset="utf-8" src="../PM/lang/zh_CN.js"></script> 

<script type="text/javascript">
	$(document).ready(function(e) {
		$(".select1").uedSelect({
			width : 345
		});
		$(".select2").uedSelect({
			width : 167
		});
		$(".select3").uedSelect({
			width : 100
		});
	});
</script>
</head>

<body>
	<div class="place">
		<span>位置：</span>
		<ul class="placeul">
			<li><a href="findPageList.action">新闻管理</a></li>
			<li><a>发布新闻</a></li>
		</ul>
	</div>

	<div class="formbody">


		<div id="usual1" class="usual">

			<div class="itab">
				<ul>
					<li><a href="#tab1" class="selected">发布通知</a></li>
				</ul>
			</div>

			<div id="tab1" class="tabson">

				<div class="formtext">
					
				</div>
				<script>
					var editor;
					KindEditor.ready(function(K) {
						editor = K.create('textarea[name="news.content"]', {
							allowFileManager : true
						});
						K('input[name=getHtml]').click(function(e) {
							alert(editor.html());
						});
						K('input[name=isEmpty]').click(function(e) {
							alert(editor.isEmpty());
						});
						K('input[name=getText]').click(function(e) {
							alert(editor.text());
						});
						K('input[name=selectedHtml]').click(function(e) {
							alert(editor.selectedHtml());
						});
						K('input[name=setHtml]').click(function(e) {
							editor.html('<h3>Hello KindEditor</h3>');
						});
						K('input[name=setText]').click(function(e) {
							editor.text('<h3>Hello KindEditor</h3>');
						});
						K('input[name=insertHtml]').click(function(e) {
							editor.insertHtml('<strong>插入HTML</strong>');
						});
						K('input[name=appendHtml]').click(function(e) {
							editor.appendHtml('<strong>添加HTML</strong>');
						});
						K('input[name=clear]').click(function(e) {
							editor.html('');
						});
					});
				</script>
				<ul class="forminfo">
				<form action="saveNews.action" method="post">
					<li><label>新闻内容<b>*</b></label>
					<textarea id="content7" name="news.content" style="width:700px;height:400px;visibility:hidden;"></textarea>
					</li>
					
					<li><label>新闻标题<b>*</b></label>
					<input name="news.title" type="text" class="dfinput" placeholder="请输入新闻标题" value="" style="width:300px;" /></li>
					<li><label>状态<b>*</b></label><cite>
						<input type="radio" name="news.is_show" value="0" checked/>显示
						<input type="radio" name="news.is_show" value="1"/>隐藏
					</cite></li>
					
					<li><label>&nbsp;</label><input type="submit" class="btn" value="马上发布" /></li>
				</form>
				</ul>

			</div>

		</div>

		<script type="text/javascript">
			$("#usual1 ul").idTabs();
		</script>

		<script type="text/javascript">
			$('.tablelist tbody tr:odd').addClass('odd');
		</script>
	</div>
</body>
</html>
