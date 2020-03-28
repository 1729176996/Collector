//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		url+'/public/**'
	]);
});
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		var itemObj = window.localStorage.getItem('itemObj')?JSON.parse(window.localStorage.getItem('itemObj')):{};
		//类别
		$scope.type = itemObj.type;
		//标题
		$scope.title = itemObj.title;
		//图片路径
		$scope.href = url+'/public/'+itemObj.filename;
		//文字内容
		$scope.content = itemObj.content;
	};
	//返回上一页
	$scope.back = function(){
		window.localStorage.removeItem('itemObj');
		//返回上一页并刷新
		window.location.href =document.referrer;
	};
});