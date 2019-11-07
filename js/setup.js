

//		#######################################
//		[ON] LOAD

		$(window).on('load', function()
		{
			//	prepare area
				if ( $('#toximeter').length < 1 ) { alert('Error: Container is missing.'); }
				else
				{
					//	get area
						global.area = $('#toximeter');
						global.area.attr('data-theme','1');

					//	setup
						js_setup();
				}
		});


//		#######################################
//		[ON] LOAD

		$(window).resize(function()
		{
			//	alert, center
				js_visualize_alert_center();
		});

	
//		#######################################
//		[SETUP] VARIABLES

		var global									= new Object();

			global.setup							= true;

			global.settings							= new Object();

			global.current							= { 'species': 1, 'toxins': 1, 'row': 0, 'end': false };
			global.data								= { 'storage': 0, 'current': 0, 'visual': 0, 'trend': 0, 'trend_max': 0, 'rows': 0 };
			
			global.timeline							= new Object();
			global.timeline.state					= 'pause';			//	play or pause
			global.timeline.end						= false;			//	if true, the timeline has come to an end
			global.timeline.years					= new Array();		//	contain all the years from the data file
			global.timeline.events					= new Array();		//	contain event codes, where there are any

			global.events							= new Array();		//	contain the actual event information, along with the codes

			global.forward							= new Array();		//	queue with functions
			global.busy								= false;			//	if true, interface and buttons are disabled
			global.delay							= false;			//	current timeout for visulization

			global.trace							= 0;				//	for development purpose only


