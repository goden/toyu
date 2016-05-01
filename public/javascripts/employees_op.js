webix.ready(function() {

	webix.ui({
		id: "workspace",
		container: "layout",
		css: "toyu-layout",
		minHeight: 600,
		rows: [
			{type: "header", template: "東宥/宥騏股份有限公司 - 專用資訊系統"},
			{cols: [
				{
					id: "toyu-nav",
					view: "list", 
					width: 250,
					select: true,
					template: "#title#",
					data: [
						{title: "車輛派遣維護"},
						{title: "客戶關係管理"},
						{title: "車輛資料維護"},
						{title: "人資資料維護"},
						{title: "系統偏好設定"}
					],
					on: {
						onItemClick: function(id) {
							console.log("Not implement.");
						}
					}
				},
				{ view: "resizer" },
				{
					view: "datatable",
					// gravity: 0.7,
					columns: [
						{ id: "eId",      header: "工號",	   width: 60 }, 
						{ id: "name", 	  header: "員工姓名",   width: 120, editor: "text" }, 
						{ id: "birthday", header: "出生年月日", width: 100, editor: "date", format: webix.Date.dateToStr("%Y/%m/%d")  }, 
						{ id: "male", 	  header: "性別",      width: 60,  editor: "select", options: [ "男", "女"] }, 
						{ id: "title", 	  header: "職位",      width: 180, editor: "text" }, 
						{ id: "comment",  header: "備註",      width: 200, editor: "text" }
					],
					scheme: {
						$init: function(employee) {
							employee.male = employee.male ? "男" : "女";			// 將boolean值轉成性別專用的字串
						}
					},
					url: "/employees/list",
					editable: true,
					editaction:"click",
					hover: "rowSelect",
					navigation: true,
					on: {
						onBeforeLoad: function() {
							this.showOverlay("載入員工資料中....");
						},
						onAfterLoad: function() {

							this.hideOverlay();

							// 萬一沒有任何員工資料就顯示以下訊息
							if (!this.count()) {
								this.showOverlay("無任何員工資料!");
							}
						}
					}
				}
			]}
		]
	});
});