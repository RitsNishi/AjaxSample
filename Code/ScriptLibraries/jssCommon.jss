//データベースのURLを取得する。
function getDatabaseURL(){
	//UNIX系サーバーではセッション管理にURLの大文字、小文字を区別するため
	//要求URLの大文字、小文字が変わらないように要求URLからデータベースURLを生成する
	var url = context.getUrl().getPath();
	return url.replace(/(.+)(\.nsf)(.+)/i,"$1$2");
}


/*
 * アラート値のセット【AlertCompose】
 * StrongValue	：件名（太字）
 * Value		：内容
 * Styleclass	：スタイル(success / info / warning / danger)
 */
function AlertCompose(sTitle:String,sMessage:String,sStyle:String){
	
	var i = 0;
	 if (requestScope.Alert_list == null) {
		    requestScope.Alert_list = [];
		    i=0
	 }else{
		 i= requestScope.Alert_list.length
	};
	if (sStyle==""){
		sStyle="alert alert-info alert-dismissable"
	}
		  var item_Alert = {};
		  item_Alert.No =i;
		  item_Alert.Styleclass = "alert alert-" +sStyle + " alert-dismissable";
		  item_Alert.StrongValue =sTitle;
		  item_Alert.Value =sMessage;
		  requestScope.Alert_list.push(item_Alert);
		  
}
/**
 * @author Copyrightc Ricoh IT Solutions Co.,Ltd. All Rights Reserved.
 * @version 0.0.1
 * @fileOverview RITSで利用する共通関数・オブジェクト郡です。
 * @description 名前空間"RITS","R$"を無条件に定義します。すでに存在する場合は、上書きされます。
 */
/**
 * @namespace 共通関数の最上位オブジェクトです 。
 */
var RITS = {} || RITS;
/**
 * @namespace 名前空間RITSのエイリアスです。
 * @description 名前空間"RITS"と比べて、短い表記ができる以外に違いはありません。
 */
var R$ = RITS;
/**
 * RITS名前空間に名前空間またはオブジェクトを安全に追加します。
 * @function
 * @param {String} ns_string RITSに追加定義する名前空間の名称を指定します。"."で区切って、階層を定義することもできます。
 * @return {Object} 定義した名前空間をオブジェクトを返します。
 * @example var newNamespace = RITS.addNamespace('newNS.newNS1');
 * newNamespace.obj = {} // RITS.newNS.newNS1.obj が定義されます。
 * @description 引数の名前空間名には、"RITS."を指定しないでください。
 */
RITS.addNamespace = function(ns_string){
	var names = ns_string.split("."),
		i = 0,
		max = names.length,
		parent = RITS;
	for(; i < max; i++){
		if(typeof parent[names[i]] === "undefined"){
			parent[names[i]] = {};
		}
		parent = parent[names[i]];
	}
	return parent;
}
/**
 * XPagesで自動生成されたIDでの、jQueryの$("#...")によるオブジェクト取得を容易にします。
 * @requires jQueryが必要です
 * @param {string} xspIdName XPagesで自動生成されたIDを指定します。IDのみを指定してください。先頭の"#"は必要ありません。
 * @return {jQuery} 指定したID要素のjQueryオブジェクト
 * @description XPagesで自動生成されたIDは、":"が入っておりjQueryではエスケープが必要ですが、それを自動的に行いjQueryオブジェクトを返します。
 * jQueryが読み込まれていない場合は、nullを返します。
 */
RITS.getId = function(xspIdName){
	if(jQuery){
		return jQuery("#" + xspIdName.replace(":","\\:"));
	}
	return null;
}
RITS.sendJsonWebService = function(strUrl,data,method,encode){
	var url = java.net.URL(strUrl),
	    http:java.net.HttpURLConnection = url.openConnection(),
	    bufferReader,
	    str = "",
	    buffer = null;
	http.setRequestMethod(method);
	http.setRequestProperty("Accept",'*/*');	"*/";
	http.setRequestProperty("Accept-Charset","UTF-8,*;q=0.5");
	http.setRequestProperty("Content-Type","text/json");
	if(method === "POST"){
		http.setDoOutput(true);
		var osw = new java.io.OutputStreamWriter(http.getOutputStream(),"utf-8");
		try{
			if(typeof(data) == "object"){
				osw.write(R$.objectToJSON(data));
			}else{
				osw.write(data);
			}
		}catch(e){
			throw e;
		}finally{
			print("Closing Output Stream");
			osw.flush();
			osw.close();
		}
	}
	http.connect();
	try{
		if(!encode){
			encode = 'utf-8';
		}
		bufferReader = new java.io.BufferedReader(new java.io.InputStreamReader(http.getInputStream(),encode));
		do{
			buffer = bufferReader.readLine();
			if(buffer != null){
				str += buffer + "\r\n";
			} 
		}while(buffer != null);
	}catch(e){
		print(e);
		throw e;
	}finally{
		print("Closing HTTP Connection");
		http.disconnect();		
	}
	return str;	
}

