$(".header-left")
	.on("mouseenter",function(e){
		$("#header-location").removeClass("header-dishover").addClass("header-hover");
		$("#location-sel").css("display","block");
	})
	.on("mouseleave",function(e){
		$("#header-location").removeClass("header-hover").addClass("header-dishover");
		$("#location-sel").css("display","none");
	})

$(".header-left a")
	.on("mouseenter",function(e){
		if($(this).get(0).className.indexOf("header-active")==-1){
			$(this).removeClass("header-inactive").addClass("header-a-hover");
		}
		
	})
	.on("mouseleave",function(e){
		if($(this).get(0).className.indexOf("header-active")==-1){
			$(this).removeClass("header-a-hover").addClass("header-inactive");
		}
	})

$(".header-left a")
	.on("click",function(e){
		e.preventDefault();
		$(".header-active").removeClass("header-active").addClass("header-inactive");
		$(this).removeClass("header-inactive").addClass("header-active");
	})

$("#myjd")
	.on("mouseenter",function(e){
		$("#myjd-cap").removeClass("header-dishover").addClass("header-hover");
		$(".header-myjd").css("display","block");
	})
	.on("mouseleave",function(e){
		$("#myjd-cap").removeClass("header-hover").addClass("header-dishover");
		$(".header-myjd").css("display","none");
	})

$("#mykf")
	.on("mouseenter",function(e){
		$("#mykf-cap").removeClass("header-dishover").addClass("header-hover");
		$(".header-mykf").css("display","block");
	})
	.on("mouseleave",function(e){
		$("#mykf-cap").removeClass("header-hover").addClass("header-dishover");
		$(".header-mykf").css("display","none");
	})	

$("#mynav")
	.on("mouseenter",function(e){
		$("#mynav-cap").removeClass("header-dishover").addClass("header-hover");
		$(".header-mynav").css("display","block");
	})
	.on("mouseleave",function(e){
		$("#mynav-cap").removeClass("header-hover").addClass("header-dishover");
		$(".header-mynav").css("display","none");
	})	

// 导航的延时、去抖、预测用户行为
var activeRow;
var activeMenu;
var timer0;
var mouseInNav=false;
var mouseTrack=[];
var moveHandler=function(e){
	mouseTrack.push({
		x: e.pageX,
		y: e.pageY
	})
	if(mouseTrack.length>3){
		mouseTrack.shift();
	}
}

$("#section2-nav li").on("mouseenter",function(){
	 mouseInNav=true;
}).on("mouseleave",function(){
	 mouseInNav=false;
})

$("#section2-nav").on("mouseenter",function(){
	$(document).bind("mousemove",moveHandler);
}).on("mouseleave",function(){
	$(document).unbind("mousemove",moveHandler);
})

$("#section2-nav").on("mouseenter","li",function(e){
	if(timer0){
		clearTimeout(timer0);
	}
	if(!activeRow){
		activeRow=$(e.target).addClass("section2-nav-active");
		activeMenu=$("#"+$(e.target).data("id")).css("display","block");
	}

	var currentPos=mouseTrack[mouseTrack.length-1];
	var leftCorner=mouseTrack[mouseTrack.length-2];
	var delay=needDelay($("#section2-nav"),currentPos,leftCorner);

	if(delay){ 
		timer0=setTimeout(function(){
			if(!mouseInNav){
				return;
			}
			activeRow.removeClass("section2-nav-active");
			activeMenu.css("display","none");
			activeRow=$(e.target).addClass("section2-nav-active");
			activeMenu=$("#"+$(e.target).data("id")).css("display","block");
			timer0=null;	
		},300)
	}
	else{
			activeRow.removeClass("section2-nav-active");
			activeMenu.css("display","none");
			activeRow=$(e.target).addClass("section2-nav-active");
			activeMenu=$("#"+$(e.target).data("id")).css("display","block");
	}
	
}).on("mouseleave",function(){
	activeRow.removeClass("section2-nav-active");
	activeMenu.css("display","none");
})
// banner图轮播
var bannerIndex=1;
var gtJug=true;
var ltJug=true;
// 阻止选择内容
$(".section2-banner-gt:first").on("selectstart",function(){
	return false;
})

