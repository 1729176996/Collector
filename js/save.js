//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		$scope.typeList = [
			{code:'img',name:'图片'},
			{code:'video',name:'视频'},
			{code:'string',name:'文字'}
		];
		//默认选择第一项
		$scope.type = $scope.typeList[0].code;
		$scope.descstr = '';
		//$scope.editType = window.localStorage.getItem('editType')?window.localStorage.getItem('editType'):'';
	};
	$scope.save = function(){
		var uploadFile=document.querySelector("#uploadFile").files[0];
		var formData = new FormData();
		formData.append('type', $scope.type);//类型
		formData.append('img', uploadFile);//文件
		formData.append('descstr', $scope.descstr);//描述
		$http({
			url:url+"/save",
			method:"post",
			headers: {'Content-Type': undefined},//使用angular上传一定要加上这一句，不然传给后台的是空的。
			data: formData
		}).then(function(response){
			if(response.data.code==200){
				weui.alert('保存成功',function(){
					$scope.back();
				});
			}else{
				weui.alert(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			weui.alert('网络失败');
		});
	};
	//返回上一页
	$scope.back = function(){
		//返回上一页并刷新
		window.location.href =document.referrer;
	};
});