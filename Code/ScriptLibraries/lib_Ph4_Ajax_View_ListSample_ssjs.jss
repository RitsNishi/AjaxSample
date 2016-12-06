import Founder_AJAX_System_ssjs;


 WebAction["Ajax_View_ListSample"] = function(){
	 	java.lang.Thread.sleep(500);
	 	
		var server 	=	param.get("ServerName");
		var dbpath 	=	param.get("DbPath");
		if ((server=="")&&(dbpath=="")){
			var tecDB:NotesDatabase =session.getCurrentDatabase();
		}else{
			var tecDB:NotesDatabase =session.getDatabase(server,dbpath);
		}
		var viewname 	=	param.get("ViewName");
		var ActionKey 	=	param.get("ActionKey");
		var tecView:NotesView =tecDB.getView(viewname);
		
		var vec:NotesViewEntryCollection =tecView.getAllEntries()

		var result = [];

		var entry:NotesViewEntry =vec.getNthEntry(1);
		
		while (entry != null) {
			doc = entry.getDocument();
			//リストの取得
			var row = {
					categories:doc.getItemValueString("Categories"),
	    			title: doc.getItemValueString("title"),
	    			lastEditor:doc.getItemValueString("LastEditor")
	    	}
			result.push(row);
			var tmpentry:NotesViewEntry = vec.getNextEntry(entry);
			entry =tmpentry;
		}
		
		return result;
		
		 	
}