$(".section2-banner-gt:first").on("click",function(){
	if(gtJug===true){
		gtJug=false;
		if(bannerIndex<8){
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			$(".section2-banner-nav div:nth-child("+(bannerIndex+1)+")").addClass("section2-banner-nav-on");
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				bannerIndex++;
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(200,function(){
					gtJug=true;
				});
			});
		}
		else{
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			$(".section2-banner-nav div:nth-child("+1+")").addClass("section2-banner-nav-on");
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				bannerIndex=1;
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(150,function(){
					gtJug=true;
				});
			});
		}
	}
	else {
		return;
	}
})
// 取消选择
$(".section2-banner-lt:first").on("selectstart",function(){
	return false;
})

$(".section2-banner-lt:first").on("click",function(){
	if(ltJug===true){
		ltJug=false;
		if(bannerIndex>1){
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			$(".section2-banner-nav div:nth-child("+(bannerIndex-1)+")").addClass("section2-banner-nav-on");
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				bannerIndex--;
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(150,function(){
					ltJug=true;
				});
			});
		}
		else{
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			$(".section2-banner-nav div:nth-child("+8+")").addClass("section2-banner-nav-on");
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				bannerIndex=8;
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(150,function(){
					ltJug=true;
				});
			});
		}
	}
})
//debounce
var timer1;
$(".section2-banner-nav").on("mouseenter","div",function(){
	var that=$(this);
	if(timer1){
		clearTimeout(timer1);
	}
	if(that.get(0).className!=="section2-banner-nav-on"){
		timer1=setTimeout(function(){
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			that.addClass("section2-banner-nav-on");
			timer1=null;
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				bannerIndex=$(".section2-banner-nav div").index(that)+1;
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(150,function(){
				});
			});
		},200)
	}
})

var timer2;
var bannerOut=true;
$("#section2-banner")
	.on("mouseenter",function(){
		bannerOut=false;
	})
	.on("mouseleave",function(){
		bannerOut=true;
	})
$(document).ready(function(){
	timer2=setInterval(function(){
		if(bannerOut){
			$(".section2-banner-nav-on").removeClass("section2-banner-nav-on");
			if(bannerIndex<8){
				$(".section2-banner-nav div:nth-child("+(bannerIndex+1)+")").addClass("section2-banner-nav-on");
			}
			else{
				$(".section2-banner-nav div:nth-child(1)").addClass("section2-banner-nav-on");
			}
			$(".section2-banner-item:nth-child("+bannerIndex+")").fadeOut(150,function(){
				if(bannerIndex<8){
					bannerIndex++;
				}
				else {
					bannerIndex=1;
				}
				$(".section2-banner-item:nth-child("+bannerIndex+")").fadeIn(150);
			});
		}
		else{
			return;
		}
	},3000)
})

$(".section2-right-news-cap-div:nth-child(2)").mouseenter(function(){
	$(".section2-right-news-bar").stop().animate({
		marginLeft: 52
	},300)
	$("#section2-right-news-contant div:last-child").addClass("section2-on");
	$("#section2-right-news-contant div:first-child").removeClass("section2-on");
})

$(".section2-right-news-cap-div:nth-child(1)").mouseenter(function(){
	$(".section2-right-news-bar").stop().animate({
		marginLeft: 0
	},300);
	$("#section2-right-news-contant div:first-child").addClass("section2-on");
	$("#section2-right-news-contant div:last-child").removeClass("section2-on");
})


var aa=$("#hfcz");
$(".section2-right-hid-top1 a")
	.on("mouseenter",function(e){
		aa.removeClass("hf-on");
		aa=$("#"+$(this).data("id"));
		aa.addClass("hf-on");
	})

