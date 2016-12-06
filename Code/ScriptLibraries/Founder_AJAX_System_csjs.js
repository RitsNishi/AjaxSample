var Founder_AJAX = function() {}
var actionkey;
var results = [];
/*
 *  Request
 *  リクエスト　発行 （基本的には共通ロジックの為、不要）
 *  jsonObj：インプットのJSONデータ
 */
Founder_AJAX.Request= function(jsonObjs){
	
	try{
		/*
		 * ajax[option]
		 * url			：ターゲットAPI
		 * type			:送信タイプ（"GET"or"POST"）
		 * beforeSend	:処理前のアクション
		 * data			：インプットのJSONデータ
		 * async		：非同期通信（false）/同期通信（true）
		 * dataType		：データタイプ（"json"）
		 * done			：処理後のアクション（成功）
		 * fail			：処理後のアクション（失敗）
		 */
		var jsonObj = jsonObjs.shift();
		actionkey = jsonObj.ACTIONKEY;
		//HTTP通信でページを読み込み(jQuery.ajax)
		
		$.ajax({
			url:jsonObj.URL,
			type:jsonObj.TYPE,
			beforeSend:eval(actionkey + ".beforeEvent"),
			data:jsonObj.DATA,
			async:jsonObj.ASYNC,
			datatype:jsonObj.DATATYPE
		}).done(function(data, status, xhr) {
			
			results.push(data, status, xhr);
			eval(actionkey + ".doneEvent(data , status, xhr)");
			//繰り返し
			 if (jsonObjs.length) {
				 Founder_AJAX.Request(jsonObjs)
	        }
			
		}).fail(function(xhr, status, error) {
			eval(actionkey + ".failEvent(xhr, status, error)")
		});
	
		}catch(e){
			var ermsg = "例外が発生しました :" + e.message +"("+ "Founder_AJAX.Request"  + "), 行:" + e.lineNumber;
			alert(ermsg);
		}
		
		
}



/*
 * beforeEvent
 * リクエスト　発行前の処理 （Loadingを出すなど）
 * 
 */ 
Founder_AJAX.prototype.beforeEvent= function(){
	//基本処理なし
};

/*
 * doneEvent
 * リクエスト　発行後の// 通信成功時の処理 （結果をセットするなど）
 * data 	：リクエスト結果（JSON）
 * status:"success", "notmodified", "error", "timeout", "abort", "parseerror"
 * xhr:XMLHttpRequestオブジェクト
 * 
 */ 
Founder_AJAX.prototype.doneEvent= function(data , status, xhr){
	return data;
};

/*
 * failEvent
 * リクエスト　発行後のエラー処理 （エラー結果をセットするなど）
 * xhr 		：XMLHttpRequestオブジェクト
 * status	："success", "notmodified", "error", "timeout", "abort", "parseerror"
 * error	：補足的な例外オブジェクト
 */ 
Founder_AJAX.prototype.failEvent= function(xhr, status, error){
	//共通エラーハンドリング
	var ermsg ="例外が発生しました "+ status + ':' + error + "(Founder_AJAX)";
 	alert(ermsg);
};
