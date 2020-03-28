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
		
		// H5 plus事件处理
		function plusReady(){
			// 检查当前版本，与从后台获取的版本作比较，以此判断是否更新     
			plus.runtime.getProperty(plus.runtime.appid,function(inf){
				// 当前版本
				var wgtVersion = inf.version;
				$.ajax({
					url:'https://1729176996.github.io/CollectorVersion/version.json',
					type:'get',
					dataType: 'json',
					success:function(data){
						console.log(data);
						// 如果有新版本，则提示需要更新
						if( data.version > wgtVersion ){
							var updatedContent = '';
							if(data.updatedContent&&data.updatedContent.length>0){
								updatedContent += '<p class="updatedContent">更新内容:</p><p class="updatedContent">';
								for(key in data.updatedContent){
									updatedContent += '<p class="updatedContent2">'+(key*1+1)+'.'+data.updatedContent[key]+'</p>';
								}
								updatedContent += '</p>';
							}else{
								updatedContent += '检查更新';
							}
							mui.confirm(updatedContent,'发现新版本，是否更新',['确定','取消'],function(e){
								if(e.index==0){
									downloadWgt(); // 下载wgt方法
								}else{
									return;
								}
							},'div');
						}else{
							return;
						}
					},
					error:function(xhr, errorType, error,msg){
						mui.alert(msg,'提示','确定',null,'div');
					}
				})
			});
		}
		if(window.plus){
			plusReady();
		}else{
			document.addEventListener('plusready',plusReady,false);
		}
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