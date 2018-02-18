if (!dojo._hasResource["unieap.rpc"]) { //_hasResource checks added by build. Do not use _hasResource directly in your code.
    dojo._hasResource["unieap.rpc"] = true;
    dojo.provide("unieap.rpc");  
    dojo.require("unieap.ds");
    dojo.require("unieap.cache.cache");
    dojo.declare("unieap.Action");    
		/**
		 * 定义成功事件类型
		 * 
		 * @return {Integer} 成功事件类型
		 */
 		unieap.ResultEvent = 1;		
		/**
		 * 失败事件类型
		 * 
		 * @return {Integer} 失败事件类型
		 */
 		unieap.FaultEvent = 0;
 		unieap.riaPath =  dojo.moduleUrl("");		
		/**
		 * 全局变量, 用户不写时使用dataCenter变量，否则使用用户自定义的变量	
		 */
 		dataCenter = new unieap.ds.DataCenter();
		/**
		 *通用向服务器端发送ajax http request请求，传输协议为dataCenter
		 *@param {Object} data 请求参数对象，以下为详细说明：
		 *<pre> 
		 * url：必填项，向服务器请求的URL，如/eapdomain/login.do?method=begin</br>
		 * parameters：可选项，向服务器请求的参数，</br>
		 * 		形式键值对对象，如{role: "admin", dept: "telcom"}，</br>
		 * 		在服务器端通过HttpServletRequest.getParameter方法可以取得</br>
		 * headers： 可选项，向服务器头部请求的参数，</br>
		 * 		形式键值对对象，如{ajax:"true",charset:"utf-8"}，</br>
		 * 		在服务器端通过HttpServletRequest.getHeader方法可以取得</br>
		 * sync：可选项，请求同步或异步，默认为异步</br>
		 * timeout：可选项，请求超时时间，单位为秒，默认为120秒</br>
		 * preventCache：可选项，是否阻止该请求在客户端浏览器缓存，默认为true，即不缓存</br>
		 * load：可选项，请求成功后的回调函数</br>
		 * 		形如function(_dataCenter, xhr) {...};</br>
		 *   	参数含义：{unieap.ds.DataCenter} dataCenter：请求成功后生成的dataCenter对象，</br>
		 * 						  {XMLHttpRequest} xhr：当前的XMLHttpRequest请求对象</br>
		 * error：可选项，请求出错后的回调函数</br>
		 * 		形如function(responseText, xhr) {...};</br>
		 *  	参数含义：{String} response：出错的响应内容，</br>
		 * 						  {XMLHttpRequest} xhr：当前的XMLHTTPRequest请求对象</br>
		 * context : 可选项，load或error方法的上下文
		 * initDataCenter : 可选项，是否初始化dataCenter
		 * </pre>
		 * @param {unieap.ds.DataCenter|Null} _dataCenter 传输的数据对象
		 * @param {Boolean|Null} showLoading 是否显示进度条，默认显示异步方式使用
		 * @return {unieap.ds.DataCenter|void} 同步的时候返回DataCenter对象，异步的时候无返回值
		 */
       	unieap.Action.requestData = function(data,_dataCenter,showLoading){
            var requestURL = unieap.Action.requestData.buidurl(data); 
			var json = _dataCenter && _dataCenter.toJson?_dataCenter.toJson():String(_dataCenter || ""); 
            var _dc = null;   
            if(!data.sync&&showLoading!=false){ //异步
            	unieap.showLoading(true);
            }
            dojo.rawXhrPost({
                url: requestURL,
                sync: data.sync,
                preventCache: (data.preventCache ? data.preventCache : true),
                contentType: "multipart/form-data",
                timeout: ((data.timeout) ? data.timeout : 120*1000),
                headers : dojo.mixin({ajaxRequest:true},data.headers),
                postData: json,
                load: function(text, args){  
                	unieap.debug(text);                	
                	if(!data.sync&&showLoading!=false){ //异步
		            	unieap.showLoading(false);
		            }
                	json = dojo.fromJson(text);
                	if (!json||typeof(json) != "object") {					
						_dc = text;	
						if(json.match(unieap.Global.session.timeout)){
							if (unieap.dialogRelogin=="true"){
								_DialogUtil.showDialog({
									action : unieap.WEB_APP_NAME+"/login.do?method=relogin",
									width: "561",
									height: "318",
									title: "会话过期,请重新登录",
									isClose : false,
									isCollapse : false,
									div: true
						 	 });	
							}
							else{
								window.top.location=window.top.location;
							}							
						}
						else{
							if (data.error) {
								data.context ? data.error.call(data.context, text, args.xhr) : data.error( text, args.xhr);
							}	
						}						
						return;		
                	}else {
	                    _dc = new unieap.ds.DataCenter(json);	
	                     if(data.initDataCenter!=false&&dataCenter.isEmpty()){
	                     		dataCenter.append(_dc);  	
	                     }
					}
					if (data.load) {	
							try{
								data.context?data.load.call(data.context, _dc, args.xhr):data.load( _dc, args.xhr);
							}catch(e){//dongyuwei updated
								console.error(e);
								console.dir(e);
								alert("请求数据成功！但回调方法出错；请检查自定义load回调函数。\n "+dojo.toJson(e,true));
							}
					}
					
					
                },
				error: function(text, args) {
					console.error(text);
					unieap.debug(text);
					
					if(!data.sync&&showLoading!=false){ //异步
		            	unieap.showLoading(false);
		            }					
//					var title = "请求出错";
//					var msg = "向服务器请求出错，出错信息：\n" + text;
//					unieap.Action.pubMsg({title:title, content: msg});
					if (data.error) {
						data.context?data.error.call(data.context, text, args.xhr):data.error( text, args.xhr)
					}
				}
            });
            //同步返回
            if(data.sync){ 
            	return _dc; 
            } 
        };
        /**
         * 构建请求的URL地址
         * @param {Object} data请求数据
         * @return {String}  地址
         */
        unieap.Action.requestData.buidurl = function(data){
        	var _url = "";
        	for(var _t in data.parameters){
        		_url+="&" + _t +"=" +encodeURI(data.parameters[_t]);
        	} 
        	if(data.url.lastIndexOf("?")>0){
        		_url = data.url + _url;
        	}else{
        		_url = data.url + "?"+(_url==""?"":_url.substring(1));
        	}
        	return _url;
        }
        
        
        /**
         * 取得CodeList使用到的DataStore方法，供combobox组件内部使用，业务人员实现其方法【同步请求】
         * 
         * @param {String} category 代码表名称
         * @return {unieap.ds.DataStore} 返回dataStore对象
         */
        unieap.Action.getCodeList = function(category,store){
        	   var ds = unieap.getCodeList(category,store);
        	   if(ds){
        	   		var dc = new unieap.ds.DataCenter();
        	   		dc.addDataStore(ds);
        	   		return dc;
        	   }	
	           return unieap.Action.requestData({
	       			url:  unieap.WEB_APP_NAME  +"/ria_codelist.do",
	       			sync: true,
	       			parameters: {"category": category,method:"loadCodeList"},
	       			load : function(dc){
	       				unieap.cache.putCodeList(dc,store); 
	       			},
	       			error : function(x){
	       				alert(x);
	       			}
	            });
	           
        };  
      /**
         * 取得form中当前记录的codelist集合，或全部的codelist集合
         * 
         * @param {Object} data {dataStoreName1:{name:"",value:"value1,value2"}, dataStoreName2:{}} 
         *     dataStoreName2:{} 代表取得所有数据【返回的dataStore中的pageSize大于0】
         *     dataStoreName1:{name:"",value:"value1,value2"} ：name指定取值列名，value代表取得value1,value2对应数据，此时返回的codelist不全【返回的dataStore中的pageSize为-2】
         * 		context : 可选项，load或error方法的上下文
         * @param {Function} callback 回调方法，如果是异步有回调方法，同步不需要回调方法直接返回DataCenter
         * @return  {unieap.ds.DataCenter}
         */
        unieap.Action.getCodeLists = function(data,callback){        	
            return unieap.Action.requestData({
       			url:  unieap.WEB_APP_NAME  +"/ria_codelist.do",
       			sync: callback==null,
       			parameters: {
       				method:"loadCodeLists",
       				category: dojo.toJson(data)       				
       			},
       			load : function(d){
       				unieap.cache.putCodeList(d); 
       				callback && callback(d);
       			}
            });
        };
//          /**
//         * 取得所有CodeList使用到的DataStore，客户端缓存组件内部使用，业务人员实现其方法【异步请求】
//         * 
//         * @param {Object} data {"codelist_version":时间戳}
//         * @param {Function} callback 回调函数
//         */
//        unieap.Action.getCodeListCache = function(data,callback){
//		       unieap.Action.requestData({
//					url : unieap.WEB_APP_NAME + "/ria_codelist.do",
//					sync : false,
//					parameters : {
//						method : "loadCodeList"
//					},
//					error : function(text, xhr) {
//						var title = "请求出错";
//						var msg = "向服务器请求category为" + category + "CodeList出错，出错信息：\n"
//								+ text;
//						unieap.Action.pubMsg({
//							title : title,
//							content : msg
//						});
//					},
//					load : function(dc) {
//						callback(dc);
//					}
//				},null,false)
//        }; 
//         /*
//         * 根据store名字自动获取datastore数据
//         * 首先在dataCenter中查找，如果没有找到去客户端缓存中查找，客户端缓存中也没有则去服务端缓存中取数据
//         * 
//         * @param {string}
//         * @return  {unieap.ds.DataCenter}
//         * */
//        unieap.Action.getDataStoreCache = function(storename){
//        	var StoreJson;
//        	dojo.require("unieap.cache");//使用unieap.cache
//        
//			var cache = unieap.cache;
//			var dc = new unieap.ds.DataCenter();
//			if(dataCenter.getDataStore(storename)){
//				dc.addDataStore(dataCenter.getDataStore(storename));
//				return dc;
//			}
//			if(cache.get){//如果没有安装googlegear
//		      	StoreJson=cache.get(storename,"DataStoreNameSpace");
//			}
//       	
//	       	if(StoreJson){
//	       		store=new unieap.ds.DataStore(dojo.fromJson(StoreJson));
//	       		dataCenter.addDataStore(store); 
//	       		dc.addDataStore(store); 
//	       		return dc;
//	       	}  // 若两个下拉列表使用同一个datastore
//	       	else{
//				var requestURL=unieap.WEB_APP_NAME + "/ria_gearcache.do?method=getStore";
//				dc=unieap.Action.requestData({
//					url: requestURL,
//					parameters:{store:storename},
//					sync:true						
//					}
//					);
//					
//				if(dc){
//					store=dc.getDataStore(storename);			
 	
					
//					cache.put(storename,store.toData(),"DataStoreNameSpace");//保存DataStore		
//					cache.put(storename,dc.getParameter(storename).toString(),"TimeStampNameSpace");	//保存时间戳	
//				}	
//				
//				return dc;
//	       	} 
//	       	
//	       	return null;     	      	
//        }
        /**
         * 取得Grid使用到的DataStore方法，供grid组件内部使用，业务人员实现其方法【异步请求】
         * @param {Object} data 传递
         *   {unieap.ds.DataStore} dataStore 对应DataStore对象<br/>
         *   {String} operator 操作类型 {paging、order、query、save}<br/>
         *   {Function} load 成功回调方法<br/>
         *   {Function} error 失败回调方法<br/>
         *   {String|Null} url 用户配置的请求url<br/>
         */
        unieap.Action.curdGrid = function(data){
           
           var dc = new unieap.ds.DataCenter();
           var ds = data["dataStore"];
           if(data["operator"]!="save"){
           		ds = ds.collect("none");
           }else{
           		ds = ds.collect("auto");
           }
        
           if(data["url"])
           		data["url"] = unieap.WEB_APP_NAME +"/"+ data["url"] +".do?method="+data["operator"];
           	else
           		data["url"] = unieap.WEB_APP_NAME  +"/ria_grid.do?method=" +data["operator"];
           var dc ;
           if(ds.declaredClass=="unieap.ds.DataCenter"){
           dc = data["dataStore"];
           }else{           
           dc = new unieap.ds.DataCenter();
           dc.addDataStore(ds);   
           }	  
           return unieap.Action.requestData(data,dc);
           
        }; 
 

        /**
         * @return 返回内容为当前jsp页面内所有grid的custom信息
         * 例如
         * {
         * 	grid: '[{lock:1,show:1,index:0,name:"职位"},{lock:0,show:1,index:1,name:"工资"}]',
         *  grid1:'[{lock:0,show:1,index:0,name:"工资"},{lock:1,show:1,index:0,name:"部门"}]'
         * }
         */
         
        unieap.Action.queryCustomInfo=function(){
        	var dc=null;
            unieap.Action.requestData({
            	url:unieap.WEB_APP_NAME+"/ria_customComponent.do?method=getCustomInfo",
           		parameters:{path:unieap.cmpPath},
            	load:function(res){
            		dc=res;
            	},
            	error:function(err){
            		err.getDetail?alert(err.getDetail()):alert("获取信息失败");
            		result=null;
            	},
            	
            	sync:true,
            	timeout:5000
            });
            
           if(dc&&dc.getParameter("customJson")){
           	  var customObj=dojo.fromJson(dc.getParameter("customJson"));
           	  window["customObj"]=customObj;
           }
        }
        
        /**
         * 获取对应id的自定义信息,首先从全局变量window["customObj"]中取,没有
         * 再查询数据库,即调用unieap.Action.queryCustomInfo()
         */
        unieap.Action.getCustomGrid = function(id){
        	if(window["customObj"]&&window["customObj"][id]){
        		return dojo.fromJson(window["customObj"][id]);
        	}else{
        		unieap.Action.queryCustomInfo();
        		if(window["customObj"]&&window["customObj"][id]){
        			return dojo.fromJson(window["customObj"][id]);
        		}
        		return null;
        	}
        	
        }
           
        
        
         /**
         * 保存grid的自定义信息，异步请求
         * @param {String} id grid的唯一标识
         * @param {Array} customSet
         * 		customSet中的数据定义如下形式 [{lock:1/0,show:1/0,name:"label",index:0/1/2..},{}]
         * 		lock属性为是否锁定：1为锁定/0为解锁
         *     show属性为是否显示：1为显示/0为隐藏 
         *     index属性为原始定义序号: 从0开始
         * @param {Function|Null} callback 回调方法
         */
        unieap.Action.setCustomGrid = function(id,customSet,callback){
        	var value = dojo.toJson(customSet);
   			
        	if(!(customSet instanceof Array)||(window["customObj"]&&window["customObj"][id]==value)){
        		unieap.getDialog() && unieap.getDialog().close();
        		return;
        	}
        	unieap.Action.requestData({
        		url:unieap.WEB_APP_NAME+"/ria_customComponent.do?method=saveCustomInfo",
        		parameters:{path:unieap.cmpPath,cmp_id:id},
        		load:function(res){
	        		callback && callback();
        		},
        		error:function(err){
        			err.getDetail?alert(err.getDetail()):alert("保存信息失败");
        			unieap.getDialog() && unieap.getDialog().close();
        		},
        		sync:true,
        		preventCache:true,
        		timeout:5000
        	},value);
        };
        
        
  
        /**
		 * 初始化grid
		 * @param {Object} ds
		 * @param {Boolean|Null} asynLoadStatistics 异步获取统计数
		 * @param {String|Null} customStatistics 自定义获取统计数的bean定义
		 */
		unieap.Action.initGrid = function(ds,asynLoadStatistics,customStatistics){
			var data = {};
			data["operator"] = (!asynLoadStatistics? "query":"paging");
			if(customStatistics){
				data["parameters"] = {customStatistics : customStatistics};
			}
			data["sync"] = true;
			data["dataStore"] = ds;
			var result = unieap.Action.curdGrid(data);
			if(asynLoadStatistics){
				data = {};
				data["url"] = unieap.WEB_APP_NAME  +"/ria_grid.do?method=loadStatistics";
				if(customStatistics){
					data["parameters"] = {customStatistics : customStatistics};
				}
				var _ds = result.getDataStore(ds.getName());
				data["load"] = function(dc1){
					_ds.append(dc1.getDataStore(_ds.getName()));
				}				
				var dc = new unieap.ds.DataCenter();
				dc.addDataStore(_ds.collect("none"));		
				unieap.Action.requestData(data,dc,false);			
			}
			return result;
		}; 
		/**
		 * 初始化Form，即初始化Grid中的第一条记录
		 * @param {Object} ds
		 */
		
		unieap.Action.initForm = function(ds){
			var data = {};
			data["sync"] = true;
				data["dataStore"] = ds;
				data["operator"] = "loadFristRow";
				return  unieap.Action.curdGrid(data);
		};
		//查询数据
		unieap.Action.queryData = function(ds){
			dataCenter.addDataStore(ds);
			var dc = unieap.Action.initGrid(ds);
			dataCenter.append(dc);
		},
        /**
         * 取得用于获取一个含有MetaData信息的DataStore，供快速查询组件内部使用，业务人员实现其方法【同步请求】
         * @param {String} rowSetName ORMapping配置文件的名称
         * @return {unieap.ds.DataStore} 返回空记录，包含MetaData信息的DataStore对象
         */
        unieap.Action.queryMetaData = function(rowSetName){
           
            return null;
        };     
        /**
         * 取得查询模板列表【同步请求】
         * @param {String} queryName 查询名称
         * @return {unieap.ds.DataStore} 返回dataStore对象
         */
        unieap.Action.getQueryTemplates = function(queryName){
        	return null;
        }
        
        /**
         * 取得特定查询模板信息【同步请求】
         * @param {String} queryName 查询名称
         * @param {String} templateId 模板ID
         * @return {unieap.ds.DataCenter} 返回dataCenter对象
         */
        unieap.Action.getQueryTemplate = function(queryName, templateId){
        	return null;
        }
        
        /**
         * 保存查询模板实例【异步请求】
         * @param {unieap.ds.DataCenter} dc 数据中心
         * @param {String} queryName 查询名称
         * @return
         */
        unieap.Action.saveQueryInstance = function(dc, queryName){
        
        }
        
        /**
         * 执行查询【异步请求】
         * @param {Object} data 查询数据
         * 		dataCenter {unieap.ds.DataCenter} 数据中心
         * 		queryName {String} 查询名称
         * @param {Function} callback 回调方法，处理返回DataCenter结果
         * @return
         */
        unieap.Action.doQuery = function(data, callback){
        
        }
        /**
         * 导出rowset结果集
         * @param {unieap.ds.DataStore} ds 要导出的dataStore对象
         * @param {Object|Null} labelMap 列和名称集合，默认使用DataStore对象中的MetaData的label定义
         * @param {Object|Null} data 其他参数，如{url:"component.dox?name=a&event=b"} 
         * @param {String|Null} type 导出类型"client"/"server",为空时默认从服务端导出
         * @param {String|Null} foot
         * @param {Object|Null} statistics固定行对象
         */
        unieap.Action.doExport = function(ds,labelMap,params,type,foot,statistics){
        	var ip=null;
			ip=(params&&params.url)?params.url:unieap.WEB_APP_NAME+"/GridExport.do?method=csvExport";
        	if(!labelMap){
        	 alert("grid.getLayoutInfo()为空");
        	 return;
        	}
        	var dc=new unieap.ds.DataCenter();
        	dc.setParameter("printLayout",labelMap);
        	
        	if(!type){
        	  type="server";
        	}
        	dc.addParameter("type",type);
        	var pagesize=ds.getPageSize();
        	if(type=="client"){
        	    if(foot){
        	      dc.addParameter("foot",foot);
        	     }
        	    var store=new unieap.ds.DataStore("lockedDataStore");
        	    if(statistics){
	        	  store.getRowSet().addRows(statistics);
        	     }
        	   dc.setParameter("lockedDataStore",store.toData());
        	  
        	}else{
        	   ds=ds.collect("none");
        	   ds.setPageSize(-1);
        	}
        	dc.addDataStore(ds);
        	dc.addParameter("custStoreName",ds.getName());
		    var form = document.createElement("form");
		    document.body.appendChild(form);
		    var data = document.createElement("<input name='data' type='hidden'/>");
		    data.value =dc.toJson();
		    form.appendChild(data);
 	       	form.name="export_form";
		    form.action = ip;
		    form.method = "post";
		    //var dialogName = 'formTarget'+new Date().getTime();
		    //window.open('',dialogName,'height=450,width=450,resizable=1');
		 
		 /**
		   
		   若excel导出需要弹出个页面来打开excel，csv导出则不用。
		    var iframe=document.createElement("iframe");
		    form.target= iframe;
		 **/
		    
		    form.submit();
	        ds.setPageSize(pagesize);
	       /*
        	var dialogContainer=document.createElement("div");
        	dialogContainer.style.display="block";
        	var dialog=document.createElement("div");
         	dialogContainer.appendChild(dialog);
		         _DialogUtil.showDialog({
					name: "导出",
					width: "700",
					height: "600",
					title: "对话框选择值",
					div: true,
					action:"/GridExport.do?method=init",
					dataSet:dc
		 	   }); */
        }
       /**
         * 打印rowset结果集
         * @param {unieap.ds.DataStore} ds 要导出的dataStore对象
         * @param {Array|Null} labelArr 列和名称集合，默认使用DataStore对象中的MetaData的label定义
		{"empname":{label:"姓名",width:"150"}, "empno":{label:"编号" ,width:"160"},"dept":{label:"部门",width:"100",category:{"10":"财务部","20":"开发部"}}}
         * @param {Object|Null} data 其他参数，如{url:"component.dox?name=a&event=b"} 	 
         */
        unieap.Action.doPrint = function(ds,labelArr,data){
			var isChinaExcelPrint=(data&&typeof data.isChinaExcelPrint=="boolean")?data.isChinaExcelPrint:unieap.Global.paging.isChinaExcelPrint;
			if(isChinaExcelPrint){
				unieap.Action.doChinaExcelPrint(ds,labelArr,data);
				return;
			}
			var purl= (data&&data.url)?data.url:unieap.WEB_APP_NAME +"/ria_gridPrint.do?method=init";
        	var dc = new unieap.ds.DataCenter();
        	dc.setParameter("printLayout",labelArr);
        	dc.addDataStore(ds);
        	unieap.Action.requestData({
        		url : purl,
        		sync : true,
        		load : function(dc){         	 
        		    var form ;		
        			 if(!(form=document.getElementById("unieap-print-form"))){        			   
	        			form = document.createElement("form");	        			
	        			form.id = "unieap-print-form";
	        			form.method = "post";	        			
					    form.appendChild((function(){
					    	var frm = document.createElement('<iframe name="printIFrame"></iframe>');
					    	frm.width=frm.height=0;
					    	return frm;
					    })());
					    form.appendChild((function(){
					    	var input = document.createElement("input");
					    	input.type = "hidden";
					    	input.name = "myAction";
					    	input.value = "ria_gridPrint.do?method=print";
					    	return input; 
					    })());
					    form.appendChild((function(){
					    	var input = document.createElement("input");
					    	input.type = "hidden";
					    	input.name = "uid";
					    	input.value = "";
					    	return input;
					    })());
					    document.appendChild(form);
        				}
        			form.target="printIFrame";
					form.action=unieap.WEB_APP_NAME + "/unieap/pages/report/jsp/show/UniPrint.jsp";
				    form.submit();      
        		}
        	},dc); 
        }
	    /**
         * 打印rowset结果集
         * @param {unieap.ds.DataStore} dataStore 要导出的dataStore对象
         * @param {Array|Null} structureInfo 列和名称集合，默认使用DataStore对象中的MetaData的label定义
		{"empname":{label:"姓名",width:"150"}, "empno":{label:"编号" ,width:"160"},"dept":{label:"部门",width:"100",category:{"10":"财务部","20":"开发部"}}}
         * @param {Object|Null} parameters 其他参数，如{url:"component.dox?name=a&event=b"} 	 
         */
        unieap.Action.doChinaExcelPrint = function(dataStore, structureInfo, parameters){
        	var rs = dataStore.getRowSet();
			if(rs == null || rs.getTotalCount() == 0)return;
			var columns = [],i = 0;
    		for(var name in structureInfo){
    		columns[i] = structureInfo[name];
    		columns[i++]["name"] = name;
    		}
			var _parameters = {"foot":{}};
			var _foot = _parameters["foot"];
    		if(parameters != null && typeof(parameters) == "object"){
    		var foot = parameters["foot"];
    		if (foot != null){
	    		for(var p in foot){   			
	    			var value = foot[p];
	    			if (value != null && typeof(value) == "string"){
	    				if (value=="${sum}"){
							if(p>=1&&columns.length>1)
							_foot[p]=dataStore.getRowSet().sum(columns[p-1]["name"]);
	    					//_foot[p] = dataCenter.getParameter(value.substring(2, value.length - 1));
	    				}else{
	    					_foot[p] = value;
	    				}
	    			}else{
	    				_foot[p] = value;
	    			}
	    		}
    		}
    		var head = parameters["head"];
    		if (head != null){
    			var value = head;
	    		if (value != null && typeof(value) == "string"){
	    			if (value.indexOf("${") === 0 && value.lastIndexOf("}") === value.length - 1){
	    				_parameters["head"] = dataCenter.getParameter(value.substring(2, value.length - 1));
	    			}else{
	    				_parameters["head"] = value;
	    			}
	    		}else{
	    			_parameters["head"] = value;
	    		}
    		}else{
    			_parameters["head"] = null;
    		}
    	}
		try{
			new ActiveXObject("CHINAEXCELWEB.FormvwCtrl.1");
		}catch(e){
		var iframe=document.createElement("<iframe  src='"+unieap.WEB_APP_NAME+"/unieap/plugin/chinaexcel.htm'   style='display:none'>");
		document.getElementById('dijit-popupBody').appendChild(iframe);
		iframe.contentWindow.callback=dojo.hitch(this,function(bool){
			if(bool)unieap.Action.chinaExcelPrint(rs, columns, _parameters);
			iframe.src="";
			iframe.removeNode(true);
		});
		return;
		}
		unieap.Action.chinaExcelPrint(rs, columns, _parameters);
	}
    unieap.Action.chinaExcelPrint =function(rs, columns, _parameters){
		
		window.showModalDialog(unieap.WEB_APP_NAME + "/unieap/pages/dwexport/default.htm", {
        "title": '统一标题',
        "rowset": rs,
        "structureInfo": columns,
        "parameters": _parameters
    	}, "dialogHeight=500px;dialogWidth=800px;titlebar=0;resizable=1");
		
	}
     
	
	/**
	 * 向消息中心发送一个消息，格式为{title:"aaa", content: "aaaaaaa"}，可以指定的类型有
	 * 消息标题：一个简短的描述
	 * 消息内容：详细描述信息
	 * 消息类型：根据类型显示用户响应模式
	 * @param {Object} msg
	 */
	unieap.Action.pubMsg = function (msg) {
		dojo.require("dijit.Dialog");
		var dialog = null;
		if (msg == null || arguments.length == 0) {
			return;
		}
		if (msg.title) {
			dialog = new dijit.Dialog({title: msg.title});
		}
		else {
			dialog = new dijit.Dialog({title: ""});
		}
		
		content = msg.title ? msg.title : "";
		content += ": \n<br/><br/>";		
		content += msg.content ? msg.content : (msg.title ? msg.title : "");
		content=dojo.toJson(content,true);
		dialog.setContent(content);
		dialog.show();
		if(dojo.marginBox(dialog.domNode).w > 500){//必须在show方法之后,dongyuwei added
			dojo.style(dialog.domNode,"width","500px");
		}
		dojo.global.setTimeout(function() {
			if (dialog) {
				dialog.duration = 5000;
				dialog.destroy();
			}
		},4000);
	}
	/**
	 * 上传文件方法
         * @param {Object} args 以下为详细说明 
         * content 要一起提交到后台的参数
         *        形式键值对对象，如{role: "admin", dept: "telcom"}，</br>
		 * 		  在服务器端通过getParameter方法可以取得</br>
         * url  必填项，向服务器请求的URL，如/eapdomain/upload.do?method=upload</br>
         * container 要提交的容器，可以为form，body或div等，在此区域内的file类型的input将被提交
         * load 返回成功的回调函数
         * error 返回失败的回调函数
         * checkMethod 对上传文件进行检查的函数，返回true成功，false失败
	 */
unieap.Action.upload=function(args){
		dojo.require("dojo.io.iframe");
		var contentToSub = args["content"];
		var action = args["url"];
		var container = args["container"];
		var load = args["load"];
		var error = args["error"];
		var checkMethod = args["checkMethod"];
		var scope = args["scope"];
		if(!scope){
			scope = window;
		}
		var submitForm=document.createElement("form");
		if(container){
		if(container.tagName.toLowerCase()=="form"){
	    for(var i=0;i<container.length;i++){
		   var elem=container.elements[i];
         if(elem.type=="file"){
         	if(checkMethod && !checkMethod(elem.value)){
         		return;
         	}
        	var file = unieap.byId(elem.id);
        	if(file){
        	 if(file.collect==true){
			   var elemClone=dojo.clone(elem);
			   var parentNode=elem.parentNode;
			   var elem1=parentNode.replaceChild(elemClone,elem);
			   file.fileInput = elemClone; 
        	   file._listener = dojo.connect(file.fileInput,"onchange",file,"_matchValue");
		       file._keyListener = dojo.connect(file.fileInput,"onkeyup",file,"_matchValue");
		       file._mouseover = dojo.connect(file.fileInput, "onmouseover", file,"_onbuttonover");
			   file._mouseout = dojo.connect(file.fileInput, "onmouseout", file,"_onbuttonout");
			   file._fileclick = dojo.connect(file.fileInput, "onclick", file,"_onclick");
		       file.inputNode.value="";
			   elem1.style.display="none";
			   submitForm.appendChild(elem1);
			   }
          }
          else{
          	   if(elem.collect==undefined||elem.collect=="true"){
			  	var elemClone=dojo.clone(elem);
			    var parentNode=elem.parentNode;
			    var elem1=parentNode.replaceChild(elemClone,elem);	   	
			    elem1.style.display="none";
			    submitForm.appendChild(elem1);
          	   }
			  }
        }
	    }
		}
	   else if(container.tagName.toLowerCase()=="body"||container==null||container==""){
			var inputs=document.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++){
			  if(inputs[i].type=="file"){
			  	if(checkMethod && !checkMethod(inputs[i].value)){
	         		return;
	         	}
			    var file = unieap.byId(inputs[i].id);
			  if(file){
			  if(file.collect==true){
			   var elemClone=dojo.clone(inputs[i]);
			   var parentNode=inputs[i].parentNode;
			   var elem1=parentNode.replaceChild(elemClone,inputs[i]);
			   			   		
        	   		file.fileInput = elemClone; 
        	   		file._listener = dojo.connect(file.fileInput,"onchange",file,"_matchValue");
		            file._keyListener = dojo.connect(file.fileInput,"onkeyup",file,"_matchValue");
		            file._mouseover = dojo.connect(file.fileInput, "onmouseover", file,"_onbuttonover");
			        file._mouseout = dojo.connect(file.fileInput, "onmouseout", file,"_onbuttonout");
			        file._fileclick = dojo.connect(file.fileInput, "onclick", file,"_onclick");
		            file.inputNode.value="";
			   elem1.style.display="none";
			   
			   submitForm.appendChild(elem1);
			   }
			  }
			 else{
			 	if(inputs[i].collect==undefined||inputs[i].collect=="true"){
			  	var elemClone=dojo.clone(inputs[i]);
			    var parentNode=inputs[i].parentNode;
			    var elem1=parentNode.replaceChild(elemClone,inputs[i]);	   	
			    elem1.style.display="none";
			    submitForm.appendChild(elem1);
			 	}
			  }
			  }
			}
		}
		else{
	         var inputs=container.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++){
			  if(inputs[i].type=="file"){
			  	if(checkMethod && !checkMethod(inputs[i].value)){
	         		return;
	         	}
			   var file = unieap.byId(inputs[i].id);
			  if(file){
			  if(file.collect==true){
			   var elemClone=dojo.clone(inputs[i]);
			   var parentNode=inputs[i].parentNode;
			   var elem1=parentNode.replaceChild(elemClone,inputs[i]);			   		
        	   		file.fileInput = elemClone; 
        	   		file._listener = dojo.connect(file.fileInput,"onchange",file,"_matchValue");
		            file._keyListener = dojo.connect(file.fileInput,"onkeyup",file,"_matchValue");
		            file._mouseover = dojo.connect(file.fileInput, "onmouseover", file,"_onbuttonover");
			        file._mouseout = dojo.connect(file.fileInput, "onmouseout", file,"_onbuttonout");
			        file._fileclick = dojo.connect(file.fileInput, "onclick", file,"_onclick");
		            file.inputNode.value="";
			   elem1.style.display="none";
			   
			   submitForm.appendChild(elem1);
			   }
			  }
			  else{			  
			   if(inputs[i].collect==undefined||inputs[i].collect=="true"){
			  	var elemClone=dojo.clone(inputs[i]);
			    var parentNode=inputs[i].parentNode;
			    var elem1=parentNode.replaceChild(elemClone,inputs[i]);	   	
			    elem1.style.display="none";
			    submitForm.appendChild(elem1);
			 	}
			  }
			  }
			}
		}
		}
		else{
			var inputs=document.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++){
			  if(inputs[i].type=="file"){
			  	if(checkMethod && !checkMethod(inputs[i].value)){
	         		return;
	         	}
			   var file = unieap.byId(inputs[i].id);
			  if(file){
			   if(file.collect==true){
			    var elemClone=dojo.clone(inputs[i]);
			    var parentNode=inputs[i].parentNode;
			    var elem1=parentNode.replaceChild(elemClone,inputs[i]);	   		
        	    file.fileInput = elemClone; 
        	    file._listener = dojo.connect(file.fileInput,"onchange",file,"_matchValue");
		        file._keyListener = dojo.connect(file.fileInput,"onkeyup",file,"_matchValue");
		        file._mouseover = dojo.connect(file.fileInput, "onmouseover", file,"_onbuttonover");
			    file._mouseout = dojo.connect(file.fileInput, "onmouseout", file,"_onbuttonout");
			    file._fileclick = dojo.connect(file.fileInput, "onclick", file,"_onclick");
		        file.inputNode.value="";
			    elem1.style.display="none";
			    submitForm.appendChild(elem1);
			   }
			  }
			  else{
			  if(inputs[i].collect==undefined||inputs[i].collect=="true"){
			  	var elemClone=dojo.clone(inputs[i]);
			    var parentNode=inputs[i].parentNode;
			    var elem1=parentNode.replaceChild(elemClone,inputs[i]);	   	
			    elem1.style.display="none";
			    submitForm.appendChild(elem1);
			 	}
			  }
			  }
			}
		}
	    var content={};
	   for(var x in contentToSub){
	   	  content[x]=contentToSub[x];
	   }
	   
	    submitForm.action=action;
	    if( dojo.isIE){
                encType = submitForm.getAttributeNode("enctype");
                encType.value = "multipart/form-data";
                formMethod = submitForm.getAttributeNode("method");
                formMethod.value = "POST";
        }else{
                submitForm.setAttribute("enctype", "multipart/form-data");
                submitForm.setAttribute("method","POST");
        }
	    
	    submitForm.method="post";
		submitForm.name="forSubmit";
	    submitForm.id="forSubmit";
	    document.body.appendChild(submitForm);
	    unieap.showLoading(true);
        dojo.io.iframe.send({
			form:submitForm,
			handleAs: "html",
			content: content,
			load: function(response, ioArgs){
			    unieap.showLoading(false);
			    if(load && scope){
					try{
			    		load.call(scope,new unieap.ds.DataCenter(dojo.fromJson(response.body.innerText)));//执行空间为scope
			    	}
			    	catch(e){//避免load成功以后的错误会激发error回调
			    		alert("文件上传成功；但回调方法出错！"+dojo.toJSON(e,true));
			    		alert(load.toSource());
			    		console.error(e);
			    	}
				}				
			},
			error: function(response, ioArgs){	
				if(error && scope){
					error.call(scope,new unieap.ds.DataCenter(dojo.fromJson(response.body.innerText)));
				}else{
					alert("upload failed,please check error and scope! see /ria/unieap/rpc.js");
				}
			}
			});
		document.body.removeChild(submitForm);
        submitForm = null;
		
	}
	/**
	 * 初始化代码缓存，检测时间戳，如果不一致读取相应数据和时间戳存储到客户端缓存内
	 * @param {Boolean|null} fetchAll 是否取所有数据，默认false或null
	 */
	unieap.cache.loadCodeList = function(fetchAll,appName) {
		var loading = document.createElement("div");
		loading.style.cssText = "position:absolute;bottom:0px;left:0px;overflow:hidden;height:20px;border:1px solid #eee;width:120px;background:#fff;font:12px;";
		loading.innerHTML = "正在装载数据...";
		document.body.appendChild(loading);
		var db = unieap.cache._initDB();
		if (db == null) {
			return;
		}
		var webAppName;
		if(appName==null){
			webAppName = unieap.WEB_APP_NAME;
		}else{
			webAppName = appName;
		}
		fetchAll = !(fetchAll!=true);
		var version = unieap.cache.get(unieap.cache.CODELIST_VERIOSN);
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(new unieap.ds.DataStore("timestamp",[dojo.fromJson(version || "{}")]));		
		unieap.Action.requestData({
			url : webAppName + "/ria_codelist.do",
			sync : false,
			parameters : {
				method : "initCodeList",				
				fetchAll : fetchAll
			},			
			load : function(dc) {
					if (dc == null) return;
					var version = dojo.fromJson(dc.getParameter(unieap.cache.CODELIST_VERIOSN)),
						  data = unieap.cache.get(unieap.cache.CODELIST_VERIOSN),
						  timestamp = data && dojo.fromJson(data) || {};
				    var keys = [];
				    var values = [];
					for(var name in dc.dataStores){
						var ds = dc.dataStores[name];
						delete timestamp[name];
						if(ds.isFullData()){
							keys.push(name);
							values.push(ds.getRowSet().toBufJson("primary"));
							version[name]!=null && (timestamp[name] = version[name]);
						}
						else{				
							unieap.cache.remove(name);
						}
					}
					unieap.cache.putMultiple(keys,values);
					unieap.cache.put(unieap.cache.CODELIST_VERIOSN,dojo.toJson(timestamp));
					loading.style.visibility = "hidden";
					},
				timeout:5000,
				error:function(text){
					loading.innerHTML="装载缓存数据失败。";
				}
					},dc,false);
	
	};
	/**
	 * 把从服务器端取出的数据放到客户端缓存内，并修改时间戳
	 * @param {unieap.ds.DataCenter} dc 从服务器端返回的上下文
	 * @param {unieap.ds.DataCenter} store 存储combobox数据的上下文
	 */
	unieap.cache.putCodeList = function(dc,store) {
		if (dc == null) return;
		var version = dojo.fromJson(dc.getParameter(unieap.cache.CODELIST_VERIOSN)),
			  data = unieap.cache.get(unieap.cache.CODELIST_VERIOSN),
			  timestamp = data && dojo.fromJson(data) || {};
		for(var name in dc.dataStores){
			var ds = dc.dataStores[name];
			delete timestamp[name];
			if(ds.isFullData()){
				unieap.putCodeList(ds,store);
				version[name]!=null && (timestamp[name] = version[name]);
			}
			else{				
				unieap.cache.remove(name);
			}
		}
		unieap.cache.put(unieap.cache.CODELIST_VERIOSN,dojo.toJson(timestamp));
	}


