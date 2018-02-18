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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
</style>
<script type="text/javascript" src="js/dojo-unieap.js"
	djconfig="isDebug: false, parseOnLoad: true" charset="utf-8"></script>
<script type="text/javascript" src="js/dijit-unieap.js" charset="utf-8"></script>
<script type="text/javascript">
	if (!unieap) {
		unieap = {};
	}
	unieap.WEB_APP_NAME = "/ecdomain";
	unieap.appPath = "/ecdomain/portal";
	unieap.cmpPath = "/ecdomain/portal/webpages/web/LNLYZWW/page/complaint.jsp";
	unieap.dialogRelogin = "false";
	var tab = parent.parent;
	if (tab.isLoading) {
		if (!tab.isLoading()) {
			tab.showLoading();
		}
	}

	dojo.addOnLoad(function() {
		var tab = parent.parent;
		if (tab.isLoading) {
			if (tab.isLoading()) {
				tab.hideLoading();
			}
		}
	});
	dojo.connect(document, "onkeydown", function(evt) {
		if (evt.altKey && evt.keyCode == 88) {
			unieap.debug(dataCenter, true);
		}
	});
</script>


<script type="text/javascript" src="js/rpc.js" charset="utf-8"></script>
<script type="text/javascript" src="js/Dialog.js" charset="utf-8"></script>



<title>在线投诉页面</title>
<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="js/upload.js"></script>
<!-- <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script> -->

<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
<!-- 引用js文件，js文件名与jsp页面名字一致 -->
<script type="text/javascript" src="js/complaintSave.js"></script>
<style type="text/css">
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	color: #484848;
	text-align: center;
	background:
		url(/ecdomain/portal/webpages/web/LNLYZWW/images/tousu/tsmid_3.gif)
		repeat-y;
}

.maints {
	margin: 0 auto;
	width: 1000px;
	overflow: hidden;
}

.tsmind {
	margin: 0px 0px 0px 0px;
	width: 1000px;
	padding: 0px 100px 0px 100px;
	overflow: hidden;
	float: left;
}

.tav {
	border: 1px #dde0e1 solid;
	margin-top: 20px;
}

.biaot {
	color: #3484cf;
	line-height: 40px;
	font-family: "微软雅黑";
	font-size: 18px;
}

body,td,th {
	font-family: "微软雅黑";
}

.put {
	border: 1px #abadb3 solid;
	height: 20px;
	line-height: 20px;
	text-align: left;
	padding: 0px 5px 0px 5px;
	width: 230px;
}

.red {
	color: #F00
}

#overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 140%;
	background: #000;
	opacity: 0.5;
	filter: alpha(opacity = 50);
}

#win {
	position: absolute;
	top: 30%;
	left: 50%;
	width: 400px;
	height: 200px;
	background: #fff;
	margin: -102px 0 0 -202px;
	line-height: 200px;
	text-align: center;
	border: 4px solid #CCC;
}
</style>

<script type="text/javascript">
	var code; //在全局定义验证码
	$(function() {
		timer();
		var st1 = st();
		setTimeout(st1, 5000);
		createCode();
		loadProv();
		loadCity();
	});
	function st() {
		return function() {
			inline();
		}
	}
	var start = 5;
	var step = -1;
	function timer() {
		document.getElementById("timer").innerHTML = start + '秒后将自动关闭';
		start += step;
		if (start < 0)
			start = 5;
		setTimeout("timer()", 1000);
	}

	//产生验证码
	function createCode() {
		code = "";
		var codeLength = 4;//验证码的长度
		var checkCode = document.getElementById("code");
		var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C',
				'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
				'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
		for (var i = 0; i < codeLength; i++) {//循环操作
			var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
			code += random[index];//根据索引取得随机数加到code上
		}
		checkCode.value = code;//把code值赋给验证码
	}
	//校验验证码
	function validate() {
		var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写      
		if (inputCode.length <= 0) { //若输入的验证码长度为0
			alert("请输入验证码！"); //则弹出请输入验证码
		} else if (inputCode != code) { //若输入的验证码与产生的验证码不一致时
			alert("验证码输入错误！"); //则弹出验证码输入错误
			createCode();//刷新验证码
			document.getElementById("input").value = "";//清空文本框
			return false;
		} else { //输入正确时
			return true;
		}
	}
	//提交
	function tijiao() {
		if (!validate()) {
			return;
		}
		if (!validation()) {
			return;
		}

		document.forms["complaintAF"].action = "/ecdomain/portal/query.do?method=addComplaint";
		document.forms["complaintAF"].submit();
	}

	var returnval = true;


	function inline() {
		$('#overlay').hide();
		$('#win').hide();
	}