//		###########################
//		[SETUP]

		function js_setup()
		{
			//	load scripts
				var scripts = new Array();
					scripts.push('/toximeter/jquery/jquery.transit.min.js');
					scripts.push('/toximeter/jquery/PapaParse-4.6.0/papaparse.min.js');
					scripts.push('/toximeter/settings/settings.js');
					scripts.push('/toximeter/settings/dictionary.js');
					scripts.push('/toximeter/js/global.js');
					scripts.push('/toximeter/js/ajax.js');
					scripts.push('/toximeter/js/click.js');
					scripts.push('/toximeter/js/data.js');
					scripts.push('/toximeter/js/visualize.js');
					scripts.push('/toximeter/js/timeline.js');
					scripts.push('/toximeter/js/trend.js');

				$.each(scripts, function(key,file)
				{
					$('body').append('<script type="text/javascript" src="'+file+'"></script>');
				});

			//	------------
			//	settings

				global.settings = js_settings();

				if ( global.settings.speed > global.settings.delay ) { global.settings.speed = global.settings.delay; }
				
			//	------------
			//	language and dictionary

				if ( window.location.hash )
				{
					var hash = window.location.hash.substring(1);
					
					if ( hash == 'en' ) { global.settings.language = 'en'; }
					else { global.settings.language = 'sv'; }
				}
				else
				{
					var language = window.navigator.userLanguage || window.navigator.language;
					var language = language.substring(0,2);
	
					if ( language == 'en' ) { global.settings.language = 'en'; }
					else { global.settings.language = 'sv'; }
				}

				global.area.attr('language',global.settings.language);

				global.dictionary = js_dictionary(global.settings.language);

			//	------------

			//	build
				var html =
					'<div class="area_tag"><p></p></div>'+
					'<div class="width">'+
					
						'<div class="area_images">'+
							'<div class="image" style="background-image: url(/toximeter/graphics/species/'+global.dictionary.species[1].image+');"><p class="label">'+global.dictionary.species[1].name+'</p></div>'+
							'<div class="image" style="background-image: url(/toximeter/graphics/species/'+global.dictionary.species[2].image+');"><p class="label">'+global.dictionary.species[2].name+'</p></div>'+
							'<div class="image" style="background-image: url(/toximeter/graphics/species/'+global.dictionary.species[3].image+');"><p class="label">'+global.dictionary.species[3].name+'</p></div>'+
							'<div class="break"></div>'+
						'</div>'+
						
						'<div class="area_editorial area">'+

							'<div class="intro">'+
								'<div class="logo"></div>'+
								'<h1>'+global.dictionary.information.title+'</h1>'+
								'<h2>'+global.dictionary.information.intro+'</h2>'+
							'</div>'+
							
							'<div class="break"></div>'+
							
							'<div class="columns">'+
								
								'<div class="column editorial">'+
									'<h1>'+global.dictionary.information.column_1_title+'</h1>'+
									'<p>'+global.dictionary.information.column_1_text+'</p>'+
								'</div> <!-- column -->'+
		
								'<div class="column editorial">'+
									'<h1>'+global.dictionary.information.column_2_title+'</h1>'+
									'<p>'+global.dictionary.information.column_2_text+'</p>'+
								'</div> <!-- column -->'+
		
								'<div class="column editorial">'+
									'<h1>'+global.dictionary.information.column_3_title+'</h1>'+
									'<p>'+global.dictionary.information.column_3_text+'</p>'+
								'</div> <!-- column -->'+
		
								'<div class="break"></div>'+
								
							'</div> <!-- columns -->'+

						'</div>'+

					//	[area] timeline
					
						'<div class="area_timeline area" data-events="'+( global.settings.events == true ? 'true' : 'false' )+'">'+
		
							'<div class="timeline">'+
								'<div class="years"></div>'+
							'</div>'+
		
							'<div class="labels">'+
					//			'<div class="year start"><p class="label" data-info="year">&nbsp;</p></div>'+
								'<div class="year start"><p class="label">&nbsp;</p></div>'+
								'<div class="year end"><p class="label">&nbsp;</p></div>'+
								'<div class="switch"><a class="selected" onclick="js_click_timeline_events(event,this);" href="javascript:void(0);"><p class="label">'+( global.settings.events == true ? global.dictionary.misc.events_hide : global.dictionary.misc.events_show )+'</p></a></div>'+
								'<div class="break"></div>'+
							'</div> <!-- labels -->'+
		
						'</div>'+

					//	[area] dashboard
					
						'<div class="area_dashboard area">'+
		
							'<div class="section" data-section="left">'+
		
								'<div class="group left" data-group="species">'+
									'<div class="buttons large left"></div>'+
								'</div> <!-- group -->'+
								
								'<div class="break"></div>'+
								
								'<div class="info">'+
									'<p class="right" data-info="year">&nbsp;</p>'+
									'<div class="break"></div>'+
								'</div> <!-- info -->'+
		
							'</div>'+
		
							'<div class="section" data-section="right">'+
		
								'<div class="group left" data-group="toxins">'+
									'<div class="buttons large left"></div>'+
								'</div> <!-- group -->'+
		
								'<div class="group right" data-group="controls">'+
									'<div class="buttons large right">'+
										'<div class="button" data-button="rewind"><a class="normal general" onclick="js_click_dashboard(event,this);" href="javascript:void(0);"><p class="icon"></p></a></div>'+
										'<div class="button" data-button="pause"><a class="selected" onclick="js_click_dashboard(event,this);" href="javascript:void(0);">'+( global.settings.keys == true ? '<p class="key">8</p>' : '')+'<p class="icon"></p></a></div>'+
										'<div class="button" data-button="play"><a class="normal" onclick="js_click_dashboard(event,this);" href="javascript:void(0);">'+( global.settings.keys == true ? '<p class="key">9</p>' : '')+'<p class="icon"></p></a></div>'+
										'<div class="break"></div>'+
									'</div> <!-- buttons -->'+
								'</div> <!-- group -->'+
		
								'<div class="break"></div>'+
		
								'<div class="info">'+
									'<p class="left" data-info="value">&nbsp;</p>'+
									'<p class="right" data-info="pause">'+global.dictionary.misc.pause+'</p>'+
									'<p class="right" data-info="year">&nbsp;</p>'+
									'<div class="break"></div>'+
								'</div> <!-- info -->'+
		
							'</div>'+
		
							'<div class="break"></div>'+
		
						'</div>'+

					//	[area] visual

						'<div class="area_visual area" data-blur="false">'+

							'<div class="trend">'+
								'<div class="bars">'+
									'<div class="years"></div>'+
								'</div>'+
								'<div class="labels">'+
									'<div class="year start"><p class="label">&nbsp;</p></div>'+
									'<div class="year end"><p class="label">&nbsp;</p></div>'+
									'<div class="switch"><a class="selected" onclick="js_click_trend(event,this);" href="javascript:void(0);"><p class="label">'+( global.settings.trend == true ? global.dictionary.misc.trend_hide : global.dictionary.misc.trend_show )+'</p></a></div>'+
									'<div class="break"></div>'+
								'</div> <!-- labels -->'+
							'</div>'+
			
							'<div class="container">'+
		
								'<div class="alert">'+
									'<div class="content">'+
										'<div class="editorial">'+
											'<h1>'+global.dictionary.information.welcome_title+'</h1>'+
											'<p>'+global.dictionary.information.welcome_text+'</p>'+
										'</div>'+
										'<div class="buttons small left">'+
											'<div class="button"><a class="normal" onclick="js_click_alert(event,this);" href="javascript:void(0);">'+( global.settings.keys == true ? '<p class="key">9</p>' : '')+'<p class="label">'+global.dictionary.information.welcome_button+'</p></a></div>'+
											'<div class="button"><a class="normal general" onclick="js_visualize_alert_close();" href="javascript:void(0);">'+( global.settings.keys == true ? '<p class="key"></p>' : '')+'<p class="label">'+global.dictionary.misc.close+'</p></a></div>'+
											'<div class="break"></div>'+
										'</div> <!-- buttons -->'+
									'</div> <!-- content -->'+
								'</div> <!-- alert -->'+
								
								'<div class="layers">'+
									'<div class="layer" data-layer="small"></div>'+
									'<div class="layer" data-layer="medium"></div>'+
									'<div class="layer" data-layer="large"></div>'+
								'</div> <!-- layers -->'+
		
							'</div>'+
						'</div>'+

					//	[area] researcher

						'<div class="area_researcher area">'+
							'<div class="headline"><p>'+global.dictionary.information.research_headline+'</p></div>'+
							'<div class="form">'+
								'<div class="photo"><span></span></div>'+
								'<div class="content">'+
									'<div class="field left">'+
										'<div class="label"><p>'+global.dictionary.information.research_name_title+'</p></div>'+
										'<div class="value"><p>'+global.dictionary.information.research_name_text+'</p></div>'+
									'</div>'+
									'<div class="field">'+
										'<div class="label"><p>'+global.dictionary.information.research_dept_title+'</p></div>'+
										'<div class="value"><p><a href="'+global.dictionary.information.research_dept_link+'" target="_blank">'+global.dictionary.information.research_dept_text+'</a></p></div>'+
									'</div>'+
									'<div class="field long">'+
										'<div class="label"><p>'+global.dictionary.information.research_tasks_title+'</p></div>'+
										'<div class="value"><p>'+global.dictionary.information.research_tasks_text+'</p></div>'+
									'</div>'+
									'<div class="field long">'+
										'<div class="label"><p>'+global.dictionary.information.research_area_title+'</p></div>'+
										'<div class="value"><p>'+global.dictionary.information.research_area_text+'</p></div>'+
									'</div>'+
									'<div class="field long">'+
										'<div class="label"><p>'+global.dictionary.information.research_source_title+'</p></div>'+
										'<div class="value"><p>'+global.dictionary.information.research_source_text+'<br /><a href="'+global.dictionary.information.research_source_link+'" target="_blank">'+global.dictionary.information.research_source_link+'</a></p></div>'+
									'</div>'+
								'</div>'+
								'<div class="break"></div>'+
							'</div>'+
						'</div>'+

					//	[area] foot

						'<div class="area_foot area">'+
							'<div class="badges">'+
								'<div class="badge ocean"><a href="https://www.un.org/sustainabledevelopment/oceans" target="_blank"></a></div>'+
								'<div class="badge echosystem"><a href="https://www.un.org/sustainabledevelopment/biodiversity" target="_blank"></a></div>'+
								'<div class="break"></div>'+
							'</div>'+
							'<div class="logos">'+
								'<div class="logo bouvet"><a href="https://www.bouvet.se" target="_blank"></a></div>'+
								'<div class="logo nrm"><a href="http://www.nrm.se" target="_blank"></a></div>'+
								'<div class="break"></div>'+
							'</div>'+
							'<div class="break"></div>'+
							'<div class="notes">'+
								'<p>* '+global.dictionary.information.foot_toxins+'</p>'+
								'<p>'+global.dictionary.information.foot_admin+': <a href="mailto:'+global.dictionary.information.foot_admin_email+'">'+global.dictionary.information.foot_admin_name+'</a></p>'+
								'<div class="break"></div>'+
							'</div>'+
						'</div>'+

					'</div>';
					
			//	publish
				global.area.html('').append(html);
				
			//	------------
			//	controls, species

				var area = global.area.find('.area_dashboard .section[data-section="left"] .group[data-group="species"] .buttons');

				for ( var x = 1; x <= global.settings.species; x++)
				{
					//	keyboard shortcut
						var shortcut = x;

					//	build
						var html = '<div class="button" data-button="'+x+'"><a class="'+( x == 1 ? 'selected' : 'normal' )+'" onclick="js_click_dashboard(event,this);" href="javascript:void(0);">'+( global.settings.keys == true ? '<p class="key">'+shortcut+'</p>' : '')+'<p class="label">'+global.dictionary.species[x].name+'</p></a></div>';

					//	publish
						area.append(html);
				}

				area.append('<div class="break"></div>');

			//	------------
			//	controls, toxins

				var area = global.area.find('.area_dashboard .section[data-section="right"] .group[data-group="toxins"] .buttons');

				for ( var x = 1; x <= global.settings.toxins; x++)
				{
					//	build
						var html = '<div class="button" data-button="'+x+'"><a class="'+( x == 1 ? 'selected' : 'normal' )+'" onclick="js_click_dashboard(event,this);" href="javascript:void(0);"><p class="key">'+( global.settings.keys == true ? '<p class="key">'+(shortcut+x)+'</p>' : '')+'</p><p class="label">'+global.dictionary.toxins[x].name+'</p></a></div>';

					//	publish
						area.append(html);
				}

				area.append('<div class="break"></div>');

			//	------------

			//	inital dots
				js_visualize_data(32);
				
			//	load data
				js_setup_data();
		}


