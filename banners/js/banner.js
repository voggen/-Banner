function Banner(){
	this.$oBanner = $(".banner"); //外包围
	this.$oBtnL = $(".btn_left"); //左按钮
	this.$oBtnR = $(".btn_right");//右按钮
	this.$oC = $(".cicle_list").children(); //底部圆按钮
	this.$oImg = $(".banner_list"); //图片外包围
	this.$aImg = this.$oImg.children();//图片
	this.timer = null; //定时器开关	
	this.index = 0; //代表哪张图片
	//console.log(this.$oBtnL,this.$oBtnR,this.$oC); //测试
	this.init(); //初始化绑定事件
	this.autoplay(); //定时器
}
Banner.prototype.init = function(){
	var _this =this;
	this.$oBtnL.click(function(){//点击左按钮
		_this.changeIndex("left")
	})
	this.$oBtnR.click(function(){//点击右按钮
		_this.changeIndex("right")	
	})
	this.$oC.click(function(){//点击底部圆球
		var index = $(this).index();
		_this.changeIndex(index)
	})
	this.$oBanner.mouseenter(function(){//关闭定时器
		clearInterval(_this.timer)
	})
	this.$oBanner.mouseleave(function(){//开启定时器
		_this.autoplay();
	})

}
Banner.prototype.changeIndex = function(strategy){
	var reg = /^\d+$/;
	if(reg.test(strategy)){
		this.index = strategy;
	}else{
		if(strategy == "left"){
			if(this.index == 0){
				this.$oImg
				.css({
					marginLeft:-(this.$aImg.length-1)*(this.$aImg.width())
				})
				this.index = this.$aImg.length-2;
			}else{
				this.index--;
			}
		}
		if(strategy == "right"){
			if(this.index == this.$aImg.length-1){
				this.$oImg
				.css({
					marginLeft:0
				})
				this.index = 1;
			}else{
				this.index++;
			}
		}
	}
	//console.log(this.index);
	this.changeImg(); //切换图片
}
Banner.prototype.changeImg = function(){
	this.$oImg
	.stop()
	.animate({
		marginLeft:-this.index*(this.$aImg.width())
	})
	this.$oC.eq(this.index)
	.addClass("active")
	.siblings()
	.removeClass("active")
	if(this.index ==this.$aImg.length-1){
		this.$oC.eq(0)
		.addClass("active")
		.siblings()
		.removeClass("active")	
	}
}
Banner.prototype.autoplay = function(){
	var _this =this;
	this.timer = setInterval(function(){
		_this.$oBtnR.trigger("click");
	},2000)
}
new Banner();//调用