</script>
</head>

<body topmargin="0" leftmargin="0"
	onload="eapObjsMgr.onReady(document.forms[0]);"onbeforeunload=";removeDataStoreFromSession();">
	<div id="dijit-popupBody"></div>

	<div class="maints">
		<div class="tsmind">
			<form action="admin/complain.action" name="complaintAF" method="post"
				enctype="multipart/form-data" id="ts_form">
				<input type="hidden" name="displayDivId" value="uploadList">
				<input type="hidden" name="uploadFileIdContainerId"
					value="uploadIds">
				<table width="800" border="0" cellspacing="0" cellpadding="0">
					<tbody>
						<tr>
							<td valign="top">&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><img src="images/zx.gif" width="800"
								height="70"></td>
						</tr>
						<tr>
							<td valign="top">


								<table width="700" border="0" align="center" cellpadding="6"
									cellspacing="0" class="tav">
									<tbody>
										<tr>
											<td width="220" height="32" align="right" bgcolor="#FFFFFF"
												class="biaot">投诉信息：</td>
											<td width="480" bgcolor="#FFFFFF">&nbsp;</td>
										</tr>


										<tr>
											<td height="32" align="right" bgcolor="#FFFFFF"><span
												class="red">&nbsp;*</span>请选择被投诉人姓名：</td>
											<td bgcolor="#FFFFFF">
											<select id="complain" name="complain.admin_id">
													<option>请选择</option>
											</select></td>
										</tr>

										<tr>
											<td height="32" align="right" bgcolor="#FFFFFF"><span
												class="red">&nbsp;*</span>请填写投诉内容：</td>
											<td bgcolor="#FFFFFF"><textarea id="defendant_content"
													name="complain.content" class="put"
													style="width:230px;height:50px;" maxlength="300"></textarea>
											</td>
										</tr>



										<tr>
											<td height="36" align="right" bgcolor="#FFFFFF"><span
												class="red">&nbsp;*</span>请输入验证码：</td>
											<td bgcolor="#FFFFFF"><input type="text" id="input"
												name="input" class="put" maxlength="4">&nbsp;&nbsp;
												<input type="text" id="code"
												style="border-style:none;color:green;" disabled="disabled"></td>
										</tr>
									</tbody>
								</table>
								<table width="400" border="0" align="center" cellpadding="0"
									cellspacing="0">
									<tbody>
										<tr>
											<td height="50" align="center" valign="bottom"><a
												href="javascript:tijiao();"><input src="images/tjj.gif"
													width="82" height="33" border="0" type="image"
													onClick="this.form.submit()" /></a></td>
											<td align="center" valign="bottom"><a
												href="javascript:window.close();"><img
													src="images/qx.gif" width="82" height="33" border="0"></a>
											</td><td align="center" valign="bottom"><a
												href="home.jsp"><img
													src="images/FH.GIF" width="82" height="33" border="0"></a>
											</td>
						</h2></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	</div>
	<div id="overlay" style="display: none;"></div>
	<div id="win" style="display: none;">
		<div id="inline2" style="width:400px; height:500px;">
			<table align="center" border="0"
				style="line-height:35px;font-family:微软雅黑;font-size:18px;">
				<tbody>
					<tr>
						<td align="center"><h1
								style="line-height:35px;font-weight:bold;font-family:微软雅黑;">投诉须知</h1></td>
					</tr>

					<tr>
						<td><div style="text-align:center;color:red;" id="timer">3秒后将自动关闭</div></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

</body>
</html>