//	 //liu-j暂时添加
//      
//       dojo.declare("unieap.ds.POJOStore",unieap.ds.DataStore,{       
//         fetch : null,
//         interaction : null,      
//         //paras : {},     
//     	 setPOJOName : function(name){     	 	
//           this.rowSetName="pojo_".concat(name);              
//         },
//         getPOJOName : function(){
//              return this.rowSetName.substring(this.rowSetName.indexOf("pojo_")==0 ? 5 :0);
//         },         
//     	 setFetch : function(value){
//     		this.fetch = value;
//     	 },
//     	 getFetch : function(){
//     		return this.fetch;
//     	 },
//     	 setInteraction : function(value){
//     		this.interaction = value;
//     	 },
//     	 getInteraction : function(){
//     		return this.interaction;
//     	 }
//     });
//    
//     unieap.cache.loadDataStore=function (callback){
////      		var cache= dojox.storage;
//	
//      		unieap.cache.syncStoreStamp();    	
//      }
//
//      unieap.cache.syncStoreStamp=function syncStoreStamp(){
//	
//		//获得当前GoogleGears中保存的所有DataStore的时间戳，并转为DataStore
//		dojo.require("dojox.sql");
//   		dojo.require("dojox.storage");
//		var cache= dojox.storage;
//		var list=cache.getKeys("TimeStampNameSpace");
//		var parameters;
//		var stampString="[";
//		var num=0;//统计store数
//		
//		dojo.forEach(list,function(storeName){
//			var stamp=dojox.storage.get(storeName,"TimeStampNameSpace");
//			if(stamp==null)
//			  stamp="";
//			 else
//			 	stamp=stamp.toString();
//			stampString+="{storeName:'"+storeName+"',storeStamp:'"+stamp+"'},";		
//			num++;
//		});
//		if(num)
//			stampString = stampString.substring(0,stampString.length-1);//除去最后一个逗号
//		stampString+="]";
//		var stampStore= new unieap.ds.POJOStore("timeStamp",eval(stampString));	//生成DataStore
//		stampStore.setPOJOName("com.neusoft.unieap.riademo.bl.CatchStamp");
//		var dc = new unieap.ds.DataCenter();
//		dc.addDataStore(stampStore);
//		var requestURL=unieap.WEB_APP_NAME + "/ria_gearcache.do?method=getChangedStore";
//		var dc1=unieap.Action.requestData({
//			url: requestURL,
//			sync:true						
//			},dc
//			);
//		var changedStore=dc1.getDataStore("timeStamp");//获取改变的datastore
//		changedStore.getRowSet().forEach(function(item){
//			dojox.storage.remove(item.getItemValue("storeName"),"TimeStampNameSpace");
//			dojox.storage.remove(item.getItemValue("storeName"),"DataStoreNameSpace");	
//		});
//	
//	 }
	
}
