//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		$scope.username = '';//用户名
		$scope.password = '';//密码
		$scope.nick = '';//昵称
	};
	$scope.register = function(){
		var username = $scope.username;
		var password = $scope.password;
		var repassword = $scope.repassword;
		var nick = $scope.nick;
		if(!username){
			weui.alert('用户名不能为空');
			return;
		}
		if(!password){
			weui.alert('密码不能为空');
			return;
		}
		if(!repassword){
			weui.alert('密码验证不能为空');
			return;
		}
		if(!(password===repassword)){
			weui.alert('两次密码不一样');
			return;
		}
		if(!nick){
			weui.alert('昵称不能为空');
			return;
		}
		$http({
			method:'GET',
			url:url+'/register?username='+username+'&password='+password+'&nick='+nick
		}).then(function(response){
			//$scope.names = response.data.sites;
			if(response.data.code==200){
				weui.alert('注册成功', {
					title: '提示',
					buttons: [{
						label: '返回登录',
						type: 'primary',
						onClick: function(){
							window.history.back(-1);
						}
					}]
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
	}
});