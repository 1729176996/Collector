//通过 AngularJS 的 angular.module 函数来创建模块
var app = angular.module('app',[]);
//使用 ng-controller 指令来添加应用的控制器
//在页面上使用ng-controller 指令指定控制器名字
app.controller('myCtr1',function($scope,$http){
	//初始化方法，页面上用ng-init来调用这个方法
	$scope.init = function(){
		//用户信息
		var user = window.localStorage.getItem('user')?JSON.parse(window.localStorage.getItem('user')):{};
		$scope.user = user;
		if(user.id||user.id===0){
			$scope.getList();$scope.getList();
		}else{
			weui.alert('没有用户信息，请登录',function(){
				window.localStorage.removeItem('user');
				window.location.href = 'login.html';
			});
		}
	}
	$scope.getList = function(){
		$scope.list = [];
		$http({
			method:'GET',
			url:url+'/getResourceList?user_id='+$scope.user.id
		}).then(function(response){
			//$scope.names = response.data.sites;
			if(response.data.code==200){
				$scope.list = response.data.data;
			}else{
				weui.alert(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			weui.alert('网络失败');
		});
	};
	$scope.toSave = function(){
		window.location.href = 'save.html';
	};
	$scope.deleteResource = function(item){
		weui.confirm('是否确定删除？', function(){
			$http({
				method:'GET',
				url:url+'/deleteResource?user_id='+item.user_id+'&resource_id='+item.id+'&type='+item.type+'&filename='+item.filename
			}).then(function(response){
				//$scope.names = response.data.sites;
				if(response.data.code==200){
					//$scope.list = response.data.data;
					setTimeout( ()=>{
						weui.alert('删除成功',function(){
							$scope.list = [];
							$scope.getList();
						});
					},300);
				}else{
					setTimeout( ()=>{
						weui.alert(response.data.msg);
					},300);
				}
			}, function(response){
				// 请求失败执行代码
				setTimeout( ()=>{
					weui.alert('网络失败');
				},300);
			});
		}, function(){console.log('no')});
	};
	$scope.lookResource = function(item){
		var type = item.type;
		/*var _url = url+'/public/'+item.filename;
		var gallery = weui.gallery(_url, {
			className: 'custom-classname',
			onDelete: function(){
				if(confirm('确定删除该图片？')){ console.log('删除'); }
				gallery.hide(function() {
					console.log('`gallery` has been hidden');
				});
			}
		});*/
		window.localStorage.setItem('itemObj',JSON.stringify(item));
		window.location.href = 'look.html';
	};
	
});