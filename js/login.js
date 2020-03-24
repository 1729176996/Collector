//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		$scope.username = '';//用户名
		$scope.password = '';//密码
		window.localStorage.removeItem('user');
	};
	$scope.login = function(){
		var username = $scope.username;
		var password = $scope.password;
		if(!username){
			weui.alert('用户名不能为空');
			return;
		}
		if(!password){
			weui.alert('密码不能为空');
			return;
		}
		$http({
			method:'GET',
			url:url+'/login?username='+username+'&password='+password
		}).then(function(response){
			if(response.data.code==200){
				window.localStorage.setItem('user',JSON.stringify(response.data.data[0]))
				window.location.href = 'index.html';
			}else{
				weui.alert(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			weui.alert('网络失败');
		});
	};
	//注册
	$scope.register = function(){
		window.location.href = 'register.html';
	}
});