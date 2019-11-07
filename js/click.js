

//		###########################
//		[CLICK] ALERT

		function js_click_alert(e,element)
		{
			//	play now
				js_timeline_state('play');
		}


//		###########################
//		[CLICK] TIMELINE

		function js_click_timeline(element)
		{
			//	first run
				if ( global.setup == true ) { js_setup_firstrun(); }
				
			//	get year
				var years = $(element).closest('.years').find('span');
				var year = years.index(element);

			//	timeline, update
				global.area.find('.area_timeline .timeline .years span:nth-child(' + (year+1) + ')').removeClass('animate').addClass('passed').find('.progress').css({ 'width': '100%' });
				global.area.find('.area_timeline .timeline .years span:nth-child(' + (year+1) + ')').nextAll().removeClass('animate').removeClass('passed').find('.progress').css({ 'width': '0' });
				global.area.find('.area_timeline .timeline .years span:nth-child(' + (year+1) + ')').prevAll().removeClass('animate').addClass('passed').find('.progress').css({ 'width': '100%' });
				
			//	trend, update
				js_trend_update((year+1));

			//	visual, update
				global.current.row = year;
				js_visualize_data();
				
			//	event
				js_timeline_event(year);

			//	end of the line » yes
				if ( global.current.row > ( global.data.rows - 1 ) )
				{
					//	end » true
						global.timeline.end = true;
				}

			//	end of the line » no
				else
				{
					//	end » false
						global.timeline.end = false;

					//	prepare for next row
						global.current.row++;
				}
		}


//		###########################
//		[CLICK] TIMLINE EVENTS

		function js_click_timeline_events(e,element)
		{
			//	stop
				if ( global.busy == true ) { return; }
				
			//	status » true
				if ( global.settings.events == true )
				{
					//	status
						global.settings.events = false;
						
					//	button
						$(element).removeClass('selected').addClass('normal');
						$(element).find('p.label').html('').append(global.dictionary.misc.events_show);
					//	global.area.find('.area_dashboard .info p[data-info="events"] a').removeClass('selected').addClass('normal');

					//	hide events
						global.area.find('.area_timeline').attr('data-events','false');
						
					//	close alert
						js_visualize_alert_close();
				}
				
			//	status » false
				else if ( global.settings.events == false )
				{
					//	status
						global.settings.events = true;
						
					//	button
						$(element).removeClass('normal').addClass('selected');
						$(element).find('p.label').html('').append(global.dictionary.misc.events_hide);
					//	global.area.find('.area_dashboard .info p[data-info="events"] a').removeClass('normal').addClass('selected');

					//	show events
						global.area.find('.area_timeline').attr('data-events','true');
				}
		}


//		###########################
//		[CLICK] TREND

		function js_click_trend(e,element)
		{
			//	stop
				if ( global.busy == true ) { return; }
				
			//	toggle trend
				js_trend_toggle(e,element);
		}


//		###########################
//		[CLICK] DASHBOARD

		function js_click_dashboard(e,element)
		{
			//	stop
				if ( global.busy == true ) { return; }
				if ( $(element).hasClass('selected') ) { return; }

			//	first run
				if ( global.setup == true ) { js_setup_firstrun(); }

			//	prepare
				var group = $(element).closest('.group').attr('data-group');

			//	group » controls
				if ( group == 'controls' ) { js_click_dashboard_controls(e,element); }

			//	group » data
				else if ( group == 'species' || group == 'toxins' ) { js_click_dashboard_data(e,element); }
		}


//		###########################
//		[CLICK] DASHBOARD CONTROLS

		function js_click_dashboard_controls(e,element)
		{
			//	prepare
				var button = $(element).closest('.button');
				var group = button.closest('.group');
				var value = button.attr('data-button');

			//	button » play
				if ( value == 'play' )
				{
					//	end of the road
						if ( global.timeline.end == true )
						{
							//	reset
								js_timeline_reset();

							//	state - with delay, on order to have time to reset the timeline
								setTimeout("js_timeline_state('play');",100);
						}
						else
						{
							//	state
								js_timeline_state('play');
						}
				}

			//	button » pause
				else if ( value == 'pause' )
				{
					//	stop
						if ( global.timeline.end == true ) { return; }
						
					//	state
						js_timeline_state('pause');
				}

			//	button » rewind
				else if ( value == 'rewind' )
				{
					//	state
						js_timeline_state('rewind');
				}
		}


//		###########################
//		[CLICK] DASHBOARD DATA

		function js_click_dashboard_data(e,element)
		{
			//	prepare
				var button = $(element).closest('.button');
				var group = button.closest('.group');
				var value = button.attr('data-button');

			//	buttons
				group.find('a.selected').removeClass('selected').addClass('normal');
				button.find('a').removeClass('normal').addClass('selected');

			//	group » species
				if ( group.attr('data-group') == 'species' )
				{
					global.current.species = Number(value);
					js_data_select_events();
				}

			//	group » toxins
				else if ( group.attr('data-group') == 'toxins' )
				{
					global.current.toxins = Number(value);
				}

			//	finish
				if ( global.timeline.state == 'pause' ) { js_global_forward_add('js_data_select_pause'); }
				js_data_select();
		}
