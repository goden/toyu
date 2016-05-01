webix.ready(function() {

	var LIST_ITEM = {
		DISPATCH: 0,
		CRM: 1,
		VERHICLE: 2,
		HR: 3,
		PREFERENCE: 4
	};

	var employees = {
					view: "datatable",
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
				};

	webix.ui({
		id: "toyu-layout",
		container: "layout",
		minHeight: 600,
		type: "clean",
		rows: [
			{type: "header", template: "東宥/宥騏起重工程 - 資訊系統"},
			{cols: [
				{
					id: "toyu-list",
					view: "list", 
					width: 250,
					select: true,
					template: "#title#",
					data: [
						{title: "車輛派遣維護", listId: LIST_ITEM.DISPATCH},
						{title: "客戶關係管理", listId: LIST_ITEM.CRM},
						{title: "車輛資料維護", listId: LIST_ITEM.VERHICLE},
						{title: "人資資料維護", listId: LIST_ITEM.HR},
						{title: "系統偏好設定", listId: LIST_ITEM.PREFERENCE}
					],
					on: {
						onItemClick: function(id) {
							// console.log("Not implement. The id is " + id);
							var item = $$("toyu-list").getItem(id);
							console.log(item.listId);

							switch(item.listId) {
								case LIST_ITEM.DISPATCH:
								break;
								case LIST_ITEM.CRM:
								break;
								case LIST_ITEM.VERHICLE:
								break;
								case LIST_ITEM.HR:
								break;
								case LIST_ITEM.PREFERENCE:
								break;
							}

						}
					}
				},
				{ view: "resizer" },
				{ 
					id: "toyu-workspace",
					view: "template", 
					template: "本系統使用權及版權屬【東宥/宥騏起重工程】所有"
				}
			]}
		]
	});

	window.onresize = function() {
		setTimeout(function() {
			// console.log("hi");
			$$("toyu-layout").resize();
		}, 1000);
	}

});