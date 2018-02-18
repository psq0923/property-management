<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>新闻页</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<meta name="description" content="">
<meta name="author" content="">

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">


<link rel="stylesheet" href="css/zerogrid.css">
<link rel="stylesheet" href="css/style5.css">
<link rel="stylesheet" href="css/responsiveslides.css" />
<link rel="stylesheet" href="css/responsive.css">


<link href='./images/favicon.ico' rel='icon' type='image/x-icon' />

<script src="js/jquery.min.js"></script>
<script src="js/responsiveslides.js"></script>
<script>
	$(function() {
		$("#slider").responsiveSlides({
			auto : true,
			pager : true,
			nav : true,
			speed : 500,
			maxwidth : 960,
			namespace : "centered-btns"
		});
	});
</script>

<style type="text/css">
body {
	margin: 0px;
	padding: 0px;
	width: 800px;
	margin: 30px auto;
}

.newslist h2 {
	text-align: center;
}

.newsinfo {
	text-align: center;
}

.newscontent {
	text-indent: 2em;
}

.newscontent  a {
	display: block;
	float: right;
}
</style>

</head>

<body>





	<section id="content">
	<div class="zerogrid">
		<div class="row block">

			<div class="featured col16">
				<div class="rslides_container">
					<ul class="rslides" id="slider">
						<li><img src="images/91.jpg" /></li>
						<li><img src="images/92.jpg" /></li>
						<li><img src="images/93.jpg" /></li>
						<li><img src="images/94.jpg" /></li>
					</ul>
				</div>
			</div>
			<div class="sidebar col05">
				<section>
				<div class="heading">温馨提示</div>
				<div>
					居民朋友们：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;春节就要到了，为了社区居民们的安全，居委会、物业给大家提出倡议书。

				</div>
				</section>
				<section>
				<div class="heading">倡议书</div>
				<div class="content">
					依法燃放是你的权利<br> 文明燃放是您的义务<br> 为了您和他人的生命和财产安全<br>
					请勿燃放烟花爆竹<br>
				</div>
				</section>


				<section>
				<div class="heading">生活社区“美食争霸赛”完美落幕</div>
				<div class="content">
					<section>

					<h4>由于首次私房菜的成功举办，应物业公司强烈要求，举办了“私房菜”活动</h4>
					<p>第一届“美食争霸赛”拉开帷幕，社区委员会与物业管理负责人以及小区业主们担任现场评委，通过线上线下公平投票，统计票数后，颁发一二三等奖。</p>
					</section>

				</div>
				</section>
			</div>

			<div class="main-content col11">


				<div class="content">

					<s:iterator value="#request.newslist">
						<div class="newslist">
							<h2>${title}</h2>
							<p class="newsinfo">${author}${publish_time}</p>
							<p class="newscontent">${content}</p>
							<hr>
						</div>
					</s:iterator>
				</div>



			</div>

		</div>
	</div>
	</section>




</body>
</html>