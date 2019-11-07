

//		###########################
//		[DICTIONARY]

		function js_dictionary(language)
		{
				var dictionary				= new Array();
					dictionary.species		= new Array();
					dictionary.toxins		= new Array();

			//	------------
			//	langage » ENGLISH

				if ( language == 'en' )
				{
					//	------------
					//	species
		
						dictionary.species[1] =
						{
							"name"							:	"Otter",
							"image"							:	"otter.jpg"
						};
					
						dictionary.species[2] =
						{
							"name"							:	"Grey Seal",
							"image"							:	"seal.jpg"
						};
					
						dictionary.species[3] =
						{
							"name"							:	"Sea Eagle",
							"image"							:	"eagle.jpg"
						};

					//	------------
					//	toxins

						dictionary.toxins[1] =
						{
							"name"							:	"PCB",
							"units"							:	[0,'mg/kg','mg/kg','mg/kg']
						};
					
						dictionary.toxins[2] =
						{
							"name"							:	"DDT",
							"units"							:	[0,'mg/kg','mg/kg','mg/kg']
						};

					//	------------
					//	information

						dictionary.information =
						{
							"title"							:	"Toximeter",
							"intro"							:	"Long-term study of PCB and DDT analyzed in otters, sea eagles and gray seals has shown a decreasing trend in these pollutants, which resulted from effective policy measures grounded in biology and environmental science.",
							"column_1_title"				:	"Clarification",
							"column_1_text"					:	"High levels of PCB are associated with impaired reproduction in many animals including otters, sea eagles and gray seals. The average high level of PCB in sea eagle eggs, measured in milligrams per kilogram*, is visualized here as centigrams per kilogram.",
							"column_2_title"				:	"About PCB",
							"column_2_text"					:	"A polychlorinated biphenyl (PCB) is an organic chlorine compound that was once used as, for example, cooling fluid in electrical appliances before it was completely banned in 2001. The first and most comprehensive bans were in the mid-1970s.",
							"column_3_title"				:	"About DDT",
							"column_3_text"					:	"DDT is a colorless, tasteless and almost odorless chemical compound originally developed as an insecticide that has become notorious for its negative environmental impact, particularly its effect on egg shell thickness in sea eagles.",
							"welcome_title"					:	"Welcome",
							"welcome_text"					:	"Hit PLAY NOW in order to see the development over time. You can change species and toxin anytime, and hit PAUSE to take a closer look. Enjoy.",
							"welcome_button"				:	"Play now",
							"research_headline"				:	"On the measurements behind Toximeter... Meet Anna",
							"research_name_title"			:	"Name",
							"research_name_text"			:	"Anna Roos",
							"research_dept_title"			:	"Department",
							"research_dept_text"			:	"Environmental Research and Monitoring (MFÖ)",
							"research_dept_link"			:	"http://www.nrm.se/en/forskningochsamlingar/miljoforskningochovervakning.9000583.html",
							"research_tasks_title"			:	"Tasks",
							"research_tasks_text"			:	"I am leader of the Research and Analysis Group within the Environmental Research and Monitoring Unit. I perform necropsies of otters that have been found dead and sent to the museum. During the necropsies I take samples that are stored in the Environmental Specimen Bank for future contaminant analyses. I also perform necropsies of harbor porpoises in collaboration with pathologists at SVA in Uppsala.",
							"research_area_title"			:	"Research area",
							"research_area_text"			:	"I study environmental contaminants and health among aquatic apex species, with a special focus on otters. Some of my studies also involve cetaceans and seals (harbor, grey, and ringed seals).",
							"research_source_title"			:	"Data source",
							"research_source_text"			:	"Roos AM., Bäcklin BVM, Helander BO, Rigét FF, Eriksson UC. 2012. Improved reproductive success in otters (Lutra lutra), grey seals (Halichoerus grypus) and sea eagles (Haliaeetus albicilla) from Sweden in relation to concentrations of organochlorine contaminants. Environmental Pollution. 170: 268-275.",
							"research_source_link"			:	"https://doi.org/10.1016/j.envpol.2012.07.017",
							"foot_toxins"					:	"Milligrams of toxin per kilogram of tissue, lipid weight (mg/kg lw).",
							"foot_admin"					:	"Administrator",
							"foot_admin_name"				:	"Kevin Holston",
							"foot_admin_email"				:	"kevin.holston.nrm.se"
						};

					//	------------
					//	misc

						dictionary.misc =
						{
							"no_data"						:	"No data",
							"pause"							:	"Pause",
							"close"							:	"Close",
							"continue"						:	"Continue",
							"events_show"					:	"Show events",
							"events_hide"					:	"Hide events",
							"trend_show"					:	"Show trend",
							"trend_hide"					:	"Hide trend"
						};
				}

			//	------------
			//	langage » SWEDISH

				else if ( language == 'sv' )
				{
					//	------------
					//	species

						dictionary.species[1] =
						{
							"name"							:	"Utter",
							"image"							:	"otter.jpg"
						};
					
						dictionary.species[2] =
						{
							"name"							:	"Gråsäl",
							"image"							:	"seal.jpg"
						};
					
						dictionary.species[3] =
						{
							"name"							:	"Havsörn",
							"image"							:	"eagle.jpg"
						};

					//	------------
					//	toxins
					
						dictionary.toxins[1] =
						{
							"name"							:	"PCB",
							"units"							:	[0,'mg/kg','mg/kg','mg/kg']
						};
					
						dictionary.toxins[2] =
						{
							"name"							:	"DDT",
							"units"							:	[0,'mg/kg','mg/kg','mg/kg']
						};

					//	------------
					//	information

						dictionary.information =
						{
							"title"							:	"Toximeter",
							"intro"							:	"Långsiktiga studier av PCB och DDT som analyserats i utter, havsörn och gråsäl har visat på en nedåtgående trend av dessa föroreningar, som ett resultat av effektiva politiska åtgärder, grundade i biologi och miljövetenskap.",
							"column_1_title"				:	"Förklaring",
							"column_1_text"					:	"Höga halter av PCB är förknippat med försämrad reproduktion hos många djur, till exempel hos uttrar, havsörnar och gråsälar. Den genomsnittligt höga nivån av PCB i havörnsägg, mätt i milligram per kilo*, visualiseras här som centigram per kilo.",
							"column_2_title"				:	"Om PCB",
							"column_2_text"					:	"En polyklorerad bifenyl (PCB) är en organisk klorförening som en gång användes som till exempel kylvätskor i elektriska apparater innan det totalförbjöds 2001. Första och största förbuden kom i mitten av 1970-talet.",
							"column_3_title"				:	"Om DDT",
							"column_3_text"					:	"DDT är en färglös, smaklös och nästan luktfri kemisk förening som ursprungligen utvecklades som insektsmedel men som blivit ökänd för sin miljöpåverkan inte minst på grund av att den påverkar äggskalstjocklek hos havsörn.",
							"welcome_title"					:	"Välkommen",
							"welcome_text"					:	"Tryck på KÖR NU för att se utvecklingen över tid. Du kan byta både art och gift när som helst, och trycka på PAUS för att studera närmare. Lycka till.",
							"welcome_button"				:	"Kör nu",
							"research_headline"				:	"Om forskningen bakom Toximeter... Möt Anna",
							"research_name_title"			:	"Namn",
							"research_name_text"			:	"Anna Roos",
							"research_dept_title"			:	"Avdelning",
							"research_dept_text"			:	"Miljöforskning och -Övervakning (MFÖ)",
							"research_dept_link"			:	"http://www.nrm.se/forskningochsamlingar/miljoforskningochovervakning.9000583.html",
							"research_tasks_title"			:	"Arbetsuppgifter",
							"research_tasks_text"			:	"Jag är verksamhetsledare för Forskning och analysgruppen. Jag obducerar uttrar som är hittade döda och inskickade till museet. Under obduktionerna tar jag prover till miljöprovbanken för framtida miljögiftsanalyser. Tillsammans med patologer på SVA i Uppsala obducerar jag tumlare i ett gemensamt projekt samt för provtagning till miljöprovbanken.",
							"research_area_title"			:	"Forskningsområde",
							"research_area_text"			:	"Jag studerar miljögifter och hälsa hos akvatiska toppredatorer, med speciellt fokus på utter. Flera projekt handlar även om miljögifter och hälsostatus hos tumlare och sälar (knubb, grå och vikaresäl).",
							"research_source_title"			:	"Datakälla",
							"research_source_text"			:	"Roos AM., Bäcklin BVM, Helander BO, Rigét FF, Eriksson UC. 2012. Improved reproductive success in otters (Lutra lutra), grey seals (Halichoerus grypus) and sea eagles (Haliaeetus albicilla) from Sweden in relation to concentrations of organochlorine contaminants. Environmental Pollution. 170: 268-275.",
							"research_source_link"			:	"https://doi.org/10.1016/j.envpol.2012.07.017",
							"foot_toxins"					:	"Milligram av gift per kilo vävnad, lipidvikt (mg/kg lw).",
							"foot_admin"					:	"Ansvarig",
							"foot_admin_name"				:	"Kevin Holston",
							"foot_admin_email"				:	"kevin.holston.nrm.se"
						};

					//	------------
					//	misc

						dictionary.misc =
						{
							"no_data"						:	"Ingen data",
							"pause"							:	"Paus",
							"close"							:	"Stäng",
							"continue"						:	"Fortsätt",
							"events_show"					:	"Visa händelser",
							"events_hide"					:	"Göm händelser",
							"trend_show"					:	"Visa trend",
							"trend_hide"					:	"Göm trend"
						};
				}
				
			//	------------
			
				return dictionary;
		}