$("#hfcz-number").on("change",function(){
	var a=$(this).find(":selected").text();
	var b;
	switch(a){
		case "10元":
			b="￥9.8-￥11.0";
			break;
		case "20元":
			b="￥19.6-￥21.0";
			break;
		case "30元":
			b="￥29.4-￥31.0";
			break;
		case "50元":
			b="￥49.0-￥50.0";
			break;
		case "100元":
			b="￥98.0-￥100.0";
			break;
		case "200元":
			b="￥196.0-￥200.0";
			break;
		case "300元":
			b="￥294.0-￥300.0";
			break;
		case "500元":
			b="￥490.0-￥500.0";
			break;
	}
	$("#hfcz-number+span").text(b);
})

$("#llcz-number").on("change",function(){
	var a=$(this).find(":selected").text();
	var b;
	switch(a){
		case "50M":
			b="￥7.5-￥10.0";
			break;
		case "100M":
			b="￥9.95-￥20.0";
			break;
		case "200M":
			b="￥19.9-￥20.5";
			break;
		case "300M":
			b="￥29.0-￥29.9";
			break;
		case "500M":
			b="￥49.0-￥50.0";
			break;
	}
	$("#llcz-sp").text(b);
})

$("#tcbg-number").on("change",function(){
	var a=$(this).find(":selected").text();
	var b;
	switch(a){
		case "38元":
			b="50分钟300M流量";
			break;
		case "48元":
			b="50分钟500M流量";
			break;
		case "58元":
			b="100分钟500M流量";
			break;
		case "88元":
			b="220分钟700M流量";
			break;
		case "138元":
			b="500分钟1G流量";
			break;
		case "158元":
			b="500分钟2G流量";
			break;
		case "238元":
			b="1000分钟2G流量";
			break;
		case "268元":
			b="1000分钟3G流量";
			break;
		case "338元":
			b="2000分钟3G流量";
			break;
		case "588元":
			b="4000分钟6G流量";
			break;
	}
	$("#tcbg-number+span").text(b);
})

$(".travel-wf").on("change",function(){
	$(".date input:nth-child(2)").css("width","103px");
	$(".date input:last-child").css("display","inline-block");
})


$(".travel-dc").on("change",function(){
	$(".date input:nth-child(2)").css("width","130");
	$(".date input:last-child").css("display","none");
})


var bb=$(".jp-on");
$(".section2-right-hid-top2 a").on("mouseenter",function(){
	bb.removeClass("jp-on");
	bb=$("#"+$(this).data("id")).addClass("jp-on");
})



var aaa=$(".list-on");
var listTimer;
var aniFin=0;
var aniIn=false;
$(".ani").on("mouseleave",function(){
	aniIn=false;
})
$(".ani").on("mouseenter",function(){
	aniIn=true;
	var that=$(this);
	if(listTimer){
		clearTimeout(listTimer);
	}
	if(aniFin===0){
		//延迟上升隐藏表格
		listTimer=setTimeout(function(){
			if(aniIn){
				$(".section2-discount2").hide();
				$(".section2-discount1").text("").removeClass("section2-discount1").addClass("section2-discount3").animate({
					width:4,
					height:4
				},100);
				$(".ani-div").animate({
					bottom: 40
				},100,function(){
					aaa.removeClass("list-on");
					aaa=$("#"+that.data("id")).addClass("list-on");
					$("#section2-right-hid").animate({
						bottom: 185
					},200)
				})
				that.find(".section2-right-sev-item-name.ani-div").addClass("ani-on");
				listTimer=null;
				aniFin=1;
				}
		},300)
	}
	if(aniFin===1){
		aaa.removeClass("list-on");
		aaa=$("#"+that.data("id")).addClass("list-on");
		var bbb=$(".ani-on");
		bbb.removeClass("ani-on");
		bbb=that.find(".section2-right-sev-item-name.ani-div")
		bbb.addClass("ani-on");
	}
})
	
