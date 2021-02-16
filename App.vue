<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*  引入字体图标 */
	@import url("./static/font/iconfont.css");
	/* 模板字符串修改html文件(富文本编辑器)中的样式 需要选中里面的类名或者ID
	 在全局样式中修改*/
	.gomeImgLoad{
		width: 750rpx;
		height: auto;
	}
</style>