//		###########################
//		[SETUP] DATA

		function js_setup_data()
		{
			//	prepare
				var url = '/toximeter/data/' + global.settings.file_data;

			//	load data
				js_ajax(url,0,false,false,'js_setup_data_crunch');
		}


//		###########################
//		[SETUP] DATA CRUNCH

		function js_setup_data_crunch(csv)
		{
			//	parse csv » storage
			//	global.data.storage = Papa.parse(csv);
				Papa.parse(csv, 
				{
					skipEmptyLines:	true,
					error:			function(error,file)
									{
										console.log(error,file);
										alert('There was a problem parsing the data file.');
									},
					complete:		function(csv,file)
									{
										//	get, data
											global.data.storage = csv.data;
										//	global.data.storage.data.splice(0,2); // skip the first two rows
											global.data.storage.shift(); // skip the first row

										//	get, number of rows
											global.data.rows = global.data.storage.length - 1;

										//	------------
										//	timeline

										//	years, get
											$.each(global.data.storage, function(row,value)
											{
												//	year
													global.timeline.years.push( value[0] );
											});

										//	years, publish labels
											var year_first = global.timeline.years[0];
											var year_last = global.timeline.years[ global.data.rows ];

											global.area.find('.area_timeline .labels .year.start p.label').html('').append(year_first);
											global.area.find('.area_timeline .labels .year.end p.label').html('').append(year_last);

											global.area.find('.area_visual .trend .labels .year.start p.label').html('').append(year_first);
											global.area.find('.area_visual .trend .labels .year.end p.label').html('').append(year_last);

										//	timeline, build
											var area = global.area.find('.area_timeline .timeline .years');

											for ( var x = 0; x <= global.data.rows; x++ )
											{
												//	year, publish
													area.append('<span><p class="scale"></p><p class="progress"></p></span>');

												//	trend, publish
													global.area.find('.area_visual .trend .bars .years').append('<span><p></p><p></p></span>');
											}

										//	timeline, events
											js_data_select_events();

										//	bind click
											area.find('span').on('click', function(event)
											{
												js_click_timeline(event.currentTarget);
											});
											
										//	bind hover
											area.find('span').on('mousemove', function(event)
											{
												js_timeline_tag(true,event);
											});

											area.find('span').on('mouseout', function(event)
											{
												js_timeline_tag(false);
											});

										//	------------

										//	bind keys
											if ( global.settings.keys == true )
											{
												$(document).keypress(function()
												{
													js_global_key(event);
												});
											}

										//	------------

										//	select column
											js_global_forward_add('js_setup_events');
											js_data_select();

										//	reset
											js_timeline_reset();
									}
				});
		}


