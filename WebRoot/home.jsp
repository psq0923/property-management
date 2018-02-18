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
<title>Home</title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<script type="application/x-javascript">
	
	
	
	
	 addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } 




</script>
<!-- //for-mobile-apps -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css"
	media="all" />
<link href="css/style2.css" rel="stylesheet" type="text/css" media="all" />
<link rel="stylesheet" href="css/ken-burns.css" type="text/css"
	media="all" />
<link rel="stylesheet" href="css/animate.min.css" type="text/css"
	media="all" />
<!-- js -->
<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
<!---<link href='http://fonts.googleapis.com/css?family=Josefin+Sans:400,100,100italic,300,300italic,400italic,600,600italic,700,700italic' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>--->
<!-- start-smoth-scrolling -->
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(".scroll").click(function(event) {
			event.preventDefault();
			$('html,body').animate({
				scrollTop : $(this.hash).offset().top
			}, 1000);
		});
	});
</script>
<!-- start-smoth-scrolling -->
</head>

<body>
	<!-- header -->
	<div class="header">
		<div class="container">
			<div class="w3l_header_left">
				<ul>
					<li><span class="glyphicon glyphicon-envelope"
						aria-hidden="true"></span> community_service@163.com</li>
					<li><span class="glyphicon glyphicon-earphone"
						aria-hidden="true"></span>0375-6677889</li>
				</ul>
			</div>
			<div class="w3l_header_right">

				<ul class="social-icons">

					<li>
						<%
							String username = session.getAttribute("username").toString();
						%> 您好，<%=username%><a href="login_reg.jsp">&nbsp;切换登录</a>
					</li>

				</ul>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	<div class="header-bottom">
		<div class="container">
			<nav class="navbar navbar-default"> <!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<div class="logo">
					<h1>
						<a class="navbar-brand" href="index.html"><span>福</span></a>
					</h1>
				</div>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse nav-wil"
				id="bs-example-navbar-collapse-1">
				<nav class="cl-effect-1" id="cl-effect-1">
				<ul class="nav navbar-nav">
					<li class="active"><a href="index.html">首页</a></li>
					<li><a href="repair.jsp" class="hvr-bounce-to-bottom">服务</a></li>
					<li><a href="news-list" class="hvr-bounce-to-bottom">新闻</a></li>
					<li><a href="complaint.jsp" class="hvr-bounce-to-bottom">联系我们</a></li>
				</ul>
				</nav>
			</div>
			<!-- /.navbar-collapse --> </nav>
			<div class="w3ls_search">
				<div class="cd-main-header">
					<ul class="cd-header-buttons">
						<li><a class="cd-search-trigger" href="#cd-search"> <span></span></a></li>
					</ul>
					<!-- cd-header-buttons -->
				</div>
				<div id="cd-search" class="cd-search">
					<form action="#" method="post">
						<input name="Search" type="search" placeholder="Search...">
					</form>
				</div>
			</div>
			<!-- search-jQuery -->
			<script src="js/main.js"></script>
			<!-- //search-jQuery -->
		</div>
	</div>
	<!-- //header -->
	<!-- banner -->
	<div class="banner">
		<div id="kb" class="carousel kb_elastic animate_text kb_wrapper"
			data-ride="carousel" data-interval="6000" data-pause="hover">

			<!-- Wrapper-for-Slides -->
			<div class="carousel-inner" role="listbox">

				<!-- First-Slide -->
				<div class="item active">
					<img src="images/banner.jpg" alt="" class="img-responsive" />
					<div class="carousel-caption kb_caption">
						<h3 data-animation="animated flipInX">Dream Land</h3>
						<h4 data-animation="animated flipInX">cupidatat non proident</h4>
					</div>
				</div>

				<!-- Second-Slide -->
				<div class="item">
					<img src="images/banner1.jpg" alt="" class="img-responsive" />
					<div class="carousel-caption kb_caption kb_caption_right">
						<h3 data-animation="animated flipInX">Dream Home</h3>
						<h4 data-animation="animated flipInX">cupidatat non proident</h4>
					</div>
				</div>

				<!-- Third-Slide -->
				<div class="item">
					<img src="images/banner2.jpg" alt="" class="img-responsive" />
					<div class="carousel-caption kb_caption kb_caption_center">
						<h3 data-animation="animated flipInX">Dream Land</h3>
						<h4 data-animation="animated flipInX">携手并肩共建安全温馨和谐家园</h4>
					</div>
				</div>

			</div>

			<!-- Left-Button -->
			<a class="left carousel-control kb_control_left" href="#kb"
				role="button" data-slide="prev"> <span
				class="glyphicon glyphicon-menu-left" aria-hidden="true"></span> <span
				class="sr-only">Previous</span>
			</a>

			<!-- Right-Button -->
			<a class="right carousel-control kb_control_right" href="#kb"
				role="button" data-slide="next"> <span
				class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> <span
				class="sr-only">Next</span>
			</a>

		</div>
		<script src="js/custom.js"></script>
	</div>
	<!-- //banner -->

	<!-- about -->
	<div class="about">
		<div class="container">
			<h3>人人关注物业管理  人人尊重物业服务</h3>
			<p class="dolor">加强物业管理，共建安全文明温馨的和谐家园</p>
			<div class="about-grids">
				<div class="col-md-6 about-grid about-one">
					<div class="about-grid-left">
						<h4>创建家园美如画，点滴小事见精神</h4>
						<p>一花一草皆生命，一枝一叶总关情</p>
					</div>
					<div class="about-grid-right">
						<span class="glyphicon glyphicon-tree-deciduous"
							aria-hidden="true"></span>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="col-md-6 about-grid about-one">
					<div class="about-grid-right aliquam">
						<span class="glyphicon glyphicon glyphicon-user"
							aria-hidden="true"></span>
					</div>
					<div class="about-grid-left non">
						<h4>关爱小区家园，倡导品位人生</h4>
						<p>送人玫瑰，手有余香，关爱他人，内心自甜</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="about-grids">
				<div class="col-md-6 about-grid">
					<div class="about-grid-left">
						<h4>建优美环境，创和谐小区</h4>
						<p>远亲不如近邻，邻里和谐共享美好生活</p>
					</div>
					<div class="about-grid-right">
						<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="col-md-6 about-grid">
					<div class="about-grid-right aliquam">
						<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
					</div>
					<div class="about-grid-left non">
						<h4>宣扬物业法规，构建和谐小区</h4>
						<p>爱护公共设施/设备，严禁私自占用/损坏</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!-- //about -->



	<!-- team -->
	<div class="team">
		<div class="container">
			<h3>Our Amazing Team</h3>
			<p class="dolor">Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			<div class="wthree_team_grids">
				<div class="col-md-3 wthree_team_grid">
					<div class="wthree_team_grid1">
						<div class="hover14 column">
							<div>
								<figure> <img src="images/21.jpg" alt=" "
									class="img-responsive" /></figure>
							</div>
						</div>
						<div class="wthree_team_grid1_pos">
							<h4>David Martin - Agent</h4>
						</div>
					</div>

				</div>
				<div class="col-md-3 wthree_team_grid">
					<div class="wthree_team_grid1">
						<div class="hover14 column">
							<div>
								<figure> <img src="images/3.jpg" alt=" "
									class="img-responsive" /></figure>
							</div>
						</div>
						<div class="wthree_team_grid1_pos">
							<h4>Reena Scot - Agent</h4>
						</div>
					</div>

				</div>
				<div class="col-md-3 wthree_team_grid">
					<div class="wthree_team_grid1">
						<div class="hover14 column">
							<div>
								<figure> <img src="images/2.jpg" alt=" "
									class="img-responsive" /></figure>
							</div>
						</div>
						<div class="wthree_team_grid1_pos">
							<h4>Rabecca Ali - Agent</h4>
						</div>
					</div>

				</div>
				<div class="col-md-3 wthree_team_grid">
					<div class="wthree_team_grid1">
						<div class="hover14 column">
							<div>
								<figure> <img src="images/4.jpg" alt=" "
									class="img-responsive" /></figure>
							</div>
						</div>
						<div class="wthree_team_grid1_pos">
							<h4>Rosy Carl - Agent</h4>
						</div>
					</div>

				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!-- //team -->
	<!-- newsletter -->
	<div class="newsletter">
		<div class="container">
			<h3>如果您对我们的服务有意见的话</h3>
			<p class="dolor your">请留下您的宝贵意见</p>
			<div class="agileits_newsletter_grids">


				<input type="submit" value="" onclick="window.open('complaint.jsp')">

			</div>
		</div>
	</div>
	<!-- //newsletter -->
	<!-- agile_testimonials -->
	<div class="testimonials">
		<div class="container">
			<h3>友情链接</h3>
			
			<div class="agile_testimonials_grids">
				<ul id="flexiselDemo1">
					<li>
						<div class="agile_testimonials_grid">
							<div class="agile_testimonials_grid1">
							
								<p>
									<span>淘宝网</span>
								</p>
							</div>
							<a href="https://www.taobao.com"  target="_blank"><img src="images/2.png" alt=" " class="img-responsive" /></a>
						</div>
					</li>
					<li>
						<div class="agile_testimonials_grid">
							<div class="agile_testimonials_grid1">
								
								<p>
									<span>优酷网</span>
							</div>
							<a href="http://www.youku.com"  target="_blank"><img src="images/1.png" alt=" " class="img-responsive" /></a>
						</div>
					</li>
					<li>
						<div class="agile_testimonials_grid">
							<div class="agile_testimonials_grid1">
								
								<p>
									<span>新浪微博</span>
								</p>
							</div>
							<a href="http://weibo.com"  target="_blank"><img src="images/3.png" alt=" " class="img-responsive" /></a>
						</div>
					</li>
						<li>
						<div class="agile_testimonials_grid">
							<div class="agile_testimonials_grid1">
								
								<p>
									<span>QQ空间</span>
								</p>
							</div>
							<a href="http://qzone.qq.com/"  target="_blank"><img src="images/41.png" alt=" " class="img-responsive" /></a>
						</div>
					</li>
						<li>
						<div class="agile_testimonials_grid">
							<div class="agile_testimonials_grid1">
								
								<p>
									<span>4399游戏网</span>
								</p>
							</div>
							<a href="http://www.4399.com"  target="_blank"><img src="images/51.png" alt=" " class="img-responsive" /></a>
						</div>
					</li>
				</ul>
				</ul>
				<script type="text/javascript">
					$(window).load(function() {
						$("#flexiselDemo1").flexisel({
							visibleItems : 3,
							animationSpeed : 1000,
							autoPlay : true,
							autoPlaySpeed : 3000,
							pauseOnHover : true,
							enableResponsiveBreakpoints : true,
							responsiveBreakpoints : {
								portrait : {
									changePoint : 480,
									visibleItems : 1
								},
								landscape : {
									changePoint : 640,
									visibleItems : 1
								},
								tablet : {
									changePoint : 768,
									visibleItems : 2
								}
							}
						});

					});
				</script>
				<script type="text/javascript" src="js/jquery.flexisel.js"></script>
			</div>
		</div>
	</div>
	<!-- //agile_testimonials -->
	<!-- footer -->
	<div class="footer">
		<div class="container">
			<div class="w3agile_footer_grids">
				<div class="col-md-4 agileinfo_footer_grid">
					<div class="footer-logo">
						<h2>
							<a href="home.jsp"><i>福</i></a>
						</h2>
					</div>
				</div>
				<div class="col-md-3 agileinfo_footer_grid">
					<h4>
						联系我们 <span>电话：<br>0375-6677889<br>Email:<br>community_service@163.com</span>
					</h4>
					

				</div>
				<div class="col-md-2 agileinfo_footer_grid agileinfo_footer_grid1">
					<ul>
						<li><a href="home.jsp">首页</a></li>
						<li><a href="repair.jsp">服务</a></li>

						<li><a href="complaint.jsp">联系我们</a></li>
						<li><a href="admin/login.jsp">管理员入口</a></li>
					</ul>
				</div>
				<div class="col-md-3 agileinfo_footer_grid">
					<div class="agileinfo_footer_grid_left">
						<img src="images/6.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="agileinfo_footer_grid_left">
						<img src="images/9.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="agileinfo_footer_grid_left">
						<img src="images/8.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="agileinfo_footer_grid_left">
						<img src="images/7.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>

	<!-- //footer -->
	<!-- for bootstrap working -->
	<script src="js/bootstrap.js"></script>
	<!-- //for bootstrap working -->
	<!-- here stars scrolling icon -->
	<script type="text/javascript">
		$(document).ready(function() {
			/*
				var defaults = {
				containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
				};
			 */

			$().UItoTop({
				easingType : 'easeOutQuart'
			});

		});
	</script>
	<!-- //here ends scrolling icon -->
</body>
</html>