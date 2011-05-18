
	var defaultFailHandler = function (el) { 
		
		oldborder = el.css('border');
		
		
		//This is the default fail handler, it will be applied to every validating fail input
		el.css('border', '1px solid red');
		el.focus();
	
		setTimeout(function () { el.css('border', oldborder) }, 3000);                    
	}
	
	var aValidateType = [
		{ 
			'Name': 'text',  
			'defaultFailHandler': defaultFailHandler,                      
			'validateFunction': function (str) { 
				if (str && typeof(str) == 'string') { 
					return true;
				} else { 
					return false;		
				}
			}
		},
			
		{
			'Name': 'number', 
			'defaultFailHandler': defaultFailHandler,                         
			'validateFunction': function (str) { 
				if (str && !isNaN(str)) { 
					return true;
				} else { 
					return false;		
				}
			}
		}
	]
	
	/* -------------------------- YOU CANNOT EDIT ANYTHING BELOW HERE ------------------------- */

	$(document).ready ( function () { 	

	$("form").each (function(index) { 
	 
		var aFields = $(this).find("input[validate]")
		
		if (aFields.length != 0) { 
			
			$(this).bind ('submit', function () { 
				
				var bReturn = true;
								
				for (var n=0;n<=aFields.length-1;n++) { 
					
					thisQuery = $(aFields[n]).attr('validate');
											
					for (var j in aValidateType) { 
					
						if (aValidateType[j].Name == thisQuery) { 
		        				
							thisValue = $(aFields[n]).val();
							
							if (aValidateType[j].validateFunction(thisValue) == false) { 
								
								aValidateType[j].defaultFailHandler($(aFields[n]));	
								bReturn = false;
								if (typeof(aValidateType[j].manualFailHandler) == 'function') { aValidateType[j].manualFailHandler($(aFields[n])) }
								
							}
						}
					}
					
				}
				
				return bReturn;
			})
		}
	
	});
		 
});