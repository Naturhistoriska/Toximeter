

//		#######################################
//		SETTINGS

		function js_settings()
		{
				var settings = new Object();

			//	------------

			//	number of species
				settings.species = 3;
				
			//	number of toxins
				settings.toxins = 2;

			//	------------
			//	SPEED

				//	speed of animations (recommended is 500)
					settings.speed = 500;
	
				//	speed of timeline (recommended is 1400)
					settings.delay = 1400;

			//	------------
			//	EVENTS and TREND

				//	timeline events, initial state (true/false)
					settings.events = true;
	
				//	trend lines, initial state (true/false)
					settings.trend = false;

			//	------------
			//	KEYBOARD SHORTCUTS

				//	keyboard shortcuts (true/false)
					settings.keys = true;

			//	------------
			//	CSV

				//	name of csv file - data
					settings.file_data = 'contaminants_input_file.csv';
	
				//	name of csv file - events (milestones)
					settings.file_events = 'milestones_input_file.csv';
				
			//	------------

				return settings;
		}