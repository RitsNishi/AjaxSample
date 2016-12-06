import jssCommon;

var WebService = {};
var WebAction={};

WebService.Action = function(){
	
	var ActionKey 	=	param.get("ActionKey");
	//各ライブラリの処理
	var result = WebAction[ActionKey]();
	requestScope.put("res",result);
}


WebService.Response = function(){
	var extContext = facesContext.getExternalContext();

	var response = extContext.getResponse();
	response.setContentType("text/plain");
	response.setHeader("Cache-Control", "no-cache");
	
	// ResponseのWriterにデータを書き込み
	var writer = facesContext.getResponseWriter();
	var json="";
	json = RITS.objectToJSON(requestScope.get("res"));
	
	writer.append(json);
	writer.flush();
	writer.endDocument();
}



