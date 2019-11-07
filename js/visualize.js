

//		###########################
//		[VISUALIZE] DATA

		function js_visualize_data(dots_new)
		{
			//	prepare
				var area = global.area.find('.area_visual');
				if ( global.current.row < 10 ) { var trace_tab = '\t\t\t'; } else { var trace_tab = '\t\t\t'; }

			//	clean up
				area.find('.layers span.new').removeClass('new');
				area.find('.layers span.old').remove();

			//	count dots
				if ( !dots_new ) { var dots_new = js_data_dots(); }
				var dots_current = area.find('.layers span').length;

			//	------
			//	dots » no data

				if ( dots_new < 0 )
				{
					//	trace
						js_global_trace('Row: '+global.current.row+trace_tab+'Species: '+global.current.species+'\t\tToxin: '+global.current.toxins+'\t\t[No data]');
						
					//	theme
						js_global_theme('no_data');
				}

			//	---------
			//	dots » add

				else if ( dots_new > dots_current )
				{
					//	prepare
						var dots = dots_new - dots_current;

					//	trace
						js_global_trace('Row: '+global.current.row+trace_tab+'Species: '+global.current.species+'\t\tToxin: '+global.current.toxins+'\t\t'+ dots_new+' dots (add '+dots+')');
		
					//	dots, add
						for ( var x = 0; x < dots; x++ )
						{
							js_visualize_dot();
						}

					//	dots, show
						js_visualize_dot_show();

					//	theme
						js_global_theme();
				}
	
			//	------
			//	dots » remove

				else if ( dots_new < dots_current )
				{
					//	prepare
						var dots = dots_current - dots_new;

					//	trace
						js_global_trace('Row: '+global.current.row+trace_tab+'Species: '+global.current.species+'\t\tToxin: '+global.current.toxins+'\t\t'+ dots_new+' dots (remove '+dots+')');

					//	mark dots for removal
						while( area.find('.layers span.old').length < dots )
						{
							var size = js_visualize_random_size();
							area.find('.layer[data-layer="'+size+'"] span:not(.old):first').addClass('old');
						}

					//	dots, animate
						area.find('span.old').stop().transit({ 'width': '0', 'margin': '0' }, global.settings.speed);

					//	dots, show
						js_visualize_dot_show();

					//	theme
						js_global_theme();
				}
	
			//	------
			//	dots » no change

				else
				{
					//	trace
						js_global_trace('Row: '+global.current.row+trace_tab+'Species: '+global.current.species+'\t\tToxin: '+global.current.toxins+'\t\t[No change]');

					//	one dot
						if ( dots_new == 1 )
						{
							//	remove the one dot
								area.find('.layer span').not('new').addClass('old').stop().transit({ 'width': '0', 'margin': '0' }, global.settings.speed);

							//	add a new dot
								js_visualize_dot();
						}

					//	dots, show
						js_visualize_dot_show();

					//	theme
						js_global_theme();
				}

			//	------
			//	darker dots

				if ( dots_new == 1 )
				{
					//	make area darker
						var value = global.data.current[ global.current.row ];
	
						if ( value < 1 ) { global.area.find('.area_visual').attr('data-darker','true'); }
						else { global.area.find('.area_visual').attr('data-darker','false'); }
				}
				else { global.area.find('.area_visual').attr('data-darker','false'); }


			//	------
			//	timeline info

				js_timeline_info();

			//	------
			//	finish

				if ( global.forward.length > 0 ) { js_global_forward(); }
		}


//		###########################
//		[VISUALIZE] DOT

		function js_visualize_dot()
		{
			//	prepare, size
				var size = js_visualize_random_size();

			//	prepare, movement
				var movement = Math.floor(Math.random() * 6) + 1;

			//	prepare, position
				var position = js_visualize_random_position();
				var position_left = position.x;
				var position_top = position.y;

			//	dot, build
				var html = '<span class="new '+size+' movement'+movement+'" style="top: '+position_top+'%; left: '+position_left+'%;"></span>';

			//	dot, publish
				global.area.find('.area_visual .layer[data-layer="'+size+'"]').append(html);
		}