$(".close-hid").on("click",function(){
	$(".section2-right-sev-item-name.ani-div").removeClass("ani-on");
	aniFin=2;
	$(".section2-discount3").animate({
		width:14,
		height:14
	},100,function(){
		$(".section2-discount3").text("减").removeClass("section2-discount3").addClass("section2-discount1");
		$(".section2-discount2").show();
	});
	$(".ani-div").animate({
		bottom: 0
	},100)
	$("#section2-right-hid").animate({
		bottom:0
	},200,function(){
		aniFin=0;
	})
})


// 导航
$(".sidenav-banner2 a:first-child img")
	.on("mouseenter",function(){
		$(this).attr("src","http://img10.360buyimg.com/cms/jfs/t11215/35/200466871/13957/a0daed2/59e9d64dN7b2eeb7f.png");
	})
	.on("mouseleave",function(){
		$(this).attr("src","http://img10.360buyimg.com/cms/jfs/t7441/304/3218309989/22592/dad520fd/59e9c33bN5e1eaa59.png");
	})

var listOn=false;
$(".sidenav-list")
	.on("mouseenter",function(){
		if(!listOn){
			listOn=true;
			$(this).find(".sidenav-list-hid").slideDown(300,function(){
				listOn=false;
			});
		}
	})
	.on("mouseleave",function(){
		$(this).find(".sidenav-list-hid").slideUp(300);
	})

$(".sidenav-evm div:first-child").on("mouseenter",function(){
	$(".sidenav-evm div:last-child").animate({
		opacity:1
	},300)
})

$(".sidenav-evm").on("mouseleave",function(){
	$(".sidenav-evm div:last-child").animate({
		opacity:0
	},300)
})


//设置导航栏内部高度随浏览器大小变化
function navChange(){
	$(".sidenav-inner").css("height",function(){
		return (window.innerHeight-40)+"px";
	})
}
navChange();
window.onresize=navChange;

var timer4;
var squAni=false;
$(".sidenav-squ").on("mouseenter",function(){
	var that=$(this);
	if(timer4){
		clearTimeout(timer4);
	}
		timer4=setTimeout(function(){
		that.children(".sidenav-squ-outer").css({"background":"red","border-radius":"0px"})
		that.children(".sidenav-squ-inner").css("background","red");
		that.children(".sidenav-squ-inner").stop().animate({
				left: -35
			},200,function(){
				timer4=null;
			})
		},300)

})

$(".sidenav-bot").on("mouseleave",".sidenav-squ",function(){
	var that=$(this);
	clearTimeout(timer4);
	that.children(".sidenav-squ-inner").css("background","#7A6E6E");
	that.children(".sidenav-squ-outer").css({"background":"#7A6E6E"});
	that.children(".sidenav-squ-inner").animate({
		left: 15
	},200,function(){
		that.children(".sidenav-squ-outer").css({"border-radius":"5px 0 0 5px"})
	})
})

$(".sidenav-mid").on("mouseleave",".sidenav-squ",function(){
	clearTimeout(timer4);
	var that=$(this);
	that.children(".sidenav-squ-inner").css("background","#7A6E6E");
	that.children(".sidenav-squ-outer").css({"background":"#7A6E6E"});
	that.children(".sidenav-squ-inner").animate({
		left: 27
	},200,function(){
		that.children(".sidenav-squ-outer").css({"border-radius":"5px 0 0 5px"})
	})
})

var sidenavShow=false;
$(".sidenav-cap i").on("click",function(){
	$("#sidenav").animate({
		right:-270
	},200,function(){
		sidenavShow=false;
	})
})


$(".sidenav-show").on("click",function(){
	if(!sidenavShow){
		$("#sidenav").animate({
			right:0
		},200,function(){
			sidenavShow=true;
		})
	}
	else{
		$("#sidenav").animate({
			right:-270
		},200,function(){
			sidenavShow=false;
		})	
	}
})

