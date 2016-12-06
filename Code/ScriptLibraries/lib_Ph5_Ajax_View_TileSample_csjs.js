var Ajax_View_TileSample = function() {}


Ajax_View_TileSample = new Founder_AJAX();


/*
 * beforeEvent
 * リクエスト　発行前の処理 （Loadingを出すなど）
 * 
 */ 
Ajax_View_TileSample.beforeEvent= function(){
	//前処理
	$("#" + actionkey +" #Founderlist .loading").show();
	$("#" + actionkey +" #Founderlist .notFound").hide();
	
};



/*
 * doneEvent
 * リクエスト　発行後の// 通信成功時の処理 （結果をセットするなど）
 * data 	：リクエスト結果（JSON）
 * status:"success", "notmodified", "error", "timeout", "abort", "parseerror"
 * xhr:XMLHttpRequestオブジェクト
 * 
 */ 
Ajax_View_TileSample.doneEvent= function(data , status, xhr){
	
	if(status!="success"){
		alert("ERROR:"+ status);
		return;
	}
	$("#" + actionkey +" #Founderlist .loading").hide();
	
	if(data == null || data.length == 0){
		$("#Founderlist .notFound").show();
	}
	
	//templateからデータの件数分コピーする
	var viewBox = $("#" + actionkey +" #ViewList");
	var tempRow = $("#" + actionkey +" #ViewList .template");
	data = JSON.parse(data);
	//繰り返し(each)
	$.each(data,function(){
		var rowData = this;
			//1.ドキュメントリスト
			var newRow = tempRow.clone();
			newRow
			.removeClass("template")
			.addClass("Listinfo")
			.fadeIn(1000);
			
			$(".Set_Categories",newRow).text(rowData.categories);
			$(".Set_tittle",newRow).text(rowData.title);
			$(".Set_LastEditor",newRow).text(rowData.lastEditor);
			viewBox.append(newRow);
			
	});

};



/*
 * failEvent
 * リクエスト　発行後のエラー処理 （エラー結果をセットするなど）
 * xhr 		：XMLHttpRequestオブジェクト
 * status	："success", "notmodified", "error", "timeout", "abort", "parseerror"
 * error	：補足的な例外オブジェクト
 */ 
Ajax_View_TileSample.failEvent= function(xhr, status, error){
	alert("ERROR:"+status+":"+error)
};
