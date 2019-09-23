#Zigar框架开发明细

##后台
	开发语言：java
	数据库：mysql，redis
	框架：springboot
	技术明细：mybatis，jwt
	IDE：Idea InteliJ
	技术内容
	   1.redis作为cache的数据库
	   2.swagger2文档
	   3.统一exception处理
	   4.jwt登录验证机制
	   5.自动任务
	   6.封装了BaseService，BaseMapper
	计划
        1.增加【菜单】模块
        2.增加【操作权限】模块
        3.增加【角色】模块
	
##前台
	开发语言：es6
	框架：vue
	脚手架：vue-cli
	技术明细：vue-router，element-ui，axios，bootstrap，jquery
	IDE：WebStorm
	技术内容
	    1.封装了全局变量global
	    2.封装了全局配种config
	    3.封装了全局请求request
	    4.封装了全局工具util
	    5.封装了element-ui的table组件为SimpleTable，可以做简单的增删改查
	计划
        1.增加【新增】功能
        2.动态菜单