//		###########################
//		[VISUALIZE] DOT SHOW

		function js_visualize_dot_show()
		{
			var value_current = global.data.current[ global.current.row ];
			var value_visual = global.data.visual[ global.current.row ];
			var value_difference = value_current - value_visual;
			
			if ( ( value_current > 299 || value_difference > 2 ) && global.setup == false )
			{
				//	dots » large
					global.area.find('.area_visual .layers span.large').not('.old').stop().transit({ 'width': '24%', 'margin': '-12% 0 0 -12%' }, global.settings.speed);
					global.area.find('.area_visual .layers span.medium').not('.old').stop().transit({ 'width': '20%', 'margin': '-10% 0 0 -10%' }, global.settings.speed);
					global.area.find('.area_visual .layers span.small').not('.old').stop().transit({ 'width': '16%', 'margin': '-8% 0 0 -8%' }, global.settings.speed);
			}
			else
			{
				//	dots » normal
					global.area.find('.area_visual .layers span.large').not('.old').stop().transit({ 'width': '16%', 'margin': '-8% 0 0 -8%' }, global.settings.speed);
					global.area.find('.area_visual .layers span.medium').not('.old').stop().transit({ 'width': '12%', 'margin': '-6% 0 0 -6%' }, global.settings.speed);
					global.area.find('.area_visual .layers span.small').not('.old').stop().transit({ 'width': '8%', 'margin': '-4% 0 0 -4%' }, global.settings.speed);
			}
		}


//		###########################
//		[VISUALIZE] RANDOM SIZE

		function js_visualize_random_size()
		{
			var size = Math.floor(Math.random() * 7);

			if ( size == 0 || size == 3 || size == 5 || size == 6 ) { var size = 'small'; }
			else if ( size == 1 || size == 4 ) { var size = 'medium'; }
			else if ( size == 2 ) { var size = 'large'; }
			else { alert('Error: js_visualize_random_size();'); }
			
			return size;
		}


//		###########################
//		[VISUALIZE] RANDOM POSITION
//
//		Credit: Arvid Kronosjö (Bouvet)

		function js_visualize_random_position(radius=42)
		{
			function Vector2f(x,y)
			{
				this.x=x;
				this.y=y;

				this.normalize = function()
				{
					var l = this.length();
					this.x = this.x/l;
					this.y = this.y/l;
				};
				
				this.length = function()
				{
					return Math.sqrt(this.x*this.x + this.y*this.y);
				};
				
				this.multiply = function(m){
					this.x*=m;
					this.y*=m;
				};
			}

			var center = new Vector2f(50,50);
			var randomX = -radius + (Math.random()*(radius*2));
			var randomY = -radius + (Math.random()*(radius*2));
			
			var v = new Vector2f(randomX,randomY);
			v.normalize();
			v.multiply(Math.random()*radius);
			
			var circleVector = new Vector2f(center.x+v.x,center.y+v.y);
			return circleVector;
		}


//		###########################
//		[VISUALIZE] ALERT

		function js_visualize_alert(type,content)
		{
			//	prepare
				var area = global.area.find('.area_visual .alert');
				area.css({ 'visibility': 'hidden' }).show();
				
			//	type » event
				if ( type == 'event' )
				{
					area.find('.editorial h1').html('').append(content[0]);
					area.find('.editorial p').html('').append(content[1]);
					area.find('.buttons .button:nth-child(1) p.label').html('').append(global.dictionary.misc.continue);
				}

			//	center position
				js_visualize_alert_center();

				area.hide().css({ 'visibility': 'visible' }).delay(global.settings.speed).fadeIn(200);
		}


//		###########################
//		[VISUALIZE] ALERT CENTER

		function js_visualize_alert_center()
		{
			//	prepare
				var area = global.area.find('.area_visual .alert');

			//	center
				if ( window.innerWidth > 700 )
				{
					var height = area.outerHeight();
					var margin = 0 - ( height / 2);
				}
				else
				{
					var margin = 0;
				}
					
				area.css({ 'margin-top': margin + 'px' });
		}


//		###########################
//		[VISUALIZE] ALERT CLOSE

		function js_visualize_alert_close()
		{
			//	prepare
				var alert = global.area.find('.area_visual .alert');

			//	hide
				alert.hide();
		}