//		###########################
//		[SETUP] EVENTS

		function js_setup_events()
		{
			//	prepare
				var url = '/toximeter/data/' + global.settings.file_events;

			//	load data
				js_ajax(url,0,false,false,'js_setup_events_crunch');
		}


//		###########################
//		[SETUP] EVENTS CRUNCH

		function js_setup_events_crunch(csv)
		{
			//	parse csv
				Papa.parse(csv, 
				{
					skipEmptyLines:	true,
					error:			function(error,file)
									{
										console.log(error,file);
										alert('There was a problem with crunching the event file.');
									},
					complete:		function(csv,file)
									{
										//	get data
											var events = csv.data;
										//	events.splice(0,2);
											events.shift();

										//	language
											if ( global.settings.language == 'en' ) { var column = 1; }
											else { var column = 2; }
							
										//	loop
											$.each(events, function(row,value)
											{
												global.events.push({ 'id': value[0], 'text': value[column] });
											});
											
										//	finish
											js_setup_finish();
									}
				});
		}


//		###########################
//		[SETUP] FINISH

		function js_setup_finish()
		{

			//	demo
				if ( global.area.attr('data-demo') ) { js_demo(); }
				else
				{
					//	alert
						js_visualize_alert();
				}
		}


//		###########################
//		[SETUP] FIRSTRUN

		function js_setup_firstrun()
		{
			//	clear dots
				global.area.find('.area_visual .layers span').remove();

			//	finish
				global.setup = false;
		}
