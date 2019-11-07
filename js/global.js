		

//		#######################################
//		[GLOBAL] THEME

		function js_global_theme(theme)
		{
			//	prepare
				if ( !theme ) { var theme = global.current.toxins; }
				
			//	no data
				if ( theme == 'no_data' || global.setup == true )
				{
					//	no data » no
						global.area.find('.area_visual').attr('data-theme','0');
				}
				else
				{
					//	no data » off
						global.area.find('.area_visual').removeAttr('data-theme');

					//	change theme
						global.area.attr('data-theme',theme);
				}
		}


//		#######################################
//		[GLOBAL] BUSY

		function js_global_busy(status)
		{
			//	busy » true
				if ( status == true )
				{
					//	busy
						global.busy = true;
					
					//	body
						global.area.attr('data-busy','true');
				}

			//	busy » false
				else if ( status == false )
				{
					//	busy
						global.busy = false;
					
					//	body
						global.area.attr('data-busy','false');
					
					//	trace
						js_global_trace('---');
				}
		}


//		#######################################
//		[GLOBAL] TRACE

		function js_global_trace(text,content)
		{
			return;
			global.trace++;

			if ( global.trace < 10 ) { var number = '00' + global.trace; }
			else if ( global.trace < 100 ) { var number = '0' + global.trace; }
			else { var number = global.trace; }

			if ( !content ) { console.log( '(' + number + ') ' + text ); }
			else { console.log( '(' + number + ') ' + text,content ); }
		}
						

//		#######################################
//		[GLOBAL] FORWARD

		function js_global_forward()
	    {
			//	forward
    			if ( global.forward.length > 0 )
				{
					//	extract next location
			    		var forward = global.forward.pop();

		    		//	move on
	    				if ( forward.argument instanceof Array )
	    				{
		    				if ( forward.argument.length == 1 ) { window[forward.name](forward.argument[0]) }
		    				else if ( forward.argument.length == 2 ) { window[forward.name](forward.argument[0],forward.argument[1]) }
		    				else if ( forward.argument.length == 3 ) { window[forward.name](forward.argument[0],forward.argument[1],forward.argument[2]) }
		    				else if ( forward.argument.length == 4 ) { window[forward.name](forward.argument[0],forward.argument[1],forward.argument[2],forward.argument[3]) }
		    				else if ( forward.argument.length == 5 ) { window[forward.name](forward.argument[0],forward.argument[1],forward.argument[2],forward.argument[3],forward.argument[4]) }
	    				}
	    				else
	    				{
			    			window[forward.name](forward.argument);
	    				}
				}
				else
				{
					//	trace
						js_global_trace('forward » empty » WARNING');

					//	finish
						return;
				}
		}


//		#######################################
//		[GLOBAL] FORWARD ADD

		function js_global_forward_add(name,argument)
	    {
			//	argument
				if ( !argument ) { var argument = ''; }

			//	add forward
			    	global.forward.push({ 'name': name, 'argument': argument });
	    }


//		#######################################
//		[GLOBAL] KEY

		function js_global_key(e)
	    {
			//	stop
				if ( global.settings.keys == false ) { return; }
				
			//	prepare
				var key = e.keyCode;
				
			//	close alert (0)
				if ( key == 48 )
				{
					js_visualize_alert_close();
				}

			//	species or toxins (1-3)
				else if ( key > 48 && key < 55 )
				{
					var button = key - 48;

					if ( button <= global.settings.species ) { var element = global.area.find('.area_dashboard .group[data-group="species"] .button[data-button="'+button+'"] a'); }
					else { var element = global.area.find('.area_dashboard .group[data-group="toxins"] .button[data-button="'+( button - global.settings.species )+'"] a'); }

					js_click_dashboard(e,element);
				}

			//	constrols (7-9)
				else if ( key > 54 && key < 58 )
				{
					if ( key == 55 ) { var button = 'rewind'; }
					else if ( key == 56 ) { var button = 'pause'; }
					else if ( key == 57 ) { var button = 'play'; }

					var element = global.area.find('.area_dashboard .group[data-group="controls"] .button[data-button="'+button+'"] a');
					js_click_dashboard(e,element);
				}
		}