RITS.createVaridator = function(condition){
	var _condition = {};
	_condition.required = condition.required instanceof undefined ? false : condition.required;
	_condition.minLength = condition.minLength instanceof undefined ? 0 : condition.minLength;
	_condition.maxLength = condition.maxLength instanceof undefined ? 0 : condition.maxLength;
	_condition.numberOnly = condition.numberOnly instanceof undefined ? false : condition.numberOnly;
	_condition.dateFormat = condition.dateFormat instanceof undefined ? false : condition.dateFormat;
	_condition.regex = condition.regex instanceof undefined ? null : condition.regex;
	var prop = {
		value : "",
		validate : function(){
			
		}
	};
}
RITS.URLEncode = function(value){
	return java.net.URLEncoder.encode(value,"UTF-8");
}
RITS.HTMLEscape = function(str){
	var ret = str
		.replace("&","&amp;")
		.replace("<","&lt;")
		.replace(">","&gt;")
		.replace('"',"&quot;")
		.replace("'","&#03");
	return ret;
}
//標準オブジェクト拡張
/**
 * 配列のすべての要素に対して処理を行います。
 * @function
 * @param {function}	callBack 配列の要素に対して実行する関数を指定します。
 * @return {Array}		処理後の配列（オブジェクトは現在のものと同一）を返します。メソッドチェーンとして利用できます。
 * @description			配列の各要素に対して、引数のfunctionを実行します。引数のfunctionでは、thisは配列の要素となす。戻り値は、メソッドチェーンパターンを考慮し、処理後の配列(オブジェクトは現在のものと同一)となります。
 */
Array.prototype.each = function(callBack) {
	//引数callBackが関数でなければ例外
	if( typeof callBack !== "function") {
		throw "引数にfunctionを指定してください";
	}
	var i = 0, max = this.length;
	for(; i < max; i++) {
		callBack.call(this[i],i);
	}
	return this;
}
/**
 * 配列のすべての要素に対して、引数の関数の処理を行い、戻り値がtrueの要素だけ含まれる配列を返します。
 * @function
 * @param {function} query 配列の要素に対して実行し、戻り値としてBooleanを返す関数を指定します。
 * @return {Array} 引数の関数で戻り値がtrueとなる要素のみにフィルタされた配列を返します。チェーンメソッドとして利用できます。
 * @description 配列の各要素に対して、引数のfunctionを実行します。functionの戻り値がtrueの要素のみだけの配列を返します。
 */
Array.prototype.where = function(query){
	if( typeof query !== "function") {
		throw "引数にfunctionを指定してください";
	}
	var retArray = [];
	var i = 0, max = this.length;
	for(; i < max; i++) {
		var ret = query.call(this[i]);
		if(ret === true){
			retArray.push(this[i]);
		}
	}
	return retArray;
}
/**
 * 配列の要素を巡回し、引数の関数を行い、はじめに戻り値がtrueの要素のみを返します。
 * @function
 * @param {function} query 配列の要素に対して実行し、戻り値としてBooleanを返す関数を指定します。
 * @return {Object} 初めに引数の関数で戻り値がtrueとなる要素を返します。
 * @description 配列を受戒する順番はインデクサの順番です。関数でtrueとなる要素が複数ある場合は、もっとも配列のインデックスの小さい要素となります。
 */
Array.prototype.first = function(query){
	if( typeof query !== "function") {
		throw "引数にfunctionを指定してください";
	}
	var i = 0, max = this.length;
	for(; i < max; i++) {
		var ret = query.call(this[i]);
		if(ret === true){
			return this[i];
		}
	}
	return null;
}
Array.prototype.indexOf = function(obj){
	var counter = 0;
	var ret = -1;
	this.each(function(){
		if(this == obj){
			ret = counter;
		}
		counter++;
	});
	return ret;
}
RITS.objectToJSON = function(obj){
    var ret = "";
    if(obj==null){
        ret = "null";
    }else{
        switch(obj.constructor){
            case String:
            	obj = obj.replace('\\','\\\\')
            			.replace('"','\\"')
            			.replace('\t',' ');
                ret = '"'+obj+'"';
                break;
            case Boolean:
                ret = obj?"true":"false";
                break;
            case Number:
                ret = isNaN(obj)||!isFinite(obj)?"null":obj.toString();
                break;
            case Array:
                var buf = [];
                for(var i=0;i<obj.length;i++){
                    //再帰呼出
                    buf.push(arguments.callee(obj[i]));
                }
                ret = "["+buf.join(",")+"]";
                break;
            case Object:
                var buf = [];
                for(var key in obj){
                    //Object汚染回避判定有
                    if(obj.hasOwnProperty(key)){
                        //再帰呼出
                        buf[buf.length] = R$.objectToJSON(key)+":"+R$.objectToJSON(obj[key]);
                    }
                }
                ret = "{"+buf.join(",")+"}";
                break;
            default:
                ret = "null";
                break;
        }
    }
    return ret;
}

RITS.convertNotesItemToJS = function(item:NotesItem){
	var item:NotesItem = item;
	var ret;
	switch(item.getType()){
		case NotesItem.TEXT:
		case NotesItem.RICHTEXT:
		case NotesItem.RICHTEXT:
		case NotesItem.NAMES:
		case NotesItem.AUTHORS:
		case NotesItem.READERS:
		case NotesItem.NUMBERS:
		case NotesItem.DATETIMES:
			ret = R$.convertMultiValue(item.getValues());
			break;
		default:
			
			return null;
	}
	if(ret.getClass().getSimpleName()=="NotesDateTime"){
		ret = I18n.toString(ret.toJavaDate("yyyy/MM/dd HH:mm:ss"),"");
	}
	return ret;
}
RITS.convertMultiValue = function(values){
	var values:java.util.Vector = values;
	if(values.size()==0) return null;
	if(values.size()==1) return values[0];
	return values.toArray();
}
RITS.toJson = function(obj){
	var str = toJson(obj);
	var b = "3042";
	var a = parseInt(b,16);
	return str;
}
R$.isPostBack = function(){
	return (param.get("RITS_PostBack") === "1");
}
applicationScope.put("ritsCommon",RITS);