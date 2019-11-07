

//		###########################
//		[TREND] PUBLISH

		function js_trend_publish()
		{
			//	prepare
				var area = global.area.find('.area_visual .trend .bars .years');
				var trend_max = Math.max.apply(null, global.data.trend);

			//	publish
				for ( var x = 0; x < global.data.trend.length; x++ )
				{
					var height = Math.round( ( global.data.trend[x] / trend_max ) * 100 );

					if ( global.settings.trend == false ) { height = 0; }
					else if ( height < 1 ) { height = 1; }

					area.find('span:nth-child(' + ( x + 1 ) + ') p').css({ 'height': height + '%' });
				}

				area.find('span:nth-last-child(1) p').css({ 'height': height + '%' });
		}


//		###########################
//		[TREND] UPDATE

		function js_trend_update(trend)
		{
			global.area.find('.area_visual .trend .years span.current').removeClass('current');
			global.area.find('.area_visual .trend .years span:nth-child(' + trend + ')').addClass('current');
		}


//		###########################
//		[TREND] TOGGLE

		function js_trend_toggle(e,element)
		{
			//	status » true
				if ( global.settings.trend == true )
				{
					//	status
						global.settings.trend = false;
						
					//	button
						$(element).removeClass('selected').addClass('normal');
						$(element).find('p.label').html('').append(global.dictionary.misc.trend_show);

					//	hide trend
						global.area.find('.area_visual .trend span p').css({ 'height': 0 });
				}
				
			//	status » false
				else if ( global.settings.trend == false )
				{
					//	status
						global.settings.trend = true;
						
					//	button
						$(element).removeClass('normal').addClass('selected');
						$(element).find('p.label').html('').append(global.dictionary.misc.trend_hide);

					//	show trend
						js_trend_publish();
				}
		}