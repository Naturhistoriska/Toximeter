

//		#######################################
//		[ON] LOAD

		function js_demo()
		{
			//	events
				var element = global.area.find('.area_timeline .switch a')
				js_click_timeline_events(false,element);
				
			//	tag
				global.area.find('.area_tag').remove();
		}