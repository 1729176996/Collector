var url = 'tcp://3so0188929.wicp.vip:44716';

// 下载wgt方法
function downloadWgt(){
	// 更新文件 wgt 文件地址
	var wgtUrl = "https://1729176996.github.io/MyH5AppVersion/update.wgt";
    plus.nativeUI.showWaiting("正在更新...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
     if ( status == 200 ) {
          console.log("下载wgt成功："+d.filename);
          installWgt(d.filename); // 安装wgt方法
      } else {
          console.log("下载wgt失败！");
          plus.nativeUI.alert("下载wgt失败！");
      }
      plus.nativeUI.closeWaiting();
  }).start();
}
// 安装wgt方法
function installWgt(path){
	  plus.nativeUI.showWaiting("安装wgt文件...");
	  plus.runtime.install(path,{},function(){
	      plus.nativeUI.closeWaiting();
	      console.log("安装wgt文件成功！");
	      plus.nativeUI.alert("应用资源更新完成！",function(){
	          plus.runtime.restart();
	      });
	  },function(e){ 
	      plus.nativeUI.closeWaiting();
	      console.log("安装wgt文件失败["+e.code+"]："+e.message);
	      plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
	  });
}