/*
*数据储存
*/
var apiData=[];
var input=document.getElementById("input_word");

/*读取表单*/
function getInput(){
	var input_word=input.value;
	if(!/^\s*\d+\s*$/.test(input_word)){
		alert("输入的不是合法数字");
		input.focus();
		return false;
	}
	input_word=input_word.replace(/(^\s*)|(\s*$)/g);//删除左右两端空格


	//hack
	if(input_word==000){apiData=[];renderChar();return false;};
	if(input_word==111){initData(100,10);renderChar();return false};
	if(input_word==333){initData(100,40);renderChar();return false};
	if(input_word==666){initData(80,45);renderChar();return false};
	if(input_word==999){initData(100,60);renderChar();return false};

	if(apiData.length()>=60){
		alert("超过输入限制（60个），请删除不需要的数据在输入");
		return false;
	}
	if(input_word<10||input_word>100){
		alert("请输入10-100之间的整数");
		input.focus();
		return false;
	}

	return input_word;
}




/*左侧入*/
function insertLeft(){
	var inputText=getInput();
	if(inputText===false) return;
	//c 储存
	apiData.unshift(inputText);

	//渲染图标
	renderChar();
}




/*右侧入*/
function insertRight(){
	var inputText=getInput();
	if(inputText===false) return;

	apiData.push(inputText);
	//渲染图标
	renderChar();
}




//左侧出
function deleteLeft(){
	if(apiData.length===0){
		alert("已无数据");

		return false;
	};

	//删除
	alert("删除'"+apiData.shift()+"'!");

	//渲染图标
	renderChar();
}


//右侧出
function deleteRight(){
	if(apiData.length===0){
		alert("已无数据");
		return false
	};
	//删除
	alert("删除'"+apiData.pop()+"'!");

	//渲染图标
	renderChar();
}


/*点击删除*/
function deleteThis(index){
	//删除
	apiData.splice(index,1);  //插入、删除或替换数组的元素。index 必需。规定从何处添加/删除元素

	//渲染图标
	renderChar();
}





/*sortAqiData   对data进行从小到大排序  返回一个排序后的数组*/
var flag=0;
function sortAqiData(){
	var i=apiData.length-1;
	var t;

	sortAqiData.moveOne=function(){
		renderChar();
			var temp=apiData[i];
		var index=i;
		for(var j=0;j<i;j++){
			if(flag===0 && apiData[j]>temp){
				temp=apiData[j];
				index=j;
			}else if(flag===1 && apiData[j]<temp){
				temp=apiData[j];
				index=j;
			}
		}

		document.getElementById("api-display").childNodes[index].style.backgroundColor="red";
			document.getElementById("api-chart").childNodes[index].style.backgroundColor="red";
		apiData.splice(index,1);
		apiData.push(temp);
		i--;
		if(i<0){
			clearInterval(t);//函数用于取消 setInterval() 函数设定的定时执行操作
			renderChar();
			if(flag===0){
				flag=1;
			}else if(flag===1){
				flag=0;
			}
		}
	}

	t=setInterval("sortAqiData.moveOne()",50);//每过0.05秒钟就执行一次,函数调用自己
}



function renderChart(){
	var api_display=document.getElementById("api-display");
	var api_chart=document.getElementById("api_chart");

	//设定高度

	var chartwidth=function(){
		if(apiData.length<10){
			return "50px";
		}else if(apiData.length<=30){
			return "15px";
		}else if(apiData.length>30){
			return "9px";
		}
	}();

	var charColour=function(height){
		if(height>=0 && height<15){
			return "#441d49";
		}else if(height> 15 && height< 25){
			return "#538289";
		}else if(height>= 25 && height< 45){
			return "#a02730";
		}else if(height >= 45 && height < 65){
	      return "#73832a";
	    }else if(height >= 65 && height < 80){
	      return "#005db1";
	    }else if(height >= 80 && height <= 100){
	      return "#10193a";
	    }else{
	      return "gray";
	    }
	};

	api_chart.style.width="628px;";
	api_chart.style.height="300px";
	api_chart.style.lineHeight="600px";
	api_chart.style.textAlign="center";
	api_chart.innerHTML="";

	api_display.style.width="628px";
	api_display.style.margin="10px 0px 0px 0px";
	api_display.innerHTML="";


	for(var i=0;i<apiData.length;i++){
		api_chart.innerHTML+="<span onclick=deleteThis("+i+") style=display:inline-block;margin-left:1px;width"
						   +chartwidth+";height:"
						   +apiData[i]*3+"px;background-Color:"
						   +charColour(apiData[i])+";cursor:pointer;'title='删除该项：NO."+i+",值："+apiData[i]+"'>";
		api_display.innerHTML+="<span onclick=deleteThis("+i+") title='删除该项：NO."+i+",值:"+apiData[i]+"' style='display:inline-block;cursor:pointer;background-Color:"
						     + chartColor(apiData[i]) +";font-size:20px; color:#fff;height:30px;padding:0 10px;line-height:30px;margin:5px 0 5px 5px;'>"
                             + apiData[i] + "</span>";
	}

}





/*绑定案件事件*/
function initBtnEvent(){
	var inser_left=document.getElementById("insert-left");
	var insert_right=document.getElementById("insert-right");
	var delete_left=document.getElementById("delete-left");
	var delete_right=document.getElementById("delete-right");
	var sore_aqi_data=document.getElementById("sort-aqi-data");

	inser_left.onclick=function(){insertLeft();};
	insert_right.onclick=function(){insertRight();};
	delete_left.onclick=function(){deleteLeft();};
	delete_right.onclick=function(){deleteRight();};
	sort_aqi_data.onclick=function(){sortAqiData();};
}




/*初始化赋值给apiDaa*/
function initData(seed,num){
	if(seed<10 && seed >100 && num<0 && num>60)return console.log("initData Error!");
	apiData=[];
	for(var i=0;i<num;i++){
		apiData[apiData.length]=Math.ceil(Math.random()*(seed-10)+10);
	}
}






/*初始化*/
function init(){
	initData(80,45);
	initBtnEvent();
	renderChar();
}

init();