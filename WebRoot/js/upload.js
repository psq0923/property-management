var UPLOAD_URL = uniportal.WEB_APP_NAME + "/ecplatform/upload.do";

function openUploadWindow(displayDivId, uploadFileIdContainerId, width, height, allownedExtension) {
	var type = "";
	if(allownedExtension != null) {
		type = allownedExtension;
	}
	 _DialogUtil.showDialog({
     url:UPLOAD_URL + "?method=showUploadPage&displayDivId=" + displayDivId + "&uploadFileIdContainerId=" + uploadFileIdContainerId + "&allownedExtension=" + type,
     width:width,
     height:260,
     title:"上传文件",
     onComplete:uploadSuccess});
     function uploadSuccess(value){
       if (value && value.id !="") {
          var uploadListDiv = document.getElementById("uploadList");
		  var html = '<li id="item_'+value.id+'"><a href="' + uniportal.WEB_APP_NAME + '/upload.do?method=download&id='+value.id+'&type=original"  title="点击下载">'+value.name+'</a>' +
						'<span style="padding-left:10px;"><a href="#" onclick="toDeleteUploadFile(\''+value.id+'\');return false;">删除</a></span></li>';
	       uploadListDiv.innerHTML += html;
	       var uploadFileIdContainer = document.getElementById("uploadIds");
		   uploadFileIdContainer.value += value.id + ";";
       }
     }
}

function toDeleteUploadFile(id) {
	_DialogUtil.showDialog({
     url:UPLOAD_URL + "?method=preDelete&id=" + id,
     width:450,
     height:260,
     title:"删除文件",
     onComplete:deleteFileSuccess});
     function deleteFileSuccess(value){
         if (value != null && value != "") {
            var id = value;
			var itemId = "item_" + id;
			var node = document.getElementById(itemId);
			if (node) {
			  node.parentNode.removeChild(node);
			}
			var uploadIdsObj = document.getElementById("uploadIds");
			var s = uploadIdsObj.value;
			s = s.replace(id + ';','');
			uploadIdsObj.value = s;
	     }
     }
}


function formatFileSizeAutoUnit(size) {
	if (size >= 1024 * 1024) {
		return formatFileSizeWithUnit(size, "MB");
	} else {
		if (size < 1024 * 1024 && size > 1024) {
			return formatFileSizeWithUnit(size, "KB");
		} else {
			if (size <= 1024) {
				return formatFileSizeWithUnit(size, "B");
			}
		}
	}
}

function formatFileSizeWithUnit(size, unit) {
	var factor = 1;
	if (unit == "KB" || unit == "kb") {
		factor = 1024;
	} else {
		if (unit == "MB" || unit == "mb") {
			factor = 1024 * 1024;
		} else {
			unit = "B";
		}
	}
	var fileSize = size / factor;
	fileSize = fileSize.toString();
	var dotPos = fileSize.indexOf(".");
	if (unit != "MB") {
		if (dotPos != -1) {
			fileSize = fileSize.substring(0, dotPos);
		}
	} else {
		if (dotPos != -1) {
			if (dotPos == fileSize.length - 2) {
				fileSize = fileSize.substring(0, dotPos + 2);
			} else {
				(dotPos >= fileSize.length - 3);
			}
			fileSize = fileSize.substring(0, dotPos + 3);
		}
	}
	return fileSize + unit;
}
function downloadUploadFile(id, type) {
	var width="50";
	var height="50";
	var top = ( window.screen.height - height ) / 2;
	var left = ( window.screen.width - width ) / 2;
	var feture = "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
	var win = window.open(uniportal.WEB_APP_NAME +"/ecplatform/oaFramework/pages/upload/download.jsp?id=" + id + "&type=" + 
		(type != null ?  type : "original"), "uploader", feture);
}
