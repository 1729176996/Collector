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
			url:url+'/getItemsById?user_id='+$scope.user.id
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
	$scope.deleteItem = function(item){
		if(!$scope.user.id){
			weui.alert('没有用户信息，请登录',function(){
				window.localStorage.removeItem('user');
				window.location.href = 'console.html';
			});
			return;
		}
		
		$http({
			method:'GET',
			url:url+'/deleteItem?user_id='+item.user_id+'&item_id='+item.id
		}).then(function(response){
			//$scope.names = response.data.sites;
			if(response.data.code==200){
				//$scope.list = response.data.data;
				weui.alert('删除成功',function(){
					$scope.list = [];
					$scope.getList();
				});
			}else{
				weui.alert(response.data.msg);
			}
		}, function(response){
			// 请求失败执行代码
			weui.alert('网络失败');
		});
	};
	//上传
	$scope.upload = function(){
		$('#uploadForm').form('submit', {
			url:'http://localhost:8081/file_upload',
			success: function(data) {
				console.log(data);
			}
		});
	}
	
	/**
	 * 垂直居中模态框 
	 **/
	function centerModals() { 
		$('.modal').each(function(i) { 
			var $clone = $(this).clone().css('display', 'block').appendTo('body'); 
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2); 
			top = top > 50 ? top : 0; 
			$clone.remove(); 
			$(this).find('.modal-content').css("margin-top", top - 50); 
		}); 
	} 
	// 在模态框出现的时候调用垂直居中方法 
	$('.modal').on('show.bs.modal', centerModals); 
	// 在窗口大小改变的时候调用垂直居中方法 
	$(window).on('resize', centerModals);
});