var actionkey = "Ajax_Sample";
//ボタンクリックイベント
$(function() { $('#Ajax_SampleBtn').click(function(){
	$.ajax({
		url:"./Founder_WebService.xsp",
		beforeSend: function(){
	    		//REST前の処理
				console.log("実行を開始します。(beforeSend)");
				var targetObj = $("#"+ actionkey);
				$("#Loading",targetObj).show();	
				
	  	},
		data:{
				ActionKey:actionkey,
				Name:"hoge"
		},
		async:true,
		datatype:"json"
	}).done(function(data, status, xhr) {
			
			console.log("サーバーサイド終了。Responseデータを表示します。(done)");
			var targetObj = $("#"+ actionkey);
			var resultObj = JSON.parse(data);
			 //値のセット
			 $("#result",targetObj).text(resultObj.Message);
			$("#Loading",targetObj).hide();
			 $(".panel",targetObj).fadeIn("nomal");
			
			
			console.log("すべての処理が終了しました。");
		}
	);
	})
})

//
///**************************
// * REST_API_Sample
// * $ajaxの実行処理
// ***************************/
//var REST_API_Sample = function() {}
//
//
//REST_API_Sample = new Founder_AJAX();
//
///*
// * doneEvent
// * リクエスト　発行後の// 通信成功時の処理 （結果をセットするなど）
// * data 	：リクエスト結果（JSON）
// * status:"success", "notmodified", "error", "timeout", "abort", "parseerror"
// * xhr:XMLHttpRequestオブジェクト
// * 
// */ 
//REST_API_Sample.doneEvent= function(data , status, xhr){
//	//エリアを一旦非表示
//	 $("#result").hide();
//	 //値のセット
//	 $("#result").html(JSON.stringify(data));
//	 
//	//エリアをフェードイン
//	 $("#result").fadeIn("slow");
//	 
//};
//
//
//
//
//function Sleep( T ){ 
//	   var d1 = new Date().getTime(); 
//	   var d2 = new Date().getTime(); 
//	   while( d2 < d1+1000*T ){    //T秒待つ 
//	       d2=new Date().getTime(); 
//	   } 
//	   return; 
//} 

