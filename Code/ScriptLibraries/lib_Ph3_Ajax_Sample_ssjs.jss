import Founder_AJAX_System_ssjs;


 WebAction["Ajax_Sample"] = function(){
			 java.lang.Thread.sleep(500);
			//パラメータの取得
		 	var Name 	=	param.get("Name");
		 	
		 	//処理の実行(DBにアクセスする等)
		 	var result ={
		 			Message:"HELLO! " + Name
		 	}
		 	//結果を返す
			return result;
		 	
		 	
}
