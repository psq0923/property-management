$(function(){

		
		$.ajax({
			url:"findAllBuilding2.action",
			type:"post",
			
			dataType:"json",
			 error:function(){
				
				alert("查找出错！！！！！");
			},
			success:function(data){
				
			    
				//alert(data);
				//children()找到apartment div 所有子元素
				//remove()移除当前匹配元素中符合指定选择器的部分元素
				$("#building_id").children().remove();
				$("#building_id").append("<option>请选择</option>");
				
				for(var i=0;i<data.length;i++){
					 var building_id = data[i][0]; 
					 var building_name = data[i][1];
					$("#building_id").append("<option  value='"+building_id+"'>"+building_name+"</option>");

					
				}
			}
		});
	});