//+----------------------------------------------------------------------------
//	Functions:		Dialog
//	Parameters: 	src 				主对象
//	Parameters: 	name 				组件名
//	Parameters: 	event 			事件名
//	Parameters: 	dataSet 		数据结构
//	Parameters: 	parameter 	参数
//	Parameters: 	width 			宽度
//	Parameters: 	height 			高度
//	Parameters: 	title 			对话框 Title
//	Parameters:		modal 			是否模式,默认情况下，按照模式展开,true。
//	Parameters:		onComplete 	窗口关闭时执行的方法。
//	Parameters:		inner 			如果需要在弹出对话框里面输入，
//														显示对象，而不是EP请求，那么通过inner传入对象或者显示字符串，
//														如果存在inner，那么就不进行EP组件请求。
//	Parameters: 	info 				判断是否消息dialog,在获得dialog对象的时候,不获取info的对象.
//	Parameters: 	motion 			动画效果。默认为true,如果设置成false，那么就没有缩放的动画效果。
//	Parameters: 	isClose 		是否存在关闭。
//	Parameters: 	url 				打开的连接。
//	Parameters: 	border 			是否显示dialog的内边框。
//	Description:	打开一个对话框,显示EP组件
//-----------------------------------------------------------------------------
if (!dojo._hasResource["unieap.dialog.Dialog"]) {
	dojo._hasResource["unieap.dialog.Dialog"] = true;
	dojo.provide("unieap.dialog.Dialog");
	dojo.require("dijit._Widget");
	dojo.require("dijit._Templated");
	dojo.require("unieap.form.Button");
	dojo.declare("unieap.dialog.Dialog", null, {

		//+----------------------------------------------------------------------------
		//	Description:	入口参数。
		//-----------------------------------------------------------------------------
		mainSrc : null,
		sComName : null,
		sEvent : null,
		dataset : null,
		parms : null,
		Width : null,
		Height : null,
		_title : null,
		_ismodal : null,
		onComplete : null,
		innerObj : null,
		isInfo : null,
		_motion : null,
		_isClose : null,
		_url : null,
		_border : null,
		//+----------------------------------------------------------------------------
		//	Description:	系统应用参数。
		//-----------------------------------------------------------------------------
		buttons : null,//按纽列表。
		buttonEvents : null,//按纽的事件列表
		winEvent : null,
		timers : null,//时间列表。
		title : null,//窗口标题。	
		windowDiv : null,
		innerDiv : null,
		baseIframe : null,//底层桢结构。
		basediv : null,//底层桢结构上面的div
		_moveDiv : null,//移动时显示的层。
		returnObj : null,//返回数据对象。
		dialogFrame : null,//对话框的主要内容保存的iframe中
		nowIdObj : null,//当前的对象。
		objWindow : null,//show的obj对应的window对象。
		events : null, //事件对象。
		tempEvents : null, //临时的事件
		//+----------------------------------------------------------------------------
		//	Description:	缩放控制变量。
		//-----------------------------------------------------------------------------
		endx : null,
		endy : null,
		startx : null,
		starty : null,
		startWith : null,
		startHeight : null,
		startHeadx : null,//开始头x
		startHeady : null,//开始头y
		winStartx : null,//窗口的最初位置。
		winStarty : null,//窗口的最初位置。
		//+----------------------------------------------------------------------------
		//	Description:	控制变量。
		//-----------------------------------------------------------------------------
		isHeadmove : null,//是否在移动
		baseHeight : null,
		startmotion : null,
		endmotion : null,
		footerAlign : null,//按纽的对齐属性。
		isCollapse : null,//是否可以压缩。
		isClose : null,//是否出现关闭按纽。
		//+----------------------------------------------------------------------------
		//	Description:	复制出来的对象。
		//-----------------------------------------------------------------------------
		footerDiv : null,
		bodyDiv : null,
		headTitle : null,
		collapseImg : null,
		expandImg : null,
		closeImg : null,
		headDiv : null,//dialog表头层。
		footerHr : null,
		buttonFocus : null,
		dialogData:null,
		//使用右上角的关闭按钮关闭对话框时，会不会调用回调函数
		iocnCloseComplete:false,
		_iconClose:false,
		preDialog:null,//在已经有弹出对话框的情况下，再次弹出对话框 此属性指前一对话框
		_modalDiv:null,//对话框已弹出且再次弹出别的对话框时，用于遮挡本对话框的层
		//+----------------------------------------------------------------------------
		//	Description:	处理函数。
		//-----------------------------------------------------------------------------

		postscript : function(config) {
			this.mainSrc = config["src"];
			this.sComName = config["name"];
			this.sEvent = config["action"];
			this.dataset = config["dataSet"];
			this.parms = config["parameter"];
			this.Width = config["width"];
			this.Height = config["height"];
			this._title = config["title"];
			this._ismodal = config["modal"];
			this.onComplete = config["onComplete"];
			this.innerObj = config["inner"];
			if(this.innerObj && typeof(this.innerObj)=="object"){
				this.innerParentNode = this.innerObj.parentNode;
			}
			this.isInfo = config["info"];
			this._motion = config["motion"];
			this._isClose = config["isClose"];
			this._url = config["url"];
			this._border = config["border"];
			this.buttonFocus = config["buttonFocus"];
			this.dialogData=config["dialogData"];
            this.isCollapse=config["isCollapse"];
            this.iocnCloseComplete=config["iocnCloseComplete"];
			this.buttons = [];
			this.buttonEvents = [];
			this.timers = [];
			this.title = this._title;

			this.startHeadx = 0;
			this.startHeady = 0;
			this.winStartx = 0;
			this.winStarty = 0;

			this.isHeadmove = false;

			this.baseHeight = 0;
			this.footerAlign = "right";
			this.isClose = true;
			this.events = [];
			this.tempEvents = [];
			this.init();
		},
		//+----------------------------------------------------------------------------
		//	Functions:		init
		//	Description:	窗口对象初始化，设置endmotion,startmotion以及windowDiv
		//-----------------------------------------------------------------------------
		
		init : function() {
			this.nowIdObj = this;
			if (this._ismodal == null) {
				this._ismodal = true;
			}
			var dialogDom = this._getApplication().getDialogs();
			 if (dialogDom ){
				if (dialogDom[dialogDom.length - 1]) {
				    this.preDialog = dialogDom[dialogDom.length - 1]
				}
			 }
			this.addLog(this.nowIdObj);
			//设置默认宽度和高度。
			if (this.Height == null)
				this.Height = 400;
			if (this.Width == null)
				this.Width = 600;
			//设置默认显示的

			//创建移动对象。
			this._createStartDiv();
			this.endx = parseInt(this._getWindow().document.body.clientWidth
					- this.Width)
					/ 2;
			this.endy = parseInt(this._getWindow().document.body.clientHeight
					- this.Height)
					/ 2;
		    if(this.preDialog&&this._ismodal){
				this._createModalDiv();
			}
			if (this._motion == null) {
				this._motion = true;
			}
			
			if (this._motion) {
				this.endmotion = new unieap.Motion(this, 350);
				this.endmotion.setRun(this.hiddenDiv);
				this.endmotion.setStop(this.hiddenStop);

				this.startmotion = new unieap.Motion(this, 350);
				this.startmotion.setRun(this.initDiv);
				this.startmotion.setStop(this.setVisible);
			}


			if (this._isClose == null) {
				this.isClose = true;
			} else {
				this.isClose = this._isClose;
			}
			if (this.isCollapse == null){
			  this.isCollapse = true;
			}
			if (this.iocnCloseComplete == null){
			  this.iocnCloseComplete = false;
			}
			this.craeteMain();
		},
        _createModalDiv:function(){        	
        	this.preDialog._modalDiv = this.preDialog._getWindow().document.createElement("div");
			this.preDialog._modalDiv.className = "x-dlg-proxy";
			this.preDialog._modalDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
			this.preDialog._modalDiv.style.height = this.preDialog.windowDiv.style.height;
		    this.preDialog._modalDiv.style.width = this.preDialog.windowDiv.style.width;
		    if(this.preDialog.windowDiv.style.top){
		      this.preDialog._modalDiv.style.top = this.preDialog.windowDiv.style.top;
			  this.preDialog._modalDiv.style.left = this.preDialog.windowDiv.style.left;
			}
			else{
				 this.preDialog._modalDiv.style.top = this.preDialog.endy;
			     this.preDialog._modalDiv.style.left = this.preDialog.endx;
			}
			this.preDialog._modalDiv.style.display="none";
			this.preDialog._getWindow().document.body.appendChild(this.preDialog._modalDiv);
        },
		setObjWindow : function(_objWindow) {
			this.objWindow = _objWindow;
		},
		_createStartDiv : function() {
			//设计开始时显示的按纽	
			this._moveDiv = this._getWindow().document.createElement("div");
			this._moveDiv.className = "x-dlg-proxy";
			this._moveDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
			this._getWindow().document.body.appendChild(this._moveDiv);
		},

		addLog : function(obj) {

			this._getApplication().addDialog(obj);

		},

		//判断是否消息框
		getIsInfo : function() {
			if (this.isInfo != null && this.isInfo == true) {
				return true;
			} else {
				return false;
			}
		},
		//+----------------------------------------------------------------------------
		//	Functions:		initModal
		//	Description:	初始化模式效果
		//-----------------------------------------------------------------------------
		//初始化模式。
		initModal : function() {
			if (this._ismodal) {
				  var basePath = this._getApplication().getContextPath();
				 var url = basePath + "unieap/ria/unieap/dialog/_bgLayer.jsp";
				 //存在前一个对话框，且也是模态
				if(this.preDialog&&this.preDialog._ismodal){	
                     this.preDialog._modalDiv.style.display="block";
                    document.getElementById("bgMask").removeNode(true);
				    var newmaskIframe = document
						.createElement("<iframe id = \"bgMask\" src='"
								+ url
								+ "'  style=\"position:absolute;visibility:inherit;top:0px;left:0px;width:100%;height: 100%;z-index:1000;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\">");
				    document.body.appendChild(newmaskIframe);

				    newmaskIframe.contentWindow.focus();
			    }
			    else{
			    	var maskIframe = document
						.createElement("<iframe id = \"bgMask\" src='"
								+ url
								+ "'  style=\"position:absolute;visibility:inherit;top:0px;left:0px;width:100%;height: 100%;z-index:1000;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\">");
				    document.body.appendChild(maskIframe);
				    maskIframe.contentWindow.focus();
			    }
			}
		},
		hideMask : function() {
			if (this._ismodal) {
				if(this.preDialog&&this.preDialog._modalDiv){
                     this.preDialog._modalDiv.removeNode(true);
                     this.preDialog._modalDiv = null;
                     delete this.preDialog._modalDiv;
			   }
			   else{
			      document.getElementById("bgMask").removeNode(true);
			   }
			}
		},
		//+----------------------------------------------------------------------------
		//	Functions:		setWidth
		//	Description:	重新设置数据窗口的宽度
		//-----------------------------------------------------------------------------
		setWidth : function(_width) {
			this.Width = _width;
			this.baseIframe.style.width = _width;
			this.basediv.style.width = _width;
			this.windowDiv.style.width = _width;
			var centerX = this._getWindow().document.body.clientWidth / 2;
			this.endx = parseInt(centerX) - parseInt(this.Width) / 2;
			this.windowDiv.style.left = this.endx;
		},

		//+----------------------------------------------------------------------------
		//	Functions:		setHeight
		//	Description:	重新设置数据窗口的高度
		//-----------------------------------------------------------------------------
		setHeight : function(_height) {
			this.Height = _height;
			this.baseIframe.style.height = _height;
			this.basediv.style.height = _height;
			this.windowDiv.style.height = _height;
			var centerY = this._getWindow().document.body.clientHeight / 2;
			this.endy = parseInt(centerY) - parseInt(this.Height) / 2;
			this.windowDiv.style.top = this.endy;
		},
		//+----------------------------------------------------------------------------
		//	Functions:		craeteMain
		//	Description:	创建显示窗口，其中主要显示内容是从top的innerTable模板复制的
		//-----------------------------------------------------------------------------
		craeteMain : function() {
			this.initWinbase()
			this.initHeadTool();
			this.useTimer();//设置开始的时间操作。		
		},
		getTemplate : function() {
			var _template = this._getWindow().document
					.getElementById("innerTable");
			if (_template == null) {
				_template = document.getElementById("innerTable");
			}
			return _template;
		},
		//+----------------------------------------------------------------------------
		//	Functions:		initWinbase
		//	Description:	初始化底部覆盖层，复制top里面的模板
		//-----------------------------------------------------------------------------
		initWinbase : function() {
			//创建主窗口。
			this.windowDiv = this._getWindow().document.createElement("div");
			this.windowDiv.className = "x-dlg-proxy";
			this.windowDiv.style.border = "0px";
			this.windowDiv.style.display = "none";
			//底层覆盖用的层结构。
			this.baseIframe = this._getWindow().document
					.createElement("<iframe aa=\""
							+ (new Date()).getTime()
							+ "\"  style=\"position:absolute;visibility:inherit;top:0px;left:0px;width:"
							+ this.Width + "px;height: " + this.Height
							+ " px;z-index:-2;\" \">");
			this.basediv = this._getWindow().document
					.createElement("<div  style=\"position:absolute;visibility:inherit;top:0px;left:0px;width:"
							+ this.Width
							+ "px;height: "
							+ this.Height
							+ " px;z-index:-1;\" \" class = \"x-dlg-proxy\">");
			//设置窗口对象		
			this.innerDiv = this._getWindow().document
					.createElement("<div class=\"x-dlg\" width=\"100%\" height = \"100%\">");
			//设置窗口头部
			var innerTable = new unieap.innerTable();
			innerTable.innerTable.style.display = "";
			
			//得到复制出来的对象。
			this.footerDiv = innerTable.footerDiv;
			this.bodyDiv = innerTable.bodyDiv;
			this.headTitle = innerTable.headTitle;
			this.collapseImg = innerTable.collapseImg;
			this.expandImg = innerTable.expandImg;
			this.closeImg = innerTable.closeImg;
			this.headDiv = innerTable.headDiv;
			this.footerHr = innerTable.footerHr;
			//设置是否需要内边框
			if (this._border == false) {
				this.bodyDiv.className = "dialogBodyNoboder";
			}
			//取消动态对象

			this.windowDiv.style.width = this.Width;
			this.windowDiv.style.height = this.Height;
			if (this.winEvent != null) {
				this.events.push(dojo.connect(this.windowDiv, "onkeydown",
						this, dojo.hitch(this, this.winEvent)));
			}

			//添加对象
			this.initBody();
			

			this.windowDiv.appendChild(this.baseIframe);
			this.windowDiv.appendChild(this.basediv);
			this.windowDiv.appendChild(this.innerDiv);
			this.innerDiv.appendChild(innerTable.domNode);
			this._getWindow().document.body.appendChild(this.windowDiv);
			
		},
		//+----------------------------------------------------------------------------
		//	Functions:		initBody
		//	Description:	初始化主要显示内容。
		//-----------------------------------------------------------------------------
		initBody : function() {
			if (this.innerObj == null) {
				if (this._url == null) {
					var url = this.getUrl();
					this.initParams();//初始化所有参数
					this.dialogFrame = this._getWindow().document
							.createElement("<iframe src='" + url+"?name="+this._getWindow().name
									+ "' width=\"100%\" height=\"100%\">");
					this.bodyDiv.appendChild(this.dialogFrame);
				} else {
					this.dialogFrame = this._getWindow().document
							.createElement("<iframe src='" + this._url
									+ "' width=\"100%\" height=\"100%\">");
					this.bodyDiv.appendChild(this.dialogFrame);
				}
			} else//如果存在innerObj，对象，那么就直接把内容输入到显示对象里面
			{
				if (typeof(this.innerObj) == "object") {
					this.bodyDiv.appendChild(this.innerObj);
				} else {
					this.bodyDiv.innerHTML = this.innerObj;
				}
			}
		},

		//获得当前的body对象。
		getBody : function() {
			return this.bodyDiv;
		},

		//+----------------------------------------------------------------------------
		//	Functions:		initFooter
		//	Description:	初始化底部按纽。
		//-----------------------------------------------------------------------------
		initFooter : function() {
			this.footerDiv.align = this.footerAlign;
			if (this.isUseButton()) {
				var _span = this._getWindow().document.createElement("span");
				_span.innerHTML = "&nbsp;";
				for (var i = 0, len = this.buttons.length; i < len; i++) {
					if (i > 0) {

						this.footerDiv.appendChild(_span.cloneNode(true));
					}
					this.footerDiv.appendChild(this.buttons[i].domNode);
				}
			} else {
				this.footerHr.style.display = "none";
			}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		isUseButton
		//	Description:	判断是否存在按钮。
		//-----------------------------------------------------------------------------
		isUseButton : function() {
			if (this.buttons.length == 0)
				return false;
			else
				return true;
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_getWindow
		//	Description:	用于屏蔽top和当前对象。
		//-----------------------------------------------------------------------------
		_getWindow : function() {
			if(top.window._DialogUtil&&this.innerObj == null)
		{
			return top.window;
		}else
		{
			return window;
		}

		},
		_getApplication : function() {
			var _tempApplication = null;
			if (top.window._DialogUtil&&this.innerObj == null) {
				_tempApplication = top.window._DialogUtil;
			} else {
				_tempApplication =window._DialogUtil;
			}
			return _tempApplication;
		},
		//+----------------------------------------------------------------------------
		//	Functions:		initParams
		//	Description:	传入组件以及事件以后构造参数对象的初始化，往当前页面放置参数
		//					到显示页面再提取。
		//-----------------------------------------------------------------------------
		initParams : function() {
			var componentForm=null;
			if (document.forms["form_component"] == null) {
				componentForm = new unieap.formForComp();
			}
			else{
			  componentForm = document.forms["form_component"]
			 }
				if (componentForm != null) 
				{
					componentForm.name.value = this.sComName;
					componentForm.event.value = this.sEvent;
															
					var parameterValue = this.parms == null ? "" : this.parms;
					componentForm.parameter.value = parameterValue;
					var dataSetValue = "";
					var _this=this;
					if (this.dataset != null) {
						if(typeof(this.dataset) == "object")
						{
							if(this.dataset.declaredClass != "unieap.ds.DataCenter")
								{
								  var dsDialog=new unieap.ds.DataCenter;
								  dsDialog.addDataStore("datastore",_this.dataset);
								  dataSetValue=dsDialog.toJson();
								}
								else{
								  dataSetValue=this.dataset.toJson();
								}
						}
						else{
						 dataSetValue=this.dataset;
						}
						
					}
					componentForm.data.value = dataSetValue;
				  if (document.forms["form_component"] == null) {
				        this._getWindow().document.body
						.appendChild(componentForm.domNode);
			      }
					
				    this._getApplication().register(this._getWindow(), "dialogWindow");
				}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		getUrl
		//	Description:	获得组件请求连接
		//-----------------------------------------------------------------------------
		getUrl : function() {
			var basePath = this._getApplication().getContextPath();
			url = basePath + "unieap/ria/unieap/dialog/showDiv_dialog.jsp";
			return url;
		},

		//+----------------------------------------------------------------------------
		//	Functions:		initHeadTool
		//	Description:	初始化标题栏，主要是设置相关事件。
		//-----------------------------------------------------------------------------
		initHeadTool : function() {

			if (this.title == null)
				this.title = "";
			if (this.title.length > 20)
				this.title = this.title.substring(0, 19);
			this.headTitle.innerHTML = this.title;
			if (!this.isCollapse) {
				this.collapseImg.style.display = "none";
			}
			if (!this.isClose) {
				this.closeImg.style.display = "none";
			}
			this.initEvent();
	       
		},
		initEvent:function(){
			if (this.isCollapse) {
				this.events.push(dojo.connect(this.collapseImg, "onclick",
						this, dojo.hitch(this, this._collapse)));
				this.events.push(dojo.connect(this.expandImg, "onclick", this,
						dojo.hitch(this, this._expand)));

				this.events.push(dojo.connect(this.collapseImg, "onmouseover",
						this, dojo.hitch(this, this._collapseOver)));
				this.events.push(dojo.connect(this.expandImg, "onmouseover",
						this, dojo.hitch(this, this._expandOver)));
				this.events.push(dojo.connect(this.collapseImg, "onmouseout",
						this, dojo.hitch(this, this._collapseOut)));
				this.events.push(dojo.connect(this.expandImg, "onmouseout",
						this, dojo.hitch(this, this._expandOut)));
			}
			if (this.isClose) {
				this.events.push(dojo.connect(this.closeImg, "onclick", this,
						dojo.hitch(this, this._imgClose)));
				this.events.push(dojo.connect(this.closeImg, "onmouseover",
						this, dojo.hitch(this, this._closeOver)));
				this.events.push(dojo.connect(this.closeImg, "onmouseout",
						this, dojo.hitch(this, this._closeOut)));
			}
			this.events.push(dojo.connect(this.headDiv, "onmousedown", this,
					dojo.hitch(this, this.onheadmousedown)));
		},
		destroyEvent:function(){
			dojo.forEach(this.events, dojo.disconnect);
			this.events = [];
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_collapseOver
		//	Description:	折叠。
		//-----------------------------------------------------------------------------
		_collapseOver : function() {
			this.collapseImg.className = "dialog-minimize-over";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_collapseOver
		//	Description:	展开。
		//-----------------------------------------------------------------------------
		_expandOver : function() {
			this.expandImg.className = "dialog-maximize-over";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_collapseOver
		//	Description:	折叠。
		//-----------------------------------------------------------------------------
		_collapseOut : function() {
			this.collapseImg.className = "dialog-minimize";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_collapseOver
		//	Description:	展开。
		//-----------------------------------------------------------------------------
		_expandOut : function() {
			this.expandImg.className = "dialog-maximize";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_closeOver
		//	Description:	关闭。
		//-----------------------------------------------------------------------------
		_closeOver : function() {
			this.closeImg.className = "dialog-close-over";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		_closeOut
		//	Description:	关闭。
		//-----------------------------------------------------------------------------
		_closeOut : function() {
			this.closeImg.className = "dialog-close";
		},
		//+----------------------------------------------------------------------------
		//	Functions:		onheadmousedown
		//	Description:	鼠标放下时操作。主要处理移动效果
		//-----------------------------------------------------------------------------
		onheadmousedown : function() {
			var el = this._getWindow().event.srcElement;
			if (el.tagName == "TD") {
				this.isHeadmove = true;
				this.startHeadx = this._getWindow().event.clientX;
				this.startHeady = this._getWindow().event.clientY;
				this.winStartx = parseInt(this.windowDiv.style.left);
				this.winStarty = parseInt(this.windowDiv.style.top);
				this.onheadStartmove();
			}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		expand
		//	Description:	展开窗口
		//-----------------------------------------------------------------------------
		_expand : function() {
			this.windowDiv.style.height = this.Height;
			this.collapseImg.style.display = "";
			this.expandImg.style.display = "none";
		},

		//+----------------------------------------------------------------------------
		//	Functions:		collapse
		//	Description:	收缩窗口
		//-----------------------------------------------------------------------------
		_collapse : function() {
			if (this.baseHeight == 0) {
				this.baseHeight = this.headDiv.offsetHeight;
			}
			this.windowDiv.style.height = this.baseHeight;
			this.collapseImg.style.display = "none";
			this.expandImg.style.display = "";
		},

		//+----------------------------------------------------------------------------
		//	Functions:		addKeyListener
		//	Parameters: 	key		触发事件的键值
		//	Parameters: 	fn		键触发时的操作
		//	Parameters:		scope	函数应用范围
		//	Description:	添加键盘事件
		//-----------------------------------------------------------------------------
		addKeyListener : function(key, fn, scope) {
			var keyCode = key;
			var handler = function() {
				var k = this._getWindow().event.keyCode;
				if (k == keyCode) {
					fn.call(scope || window, this._getWindow().event);
				}
			}
			this.winEvent = handler;
		},

		//+----------------------------------------------------------------------------
		//	Functions:		addButton(config, fn, scope)
		//	Parameters:		config:按纽名称
		//	Parameters		fn:按纽事件
		//	Parameters		scope:应用范围
		//	Description:	添加事件。
		//-----------------------------------------------------------------------------	
		addButton : function(config, fn, scope) {
			var btn = new unieap.form.Button({
				label : config
			});
			var handler = function() {
				fn.call(scope || window, this._getWindow().event);
			}
			var _newHandle = dojo.hitch(this, handler);
			this.events.push(dojo.connect(btn, "onClick", this, _newHandle));
			this.events.push(dojo.connect(btn, "onKeyDown", this, dojo.hitch(
					this, "keydown", btn)));
			this.buttonEvents.push(_newHandle);
			this.buttons.push(btn);
			return btn;
		},
		keydown : function(obj) {
			var me = this;
			var keyCode = event.keyCode;
			var label = obj.label;
			var number = this.buttons.length;
			var index = -1;
			for (var i = this.buttons.length - 1; i >= 0; i--) {
				if (me.buttons[i].label == obj.label) {
					index = i;
				}
			}

			if (keyCode >= 37 && keyCode <= 40) {
				//left
				if (keyCode == 37 || keyCode == 40)
					if (index > 0) {
						me.buttons[index - 1].focus();
					} else {
						me.buttons[number - 1].focus();
					}
				//right
				else if (keyCode == 38 || keyCode == 39)
					if (index < (number - 1)) {
						me.buttons[index + 1].focus();
					} else {
						me.buttons[0].focus();
					}

			} else
				return;
		},

		addTimer : function(fn, timer) {
			var times = new Object();
			times["time"] = timer;
			times["function"] = fn;
			this.timers.push(times);
		},

		useTimer : function() {
			var lengths = this.timers.length;
			for (var i = 0; i < lengths; i++) {
				var timeObj = this.timers[i];
				this._getWindow().window.setTimeout(timeObj["function"],
						parseInt(timeObj["time"]));
			}
		},
		//+----------------------------------------------------------------------------
		//	Functions:		close
		//	Description:	关闭窗口。
		//-----------------------------------------------------------------------------	

		destroy : function() {
			dojo.forEach(this.events, dojo.disconnect);
			this.events = null;
		},
        _imgClose : function (){
          this._iconClose = true;
          this._close();
        },
		_close : function() {
		  if(this.innerObj && this.innerObj.removeNode){
				if(this.innerParentNode){
					this.innerParentNode.appendChild(this.innerObj);
				}
				else{
					this.innerObj.removeNode(true);
				}
			}
			//this.innerObj && this.innerObj.removeNode && this.innerObj.removeNode(true);
			var dialogDom = this._getApplication().getDialogs();
			if (dialogDom == null)
				return;
			for (var i = dialogDom.length - 1; i >= 0; i--) {
				if (dialogDom[i] == this.nowIdObj) {
					this._getApplication().removeDialog(i);
					break;
				}
			}
			this.destroy();
			if(this._ismodal){
			  var dialogDom = this._getApplication().getDialogs();
			  if (dialogDom ){
				if (dialogDom[dialogDom.length - 1]) {
					dialogDom[dialogDom.length - 1].initEvent();
				}
			  }
			}
			this._createEndDiv();
			this.windowDiv.style.display="none";
			if (document.forms["form_component"]) {
				this.removeNode(document.forms["form_component"]);
				document.forms["form_component"] = null;
			}
			if (this.baseIframe != null) {
				this.baseIframe.removeNode(true);
			}

			if (this._ismodal) {
				this.hideMask();
			}
            this.preDialog=null;
			if (this._motion) {
				//设置时间显示定时器			
				this.endmotion.start();
			} else {
				this._hiddenStop();
			}
		},

		close : function() {
			this._close();
		},

		_createEndDiv : function() {
			if (this._moveDiv != null) {
				this.removeNode(this._moveDiv);
				//this._moveDiv = null;
			}
			//设计关闭时显示的按纽
			this._moveDiv = this._getWindow().document
					.createElement("<div style=\"position:absolute;\">");
			this._moveDiv.className = "x-dlg-proxy";
			this._moveDiv.style.height = this.windowDiv.style.height;
			this._moveDiv.style.width = this.windowDiv.style.width;
			this._moveDiv.style.left = this.windowDiv.style.left;
			this._moveDiv.style.top = this.windowDiv.style.top;
			this._moveDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
			this._getWindow().document.body.appendChild(this._moveDiv);
		},
		//+----------------------------------------------------------------------------
		//	Functions:		hiddenStop
		//	Description:	窗口隐藏时的操作。
		//-----------------------------------------------------------------------------	
		hiddenStop : function() {
			this._hiddenStop();
		},

		_hiddenStop : function() {
			if (this._moveDiv != null) {
				this.removeNode(this._moveDiv);
			}
			if (this.onComplete) {
				//不管返回函数调用是否成功，那么
			  if((this._iconClose&&this.iocnCloseComplete)||!this._iconClose){
				try {
					this.onComplete.call(this.mainSrc, this.returnObj);
				} catch (e) {
					
				}
			 }
			}
		var me=this;
		this._getWindow().setTimeout(function(){
			if (me.dialogFrame) {
				me.dialogFrame.contentWindow.document.write("");
				me.dialogFrame.src = "javascript:false";
				me.dialogFrame = null;
				delete me.dialogFrame;
			}
			me.removeNode(me.windowDiv);
			delete me.windowDiv;
			delete me._moveDiv;
			me.windowDiv = null;
			me._moveDiv = null;
		},0);
		},

		//+----------------------------------------------------------------------------
		//	Functions:		hiddenDiv
		//	Description:	窗口收缩时的操作。
		//-----------------------------------------------------------------------------	

		hiddenDiv : function(curstep, totalstep) {
			if (this._moveDiv != null) {
				this._moveDiv.style.top = this.endy - (this.endy - this.starty)
						* curstep / totalstep;
				this._moveDiv.style.left = this.endx
						- (this.endx - this.startx) * curstep / totalstep;
				this._moveDiv.style.height = this.Height
						- (this.Height - this.startHeight) * curstep
						/ totalstep;
				this._moveDiv.style.width = this.Width
						- (this.Width - this.startWith) * curstep / totalstep;
			}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		show
		//	Parameters		clickObj:相对于哪个对象展开
		//	Description:	展开窗口操作。
		//-----------------------------------------------------------------------------	
		show : function(clickObj, isEvent) {
			
			this.initModal();
			this._moveDiv.style.display = "";
			var baseObj = clickObj;
			if(this._motion)
		{
			if(baseObj != null)
			{
				if(isEvent == null)  isEvent = true;
				if(event && isEvent)//事件
				{
					this.startx = event.screenX - this._getWindow().screenLeft;
					this.starty = event.screenY - this._getWindow().screenTop;					
				}else
				{					
					var offset = this.getoffset(baseObj);					
					this.startx = offset[1];
					this.starty = offset[0];
					if(this.objWindow != null)
					{						
						this.startx += this.objWindow.screenLeft;
						this.starty += this.objWindow.screenTop - this._getWindow().screenTop;
					}
				}
				this.startWith = baseObj.offsetWidth;
				this.startHeight = baseObj.offsetHeight;
				if(clickObj.tagName.toLowerCase() =="button"){
					clickObj.blur();
				}
			}else
			{
				this.startx = 800;
				this.starty = 10;
				this.startWith = 50;
				this.startHeight = 30;
			}
			this._moveDiv.style.display = "";
			this._moveDiv.style.zIndex = "20001";			
			//设置时间显示定时器
			this.startmotion.start();
			//完成定时器设置
		}else//如果不用动画效果
		{	
			this.positionMain();
			this.setVisible();
			
		}
		},
		setVisible : function(){
		 this.initFooter();
		  this.windowDiv.style.display="block";
		  if (this.buttonFocus) {
				var bt = dijit.getEnclosingWidget(this.footerDiv.firstChild);
				bt.focus();
			}
		  if(this._motion){
		  this.windowDiv.style.top = this._moveDiv.style.top;
		  this.windowDiv.style.left = this._moveDiv.style.left;
		  }
		  this.removeNode(this._moveDiv);
		  delete this._moveDiv;
		  this._moveDiv = null;
		},

		//+----------------------------------------------------------------------------
		//	Functions:		positionMain
		//	Description:	设置主窗口位置
		//-----------------------------------------------------------------------------	
		positionMain : function() {
			this.windowDiv.style.top = this.endy;
			this.windowDiv.style.left = this.endx;
			this.windowDiv.style.height = this.Height;
			this.windowDiv.style.width = this.Width;
		},

		setButtonAlign : function(_footerAlign) {
			this.footerAlign = _footerAlign;
		},

		setCollapse : function(_ollapse) {
			this.isCollapse = _ollapse;
		},

		setClose : function(_close) {
			this.isClose = _close
		},

		setReturn : function(Obj) {
			this.returnObj = Obj;
		},
		getoffset : function(e) {
			var t = e.offsetTop;
			var l = e.offsetLeft;
			while (e = e.offsetParent) {
				t += e.offsetTop;
				l += e.offsetLeft;
			}
			var rec = new Array(2);
			rec[0] = t;
			rec[1] = l;
			return rec
		},
		//+----------------------------------------------------------------------------
		//	Functions:		initDiv
		//	Description:	逐步放大时的操作。
		//-----------------------------------------------------------------------------	
		initDiv : function(curstep, totalstep) {
			this._moveDiv.style.left = this.startx + (this.endx - this.startx)
					* curstep / totalstep;
			this._moveDiv.style.top = this.starty + (this.endy - this.starty)
					* curstep / totalstep;
			this._moveDiv.style.width = this.startWith
					+ (this.Width - this.startWith) * curstep / totalstep;
			this._moveDiv.style.height = this.startHeight
					+ (this.Height - this.startHeight) * curstep / totalstep;
		},
		//////////////////////////////静态方法/////////////////////////////////////////////////////////////
		//+----------------------------------------------------------------------------
		//	Functions:		onheadStartmove
		//	Description:	初始化移动透明图层。
		//-----------------------------------------------------------------------------	
		onheadStartmove : function() {
			if (this.isHeadmove) {
				if (this._moveDiv == null) {
					this._moveDiv = this._getWindow().document
							.createElement("<div style=\"position:absolute;\">");
					this._moveDiv.className = "x-dlg-proxy";
					this._moveDiv.style.height = this.windowDiv.style.height;
					this._moveDiv.style.width = this.windowDiv.style.width;
					var x = this._getWindow().event.clientX;
					var y = this._getWindow().event.clientY;
					this._moveDiv.style.left = this.winStartx + x
							- this.startHeadx;
					this._moveDiv.style.top = this.winStarty + y
							- this.startHeady;
					this._moveDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
					this._getWindow().document.body.appendChild(this._moveDiv);
					this._moveDiv.setCapture();
					this.tempEvents.push(dojo.connect(this._moveDiv,
							"onmousemove", this, dojo.hitch(this,
									this.onheadmousemove)));
					this.tempEvents.push(dojo.connect(this._moveDiv,
							"onmouseup", this, dojo.hitch(this,
									this.onheadmouseup)));
				}
			}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		onheadmousemove
		//	Description:	鼠标移动时触发的事件。
		//-----------------------------------------------------------------------------	
		onheadmousemove : function() {
			if (this.isHeadmove) {
				var x = this._getWindow().event.clientX;
				var y = this._getWindow().event.clientY;
				this._moveDiv.style.left = this.winStartx + x - this.startHeadx;
				if (y > 0 && y < this._getWindow().document.body.clientHeight)
					this._moveDiv.style.top = this.winStarty + y
							- this.startHeady;
			}
		},

		//+----------------------------------------------------------------------------
		//	Functions:		onheadmouseup
		//	Description:	鼠标弹起，停止移动时的操作
		//-----------------------------------------------------------------------------	
		onheadmouseup : function() {
			var el = this._getWindow().event.srcElement;
			if (this.isHeadmove) {
				this.isHeadmove = false;
				this.startHeadx = 0;
				this.startHeady = 0;
				if (this._moveDiv != null) {
					dojo.forEach(this.tempEvents, dojo.disconnect);
					this.tempEvents = [];
					this._moveDiv.releaseCapture();
					this.windowDiv.style.top = this._moveDiv.style.top;
					this.windowDiv.style.left = this._moveDiv.style.left;
					this.removeNode(this._moveDiv);
					delete this._moveDiv;
					this._moveDiv = null;
				}
			}
		},
		getObject:function(){
		 return this.dialogData;
		},
		removeNode:function(node){
		 var d;
		 if(node && node.tagName != 'BODY'){   
            d = d || document.createElement('div');   
            d.appendChild(node);   
            d.innerHTML = '';   
        }
		}
	});
	dojo.declare("unieap.innerTable", [dijit._Widget, dijit._Templated], {
		templateString : "<table dojoAttachPoint=\"innerTable\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" height=\"100%\" border = \"0\" style=\"display:none\">"
				+ "<tr height=\"23px\" dojoAttachPoint=\"headDiv\">"
				+ "<td>"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" class=\"x-window-tc\" width=\"100%\" vlign=\"top\">"
				+ "<tr>"
				+ "<td style=\"width:5px\" class=\"x-window-tl\">"
				+ "&nbsp;"
				+ "</td>"
				+ "<td dojoAttachPoint=\"headTitle\" class=\"dialog-title\">"
				+ "</td>"
				+ "<td dojoAttachPoint=\"headButton\" align=\"right\">"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" alirn=\"right\" height=\"24px\">"
				+ "<tr>"
				+ "<td>"
				+ "<span dojoAttachPoint=\"collapseImg\"  class=\"dialog-minimize\">&nbsp;</span>"
				+ "<span dojoAttachPoint=\"expandImg\" class=\"dialog-maximize\" style=\"display:none\">&nbsp;</span>"
				+ "</td>"
				+ "<td>"
				+ "<span dojoAttachPoint=\"closeImg\" class=\"dialog-close\">&nbsp;</span>"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "<td class=\"x-window-tr\">"
				+ "&nbsp;"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td>"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" height=\"100%\" >"
				+ "<tr>"
				+ "<td style=\"width:5px\" class=\"x-window-ml\">"
				+ "&nbsp;"
				+ "</td>"
				+ "<td>"
				+ "<div dojoAttachPoint = \"bodyDiv\" class=\"dialogBody\" valign=\"center\">"
				+ "</div>"
				+ "</td>"
				+ "<td style=\"width:5px\" class=\"x-window-mr\">"
				+ "&nbsp;"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "</tr>"
				+ "<tr height = \"34px\" dojoAttachPoint=\"footerHr\">"
				+ "<td>"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" height=\"100%\" >"
				+ "<tr>"
				+ "<td style=\"width:5px\" class=\"x-window-ml\">"
				+ "&nbsp;"
				+ "</td>"
				+ "<td dojoAttachPoint=\"footerDiv\" align=\"right\" class=\"buttonbg\">"
				+ "</td>"
				+ "<td style=\"width:5px\" class=\"x-window-mr\">"
				+ "&nbsp;"
				+ "</td>"
				+ "</tr>"
				+ "</table>"
				+ "<td>"
				+ "</tr>"
				+ "<tr height = \"5px\">"
				+ "<td>"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" class=\"x-window-bc\" width=\"100%\" height=\"5px\">"
				+ "<tr>"
				+ "<td style=\"width:5px\" class=\"x-window-bl\">"
				+ "</td>"
				+ "<td class=\"x-window-bc\">"
				+ "<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" height=\"5px\">"
				+ "<tr>"
				+ "<td style=\"font-size:1px\">&nbsp;</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "<td style=\"width:5px\" class=\"x-window-br\">"
				+ "</td>"
				+ "</tr>" + "</table>" + "</td>" + "</tr>" + "</table>"

	});

	dojo.declare("unieap.formForComp", [dijit._Widget, dijit._Templated], {
		templateString : "<form name=\"form_component\" method=\"post\">"
				+ "<input type=\"hidden\" dojoAttachPoint=\"name\" name=\"name\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"event\" name=\"event\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"parameter\" name=\"parameter\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"data\" name=\"data\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"type\" name=\"type\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"writer\" name=\"writer\" value=\"\"/>"
				+ "<input type=\"hidden\" dojoAttachPoint=\"identifier\" name=\"identifier\" value=\"\"/>"
				+ "</form>"
	});

	dojo.declare("unieap.Motion", null, {
		//+----------------------------------------------------------------------------
		//	Description:	入口参数。
		//-----------------------------------------------------------------------------
		baseMotion : null, //最原始的处理对象。
		doution : null, //时间或者次数。
		//+----------------------------------------------------------------------------
		//	Description:	应用参数。
		//-----------------------------------------------------------------------------
		_interval : null, //时间片的句柄。	
		isTimeSet : false, //是按照时间，还是按照次数,默认情况下是按照时间来处理的。
		baseRun : null, //run方法。
		baseStop : null, //当定时事件停止的时候调用的方法。
		startTime : null, //开始时间。
		currstep : 0, //当前步骤。
		totlastep : 0, //所有步骤
		//+----------------------------------------------------------------------------
		//	Functions:		postscript
		//	Description:	初始化方法。
		//-----------------------------------------------------------------------------	
		postscript : function(_baseMotion, _doution) {
			this.baseMotion = _baseMotion;
			this.doution = _doution;
		},
		setDoution : function(_doution) {
			this.doution = _doution;
		},

		setIsTimeSet : function(istime) {
			this.isTimeSet = istime;
		},
		setRun : function(_baseRun) {
			this.baseRun = dojo.hitch(this.baseMotion, _baseRun);
		},

		setStop : function(_baseStop) {
			this.baseStop = dojo.hitch(this.baseMotion, _baseStop);
		},
		start : function() {
			this.currstep = 0;
			this.totlastep = this.doution;
			if (this.isTimeSet == false) {
				this.startTime = new Date();//开始时间。
			}
			if (this._interval == null) {
				this._interval = window
						.setInterval(dojo.hitch(this, this.run), 10);
			}
		},
		run : function() {
			if (this.currstep < this.totlastep) {
				if (this.isTimeSet)//按照次数
				{
					this.currstep += 1;
				} else//按照时间
				{
					this.currstep += 1;
					this.correctFrame();
				}

				if (this.baseRun != null) {
					if (this.currstep >= this.totlastep) {
						this.currstep = this.totlastep;
						this.stopTimer();
					} else {
						this.baseRun.call(this.baseMotion, this.currstep,
								this.totlastep);
					}
				}
			} else {
				this.stopTimer();
			}
			return true;
		},
		correctFrame : function() {
			var frames = this.totlastep;
			var frame = this.currstep;
			var expected = (this.currstep * this.doution / this.totlastep);
			var elapsed = (new Date() - this.startTime);
			var tweak = 0;

			if (elapsed < this.doution) {
				tweak = Math.round((elapsed / expected - 1) * this.currstep);
			} else {
				tweak = frames - (frame + 1);
			}

			if (tweak > 0 && isFinite(tweak)) {
				if (this.currstep + tweak >= frames) {
					tweak = frames - (frame + 1);
				}
				this.currstep += tweak;
			}
		},
		stopTimer : function() {
			this.currstep = 0;
			this.totlastep = 0;
			this.startTime = null;
			window.clearInterval(this._interval);
			this._interval = null;
			if (this.baseStop != null) {
				this.baseStop.call(this.baseMotion);
			}
		}
	});
}//以下是原DialogUtil.js中的内容 zhaobo
if (!dojo._hasResource["unieap.dialog.DialogUtil"]) { 
	dojo._hasResource["unieap.dialog.DialogUtil"] = true;
    dojo.provide("unieap.dialog.DialogUtil");
    dojo.require("unieap.dialog.Dialog");
(function(){
	if(typeof this["_DialogUtil"] == "undefined"){
		this._DialogUtil = {};
		var register = {};
	    var registerSize = 0;
	    var dialogs = [];
	}
	/**
	 * 鎵撳紑瀵硅瘽妗?
	 * @param {Object} config 鍙傛暟闆嗗悎:<br>
	 * 	[String] name 缁勪欢鍚?<br>
	 * 	[String] event 浜嬩欢鍚?<br>
	 * 	[DataSet] dataSet 鏁版嵁缁撴瀯<br>
	 * 	[String] parameter 鍙傛暟<br>
	 * 	[String] width 瀹藉害<br>
	 * 	[String] height 楂樺害<br>
	 * 	[String] title 瀵硅瘽妗員itle<br>
	 * 	[modal] 妯″紡锛歵rue(榛樿)--妯℃??,false--闈炴ā鎬?<br>
	 * 	[boolean] div 鏄惁DIV瀵硅瘽妗嗭紝榛樿false
	 *  [Function] onComplete 瀵硅瘽妗嗗叧闂悗鐨勫洖璋冨嚱鏁?
	 * @return 瀵硅瘽妗嗚繑鍥炲??
	 */
	_DialogUtil.showDialog = function(config) 
	{
			var dialog = null;
			if(top._DialogUtil&&config["inner"]==null)
			{
				dialog = top._DialogUtil.createDialog(config);
				}
			else
			   dialog = this.createDialog(config);
			dialog.setObjWindow(window);
			if(event == null)
			{
				dialog.show();
			}
			else
			{
				dialog.show(event.srcElement);
			}
			return true;
	}	


	
	/**
     * @private
     */
	_DialogUtil.timmerMask = function()
	{
		_DialogUtil.showMask();
		window.setTimeout("_DialogUtil.hideMask()",500);			
	}
	
	/**
     * @private
     */
	_DialogUtil.hideMask = function()
	{
		if(top.hideMask)
		{
			top.hideMask();
		}else if(hideMask)
		{
			hideMask();
		}
	}
		/**
	 * 杩斿洖璇锋眰url鐨剆erver閮ㄥ垎,渚?: http://servername:8080
	 * @type String
	 */
    _DialogUtil.getServerURL = function() 
    {
        return location.protocol + "//" + location.host;
    }
    
   	/**
	 * 鑾峰緱搴旂敤璺緞,渚?: http://servername:8080/samples/
	 * @type String
	 */
	_DialogUtil.getContextPath = function() 
	{
		var pathName = location.pathname;
		if (pathName.substr(0, 1) != "/") 
		{
            pathName = "/" + pathName;
        }
		var i = pathName.indexOf("/", 1);
		if (i == -1) 
		{
			i = pathName.length;
		}
		
		return this.getServerURL() + pathName.substring(0, i) + "/";
	}
	/**
     * @private
     */
	_DialogUtil.register = function(obj, key)
	{
		if (obj != null)
		{
			if(key == null)
			{
				key = "" + registerSize;
			}
	
			register[key] = obj;
			registerSize++;
		}
	}
	
	/**
     * @private
     */
	_DialogUtil.unregister = function(name)
	{
		delete register[name];
	}
	
	/**
     * @private
     */
	_DialogUtil.getObject = function(name)
	{
		return register[name];
	}		
	_DialogUtil.createDialog=function(config)
	{		
		var context = null;
		if(top._DialogUtil&&config["inner"]==null){
			context = top;			
		}
		else{
			context  = window;
		}	
		var dialog=	new context.unieap.dialog.Dialog(config);
		dialog.setObjWindow(context);
		return dialog;	
	}
	
	_DialogUtil.addDialog=function(dialog)
	{		
		dialogs.push(dialog);
	}
	_DialogUtil.getDialogs=function()
	{		
		return dialogs;	
	}
	_DialogUtil.removeDialog=function(idx)
	{
		dialogs.splice(idx, 1);	
	} 
	
	_DialogUtil.getDialog = function(isAlert)
	{
		
		if(isAlert ==  null) isAlert = false;
		if(window.dialogArguments == undefined)
		{			
			var dialogDom = null;
			if(_DialogUtil.getDialogs)
			{
				dialogDom = _DialogUtil.getDialogs();
			}			
			if(dialogDom ==null)
			{
				return null;
			}			
			var lengths = dialogDom.length - 1;			
			if(lengths >= 0)
			{
				for(var i = lengths;i >= 0 ;i-- )
				{
					var diaObj = dialogDom[i];
					if(diaObj != null)
					{
						if(diaObj.getIsInfo())
						{
							if(isAlert == false)
								continue;
							else
								return diaObj;
						}
						else
						{					
							return diaObj;
						}
					}
				}				
			}
		}
	}
	

}
)();
}
//以下是原MessageBox.js中的内容 zhaobo
/**
 * 弹出消息框汇总
 */
var MessageBox = {
	/**
	 * 确认，并且执行完成以后的任务。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] text 显示的内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] noStr
	 *            否的字符 [boolean] motion 是否动画
	 * @type void
	 */
	confirm : function(config) {
		var _yesStr = unieap.defaultValue(config["yesStr"], "确定");
		var _noStr = unieap.defaultValue(config["noStr"], "取消");
		var _text = unieap.defaultValue(config["message"], "");
		var _icon = config["icon"];
		if (_icon != null)
			_icon += "Icon";
		else {
			_icon = "questionIcon";
		}
		var htmlObj = this._getConfirmObj(_text, _icon);
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			info : true,
			inner : htmlObj["obj"],
			onComplete : config["onComplete"],
			border : false,
			motion : config["motion"],
			buttonFocus : true
		}
		var dialog = null;
        if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		// 这样写function,应该在内存里面没有垃圾。
		// 确认按纽。
		dialog.addButton(_yesStr, function() {
			dialog.setReturn(true);
			dialog.close();
		}, dialog);
		// 取消按纽。
		dialog.addButton(_noStr, function() {
			dialog.setReturn(false);
			dialog.close();
		}, dialog);
		this._show(dialog);
	},

	/**
	 * 单行输入确认。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] message 提示内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] noStr
	 *            否的字符 [boolean] motion 是否动画
	 * @type void
	 */
	prompt : function(config) {
		this._prompt(config, "single");
	},

	/**
	 * 多行输入确认。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] message 提示内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] noStr
	 *            否的字符 [boolean] motion 是否动画
	 * @type void
	 */
	multiPrompt : function(config) {
		this._prompt(config, "multi");
	},
	/**
	 * 自定义按钮的confirm。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] message 显示的内容
	 *            [function] onComplete 完成事件 [Object] customerButtons 包含的按钮
	 *            [boolean] motion 是否动画
	 * @type void
	 */
	customerButtonConfirm : function(config) {
		var _text = unieap.defaultValue(config["message"], "");
		var buttons = config["customerButtons"];
		var _icon = config["icon"];
		if (_icon != null)
			_icon += "Icon";
		else {
			_icon = "questionIcon";
		}
		var htmlObj = this._getConfirmObj(_text, _icon);
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			inner : htmlObj["obj"],
			onComplete : config["onComplete"],
			border : false,
			motion : config["motion"],
			info : true,
			div : true,
			buttonFocus : true
		}
		var dialog = null;
		if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		if (buttons.length != 0) {
			for (var i = 0; i < buttons.length; i++) {
				obj = buttons[i];
				this._addButton(dialog, obj);
			}
		}

		this._show(dialog);

	},
	_addButton : function(dialog, obj) {
		dialog.addButton(obj.label, function() {
			dialog.setReturn(obj.returnValue);
			dialog.close();
		}, dialog);

	},

	/**
	 * 带yes、no、cancel的confirm。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] text 显示的内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] noStr
	 *            否的字符 [String] cancelStr 取消的字符 [boolean] motion 是否动画
	 * @type void
	 */
	cancelConfirm : function(config) {
		var _yesStr = unieap.defaultValue(config["yesStr"], "是");
		var _noStr = unieap.defaultValue(config["noStr"], "否");
		var _cancelStr = unieap.defaultValue(config["cancelStr"], "取消");

		var _text = unieap.defaultValue(config["message"], "");
		var _icon = config["icon"];
		if (_icon != null)
			_icon += "Icon";
		else {
			_icon = "questionIcon";
		}
		var htmlObj = this._getConfirmObj(_text, _icon);
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			info : true,
			inner : htmlObj["obj"],
			onComplete : config["onComplete"],
			border : false,
			motion : config["motion"],
			div : true,
			buttonFocus : true
		}

		var dialog = null;
		 if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		// 这样写function,应该在内存里面没有垃圾。
		// 是。
		dialog.addButton(_yesStr, function() {
			dialog.setReturn("yes");
			dialog.close();
		}, dialog);
		// 否。
		dialog.addButton(_noStr, function() {
			dialog.setReturn("no");
			dialog.close();
		}, dialog);
		// 取消
		dialog.addButton(_cancelStr, function() {
			dialog.setReturn("cancel");
			dialog.close();
		}, dialog);

		this._show(dialog);
	},

	/**
	 * alert。
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] text 显示的内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] icon
	 *            显示图标 [boolean] motion 是否动画
	 * @type void
	 */
	alert : function(config) {
		var _yesStr = unieap.defaultValue(config["yesStr"], "确定");
		var _text = unieap.defaultValue(config["message"], "");
		var _icon = config["icon"];
		if (_icon != null)
			_icon += "Icon";
		var htmlObj = this._getConfirmObj(_text, _icon);
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			inner : htmlObj["obj"],
			onComplete : config["onComplete"],
			border : false,
			info : true,
			motion : config["motion"],
			div : true,
			buttonFocus : true
		}
		var dialog = null;
	    if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		// 这样写function,应该在内存里面没有垃圾。
		// 是。
		dialog.addButton(_yesStr, dialog.close, dialog);
		this._show(dialog);
	},
	/**
	 * autoCloseAlert。自动关闭的信息提示框
	 * 
	 * @param {Object}
	 *            config 参数集合: [String] title confirm标题 [String] text 显示的内容
	 *            [function] onComplete 完成事件 [String] yesStr 是的字符 [String] icon
	 *            显示图标 [boolean] motion 是否动画
	 * @type void
	 */
	autoCloseAlert : function(config) {
		var _text = unieap.defaultValue(config["message"], "");
		var _icon = config["icon"];
		if (_icon != null)
			_icon += "Icon";
		var htmlObj = this._getConfirmObj(_text, _icon);
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			inner : htmlObj["obj"],
			onComplete : config["onComplete"],
			border : false,
			info : true,
			motion : config["motion"],
			div : true
		}
		var dialog = null;
	    if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		// 这样写function,应该在内存里面没有垃圾。
		// 是。
		this._show(dialog);
		var timer;
	
		if(config["durationTime"]){
		   timer = parseInt(config["durationTime"]);
		   }
		 else{
		   timer = 1000;
		  }
		 setTimeout(function(){dialog.close()},timer);	 
	},

	// //////////////////////////////内部函数////////////////////////////////////////////
	// 获得Config的对象。
	_getConfirmObj : function(text, icon) {
		var obj = document.createElement("<span>");
		obj.innerText = text;
		document.body.appendChild(obj);
		var _width = obj.offsetWidth;
		if (_width == 0)
			_width = 50;
		_width += 92;
		if (_width < 280)
			_width = 280;
		if (icon == null) {
			if (_width > 50)
				_width = _width - 32;
		}
		_height = obj.offsetHeight;
		if (_height == 0)
			_height = 20;
		_height += 91;
		obj.removeNode(true);
		obj = null;// 直接删除对象。
		var sInfo = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'><tr>";
		sInfo += "<td align='center'><table border=0><tr><td class='" + icon
				+ "'><td > " + text + "</td></tr></table></td></tr></table>"
		return {
			width : _width,
			Height : _height,
			obj : sInfo
		};
	},
	// 显示
	_show : function(dialog) {
		if (event == null) {
			dialog.show();
		} else {
			dialog.show(event.srcElement);
		}
	},

	_prompt : function(config, type) {
		var _yesStr = unieap.defaultValue(config["yesStr"], "确定");
		var _noStr = unieap.defaultValue(config["noStr"], "取消");
		var _text = unieap.defaultValue(config["message"], "");
		var htmlObj = null;
		if (type == "multi") {
			htmlObj = this._getMultiPromptObj(_text);
		} else {
			htmlObj = this._getPromptObj(_text);
		}
		var dialogConfig = {
			width : htmlObj["width"],
			height : htmlObj["Height"],
			title : unieap.defaultValue(config["title"], ""),
			modal : true,
			inner : htmlObj["obj"],
			info : true,
			onComplete : config["onComplete"],
			border : false,
			motion : config["motion"],
			div : true
		}
		var dialog = null;
		 if(top._DialogUtil)
		{
			dialog = top._DialogUtil.createDialog(dialogConfig);
		}
		else
			dialog = _DialogUtil.createDialog(dialogConfig);
		dialog.setObjWindow(window);
		dialog.setButtonAlign("center");
		dialog.setCollapse(false);
		// 这样写function,应该在内存里面没有垃圾。
		// 确认按纽。
		dialog.addButton(_yesStr, function() {
			var _value = dialog.getBody().all("promptText").value;
			dialog.setReturn({
				text : _value,
				btn : true
			});
			dialog.close();
		}, dialog);
		// 取消按纽。
		dialog.addButton(_noStr, function() {
			var _value = dialog.getBody().all("promptText").value;
			dialog.setReturn({
				text : _value,
				btn : false
			});
			dialog.close();
		}, dialog);
		this._show(dialog);
		setTimeout(function() {
			dialog.getBody().all("promptText").focus();
		}, 500);
	},

	// 获得promp对象
	_getPromptObj : function(text) {
		var obj = document.createElement("<span>");
		obj.innerText = text;
		document.body.appendChild(obj);
		var _width = obj.offsetWidth;
		if (_width == 0)
			_width = 50;
		_width += 92;
		if (_width < 280)
			_width = 280;
		_height = obj.offsetHeight;
		if (_height == 0)
			_height = 20;
		_height += 91;
		if (_height < 110)
			_height = 110;
		obj.removeNode(true);
		obj = null;// 直接删除对象。
		var sInfo = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'>";
		sInfo += "<tr><td > " + text + "</td></tr>";
		sInfo += "<tr><td ><input type='text' style='width:" + (_width - 20)
				+ "' id='promptText'></td></tr></table>"
		return {
			width : _width,
			Height : _height,
			obj : sInfo
		};
	},

	// 获得promp对象
	_getMultiPromptObj : function(text) {
		var obj = document.createElement("<span>");
		obj.innerText = text;
		document.body.appendChild(obj);
		var _width = obj.offsetWidth;
		if (_width == 0)
			_width = 50;
		_width += 92;
		if (_width < 300)
			_width = 300;
		_height = obj.offsetHeight;
		if (_height == 0)
			_height = 20;
		_height += 91;
		if (_height < 173)
			_height = 173;
		obj.removeNode(true);
		obj = null;// 直接删除对象。
		var sInfo = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'>";
		sInfo += "<tr><td > " + text + "</td></tr>";
		sInfo += "<tr><td ><textarea rows='5' style='width:" + (_width - 20)
				+ "' id='promptText'></textarea></td></tr></table>"
		return {
			width : _width,
			Height : _height,
			obj : sInfo
		};
	}
}
