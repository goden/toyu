webix.ready(function() {

	webix.ui({
		container: "list",
		view: "datatable",
		columns: [
			{ id: "eId",      header: "工號",	   width: 60 }, 
			{ id: "name", 	  header: "員工姓名",   width: 120, editor: "text" }, 
			{ id: "birthday", header: "出生年月日", width: 100, editor: "date", format: webix.Date.dateToStr("%Y/%m/%d")  }, 
			{ id: "male", 	  header: "性別",      width: 60,  editor: "select", options: [ "男", "女"] }, 
			{ id: "title", 	  header: "職位",      width: 180 }, 
			{ id: "comment",  header: "備註",      width: 200, editor: "text" }
		],
		autoheight:true,
		autowidth:true,
		minHeight:50,
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
			// onItemClick: function(id){
			// 	this.editRow(id);									// 點選員工後，可以編輯該員工的資料
			// }
		},
		scheme: {
			$init: function(employee) {
				employee.male = employee.male ? "男" : "女";			// 將boolean值轉成性別專用的字串
			}
		},
		url: "/employees/list",
		editable: true,
		editaction:"click"
	});
});