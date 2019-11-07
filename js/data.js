

//		###########################
//		[DATA] SELECT

		function js_data_select()
		{
			//	prepare
				global.data.current = new Array();
				global.data.visual = new Array();
				global.data.trend = new Array();

			//	prepare, column

				//	original
				//	var column = ( global.settings.toxins * 2 ) * ( global.current.species - 1 ) + 2;
				//	column = column + ( global.current.toxins * global.settings.toxins ) - global.settings.toxins;
	
				//	with support for individual milestones / events
				//	var columns_per_species = ( global.settings.toxins * 2 ) + 1;
				//	var column = ( global.current.species - 1 ) * columns_per_species + ( global.current.toxins * 2 );
	
			//	with support for trend
				var columns_per_species = ( global.settings.toxins * 3 ) + 1;
				var column = ( global.current.species - 1 ) * columns_per_species + ( global.current.toxins * 3 ) - 1;

			//	loop data storage
				$.each(global.data.storage, function(row,value)
				{
					//	get data // -1 stands for "no data"
						var data = value[column];

						if ( data == '' || data == null ) { var data = -1; }

						if ( data == -1 ) { global.data.current.push(-1); }
						else { global.data.current.push( Math.round( data * 100 ) / 100 ); }
						
					//	get visual data, if any
						var visual = value[(column+1)];

						if ( visual == '' || visual == null )
						{
							if ( data == -1 ) { global.data.visual.push(-1); }
							else { global.data.visual.push( Math.round(data) ); }
						}
						else { global.data.visual.push( Math.round(visual) ); }
						
					//	get trend data
						global.data.trend.push( Math.round(value[column+2]) );
				});

			//	------------
			//	trend

				js_trend_publish();

			//	finish
				if ( global.forward.length > 0 ) { js_global_forward(); }
		}


//		###########################
//		[DATA] SELECT EVENTS

		function js_data_select_events()
		{
			//	prepare
				global.timeline.events = new Array();

			//	prepare, column
				var column = ( global.settings.toxins * 3 ) + 1;
					column = ( global.current.species - 1 ) * column + 1;

			//	loop data storage
				$.each(global.data.storage, function(row,value)
				{
					//	event
						global.timeline.events.push( value[column] );
				});

			//	publish events
				var area = global.area.find('.area_timeline .timeline .years');
				
				area.find('span p.event').remove();

				area.find('span').each(function(x)
				{
					//	check for event
						if ( global.timeline.events[x] != '' )
						{
							$(this).append('<p class="event"></p>');
						}
				});
		}


//		###########################
//		[DATA] SELECT PAUSE

		function js_data_select_pause()
		{
			//	one row back
				if ( global.timeline.end == false )
				{
					global.current.row--;
					if ( global.current.row < 0 ) { global.current.row = 0; }

					js_global_forward_add('js_data_select_pause_finish');
				}

			//	update visual
				js_visualize_data();
		}


//		###########################
//		[DATA] SELECT PAUSE FINISH

		function js_data_select_pause_finish()
		{
			if ( global.current.row > 0 ) { global.current.row++; }
		}


//		#######################################
//		[DATA] DOTS

		function js_data_dots()
	    	{
			//	dots
				var dots = global.data.visual[ global.current.row ];

			//	stop from visualize more than 230 dots
				if ( dots > 230 ) { dots = 230; }

			//	if the time has come to an end
				if ( global.current.end == true )
				{
					global.current.row = global.data.rows - 2;
					dots = global.data.visual[ global.current.row ];
				}
				
			//	zero
				if ( dots == 0 ) { dots = 1; }
				
			//	return
				return dots;
		}
