

	var defaultFailHandler = function (el) { 
		
		//This is the default fail handler, it will be applied to every validating fail input
		el.css('border', '1px solid red');
		el.focus();
		           
	}
	
	var aValidateType = [
		{  
		
			'Name': 'text',  
			'defaultFailHandler': defaultFailHandler,
			'manualFailHandler': function (el) { 
				//Here, we insert a span node after each field when its validation fails.
				var newnode = $("<br /><br /><span style='color: red; font-size: 10px; margin-left: 5px;'>Campo obrigatório</span>")
				newnode.insertAfter(el);
				
				setTimeout(function () { newnode.fadeOut("slow"); },  5000);	
					
			}, 
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
			'manualFailHandler': function (el) { 
			//Here, we insert a span node after each field when its validation fails.
				var newnode = $("<br /><span style='color: red; font-size: 10px; margin-left: 5px;'>Esse campo deve conter apenas numeros.</span>")
				newnode.insertAfter(el);
				
				setTimeout(function () { newnode.remove(); },  5000);	
			},                        
			'validateFunction': function (str) { 
				if (str && !isNaN(str)) { 
					return true;
				} else { 
					return false;		
				}
			}
		},
		
		{
			'Name': 'email', 
			'defaultFailHandler': defaultFailHandler,  
			'manualFailHandler': function (el) { 
			//Here, we insert a span node after each field when its validation fails.
				var newnode = $("<br><span style='color: red; font-size: 10px; margin-left: 5px;'>E-mail inválido.</span>")
				newnode.insertAfter(el);
				
				setTimeout(function () { newnode.remove(); },  5000);	
			},                        
			'validateFunction': function (str) { 

				var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
				var check=/@[\w\-]+\./;
				var checkend=/\.[a-zA-Z]{2,3}$/;
				if(((str.search(exclude) != -1)||(str.search(check)) == -1)||(str.search(checkend) == -1)){return false;}
				else {return true;}
			}
		},
		
		{
			'Name': 'cpf', 
			'defaultFailHandler': defaultFailHandler,  
			'manualFailHandler': function (el) { 
			//Here, we insert a span node after each field when its validation fails.
				var newnode = $("<br><span style='color: red; font-size: 10px; margin-left: 5px;'>CPF inválido</span>")
				newnode.insertAfter(el);
				
				setTimeout(function () { newnode.remove(); },  5000);	
			},                        
			'validateFunction': function (str) { 
			
				var cpf = str.replace('.', '').replace('-', '').replace('.', '')
				if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
				return false;
				add = 0;
				for (i=0; i < 9; i ++)
					add += parseInt(cpf.charAt(i)) * (10 - i);
				rev = 11 - (add % 11);
				if (rev == 10 || rev == 11)
					rev = 0;
				if (rev != parseInt(cpf.charAt(9)))
					return false;
				add = 0;
				for (i = 0; i < 10; i ++)
					add += parseInt(cpf.charAt(i)) * (11 - i);
				rev = 11 - (add % 11);
				if (rev == 10 || rev == 11)
					rev = 0;
				if (rev != parseInt(cpf.charAt(10)))
					return false;
				return true;
			}
		},
		
		{
			'Name': 'cep', 
			'defaultFailHandler': defaultFailHandler,  
			'manualFailHandler': function (el) { 
			//Here, we insert a span node after each field when its validation fails.
				var newnode = $("<br><span style='color: red; font-size: 10px; margin-left: 5px;'>CEP inválido</span>")
				newnode.insertAfter(el);
				
				setTimeout(function () { newnode.remove(); },  5000);	
			},                        
			'validateFunction': function (str) {
				var valid = "0123456789-";
				var hyphencount = 0;
				field = str
				
				if (field.length!=9 && field.length!=10) {
					return false;
				}
				for (var i=0; i < field.length; i++) {
					temp = "" + field.substring(i, i+1);
					if (temp == "-") hyphencount++;
					if (valid.indexOf(temp) == "-1") {
						return false;
					}
					if ((hyphencount > 1) || ((field.length==10) && ""+field.charAt(5)!="-")) {
						return false;
				   	}
				}
				return true;
			}
		}

		
		
	]
	
	
	
	
	
	/* -------------------------- YOU CANNOT EDIT ANYTHING BELOW HERE ------------------------- */

$(document).ready ( function () { 	

	$("form").each (function(index) { 
	 
		var aFields = $(this).find("input[validate], select")
		
		if (aFields.length != 0) { 
			
			$(this).bind ('submit', function () { 
				
				var bReturn = true;
								
				for (var n=0;n<=aFields.length-1;n++) { 
					
					thisQuery = $(aFields[n]).attr('validate');
											
					for (var j in aValidateType) { 
					
						if (aValidateType[j].Name == thisQuery) { 
		        			
							thisValue = $(aFields[n]).val();
							
							if (aValidateType[j].validateFunction(thisValue) == false) { 
								
								if (typeof(aValidateType[j].defaultFailHandler) == 'function') { aValidateType[j].defaultFailHandler($(aFields[n])) }
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