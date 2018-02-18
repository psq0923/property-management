$(function(){

		//alert("111");
		$.ajax({
			url:"findAllGoods.action",
			type:"post",
			//data:"name="+id,
			dataType:"json",
			 error:function(){
				// alert(111111111111	);
				alert("查找出错！！！！！");
			},
			success:function(data){
				//alert(data);
				//children()找到apartment div 所有子元素
				//remove()移除当前匹配元素中符合指定选择器的部分元素
				$("#goods").children().remove();
				$("#goods").append("<option>请选择</option>");
				for(var i=0;i<data.length;i++){
					var goods_id=data[i][0];
					var goods_name=data[i][1];
					$("#goods").append("<option id='apart' value='"+goods_id+"'>"+goods_name+"</option>");

					
				}
			}
		});
	});