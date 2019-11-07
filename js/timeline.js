

//		#######################################
//		[TIMELINE] RUN

		function js_timeline_run()
    	{
			//	stop
				if ( global.timeline.state == 'pause' ) { return; }

			//	visualize
				js_global_forward_add('js_timeline_run_finish');
				js_visualize_data();
	    }


//		#######################################
//		[TIMELINE] RUN FINISH

		function js_timeline_run_finish()
    	{
			//	timeline data
				js_timeline_info();

			//	check for event
				if ( js_timeline_event(global.current.row) == false )
				{
					if ( global.timeline.state == 'pause' ) { return; }
				}

			//	prepare next row
				global.current.row++;

			//	timeline, progress
				global.area.find('.area_timeline .years span:nth-child(' + global.current.row + ')').addClass('animate').addClass('passed').find('.progress').css({ 'width': '100%' });
				global.area.find('.area_timeline .years span:nth-child(' + global.current.row + ')').prevAll().removeClass('animate').find('.progress').css({ 'width': '100%' });

			//	trend
				js_trend_update(global.current.row);

			//	finish
				if ( global.current.row > global.data.rows || global.current.end == true )
				{
					//	timeline, state
						js_timeline_state('end');
						js_global_trace('This is the end of the road');
						
					//	fail safe
						if ( global.current.row > global.data.rows ) { global.current.row = global.data.rows; }
				}
				else
				{
					//	wait for next row...
						global.delay = setTimeout('js_timeline_run();', global.settings.delay);
				}
		}


//		#######################################
//		[TIMELINE] INFO

		function js_timeline_info()
    	{
			//	stop
				if ( !global.data.current ) { return; }

			//	prepare
				var area = global.area.find('.area_dashboard')

			//	year
				global.area.find('p[data-info="year"]').html('').append(global.timeline.years[ global.current.row ]);

			//	value
				var value = global.data.current[ global.current.row ];

				if ( value < 0 ) { var value = global.dictionary.misc.no_data; }
				else 
				{ 
					if ( global.settings.language == 'sv' )
					{
						value = value.toString().replace('.', ',');
					}

					value = value + ' ' + global.dictionary.toxins[ global.current.toxins ].units[ global.current.species ];
				}

				area.find('p[data-info="value"]').html('').append(value);
		}


//		#######################################
//		[TIMELINE] EVENT

		function js_timeline_event(year)
    	{
			//	stop
				if ( global.settings.events == false )
				{
					//	close alert
						js_visualize_alert_close();

					//	return
						return false;
				}

			//	prepare
				if ( !year ) { var year = global.current.row; }
				var event_id = global.timeline.events[( year )];

			//	check for event
				if ( event_id && event_id != '' )
				{
					//	get event
						var event_text = global.events.find(x => x.id === event_id).text;
						
					//	content
						if ( global.timeline.state == 'play' ) { title = global.timeline.years[ year ]; }
						else { title = global.timeline.years[ year ]; }

						var text = event_text;

						var content = [title,text];

					//	alert
						js_visualize_alert('event',content);

					//	pause timeline
						if ( global.timeline.state == 'play' ) { js_timeline_state('pause'); }
						
					//	return
						return true;
				}
				else
				{
					//	close alert
						js_visualize_alert_close();
						
					//	return
						return false;
				}
		}


//		#######################################
//		[TIMELINE] RESET

		function js_timeline_reset()
    	{
			//	timeline
				global.area.find('.area_timeline .years span').removeClass('animate').removeClass('passed').find('.progress').css({ 'width': 0 });

			//	trend
				global.area.find('.area_visual .trend .years span.current').removeClass('current');

			//	rewind
				global.current.row = 0;
				global.timeline.end = false;

			//	alert
				js_visualize_alert_close();

			//	timeline data
				js_timeline_info();
		}


//		#######################################
//		[TIMELINE] STATE

		function js_timeline_state(state)
    	{
			//	preapre
				if ( !state ) { return; }
				var area = global.area.find('.area_dashboard .group[data-group="controls"]');

			//	first run
				if ( global.setup == true ) { js_setup_firstrun(); }

			//	buttons
				if ( state != 'rewind' ) { area.find('.button a.selected').removeClass('selected').addClass('normal'); }

			//	---
			//	state » play
				if ( state == 'play' )
				{
					//	state
						global.timeline.state = 'play';
						
					//	dashboard info
						global.area.find('.area_dashboard .info p[data-info="pause"]').hide();
						
					//	button
						area.find('.button[data-button="play"] a').removeClass('normal').addClass('selected');

					//	visualize
						js_timeline_run();
				}

			//	---
			//	state » pause or end
				else if ( state == 'pause' || state == 'end' )
				{
					//	state
						global.timeline.state = 'pause';
						
					//	dashboard info
						global.area.find('.area_dashboard .info p[data-info="pause"]').show();

					//	clear delay
						clearTimeout(global.delay);
						
					//	button
						area.find('.button[data-button="pause"] a').removeClass('normal').addClass('selected');
				}

			//	---
			//	state » rewind
				else if ( state == 'rewind' )
				{
					//	reset timeline
						js_timeline_reset();

					//	state » pause
						if ( global.timeline.state == 'pause' )
						{
							//	activate play button
							//	area.find('.button[data-value="play"] a').removeClass('disabled').addClass('normal');
								
							//	visualize
								js_visualize_data();
						}
				}
				
			//	---
			//	state » end
				if ( state == 'end' )
				{
					//	disable play button
					//	area.find('.button[data-value="play"] a').removeClass('normal').addClass('disabled');

					//	end
						global.timeline.end = true;
				}
	    }


//		#######################################
//		[TIMELINE] TAG

		function js_timeline_tag(mode,event)
    	{
			//	stop
				if ( global.busy == true ) { return; }
				
			//	prepare
				var tag = global.area.find('.area_tag');

			//	hide tag
				if ( mode == false ) { tag.hide(); }

			//	show tag
				else
				{
					//	get year
						var years = $(event.currentTarget).closest('.years').find('span');
						var index = years.index( $(event.currentTarget) );
						var year = global.timeline.years[index];

					//	prepare
	 					tag.find('p').html('').append(year);
	 					var width = tag.outerWidth();

	 				//	----------------------------------------------------------------

					//	position
						var x = event.pageX - ( width / 2 );
						var y = event.pageY - 40;

					//	show tag
						tag.css({ left: x + 'px', top: y + 'px' }).show();
 				}
	    }

