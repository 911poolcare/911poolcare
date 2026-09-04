import { site } from "@/content/site";

export type CityLocalFaq = {
  question: string;
  answer: string;
};

export type CityServiceLocal = {
  /** Short unique hero intro — not a city-name swap of the hub copy */
  heroIntro: string;
  /** H2 for the unique local section */
  title: string;
  paragraphs: string[];
  typicalPools: string;
  highlights: string[];
  faqs: CityLocalFaq[];
};

type ServiceSlug =
  | "pool-leak-detection"
  | "pool-equipment-repair"
  | "pool-renovations"
  | "pool-inspections";

const cityServiceLocal: Record<string, Partial<Record<ServiceSlug, CityServiceLocal>>> = {
  austin: {
    "pool-leak-detection": {
      heroIntro:
        "Austin pool leaks rarely look like one problem. Central neighborhoods still run 1970s–90s gunite with original underground PVC, while Circle C, Steiner Ranch, and Mueller add spas, waterfalls, and longer plumbing runs. We verify real water loss versus summer evaporation, locate the leak with Leaktronics and Anderson gear, then complete the repair — often the same visit.",
      title: "Why Austin pools leak — and how we find them",
      paragraphs: [
        "Austin's pool stock is really two markets. Allandale, Barton Hills, Tarrytown, and Northwest Hills still have a lot of older gunite shells, original skimmer throats, light niches, and plumbing that was buried before the patio got expanded. Those leaks show up as wet deck joints, unexplained water bills, or a waterline that drops overnight. Newer builds in Circle C, Steiner Ranch, Mueller, and South Austin more often leak at spa valves, water-feature lines, and fittings the homeowner never sees.",
        "The ground does the rest. Expansive clay in North Austin, limestone and live-oak roots in the hills, and concrete poured over return lines all hide leaks. Austin Water rates make a half-inch-a-day loss expensive quickly, and autofill can mask it until the bill arrives. We start with a Leakalyzer check so you are not paying for a full detection on evaporation, then use dye testing, pressure testing, pipe cameras, and electronic listening to mark the exact repair spot.",
        "From Northwest Hills to East Austin, the goal is the same: open the right square of deck or rock, fix the line or fitting, and get the pool holding water again. Many plumbing and fitting repairs finish the same day once the source is confirmed.",
      ],
      typicalPools:
        "Older central-Austin gunite (1970s–90s) mixed with 2000s–2020s production pools that often have attached spas, waterfalls, and long equipment runs in Circle C, Steiner Ranch, and Mueller.",
      highlights: [
        "Older Central Austin gunite shells and original 1980s–90s plumbing",
        "Hillside and limestone lots in Northwest Hills, Barton Hills, and Steiner Ranch",
        "Leakalyzer check first — Austin heat hides leaks behind evaporation and autofill",
        "Spas, waterfalls, and long equipment runs on newer southwest and east Austin builds",
        "Electronic locating so we open the right patio square, not the whole deck",
        "Same-visit repair when the source is confirmed",
      ],
      faqs: [
        {
          question: "Why does my Austin pool lose water in July even when it is covered?",
          answer:
            "Central Texas heat causes real evaporation, but a cover should slow that down. If you are still losing more than about ½ inch per day — or the autofill runs after sundown — it is usually a leak in the shell, plumbing, or equipment pad. We verify loss on site with a Leakalyzer before a full detection so you are not paying to chase evaporation.",
        },
        {
          question: "Do older Central Austin gunite pools leak differently than newer Circle C builds?",
          answer:
            "Often yes. Older Allandale, Barton Hills, and Northwest Hills pools commonly leak at original skimmers, light niches, hairline shell cracks, and PVC that has been under a later patio pour. Newer Circle C, Steiner Ranch, and Mueller pools more often leak at spa valves, water-feature lines, and fittings. We pressure-test circuits and dye-test fittings so we treat the pool in front of us, not a generic checklist.",
        },
        {
          question: "Can you repair a leak under a limestone patio without tearing up the whole deck?",
          answer:
            "That is the point of electronic locating. Once pressure testing isolates the circuit, we use listening gear and locating devices to mark the leak under decking, rock, or landscaping, then open that spot. We cannot promise zero demo on every job, but we do not trench blindly across an Austin patio to find a line.",
        },
        {
          question: "How much does pool leak detection cost in Austin?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. In-floor cleaning systems and extra pumps add to the quote. For residential pools losing more than ½ inch per day, if we cannot locate the leak after on-site testing you pay only the $120 down payment — not the full detection fee.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Austin equipment pads take a beating — long swim seasons, hard water, and everything from 20-year-old pumps in Central Austin to variable-speed systems and automation in Steiner Ranch and Westlake-adjacent homes. We diagnose pumps, filters, heaters, lights, and controls, then repair or replace them correctly the first time.",
      title: "Pool equipment repair for Austin's mix of old pads and new automation",
      paragraphs: [
        "An equipment pad in Tarrytown does not look like one in Circle C. Central Austin still has a lot of single-speed pumps, aging filters, and heaters that get used hard in spring and fall. Southwest and west Austin homes more often have variable-speed pumps, salt systems, and automation (EasyTouch, OmniLogic, iAquaLink) that fail at boards, load centers, and actuators rather than at the motor.",
        "We start with a real diagnosis — $120 for pumps and $150 for heaters, each with a $50 credit toward approved repairs — instead of swapping parts until something sticks. Danielle leads equipment and electrical work as our RAIL-certified Installer of Record, which matters on Austin jobs where a heater, light, or timeclock needs licensed electrical work, not a guess.",
        "Whether the pad is crammed behind a fence in South Austin or sitting on a hillside run in Northwest Hills, we repair or replace pumps, filters, heaters, automation, and lights so the system matches how you actually use the pool.",
      ],
      typicalPools:
        "Single-speed and older pads in central neighborhoods; variable-speed pumps, salt chlorinators, and full automation on 2000s–2020s builds in Circle C, Steiner Ranch, and Westlake-adjacent Austin.",
      highlights: [
        "Pump, filter, heater, light, and automation repair across Austin",
        "Variable-speed and salt-system work common on newer southwest Austin pads",
        "RAIL-certified electrical for heaters, lights, and timeclocks",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Boards, actuators, and load centers — not just motors",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "Do you repair pool heaters in Austin, or only pumps?",
          answer:
            "Both. We diagnose and repair or replace pumps, filters, heaters, automation, and lights. Heater diagnostics are $150 with a $50 credit toward approved repairs. Austin owners often run heaters in spring and fall — we check heat exchangers, igniters, gas, and control boards rather than defaulting to a full replacement.",
        },
        {
          question: "Can you work on Pentair, Jandy, or Hayward automation in Austin?",
          answer:
            "Yes. We see EasyTouch, OmniLogic, iAquaLink, and similar systems across Steiner Ranch, Circle C, and Westlake-adjacent homes. We troubleshoot load centers, actuators, and boards, and we can replace equipment without forcing you onto a brand you do not want unless the old system is truly obsolete.",
        },
        {
          question: "My Austin pump runs all day and the pool still looks cloudy. Is that a leak?",
          answer:
            "Not always. Cloudiness is often a filter, pump, or circulation problem — a failing impeller, a dirty or damaged grid, or a variable-speed pump set too low. If the waterline is also dropping, we look at leak detection separately. We would rather diagnose the pad than sell you a detection you do not need.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Thousands of Austin pools from the 1990s and 2000s are hitting the replaster window — rough plaster, stained surfaces, and tired waterline tile. From Westlake and Northwest Hills to Circle C and Steiner Ranch, we handle PebbleTec, tile, coping, and full remodels. Start with a free on-site consultation.",
      title: "Austin pool renovations: the 15–25 year plaster cycle is here",
      paragraphs: [
        "Austin's building boom left a huge wave of pools that are now 15–25 years old. Plaster that was fine in 2004 is chalky, stained, or delaminating in 2026. That is true in established central neighborhoods and in Circle C, Steiner Ranch, and the southwest boom tracts. Heat, calcium, and heavy summer use wear a surface faster here than a brochure timeline suggests.",
        "Finish choice is local, not generic. Westlake and hillside lots often want PebbleTec or another aggregate that hides scale and lasts. Central Austin remodels sometimes stay with a smoother plaster or quartz when the homeowner wants a cleaner feel underfoot. We install PebbleTec, MicroFusion, Stonescapes, Quartzscapes, and marcite — and we will say so if tile, coping, or a leak check should happen before the new surface goes on.",
        "Chris manages Austin renovations from the free consultation through final walkthrough. If we suspect water loss, we would rather find the leak before replastering than bury it under a new finish.",
      ],
      typicalPools:
        "1990s–2000s gunite hitting replaster age across the metro, plus hillside Westlake-adjacent pools with rockwork, spas, and waterline tile that has not been updated since the original build.",
      highlights: [
        "Free on-site consultation for Austin replaster and remodel projects",
        "PebbleTec and premium aggregates popular on hillside and west Austin pools",
        "Waterline tile, coping, and trim updates with the new surface",
        "Leak check before resurfacing when the pool is losing water",
        "Residential backyards and commercial / HOA amenity pools",
        "One project manager from consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my Austin pool needs replastering or just a good clean?",
          answer:
            "Stains that do not come off, rough plaster that snags skin, visible aggregate popping, or plaster that is 15–25 years old usually mean resurfacing — not another acid wash. Austin heat and calcium make worn plaster look dirty even when chemistry is in range. A free on-site consultation is the honest way to tell the difference.",
        },
        {
          question: "Do you replaster commercial or HOA pools in Austin?",
          answer:
            "Yes. We handle HOA amenities, apartment communities, and other commercial pools across Austin in addition to backyard renovations. Commercial work is scoped separately from a residential replaster — timeline, drain-down, and finish choice all change when the pool cannot sit empty for long.",
        },
        {
          question: "Should leak detection happen before an Austin replaster?",
          answer:
            "If the pool is losing water, yes. Putting a new finish over an active shell or plumbing leak is an expensive way to hide the problem. We can coordinate leak detection and repair before resurfacing so the new plaster is not sitting on a pool that still will not hold water.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Austin's real estate market moves fast, and a pool can be the most expensive surprise in a contract. We provide CPI-certified inspections with a written report and photos for buyers, sellers, and agents — structure, equipment, plumbing, electrical, and safety — not a general home inspector guessing at the pool.",
      title: "Certified pool inspections for Austin buyers, sellers, and agents",
      paragraphs: [
        "An Austin pool inspection is often the difference between a clean close and a last-minute credit fight. Buyers in Mueller, Circle C, and East Austin need to know whether that sparkling waterline hides a 20-year-old pump, a heater that will not ignite, or coping that is walking off the beam. Sellers in Tarrytown and Northwest Hills are better off documenting issues before the listing than discovering them in option period.",
        "Chris — our General Manager and CPI-certified inspector — does the inspection himself. The visit is up to two hours on site, then a written report with photos. We look at the shell and visible surface, circulation, pumps and heaters, electrical and safety items, valves and obvious leaks, and the deck, tile, and coping. We write in plain language so your agent can actually use the report.",
        "If the inspection turns up a leak, failed equipment, or a surface that is at the end of its life, the same company can handle next steps. You are not required to use us for repairs — the report is unbiased — but most clients like having one team that already knows the pool.",
      ],
      typicalPools:
        "Resale homes with 1990s–2010s backyard gunite, plus newer production pools in Mueller, Circle C, and Steiner Ranch where buyers want equipment age and leak risk documented before closing.",
      highlights: [
        "CPI-certified inspections by Chris — not a general home inspection add-on",
        "Built for Austin option periods: written report and photos after the visit",
        "Structure, plumbing, equipment, electrical, and safety on one checklist",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Clear language agents and lenders can use — not alarmist filler",
        "Optional leak detection or repair quotes if the report flags them",
      ],
      faqs: [
        {
          question: "Is a pool inspection required when buying a home in Austin?",
          answer:
            "It is not a city mandate, but it is one of the highest-ROI inspections you can add in option period. General home inspectors are not pool specialists. A $360 certified pool inspection can flag a heater, plaster, or leak issue that would cost far more after you own the house.",
        },
        {
          question: "How fast can you inspect a pool before an Austin closing?",
          answer:
            "Call as soon as you are under contract. We schedule across Austin and nearby cities from our Leander base, and we will tell you honestly if we can hit your option-period window. The on-site visit is up to two hours; you get a written report with photos after.",
        },
        {
          question: "What if the Austin inspection finds a leak?",
          answer:
            "The report will document what we can see and recommend leak detection if water loss or plumbing signs are there. Pressure testing and electronic leak detection are separate services — they are not part of a standard visual inspection. We can quote that work, or you can take the report to another specialist.",
        },
      ],
    },
  },
  georgetown: {
    "pool-leak-detection": {
      heroIntro:
        "Georgetown leaks split along the same line as the city: Sun City and established neighborhoods with 15–25-year-old plumbing, and newer Wolf Ranch and infill pools with construction and fitting leaks. We locate the source with Leaktronics and Anderson systems, then complete the repair before a small loss becomes deck damage or a high water bill.",
      title: "Pool leak repair in Sun City, Wolf Ranch, and established Georgetown",
      paragraphs: [
        "Sun City Georgetown is a leak-detection market of its own. Many of those community and backyard pools were built in the late 1990s and 2000s with original underground lines, skimmers, and equipment pads that are now at the age when fittings fail and PVC joints give up. Retirees notice water loss quickly because a lot of those pools run most of the year, not just June through August.",
        "Wolf Ranch, Berry Creek, Serenada, and Old Town look different. Newer production pools leak at spa valves, poorly bedded lines, and fittings. Older Georgetown Village and Berry Creek gunite more often shows shell and skimmer leaks after years of Williamson County clay movement. We pressure-test the circuits that matter for that pool instead of treating every Georgetown address like the same job.",
        "From our Leander base, Georgetown is a regular same-week route. If the leak is under a Sun City patio or a Wolf Ranch deck, we mark it electronically, quote the repair, and in many cases fix it the same visit.",
      ],
      typicalPools:
        "Sun City and established Georgetown gunite from the 1990s–2000s with original plumbing, plus newer Wolf Ranch and infill pools where leaks show up at fittings, spas, and construction joints.",
      highlights: [
        "Sun City pools — original 1990s–2000s plumbing and year-round use",
        "Wolf Ranch and newer builds — fitting, spa, and construction leaks",
        "Williamson County clay movement that stresses buried PVC",
        "Electronic locating under patios common in retirement-community lots",
        "Same-week Georgetown scheduling from our Leander shop when available",
        "Same-visit repair once the source is confirmed",
      ],
      faqs: [
        {
          question: "Do you work on Sun City Georgetown community and backyard pools?",
          answer:
            "Yes. Sun City is a core Georgetown route for us — backyard pools and community amenities. Those systems are often 15–25 years old with original plumbing. We verify water loss, pressure-test lines, and repair what we find. HOA and amenity work is quoted as commercial when the property is not a single-family backyard.",
        },
        {
          question: "My Wolf Ranch pool is only a few years old. Can it still leak?",
          answer:
            "New pools leak. Construction debris in lines, undersupported PVC, spa-check valves, and fittings that were never primed correctly all show up in the first few seasons. We do not assume 'too new to leak.' We test the pool in front of us.",
        },
        {
          question: "How do I know if my Georgetown pool is leaking or just evaporating?",
          answer:
            "If you are losing more than ½ inch per day, seeing wet spots near equipment, or refilling constantly, it is worth a check. Sun City owners who swim year-round often catch this earlier than summer-only households. We verify loss on site with a Leakalyzer before recommending a full detection.",
        },
        {
          question: "How much does leak detection cost in Georgetown?",
          answer:
            "Residential detection starts at $650 for a basic pool with a single pump and $750 for pool and spa with a single pump. If a residential pool is losing more than ½ inch per day and we cannot find the leak after testing, you pay only the $120 down payment.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Georgetown equipment jobs are often either a Sun City pad that has run the same pump for 20 years, or a Wolf Ranch system that is still new and already throwing errors. We repair and replace pumps, filters, heaters, automation, and lights — with licensed electrical work when the job needs it.",
      title: "Equipment repair for Georgetown's retirement-community pads and new builds",
      paragraphs: [
        "Sun City and the older Georgetown neighborhoods keep us on heaters and pumps that have been in the weather since the original build. Those motors still run until they do not, and a failed heater in January matters more here than in a summer-only backyard. We diagnose first — $120 pump, $150 heater, $50 credit toward approved repairs — then replace what is actually failed.",
        "Wolf Ranch and newer Georgetown pads more often need board-level automation work, salt-cell replacements, and variable-speed pumps that were set wrong or never commissioned well. We work on Pentair, Jandy, Hayward, and similar equipment without forcing a brand change unless the old system is obsolete.",
        "Danielle leads equipment and electrical as our RAIL-certified Installer of Record. That matters on Georgetown jobs where a timeclock, heater, or light needs to be done to code, not jumpered to 'get you through the weekend.'",
      ],
      typicalPools:
        "Aging Sun City and Berry Creek pads with original pumps and heaters; newer Wolf Ranch systems with variable-speed pumps, salt chlorinators, and automation.",
      highlights: [
        "Heater repair that matters for year-round Sun City swimming",
        "Pump and filter replacements on 15–25-year-old Georgetown pads",
        "Automation and salt-system work on newer Wolf Ranch builds",
        "RAIL-certified electrical for heaters, lights, and timeclocks",
        "Pump diagnostic $120 / heater diagnostic $150 — $50 repair credit",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "Can you replace a pool heater in Sun City Georgetown?",
          answer:
            "Yes. Sun City owners run heaters more of the year than a typical Austin backyard. We diagnose the existing unit first ($150, with a $50 credit toward approved work) and replace it when repair no longer makes sense. Gas, heat-pump, and related pad work are quoted from what we find on site.",
        },
        {
          question: "Do you service Wolf Ranch pool equipment still under warranty?",
          answer:
            "We can inspect it and tell you whether the manufacturer or builder warranty still applies. If it does, we will say so rather than billing you to void it. Out of warranty, we repair or replace pumps, filters, heaters, and automation the same way we do anywhere in Georgetown.",
        },
        {
          question: "Why does my Georgetown pump keep losing prime?",
          answer:
            "Lost prime is often a leak on the suction side, a failed lid o-ring, a clogged basket — or an underground suction leak. We check the pad first. If the equipment is sound and the pump still will not hold prime, that is a leak-detection job, not another pump.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Georgetown's older neighborhoods and Sun City are full of pools ready for resurfacing — plaster that has done its 15–25 years, waterline tile that will not come clean, and coping that has shifted with the clay. We offer free renovation consultations and handle replaster, PebbleTec, tile, and full remodels throughout Georgetown.",
      title: "Replaster and remodel work for Sun City and established Georgetown",
      paragraphs: [
        "Sun City Georgetown and the 1990s–2000s neighborhoods around Berry Creek and Georgetown Village are right in the replaster window. Surfaces that were new when the houses were built are now stained, rough, or thinning. That is a finish problem, not a chemistry problem, and another round of acid washing will not bring the plaster back.",
        "Newer Wolf Ranch pools are less often a full replaster — more often tile repair, coping, or a surface that was never quite right. We still start with a free on-site consultation so we do not sell a PebbleTec remodel to a homeowner who needs a targeted tile fix.",
        "If the Georgetown pool is also losing water, we want leak detection on the calendar before the new surface. Burying a shell leak under fresh plaster is a mistake we will talk you out of.",
      ],
      typicalPools:
        "Sun City and established Georgetown gunite from the original community builds, now due for plaster, tile, and coping; newer Wolf Ranch pools that more often need targeted tile or finish corrections.",
      highlights: [
        "Free on-site consultation in Sun City, Wolf Ranch, and greater Georgetown",
        "Replaster for 15–25-year-old community and backyard pools",
        "PebbleTec, MicroFusion, quartz, and marcite — matched to how you use the pool",
        "Tile and coping repairs when a full remodel is not the right call",
        "Leak check before resurfacing if the pool will not hold water",
        "One project manager from consult through walkthrough",
      ],
      faqs: [
        {
          question: "Are Sun City Georgetown pools a typical replaster job?",
          answer:
            "Many of them are. Those surfaces are often 15–25 years old and in the normal replaster window. Access, HOA rules, and whether it is a backyard vs. amenity pool change the scope, which is why we start with a free on-site consultation instead of a phone quote.",
        },
        {
          question: "Do you renovate newer Wolf Ranch pools?",
          answer:
            "Yes, when they need it. Newer pools more often need tile, coping, or a finish correction than a full 20-year replaster. We will tell you if a smaller repair is the better spend.",
        },
        {
          question: "Can you finance a Georgetown pool renovation?",
          answer:
            "Yes. We offer financing options so you can start the remodel and pay over time, and we accept major credit cards. Ask during the free consultation or apply online.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Buying or selling in Georgetown — Sun City, Wolf Ranch, Berry Creek, or Old Town — a certified pool inspection keeps the transaction honest. Chris provides a CPI-certified report with photos covering structure, equipment, plumbing, electrical, and safety so agents and buyers are not guessing.",
      title: "Pool inspections for Georgetown resale — especially Sun City",
      paragraphs: [
        "Georgetown transactions often include a pool that is either original to a Sun City or Berry Creek home, or a few years old in Wolf Ranch. Those are different risk profiles. An older Sun City pool may have aging equipment, thinning plaster, and plumbing that has never been pressure-tested. A newer Wolf Ranch pool may look perfect and still have a fitting leak or a heater that was never commissioned well.",
        "The inspection is up to two hours on site with a written report and photos. We do not treat it like a free sales lead. You get a CPI-certified assessment you can attach to the option-period conversation, written so a realtor can use it without translating contractor jargon.",
        "If the report flags a leak or failed equipment, you can take it anywhere. Most Georgetown clients ask us to quote the next step because we already know the pool.",
      ],
      typicalPools:
        "Sun City and established Georgetown resale pools from the 1990s–2000s, plus newer Wolf Ranch backyard pools going through first-sale inspections.",
      highlights: [
        "CPI-certified inspections by Chris for Georgetown buyers and sellers",
        "Sun City equipment age and plaster condition documented in plain language",
        "Newer Wolf Ranch pools checked for construction and fitting issues",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos for option period and listing prep",
        "Optional leak detection if the inspection finds water-loss signs",
      ],
      faqs: [
        {
          question: "Should I inspect a Sun City Georgetown pool before I buy?",
          answer:
            "Yes. Many of those pools are original to the home and 15–25 years old. A general home inspection will not catch plaster life, heater condition, or leak signs the way a CPI-certified pool inspection will. The $360 visit is cheap insurance in a Sun City contract.",
        },
        {
          question: "Do Wolf Ranch builders' walkthroughs replace a pool inspection?",
          answer:
            "No. A builder walkthrough is not a certified pool inspection. If you are the first resale, you still want an independent report on equipment, leaks, and surface condition — especially if the pool has a spa or automation the listing photos do not explain.",
        },
        {
          question: "Can you inspect a Georgetown pool during option period?",
          answer:
            "That is most of this work. Call as soon as you are under contract. We serve Georgetown from Leander and will tell you if we can meet your option window. Cold-water add-on applies when the water is below 70°F.",
        },
      ],
    },
  },
  "round-rock": {
    "pool-leak-detection": {
      heroIntro:
        "Round Rock pools — Teravista, Forest Creek, Old Town, Behren's Ranch — lose water to summer use, clay movement, and a lot of 2000s in-floor cleaning systems. We verify loss, locate the leak with Leaktronics and Anderson gear, and complete the repair so you are not refilling the pool all season.",
      title: "Leak detection for Round Rock's 2000s pools and in-floor systems",
      paragraphs: [
        "Round Rock's backyard pool boom in the 2000s left thousands of gunite pools in Teravista, Forest Creek, Palm Valley, and Behren's Ranch. Those pools are now at the age when underground PVC, skimmer throats, and fittings start to fail. A lot of them also have in-floor cleaning systems — which means extra circuits and heads to test, not just a main drain and two returns.",
        "Old Town and the older east-side neighborhoods look more like classic Central Texas gunite: simpler plumbing, older shells, and leaks at lights and skimmers. Newer Siena and Walsh Ranch builds more often leak at spa valves and construction fittings. We include up to 20 in-floor heads in our base in-floor pricing because that is what Round Rock actually has.",
        "Clay soil and long, hot summers do the rest. Autofill runs, the water bill jumps, and it still looks like evaporation until someone measures it. We Leakalyzer-check first, then locate and repair. From our Leander base, Round Rock is a regular 3–5 day route.",
      ],
      typicalPools:
        "2000s golf-community and subdivision gunite in Teravista and Forest Creek — many with in-floor cleaning — plus older Old Town pools and newer production builds in Siena and Walsh Ranch.",
      highlights: [
        "In-floor cleaning systems common in Teravista and Forest Creek — we test the heads",
        "2000s underground PVC that is now in the leak window",
        "Old Town shells and skimmer leaks on older Round Rock gunite",
        "Spa and fitting leaks on newer Siena and Walsh Ranch builds",
        "Leakalyzer first so summer evaporation does not get billed as a detection",
        "Same-visit repair when the source is confirmed",
      ],
      faqs: [
        {
          question: "Do you test in-floor cleaning systems on Round Rock pools?",
          answer:
            "Yes. A lot of Teravista, Forest Creek, and similar 2000s Round Rock pools have in-floor heads. Our in-floor add-on starts at $400 and includes up to 20 heads; additional heads are $20 each. Skipping the in-floor circuit is how you 'find nothing' and still lose water.",
        },
        {
          question: "My Teravista pool drops overnight. Is that a leak?",
          answer:
            "Overnight drop with the pump off is one of the cleaner leak signals — evaporation slows at night. If you are losing more than ½ inch per day, or the autofill runs after dark, we should verify with a Leakalyzer and then locate the source. Do not keep refilling all summer hoping it is the heat.",
        },
        {
          question: "Can you find leaks under a Forest Creek deck without tearing it all up?",
          answer:
            "We use pressure testing and electronic locating to mark the leak, then open that area. Forest Creek and Teravista decks are often large, so blind demo is the expensive mistake. We cannot promise zero concrete on every job, but we do not trench the whole patio to find one joint.",
        },
        {
          question: "How much does leak detection cost in Round Rock?",
          answer:
            "Residential detection starts at $650 for a basic pool with a single pump and $750 for pool and spa. In-floor systems start at $400 extra with up to 20 heads included. The $120 down-payment guarantee applies to residential pools losing more than ½ inch per day if we cannot find the leak after testing.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Round Rock equipment pads work hard — families swim all summer, in-floor booster pumps run extra circuits, and 2000s filters and heaters are at replacement age. We diagnose pumps, filters, heaters, automation, and lights, then repair or replace them with licensed electrical work when needed.",
      title: "Equipment repair for Round Rock family pools and in-floor pads",
      paragraphs: [
        "A Teravista or Forest Creek pad is often busier than a retirement-community pad: longer pump hours, a booster for in-floor heads, a heater that gets used for weekend swims, and a filter that has not been opened in years. When something fails in July, the pool is not optional. We diagnose pumps for $120 and heaters for $150, each with a $50 credit toward approved repairs.",
        "Older Old Town equipment is simpler and often original. Newer Siena and Walsh Ranch pads more often have variable-speed pumps and automation that fail at boards and actuators. We work across that range — Pentair, Jandy, Hayward, and similar — and we will not replace a pump when the real problem is a leak on the suction side.",
        "Danielle leads equipment and electrical as our RAIL-certified Installer of Record. Round Rock jobs that need a heater circuit, timeclock, or bonding done correctly go through that license, not a jumper wire.",
      ],
      typicalPools:
        "Family 2000s pads in Teravista, Forest Creek, and Palm Valley — often with booster pumps and aging filters — plus simpler Old Town equipment and newer variable-speed systems in Siena and Walsh Ranch.",
      highlights: [
        "Booster pumps and in-floor systems common on Round Rock pads",
        "Pump, filter, and heater replacements on 2000s family pools",
        "Variable-speed and automation work on newer Siena / Walsh Ranch builds",
        "RAIL-certified electrical for heaters, lights, and timeclocks",
        "Pump diagnostic $120 / heater diagnostic $150 — $50 repair credit",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "My Round Rock in-floor system is weak. Is that the booster pump?",
          answer:
            "Sometimes. Weak in-floor action can be a failing booster, a clogged filter, heads that need service, or a leak on that circuit. We check the pad first. If the booster is healthy and heads still will not pop, leak detection on the in-floor line is the next step — not another booster.",
        },
        {
          question: "Do you replace pool pumps in Forest Creek and Teravista?",
          answer:
            "Yes. Those 2000s pads are at typical pump and filter replacement age. We can repair when it makes sense, or upgrade to a variable-speed pump when the old single-speed is done. Diagnosis is $120 with a $50 credit toward approved work.",
        },
        {
          question: "Can you fix a pool heater that will not fire in Round Rock?",
          answer:
            "That is a heater diagnostic ($150, $50 credit toward approved repairs). We check igniters, gas, heat exchangers, and control boards before quoting a replacement. A heater that sits unused all summer and fails on the first cool weekend is a common Round Rock call.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Round Rock's 2000s backyard pools — especially Teravista, Forest Creek, and Palm Valley — are in the replaster window. We handle resurfacing, PebbleTec, tile, coping, and full remodels, starting with a free on-site consultation and a clear plan.",
      title: "Replastering Round Rock's 2000s subdivision pools",
      paragraphs: [
        "If your Round Rock pool was new with the house in the early 2000s, the plaster is statistically due. Teravista, Forest Creek, Behren's Ranch, and Palm Valley are full of those jobs: stained waterlines, rough floors, and tile that will not come clean no matter what the route cleaner pours in. That is resurfacing, not a chemistry tweak.",
        "In-floor pools add a wrinkle. Heads, pop-ups, and the finish around them have to be planned with the new surface, not as an afterthought. We would rather talk through that at the free consultation than surprise you mid-project.",
        "Older Old Town pools and newer Siena builds need different things — a full remodel vs. a targeted tile or coping repair. Chris manages the project from consult through walkthrough, and we will push leak detection first if the pool is losing water.",
      ],
      typicalPools:
        "Early-2000s gunite in Teravista, Forest Creek, and Palm Valley — many with in-floor cleaning — now due for plaster and waterline tile; older Old Town shells and newer production pools that more often need smaller finish work.",
      highlights: [
        "Free on-site consultation for Teravista, Forest Creek, and greater Round Rock",
        "Replaster timed to 2000s subdivision pools hitting 15–25 years",
        "In-floor head and finish details planned with the new surface",
        "PebbleTec, quartz, and marcite options based on use and budget",
        "Tile and coping updates with the resurfacing",
        "Leak check before plaster if the pool will not hold water",
      ],
      faqs: [
        {
          question: "Are Teravista and Forest Creek pools typical replaster candidates?",
          answer:
            "Many are. Those communities were built with backyard gunite in the 2000s, which is the normal plaster-life window now. A free on-site consultation is how we tell a true resurfacing from a pool that just needs tile or a good service.",
        },
        {
          question: "Can you replaster a Round Rock pool that has in-floor cleaning?",
          answer:
            "Yes, but the heads and finish details have to be part of the plan. We do not treat an in-floor pool like a simple marcite job. That is one of the things we walk during the free consultation.",
        },
        {
          question: "Do you remodel commercial or HOA pools in Round Rock?",
          answer:
            "Yes. HOA amenities and other commercial pools are in our service scope. Those jobs are quoted separately from a backyard replaster because drain-down time and access rules are different.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Round Rock buyers and sellers — Teravista, Forest Creek, Old Town, Siena — need a pool report that matches what is actually in the backyard, including in-floor systems and 2000s equipment. Chris provides CPI-certified inspections with photos and a written report for option period and listing prep.",
      title: "Pool inspections for Round Rock resale, including in-floor systems",
      paragraphs: [
        "A Round Rock listing photo does not tell you the plaster age, whether the in-floor heads still pop, or if the heater has sat dead since last winter. Buyers in Teravista and Forest Creek are often looking at 15–25-year-old systems that still 'look fine' with water in them. Sellers who inspect before listing avoid discovering that in option period.",
        "The inspection covers structure and surface, plumbing and circulation, pumps, heaters, electrical and safety, visible leaks, and the deck, tile, and coping. In-floor systems get noted — a visual inspection is not a full head-by-head leak test, and we will say so if water-loss signs mean you need leak detection next.",
        "Chris does the inspection and the report. $360 for a standard pool or pool/spa visit (exclusions apply), up to two hours on site, photos included. You can take the report to any contractor; most clients ask us to quote what it flags.",
      ],
      typicalPools:
        "2000s Teravista and Forest Creek resale pools, often with in-floor cleaning and original equipment; older Old Town gunite; newer Siena and Walsh Ranch pools on first or second sale.",
      highlights: [
        "CPI-certified inspections by Chris for Round Rock buyers and agents",
        "In-floor systems noted — and leak detection recommended when water loss shows",
        "2000s equipment age documented before you inherit a dead heater",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos for option period",
        "Same company can quote leak, equipment, or renovation follow-up",
      ],
      faqs: [
        {
          question: "Should I get a pool inspection on a Teravista or Forest Creek home?",
          answer:
            "Yes. Those pools are often original to a 2000s build. Plaster life, in-floor function, and equipment age will not show up clearly on a general home inspection. A $360 certified pool inspection is the right specialist visit in option period.",
        },
        {
          question: "Does the inspection include testing every in-floor head?",
          answer:
            "No. A standard inspection is visual and operational within scope — it is not a leak-detection pressure test of every in-floor circuit. If we see water-loss signs or dead zones, the report will recommend leak detection, which tests heads as a separate service.",
        },
        {
          question: "Can you inspect a Round Rock pool before I list the house?",
          answer:
            "Yes, and it is often smarter than waiting for the buyer's inspector. Documenting plaster, equipment, and obvious issues up front keeps the option-period conversation from turning into a scramble.",
        },
      ],
    },
  },
};

export function getCityServiceLocal(
  citySlug: string,
  serviceSlug: string,
): CityServiceLocal | undefined {
  return cityServiceLocal[citySlug]?.[serviceSlug as ServiceSlug];
}

export function getCityServiceLocalFaqs(
  citySlug: string,
  serviceSlug: string,
): CityLocalFaq[] | undefined {
  return getCityServiceLocal(citySlug, serviceSlug)?.faqs;
}
