

//		###########################
//		AJAX

		function js_ajax(url,content,json_send,json_receive,forward,argument)
		{
			//	forward
				if ( forward )
				{
					if ( !argument ) { var argument = ''; }
				}

			//	json, send
				if ( json_send == true ) { var content = encodeURIComponent(JSON.stringify(content)); }
				
			//	json, receive
				if ( json_receive == true )	{ var data = 'json'; }
				else { var data = 'html'; }
		
			//	----------------------------------------------------------------
	    		//	ajax
	
	    			$.ajax(
	    			{
	    				type			:	'POST',
	    				dataType		:	data,
	    			 	url			:	url,
	    			 	cache		:	false,
	    			 	async		:	true,
	    			 	data			:	'content=' + content,
	    			 	error		:	js_ajax_error,
	    				success		:	function(response)
	    				{
						//	error, yes
							if ( response.error )
							{
								//	error
									alert(response.error);
							}

						//	error, no
							else
							{
								//	forward
									if ( forward )
									{
										if ( argument == '' ) { window[forward](response); } else { window[forward](response,argument) }
									}
							}
    					}
    				});
		}


//		###########################
//		AJAX ERROR

		function js_ajax_error(jqXHR,textStatus)
		{
			//	error
				if ( jqXHR.readyState == 0 ) { alert('A network error has occurred. Please, try agin.'); }
				else if ( jqXHR.readyState == 4 ) { alert('An HTTP error has occurred. Please, try agin.'); }
				else { alert('An unknown error has occurred'); }

				js_global_busy(false);
		
			//	finish
				return false;				
		}