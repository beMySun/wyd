/**
 * Created by kk on 16/1/25.
 */
var requireConfig = {
	// base --> assets 
	baseUrl : assets + "/js/",
//	urlArgs: "v=" +  (new Date()).getTime(),
	urlArgs: "v=0.3",
	paths : {
		"BMap"         : "http://api.map.baidu.com/getscript?v=2.0&ak=hZRbjikEXsx3zaWfC5AT6hN7&services=&t=20150901171226",

		"jquery"       : "plugins/jquery-2.1.4.min",
		"moment"       : "plugins/moment.min",
		"fastClick"    : "plugins/fastclick",
		"Dialog"       : "components/dialog",
		"LazyLoader"   : "components/lazyLoader",
		"Sheet"        : "components/sheet",
		"Toast"        : "components/toast",
		"ProductView"  : "components/productView",
		"CartView"     : "components/CartView",
		"ProductController"  : "components/ProductController",
		"Cart"         : "components/cart",
		"TimeSelector" : "components/TimeSelector",
		"DateSelector" : "components/DateSelector",

		"judgeUA"      : "common/judgeUA",
		"commonLogic"  : "common/commonLogic",
		"remote"       : "common/remote",
		"wxJsSdk"	   : "http://res.wx.qq.com/open/js/jweixin-1.0.0",
		"wxpay"		   : "common/wechat/wxpay",
		"swiper"		: "../plugins/swiper/swiper.min"
		
	},
	shim : {
		"commonLogic" : {
			deps : [ 'jquery' ]
		},
		"lazyload" : {
			deps : [ 'jquery' ]
		},
		"remote" : {
			deps : [ 'jquery' ]
		},
		"confirmer":{
			deps : [ 'jquery' ]
		},
		"wxpay":{
			deps : ['jquery', 'wxJsSdk', 'remote']
		}
	}
};

