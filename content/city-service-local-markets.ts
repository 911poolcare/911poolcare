import { site } from "@/content/site";
import type { CityServiceLocal } from "@/content/city-service-local";

type ServiceSlug =
  | "pool-leak-detection"
  | "pool-equipment-repair"
  | "pool-renovations"
  | "pool-inspections";

/**
 * Unique service-page copy for cities that were still on the shared template.
 * Facts are limited to published scheduling notes and labeled field jobs.
 */
export const extraCityServiceLocal: Record<
  string,
  Partial<Record<ServiceSlug, CityServiceLocal>>
> = {
  "cedar-park": {
    "pool-leak-detection": {
      heroIntro:
        "Cedar Park clay and a long swim season stress fittings, shell cracks, and lines under patios. From Avery Ranch and Buttercup Creek to Anderson Mill West, we verify the loss, locate it with Leaktronics and Anderson gear, and complete the repair.",
      title: "Why Cedar Park pools lose water under decks and at the shell",
      paragraphs: [
        "Avery Ranch, Buttercup Creek, Ranch at Brushy Creek, and Deer Creek are full of 1990s–2000s gunite that now leaks at fittings, skimmers, and underground PVC. Anderson Mill West is older still. Twin Creeks and Cypress Canyon add newer shells where the leak is more often a construction fitting or a spa line than a 30-year-old pipe.",
        "Cedar Park's clay moves with summer heat. That movement opens gaps at the shell and stresses lines buried under later deck pours. Field work here has included electronic listening at the pool edge and an underwater check of a main drain and shell crack — we mark the spot, then open that section instead of trenching the yard.",
        "We are based in neighboring Leander, and Cedar Park appointments are often available within the week. If the pool is losing more than about ½ inch a day, we Leakalyzer-check first so you are not paying for a full detection on evaporation.",
      ],
      typicalPools:
        "1990s–2000s gunite in Avery Ranch, Buttercup Creek, and Deer Creek, older Anderson Mill West shells, and newer Twin Creeks and Cypress Canyon pools with spas.",
      highlights: [
        "Electronic locating for leaks under Cedar Park decks and patios",
        "Shell cracks and main-drain leaks checked underwater",
        "Clay-soil movement is a common reason fittings and buried PVC fail here",
        "Leakalyzer water-loss check before a full detection",
        "Avery Ranch through Anderson Mill West, from our Leander shop",
        "Appointments often available within the week",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in Cedar Park?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. For residential pools losing more than ½ inch per day, if we cannot locate the leak after on-site testing you pay only the $120 down payment.",
        },
        {
          question: "Why do Cedar Park pools leak under the deck?",
          answer:
            "Clay soil and later patio pours hide return and suction lines. We pressure-test the circuit, then use electronic listening to mark the leak so the deck cut stays small. Many of those repairs finish the same visit once the source is confirmed.",
        },
        {
          question: "Do you serve Avery Ranch and Buttercup Creek?",
          answer:
            "Yes. Those neighborhoods, plus Ranch at Brushy Creek, Deer Creek, Lakeline, Twin Creeks, Anderson Mill West, and Cypress Canyon, are regular Cedar Park routes from Leander.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Cedar Park equipment pads run hard from April through October. We diagnose pumps, filters, heaters, and automation — including cartridge filter replacements — and Danielle leads the electrical work as our RAIL-certified Installer of Record.",
      title: "Pool equipment repair for Cedar Park's long swim season",
      paragraphs: [
        "A pump or filter that was marginal in May is usually failed by July in Avery Ranch and Buttercup Creek. Those 1990s–2000s pads still have a lot of single-speed pumps and cartridge filters that load up in heavy family use. Newer Twin Creeks and Cypress Canyon homes more often fail at variable-speed drives, salt systems, and automation boards.",
        "We have replaced cartridge filters on Cedar Park pads and we diagnose before we swap parts. Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward approved repairs. Danielle holds the RAIL license and is Installer of Record for heaters, lights, and timeclocks.",
        `${site.raicLicensed.inline}. Cedar Park appointments are often available within the week from our Leander shop.`,
      ],
      typicalPools:
        "Single-speed pumps and cartridge filters on Avery Ranch and Buttercup Creek pads; variable-speed pumps, salt systems, and automation on newer Twin Creeks and Cypress Canyon builds.",
      highlights: [
        "Pump, filter, heater, light, and automation repair in Cedar Park",
        "Cartridge filter replacements on local equipment pads",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Danielle, RAIL-certified Installer of Record, leads electrical work",
        "Salt systems and variable-speed drives on newer Cedar Park pools",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "How much does a pool pump diagnostic cost in Cedar Park?",
          answer:
            "A pump diagnostic is $120 and a heater diagnostic is $150. Each includes a $50 credit toward the repair if you approve the work. We say what failed before we replace the unit.",
        },
        {
          question: "Can you replace a cartridge filter in Cedar Park?",
          answer:
            "Yes. Cartridge filters are common on Avery Ranch and Buttercup Creek pads, and we replace them when cleaning no longer restores flow. If the pump or valve is the real problem, the diagnostic comes first.",
        },
        {
          question: "Who does the electrical work on a Cedar Park heater or light?",
          answer:
            "Danielle, our head technician and RAIL-certified Installer of Record. Heaters, lights, and timeclocks need that license in Texas — not a parts swap from a cleaning route.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "We leak-check every Cedar Park renovation pool before plaster. Avery Ranch, Buttercup Creek, and Anderson Mill West are deep into the replaster window — free on-site consultation, then the surface, tile, and coping the pool actually needs.",
      title: "Cedar Park replaster starts with a leak check, not a finish sample",
      paragraphs: [
        "Heavy summer use shows up on plaster. Avery Ranch and Buttercup Creek pools from the late 1990s and 2000s are rough, stained, or delaminating. Anderson Mill West shells are older than that. A surface that snags skin or will not hold a stain-free finish is usually ready for replaster, not another acid wash.",
        "We leak-check before the new plaster. Cedar Park shell cracks and buried plumbing leaks are common enough that a new finish over an active leak wastes the job. Pebble Tec and Pebble Sheen go on only with certified installers. Tile and coping are scoped with the surface when the waterline is failing too.",
        "Chris manages the project from the free consultation through walkthrough. Cedar Park renovation visits are scheduled from our Leander shop, often within the week for the consult.",
      ],
      typicalPools:
        "Late-1990s and 2000s gunite in Avery Ranch, Buttercup Creek, and Deer Creek that is due for replaster, plus older Anderson Mill West pools with original waterline tile.",
      highlights: [
        "Leak-check every Cedar Park pool before plaster",
        "Free on-site renovation consultation",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Waterline tile and coping included when the original finish is failing",
        "Avery Ranch, Buttercup Creek, and Anderson Mill West replaster work",
        "Chris manages the project from consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my Cedar Park pool needs replastering?",
          answer:
            "Rough plaster, stains that do not clean off, popping aggregate, or a surface that is 15–25 years old usually means replaster. Avery Ranch and Buttercup Creek pools from that era are in this window now. A free on-site consultation is how we tell a worn finish from a water-chemistry problem.",
        },
        {
          question: "Do you leak-check a Cedar Park pool before replastering?",
          answer:
            "Yes. We leak-check every renovation pool before plaster. Shell cracks and under-deck plumbing leaks are common here, and a new finish will not hold water if those are still open.",
        },
        {
          question: "How much does Cedar Park pool replastering cost?",
          answer:
            "Replaster is quoted after a free on-site consultation. Price depends on the shell, tile, coping, and whether a leak has to be repaired first. We do not publish a flat replaster price.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Cedar Park buyers and sellers need a pool report, not a guess from the general home inspection. Chris, our PHTA Certified Pool Inspector, writes it — and we have used a Leakalyzer on Cedar Park inspection visits when water loss is the question.",
      title: "Certified pool inspections for Cedar Park resale",
      paragraphs: [
        "Avery Ranch and Buttercup Creek listings often show a clean waterline over 15–25-year-old equipment. The buyer needs plaster condition, heater function, and whether the pool is actually losing water. A general home inspection does not cover that.",
        "Chris performs the visit and writes the report. $360 covers a standard pool or pool/spa, up to two hours on site, with photos. On Cedar Park inspections we have set up a Leakalyzer when water loss needed a number. Full leak detection and pressure testing are still a separate service if the report flags them.",
        "You can take the report to any contractor. Most clients ask us to quote the leak, equipment, or replaster items it turns up. Cedar Park inspection scheduling is from Leander, often within the week — call as soon as you are under contract if you are in option period.",
      ],
      typicalPools:
        "Resale gunite in Avery Ranch, Buttercup Creek, Deer Creek, and Ranch at Brushy Creek, plus older Anderson Mill West pools where equipment age is the surprise.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Leakalyzer water-loss check when a Cedar Park inspection needs it",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos for buyers, sellers, and agents",
        "Leak detection quoted separately if the report flags water loss",
        "Avery Ranch, Buttercup Creek, and Anderson Mill West resales",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in Cedar Park?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). That is up to two hours on site with photos and a written report from Chris, our Certified Pool Inspector. Leak detection is separate if the pool is losing water.",
        },
        {
          question: "Should I inspect an Avery Ranch or Buttercup Creek pool before I buy?",
          answer:
            "Yes. Those pools are often original to a late-1990s or 2000s house. Plaster life and equipment age will not show up on a general home inspection. Call when you are under contract so we can try to meet the option window.",
        },
        {
          question: "Does the Cedar Park inspection include leak detection?",
          answer:
            "No. The inspection can include a Leakalyzer water-loss check and it will recommend leak detection when the signs are there. Pressure testing and electronic locating are a separate service.",
        },
      ],
    },
  },
  leander: {
    "pool-leak-detection": {
      heroIntro:
        "Leander is our home base. Crystal Falls and Block House Creek still lose water at fittings and underground lines; Travisso and Palmera Ridge more often leak at spas and newer fittings. We verify the loss, locate it, and repair it.",
      title: "Pool leak detection / repair in the city where our shop is",
      paragraphs: [
        "Crystal Falls, Block House Creek, Mason Creek, Oak Creek, and Savannah have a lot of 1990s–2000s gunite. Those pools leak at fittings, buried PVC, and coping joints. Travisso, Bar W Ranch, and Palmera Ridge are newer: spas, longer equipment runs, and fittings that fail while the shell still looks new.",
        "Leander jobs we have already done include a Leakalyzer setup to confirm water loss, an underground PVC repair under the deck, and a shell crack at the coping. The same crew finds the leak and fixes it. We do not hand the locate to another company.",
        "Because the shop is here, Leander leak appointments are often available within the week. If you are losing more than about ½ inch a day, start with the Leakalyzer so evaporation is ruled out before a full detection.",
      ],
      typicalPools:
        "1990s–2000s gunite in Crystal Falls, Block House Creek, and Savannah, plus newer Travisso and Palmera Ridge pools with spas and longer plumbing runs.",
      highlights: [
        "Shop is in Leander — Crystal Falls, Travisso, and Block House Creek are a short drive",
        "Leakalyzer checks, underground PVC repairs, and coping-joint shell cracks",
        "Same crew locates and repairs",
        "Older subdivision gunite and newer Travisso spas on the same route",
        "Appointments often available within the week",
        "Residential down-payment guarantee when we cannot locate a qualifying leak",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in Leander?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. If a residential pool is losing more than ½ inch per day and we cannot locate the leak after on-site testing, you pay only the $120 down payment.",
        },
        {
          question: "How fast can you get to a leak in Crystal Falls or Travisso?",
          answer:
            "Those neighborhoods are a short drive from the shop. Leander leak appointments are often available within the week. Call with the water-loss details and we will give you the next opening.",
        },
        {
          question: "Do you repair the leak, or only find it?",
          answer:
            "We repair it. Leander work has included underground PVC under the deck and a shell crack at the coping, done by the same team that ran the detection.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Leander equipment work is a regular part of the route from our own shop: gas heaters, booster pumps, and variable-speed upgrades. Danielle leads it as RAIL-certified Installer of Record.",
      title: "Heaters, booster pumps, and variable-speed upgrades in Leander",
      paragraphs: [
        "Crystal Falls and Block House Creek pads are old enough that heaters, boosters, and single-speed pumps fail in the same summer. Travisso and Palmera Ridge more often need variable-speed drives, salt systems, and automation looked at before anyone condemns the whole pad.",
        "Labeled Leander jobs include a gas heater replacement, a booster pump replacement, and a variable-speed pump upgrade. Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward approved repairs.",
        "Danielle is Installer of Record (RAIL) for the electrical side — heaters, lights, and timeclocks. The shop is in Leander, so these calls are often on the schedule within the week.",
      ],
      typicalPools:
        "Aging heaters and booster pumps in Crystal Falls and Block House Creek; variable-speed pumps and automation on Travisso, Bar W Ranch, and Palmera Ridge.",
      highlights: [
        "Gas heater, booster pump, and variable-speed pump work already done in Leander",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Danielle, RAIL-certified Installer of Record",
        "Crystal Falls through Travisso from the Leander shop",
        "Appointments often available within the week",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "Can you replace a pool heater in Leander?",
          answer:
            "Yes. We have replaced gas heaters on Leander pads. The diagnostic is $150, with a $50 credit toward the repair if you approve it. Danielle handles the licensed electrical work.",
        },
        {
          question: "Do you upgrade single-speed pumps to variable-speed in Leander?",
          answer:
            "Yes. We have done variable-speed pump upgrades here, along with booster pump replacements. The $120 pump diagnostic applies toward the approved repair.",
        },
        {
          question: "Who is licensed for Leander pool electrical work?",
          answer:
            "Danielle holds RAIL and is our Installer of Record. The company carries the RAIC contractor license. That covers heaters, lights, pumps, and automation — not a cleaning-route parts swap.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "We leak-check every Leander renovation pool before plaster. Crystal Falls and Block House Creek are in the replaster window; newer Travisso pools usually need tile, coping, or a targeted repair instead of a full resurface.",
      title: "Leander replaster, with a leak check and a follow-up on the new finish",
      paragraphs: [
        "Crystal Falls, Block House Creek, Mason Creek, and Savannah pools from the 1990s and 2000s are the ones calling for new plaster. Rough texture, stains that chemistry will not lift, and coping joints that have already leaked are the usual signs. Travisso and Palmera Ridge are younger — we will say so if the surface does not need to come out.",
        "We leak-check before plaster. Leander leak work has included underground lines and a shell crack at the coping, which is exactly what you do not want under a new finish. After replaster we have come back to look at the new tile and pebble finish while the pool is filling.",
        "Chris is the project manager from the free on-site consultation through walkthrough. Pebble Tec and Pebble Sheen are applied only by certified installers. Consults for Leander are often available within the week.",
      ],
      typicalPools:
        "1990s–2000s gunite due for replaster in Crystal Falls, Block House Creek, and Savannah; newer Travisso and Palmera Ridge pools that more often need tile, coping, or a leak detection / repair than a full resurface.",
      highlights: [
        "Leak-check every Leander pool before plaster",
        "Replaster plus a follow-up look at the new tile and finish",
        "Free on-site consultation",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Chris manages the job from consult through walkthrough",
        "Shop is in Leander — consults often available within the week",
      ],
      faqs: [
        {
          question: "How do I know if my Leander pool needs replastering?",
          answer:
            "Rough or stained plaster, delamination, or a Crystal Falls or Block House Creek surface that is 15–25 years old usually means replaster. Newer Travisso pools often do not. The free consultation is where we say which one you have.",
        },
        {
          question: "Do you check for leaks before replastering a Leander pool?",
          answer:
            "Yes. Every renovation pool is leak-checked before plaster. We have already repaired underground PVC and a coping-joint shell crack in Leander — that work happens before the new surface, not after it fails.",
        },
        {
          question: "How much does Leander pool replastering cost?",
          answer:
            "It is quoted after a free on-site consultation. Shell size, tile, coping, and any leak detection / repair change the number. We do not publish a flat replaster price.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Chris, our PHTA Certified Pool Inspector, inspects Leander pools for buyers, sellers, and the replaster follow-up. The shop is in town, so option-period timing is easier here than in the far corners of the metro.",
      title: "Certified pool inspections in Leander, including after a replaster",
      paragraphs: [
        "Crystal Falls and Block House Creek resales hide equipment age and plaster life under a full pool. Travisso buyers are looking at newer spas and automation that a general home inspector will not explain. Either way the report needs to be written by someone who inspects pools for a living.",
        "Chris does the visit. $360 for a standard pool or pool/spa, up to two hours, photos included (exclusions apply). Leander inspection work has included a post-replaster look at the fill, dye checks, and the new waterline tile and pebble finish — that is separate from a real-estate inspection, and we keep those scopes straight.",
        "If the report flags a leak or a dead heater, leak detection and equipment repair are available from the same shop. You are not required to hire us for the follow-up. Leander inspections are often available within the week.",
      ],
      typicalPools:
        "Crystal Falls, Block House Creek, and Savannah resales with original equipment, plus newer Travisso and Palmera Ridge pools on their first or second sale.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Post-replaster tile and finish checks when that is the scope",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos",
        "Shop is in Leander — often available within the week",
        "Leak detection and equipment repair quoted separately if the report flags them",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in Leander?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). Chris, our Certified Pool Inspector, does the visit — up to two hours on site — and you get a written report with photos. Leak detection is not included.",
        },
        {
          question: "Can you inspect a Leander pool during option period?",
          answer:
            "That is the usual request. The shop is in Leander, and inspections are often available within the week. Call when you go under contract and we will tell you if the option window works.",
        },
        {
          question: "Do you inspect the new finish after a Leander replaster?",
          answer:
            "Yes, when that is what the visit is for. We have checked new waterline tile and pebble finish during the fill. That follow-up is not a substitute for a buyer's certified inspection, and we will say which one you are booking.",
        },
      ],
    },
  },
  "liberty-hill": {
    "pool-leak-detection": {
      heroIntro:
        "Liberty Hill lots hide leaks in long plumbing runs under rock and deck. We have dived these pools with a hydrophone, dye-tested return fittings, and repaired the underground PVC once it was marked.",
      title: "Long runs, rock, and the leaks they hide in Liberty Hill",
      paragraphs: [
        "Santa Rita Ranch, Summerlyn, Orchard Ridge, and Stonewall Ranch put pools on bigger lots than a Cedar Park cul-de-sac. The plumbing run from the pad to the pool is longer, and a lot of it sits under rock, decomposed granite, or a patio that went in after the pipe. Downtown Liberty Hill and the older Highway 29 lots are a different stock: simpler shells, older fittings.",
        "Liberty Hill leak work has included an underwater hydrophone pass, dye at a return fitting, and an underground PVC repair after the line was located. Electronic listening is the point on these lots — trenching a long run until you hit the leak tears up more yard than the repair is worth.",
        "We are in Leander, and Liberty Hill appointments are often available the same week. Pools losing more than about ½ inch a day get a Leakalyzer check before a full detection.",
      ],
      typicalPools:
        "Master-planned pools in Santa Rita Ranch and Summerlyn with long equipment runs, plus older Liberty Hill shells on larger Highway 29 lots.",
      highlights: [
        "Underwater hydrophone and dye testing on Liberty Hill pools",
        "Underground PVC repairs after the leak is located",
        "Long plumbing runs under rock and deck — we do not trench blindly",
        "Santa Rita Ranch, Summerlyn, Stonewall Ranch, and older Highway 29 lots",
        "Same-week appointments often available from Leander",
        "Leakalyzer check before a full detection",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in Liberty Hill?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. If a residential pool is losing more than ½ inch per day and we cannot locate the leak after on-site testing, you pay only the $120 down payment.",
        },
        {
          question: "Can you find a leak under rock without digging up the yard?",
          answer:
            "That is how we approach Liberty Hill lots. Pressure testing isolates the circuit, listening gear and a hydrophone mark the spot, and then we open that section. We have repaired underground PVC here after locating it that way.",
        },
        {
          question: "Do you serve Santa Rita Ranch and Summerlyn?",
          answer:
            "Yes. Those communities, plus Orchard Ridge, Stonewall Ranch, Liberty Hill Ranch, and the Highway 29 area, are on the Liberty Hill route. Appointments are often available the same week.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Liberty Hill equipment pads sit farther from the pool than a suburban pad, and the electrical run is part of the job. Danielle diagnoses and repairs pumps, heaters, lights, and automation as our RAIL-certified Installer of Record.",
      title: "Pool equipment repair on Liberty Hill's longer pads",
      paragraphs: [
        "A Santa Rita Ranch or Summerlyn pad is often a long walk from the water, with variable-speed pumps, a heater, and automation that have been running since the house was built. Older lots along Highway 29 still have single-speed pumps and heaters that have lived outside for much longer. Both fail. The drive and the board fail differently than the motor.",
        "We diagnose first. Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward approved repairs. Danielle holds RAIL and is Installer of Record, which matters when the heater, light, or load center is the actual problem.",
        `${site.raicLicensed.inline}. Liberty Hill equipment appointments are often available the same week from Leander.`,
      ],
      typicalPools:
        "Variable-speed pumps, heaters, and automation on Santa Rita Ranch and Summerlyn; older single-speed pads on Highway 29 and downtown Liberty Hill lots.",
      highlights: [
        "Pump, heater, light, and automation repair in Liberty Hill",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Danielle, RAIL-certified Installer of Record, for the electrical side",
        "Longer equipment runs on Santa Rita Ranch and Summerlyn lots",
        "Same-week appointments often available",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "How much does pool equipment diagnosis cost in Liberty Hill?",
          answer:
            "A pump diagnostic is $120 and a heater diagnostic is $150. Each includes a $50 credit toward approved repairs. We identify the failed part before replacing the whole unit.",
        },
        {
          question: "Do you work on heaters and automation in Santa Rita Ranch?",
          answer:
            "Yes. Newer Liberty Hill communities commonly have heaters, variable-speed pumps, and automation. Danielle is the RAIL-certified Installer of Record for that electrical work.",
        },
        {
          question: "How soon can you get to a Liberty Hill equipment pad?",
          answer:
            "Liberty Hill appointments are often available the same week. We schedule them from the Leander shop. Call with the symptom — no prime, heater will not fire, breaker tripping — and we will quote the diagnostic.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Liberty Hill sun and a long season wear plaster on pools that are now old enough to resurface. We leak-check every one before plaster — these lots already hide leaks in long runs — then quote the finish at a free consultation.",
      title: "Liberty Hill replaster after the leak check, not before",
      paragraphs: [
        "Earlier Liberty Hill Ranch and Highway 29 pools are in the replaster window: rough plaster, stained marcite, and waterline tile that has separated from the shell. Santa Rita Ranch and Summerlyn are newer. Some of those surfaces are worn from sun on an open lot; some are not ready. We will say which.",
        "A new finish over a leaking return line is a bad trade on a large lot, because the repair access is rock and deck. We leak-check every Liberty Hill renovation pool before plaster. Liberty Hill leak calls have already included return-fitting leaks and underground PVC — that is the check.",
        "Chris manages the project. Pebble Tec and Pebble Sheen are applied only by certified installers. The consultation is free and often available the same week.",
      ],
      typicalPools:
        "Older Highway 29 and Liberty Hill Ranch gunite that is due for replaster, and newer Santa Rita Ranch and Summerlyn pools where sun and waterline tile are the first things to fail.",
      highlights: [
        "Leak-check every Liberty Hill pool before plaster",
        "Free on-site consultation, often the same week",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Waterline tile and coping scoped with the surface",
        "Open Hill Country lots where sun wears the finish",
        "Chris manages consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my Liberty Hill pool needs replastering?",
          answer:
            "Rough plaster, stains that will not clean off, or waterline tile pulling away from the shell are the signs. Older Highway 29 pools are usually there. Many Santa Rita Ranch and Summerlyn pools are not. A free on-site consultation is how we tell.",
        },
        {
          question: "Why leak-check before a Liberty Hill replaster?",
          answer:
            "Because the plumbing runs are long and often under rock. We have dye-tested return fittings and repaired underground PVC on Liberty Hill leak calls. That check happens before plaster so the new surface is not sitting on an open leak.",
        },
        {
          question: "How much does Liberty Hill pool replastering cost?",
          answer:
            "Replaster is quoted after a free consultation. Lot access, tile, coping, and any leak detection / repair change the price. We do not publish a flat number.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Liberty Hill resales in Santa Rita Ranch and Summerlyn need a pool specialist during option period. Chris, our PHTA Certified Pool Inspector, writes the report — structure, equipment, and whether a long plumbing run looks like it is losing water.",
      title: "Pool inspections for Liberty Hill's newer resales and older lots",
      paragraphs: [
        "Santa Rita Ranch and Summerlyn houses are changing hands with pools that still look new and equipment that is no longer under the builder's attention. Buyers want the heater, automation, and spa documented. Older Highway 29 lots are the opposite problem: plaster and fittings that have been outside for decades.",
        "Chris does the inspection. $360 for a standard pool or pool/spa, up to two hours, photos and a written report (exclusions apply). A visual inspection is not a pressure test of a long plumbing run. If we see water-loss signs, the report says to book leak detection, which we already do on these lots with dye, hydrophone, and listening gear.",
        "Liberty Hill inspections are often available the same week from Leander. Call when the option period starts.",
      ],
      typicalPools:
        "First and second resales in Santa Rita Ranch and Summerlyn with spas and automation, plus older Highway 29 pools where plaster and fittings are the risk.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Santa Rita Ranch and Summerlyn resales, plus older Highway 29 lots",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos for option period",
        "Leak detection recommended — not bundled — when a long run looks like it is losing water",
        "Same-week appointments often available",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in Liberty Hill?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). Chris, our Certified Pool Inspector, spends up to two hours on site and delivers a written report with photos. Leak detection is a separate visit.",
        },
        {
          question: "Is a builder walkthrough enough for a Santa Rita Ranch pool?",
          answer:
            "No. A builder walkthrough is not a certified pool inspection. If you are buying a resale, you still want an independent look at the heater, automation, spa, and any sign the long plumbing run is losing water.",
        },
        {
          question: "Can you inspect during a Liberty Hill option period?",
          answer:
            "Yes. Appointments are often available the same week. Call as soon as you are under contract and we will tell you whether we can hit the deadline.",
        },
      ],
    },
  },
  pflugerville: {
    "pool-leak-detection": {
      heroIntro:
        "Pflugerville leaks show up as an overnight drop or an autofill that runs after dark. Blackhawk and Heatherwilde are older gunite; Falcon Pointe and Springbrook are newer. We have opened underground return lines here after locating them.",
      title: "Overnight water loss in Blackhawk, Falcon Pointe, and the rest of Pflugerville",
      paragraphs: [
        "Blackhawk, Heatherwilde, and the older east-side yards have gunite and plumbing that have been in expansive clay for decades. Falcon Pointe, Springbrook, Avalon, and Villages of Hidden Lake added spas and longer runs in the 2000s. Both lose water. The older pools leak at skimmers, lights, and buried returns. The newer ones leak at spa valves and fittings.",
        "Pflugerville leak work has included an underground return line exposed for repair after it was located — not a trench across the yard on a hunch. Homeowners here often notice the problem when the level drops overnight or the autofill runs for hours after sundown. We Leakalyzer-check that before a full detection.",
        "Most Pflugerville appointments are scheduled within 3–5 business days from Leander. Residential detection starts at $650, with the $120 down-payment guarantee when a qualifying pool's leak cannot be found.",
      ],
      typicalPools:
        "Older gunite in Blackhawk and Heatherwilde, and 2000s production pools with spas in Falcon Pointe, Springbrook, Avalon, and Villages of Hidden Lake.",
      highlights: [
        "Underground return-line repairs after the leak is located",
        "Overnight loss and autofill that runs after dark — we measure it first",
        "Blackhawk and Heatherwilde older shells; Falcon Pointe and Springbrook newer spas",
        "Leakalyzer check before a full detection",
        "Most appointments within 3–5 business days",
        "Same crew locates and repairs",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in Pflugerville?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. If a residential pool is losing more than ½ inch per day and we cannot locate the leak after on-site testing, you pay only the $120 down payment.",
        },
        {
          question: "My Pflugerville autofill runs all night. Is that a leak?",
          answer:
            "It can be. Autofill hides a dropping waterline until the water bill shows up. We verify the loss on site with a Leakalyzer before a full detection so you are not paying to chase normal evening evaporation.",
        },
        {
          question: "Do you repair leaks under Pflugerville decks?",
          answer:
            "Yes. We have exposed an underground return line here after locating it, then repaired that line. Electronic locating is how we keep the deck cut to the spot that is actually leaking.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Pflugerville pads split by era: single-speed pumps and aging heaters in Blackhawk, variable-speed and automation in Falcon Pointe. Danielle diagnoses them as our RAIL-certified Installer of Record.",
      title: "Pool equipment repair from Blackhawk's older pads to Falcon Pointe",
      paragraphs: [
        "A Blackhawk or Heatherwilde equipment pad has often had the same pump and heater since the 1990s. Those fail in July, when the pool is in daily use. Falcon Pointe, Springbrook, and Brookfield pads are more likely to have a variable-speed motor, a salt cell, or an automation board that faults while the wet end is fine.",
        "We start with a diagnostic: $120 for pumps and $150 for heaters, each with a $50 credit toward approved repairs. Danielle is RAIL-certified Installer of Record for heaters, lights, and timeclocks.",
        `${site.raicLicensed.inline}. Most Pflugerville equipment calls are scheduled within 3–5 business days.`,
      ],
      typicalPools:
        "Older single-speed pumps and heaters in Blackhawk and Heatherwilde; variable-speed pumps, salt systems, and automation in Falcon Pointe, Springbrook, and Brookfield.",
      highlights: [
        "Pump, filter, heater, light, and automation repair in Pflugerville",
        "Older Blackhawk pads and newer Falcon Pointe automation",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Danielle, RAIL-certified Installer of Record",
        "Most appointments within 3–5 business days",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "How much does a pump diagnostic cost in Pflugerville?",
          answer:
            "A pump diagnostic is $120 and a heater diagnostic is $150. Each includes a $50 credit if you approve the repair. We confirm what failed before we replace it.",
        },
        {
          question: "Do you repair variable-speed pumps in Falcon Pointe?",
          answer:
            "Yes. Newer Pflugerville neighborhoods commonly have variable-speed pumps, salt systems, and automation. We troubleshoot drives and boards, not just motors. Licensed electrical work is Danielle's.",
        },
        {
          question: "How soon can you reach a Pflugerville equipment pad?",
          answer:
            "Most Pflugerville appointments are scheduled within 3–5 business days from our Leander shop. Call with the symptom and we will book the diagnostic.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Blackhawk and Heatherwilde pools are past a polish. Falcon Pointe is entering the same window. We leak-check every Pflugerville renovation pool before plaster, then quote the finish at a free consultation.",
      title: "Pflugerville replaster for pools that have outlasted the original plaster",
      paragraphs: [
        "Blackhawk, Heatherwilde, and Cambridge Heights have backyard gunite old enough that the plaster is rough, stained, or coming off in patches. Falcon Pointe, Springbrook, and Avalon were built later. Some of those 2000s surfaces are ready; some still have life. Heat and daily summer use are what age them, not a brochure year-count alone.",
        "We leak-check before plaster. Pflugerville leak calls have included underground return lines, and resurfacing over that kind of leak ruins the finish. Pebble Tec and Pebble Sheen are applied only by certified installers. Tile and coping are part of the scope when the waterline has failed with the plaster.",
        "Chris runs the project from the free consultation through walkthrough. Most Pflugerville consults are scheduled within 3–5 business days. Replaster itself is quoted on site — there is no flat price.",
      ],
      typicalPools:
        "Older Blackhawk, Heatherwilde, and Cambridge Heights gunite that is due for replaster, and 2000s Falcon Pointe and Springbrook pools whose original plaster is starting to wear through.",
      highlights: [
        "Leak-check every Pflugerville pool before plaster",
        "Free on-site consultation",
        "Blackhawk and Heatherwilde replaster candidates, Falcon Pointe assessed on site",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Tile and coping when the waterline has failed with the plaster",
        "Chris manages consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my Pflugerville pool needs replastering?",
          answer:
            "Rough plaster, stains that do not come off, or a Blackhawk or Heatherwilde surface that is decades old usually means replaster. A Falcon Pointe pool might only need tile or a leak detection / repair. The free consultation is the honest answer for the pool in front of us.",
        },
        {
          question: "Do you leak-check before replastering in Pflugerville?",
          answer:
            "Yes. Every renovation pool is leak-checked before plaster. We have already repaired underground return lines in Pflugerville, and that kind of leak has to be closed before a new surface goes on.",
        },
        {
          question: "How much does Pflugerville pool replastering cost?",
          answer:
            "It is quoted after a free on-site consultation. Shell, tile, coping, access, and any leak detection / repair all change the price. We do not publish a flat replaster number.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Pflugerville buyers in Blackhawk and Falcon Pointe are looking at very different pools. Chris, our PHTA Certified Pool Inspector, writes a report that matches the one you are actually buying.",
      title: "Pool inspections for Pflugerville resale, from Blackhawk to Falcon Pointe",
      paragraphs: [
        "A Blackhawk listing can hide a heater and plaster that are original to the house. A Falcon Pointe listing can hide a spa, in-floor cleaner, or automation board that still 'looks fine' with the pool full. General home inspectors are not set up for either one.",
        "Chris performs the inspection and writes the report. $360 for a standard pool or pool/spa, up to two hours on site, photos included (exclusions apply). If the pool is losing water overnight — a common Pflugerville complaint — the report will say so and recommend leak detection. That test is not part of the inspection fee.",
        "Most Pflugerville inspections are scheduled within 3–5 business days. If you are in option period, call when you go under contract.",
      ],
      typicalPools:
        "Older Blackhawk and Heatherwilde resales with original equipment and plaster, and Falcon Pointe, Springbrook, and Avalon pools on their first or second sale.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Blackhawk plaster and equipment age, Falcon Pointe spas and automation",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos",
        "Leak detection recommended separately when overnight loss shows up",
        "Most appointments within 3–5 business days",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in Pflugerville?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). Chris, our Certified Pool Inspector, does the visit and you get a written report with photos. Leak detection is separate.",
        },
        {
          question: "Should I inspect a Blackhawk pool before buying?",
          answer:
            "Yes. Those pools are often original to an older house. Plaster condition and a dead heater are the expensive surprises, and a general home inspection will not catch them the way a certified pool inspection will.",
        },
        {
          question: "Can you inspect a Pflugerville pool during option period?",
          answer:
            "Yes. Most Pflugerville appointments are within 3–5 business days. Call as soon as you are under contract so we can tell you if the window is realistic.",
        },
      ],
    },
  },
  "san-marcos": {
    "pool-leak-detection": {
      heroIntro:
        "San Marcos heat and the river corridor make evaporation look like a leak, and a leak look like weather. We confirm the loss with a Leakalyzer, then find it in the shell, plumbing, or equipment and repair it.",
      title: "San Marcos water loss: river humidity, or a real leak",
      paragraphs: [
        "Established pools in Holland Hills, Sunset Acres, and Cottonwood Creek are old enough to leak at fittings and buried lines. Kissing Tree added a large set of backyard pools that are now in daily use. La Cima and the west side are newer Hill Country builds with spas and longer runs. Downtown and river-corridor lots pick up extra humidity, which is why a small drop gets blamed on the weather.",
        "A cover or a night with the autofill off tells you more than a glance at the waterline. We still measure it. If the pool is losing more than about ½ inch a day, it is usually a leak. We serve San Marcos from Leander and confirm timing when you call — it is a longer drive than Cedar Park, and we will not pretend otherwise.",
        "Detection starts at $650 for a basic residential pool with one pump. The same crew repairs what we find. We do not publish a repair price until we know whether the leak is a fitting or a line under concrete.",
      ],
      typicalPools:
        "Established gunite in Holland Hills, Sunset Acres, and Cottonwood Creek; Kissing Tree backyard pools; newer La Cima and west-side builds with spas.",
      highlights: [
        "Leakalyzer check so river-corridor humidity is not billed as a leak",
        "Holland Hills, Sunset Acres, Cottonwood Creek, and Kissing Tree",
        "Newer La Cima spas and longer plumbing runs",
        "Shell, plumbing, and equipment leaks repaired by the same crew",
        "Scheduled from Leander — we confirm timing when you call",
        "Residential detection from $650, with the $120 locate guarantee",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in San Marcos?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. If a residential pool is losing more than ½ inch per day and we cannot locate the leak after on-site testing, you pay only the $120 down payment.",
        },
        {
          question: "Is my San Marcos pool leaking or just evaporating near the river?",
          answer:
            "Heat can take about ¼ inch a day. More than about ½ inch, or an autofill that runs after dark, is usually a leak. We confirm with a Leakalyzer on site before a full detection.",
        },
        {
          question: "Do you serve Kissing Tree and La Cima?",
          answer:
            "Yes. Kissing Tree, Holland Hills, Sunset Acres, Cottonwood Creek, La Cima, and downtown San Marcos are all in the service area. We schedule from Leander and confirm the day when you call.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "San Marcos equipment fails in the same long season as the rest of Central Texas — pumps and heaters on older Holland Hills pads, automation and salt systems in Kissing Tree and La Cima. Danielle is the RAIL-certified Installer of Record.",
      title: "Pool equipment repair in San Marcos, from older pads to Kissing Tree",
      paragraphs: [
        "Holland Hills, Sunset Acres, and Cottonwood Creek still run a lot of single-speed pumps and heaters that get used hard every summer. Kissing Tree and La Cima are more likely to have variable-speed pumps, salt chlorinators, and automation. The symptom sounds the same — the pool is down — and the failed part is not.",
        "Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward approved repairs. Danielle holds RAIL and is Installer of Record for heaters, lights, and timeclocks.",
        `${site.raicLicensed.inline}. San Marcos is scheduled from our Leander shop. We confirm timing when you call.`,
      ],
      typicalPools:
        "Older pumps and heaters in Holland Hills and Sunset Acres; variable-speed pumps, salt systems, and automation in Kissing Tree and La Cima.",
      highlights: [
        "Pump, filter, heater, light, and automation repair in San Marcos",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Danielle, RAIL-certified Installer of Record",
        "Older Holland Hills pads and newer Kissing Tree and La Cima systems",
        "Scheduled from Leander — timing confirmed when you call",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "How much does pool equipment diagnosis cost in San Marcos?",
          answer:
            "A pump diagnostic is $120 and a heater diagnostic is $150. Each includes a $50 credit toward approved repairs. We identify the failure before we replace the equipment.",
        },
        {
          question: "Do you repair pool heaters in San Marcos?",
          answer:
            "Yes. Heater diagnostics are $150, with a $50 credit if you approve the repair. Danielle does the licensed electrical work. We check the heater before defaulting to a full replacement.",
        },
        {
          question: "How far is San Marcos from your shop?",
          answer:
            "We are based in Leander. San Marcos is a longer trip than Cedar Park or Georgetown, so we confirm the appointment window when you call instead of promising a same-week slot we have not looked at.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "San Marcos pools in Holland Hills and Kissing Tree are reaching the age where plaster, tile, and coping need a real plan. We leak-check every renovation pool before plaster. The consultation is free.",
      title: "San Marcos replaster for pools that have had a long summer every year",
      paragraphs: [
        "Holland Hills, Sunset Acres, and Cottonwood Creek gunite has been through enough San Marcos summers that the plaster is often rough or stained for reasons an acid wash will not fix. Kissing Tree added a concentration of backyard pools that are now in heavy use. La Cima is newer — many of those finishes are not due, and we will say that on site.",
        "River humidity does not cause an underground leak, but it does get blamed for one. We leak-check every San Marcos renovation pool before plaster so a new surface is not applied over a shell or plumbing leak. Pebble Tec and Pebble Sheen are applied only by certified installers.",
        "Chris is the project manager from the free consultation through walkthrough. Replaster is quoted after that visit. We schedule San Marcos consults from Leander and confirm timing when you call.",
      ],
      typicalPools:
        "Established Holland Hills, Sunset Acres, and Cottonwood Creek gunite that is due for a new surface, Kissing Tree backyard pools in heavy use, and newer La Cima finishes that often are not ready to come out.",
      highlights: [
        "Leak-check every San Marcos pool before plaster",
        "Free on-site consultation",
        "Holland Hills and Kissing Tree assessed separately from newer La Cima pools",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Tile and coping when the waterline has failed with the plaster",
        "Chris manages consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my San Marcos pool needs replastering?",
          answer:
            "Rough plaster, stains that will not clean off, delamination, or a Holland Hills or Sunset Acres surface that is 15–25 years old usually means replaster. A newer La Cima pool may not. The free consultation is how we decide.",
        },
        {
          question: "Do you leak-check a San Marcos pool before replastering?",
          answer:
            "Yes. Every renovation pool is leak-checked before plaster. Evaporation near the river gets ruled out with a measurement, and an active plumbing or shell leak gets repaired before the new finish.",
        },
        {
          question: "How much does San Marcos pool replastering cost?",
          answer:
            "It is quoted after a free on-site consultation. The shell, tile, coping, and any leak detection / repair change the price. We do not publish a flat replaster price.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "San Marcos buyers at Kissing Tree and in the older neighborhoods need a pool report before they own the plaster and the heater. Chris, our PHTA Certified Pool Inspector, writes it.",
      title: "Certified pool inspections for San Marcos buyers and sellers",
      paragraphs: [
        "Kissing Tree resales and established homes in Holland Hills and Sunset Acres both come with pools the listing photos cannot explain. One is a heavily used backyard pool with equipment that has seen every summer. The other may be an older shell with plaster and fittings at the end of their life. Houses near Texas State and downtown add a third case: pools that have changed hands more than once.",
        "Chris does the inspection. $360 for a standard pool or pool/spa, up to two hours, written report and photos (exclusions apply). If the water loss might be river-corridor evaporation, we say what we can see and recommend a Leakalyzer detection rather than guessing in the report. That detection is a separate service.",
        "We schedule San Marcos from Leander and confirm timing when you call. If you are in option period, call as soon as you are under contract.",
      ],
      typicalPools:
        "Kissing Tree resales, older Holland Hills and Sunset Acres gunite, and downtown or Texas State-area pools that have had a string of occupants.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Kissing Tree, Holland Hills, Sunset Acres, and downtown San Marcos",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos",
        "Evaporation versus leak called out — detection quoted separately",
        "Scheduled from Leander, timing confirmed when you call",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in San Marcos?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). Chris, our Certified Pool Inspector, spends up to two hours on site and delivers a written report with photos. Leak detection is not included.",
        },
        {
          question: "Should I get a pool inspection on a Kissing Tree home?",
          answer:
            "Yes, if a pool is part of the property. Those pools get heavy use, and equipment age will not be obvious from a walkthrough. A certified pool inspection is the specialist visit. A general home inspection is not a substitute.",
        },
        {
          question: "Can you inspect a San Marcos pool during option period?",
          answer:
            "Call when you go under contract. We schedule San Marcos from Leander and will tell you whether we can meet the option window before you book.",
        },
      ],
    },
  },
  "dripping-springs": {
    "pool-leak-detection": {
      heroIntro:
        "Dripping Springs leak calls are often a spa crack, a tile line that has separated from the plaster, or a long run under rock. We have dived these spas, marked those gaps, and then repaired the leak.",
      title: "Hill Country leaks in Belterra, Caliterra, and greater Dripping Springs",
      paragraphs: [
        "Belterra, Caliterra, Headwaters, and Highpointe put pools and spas on larger lots, with plumbing runs that travel under deck, limestone, and landscaping. Downtown Dripping Springs and the 290 corridor mix those newer communities with older backyard gunite. A leak on a long run does not look like a leak on a tight Cedar Park lot.",
        "Labeled Dripping Springs jobs include tile-to-plaster separation identified as the leak source, spa-wall cracks with calcium buildup, and a diver in the spa. That is the order of operations: verify the water is actually leaving, find the gap or the crack, then repair it. Many Hill Country homes are also on private wells, so a slow leak shows up on a well report or a water bill that should have been quiet.",
        "We schedule Dripping Springs from Leander and confirm timing when you call. Residential detection starts at $650. If a qualifying residential pool is losing more than ½ inch a day and we cannot find the leak, you pay only the $120 down payment.",
      ],
      typicalPools:
        "Belterra, Caliterra, Headwaters, and Highpointe pools and spas with long runs, plus older gunite along the 290 corridor and in downtown Dripping Springs.",
      highlights: [
        "Tile-to-plaster separation and spa-wall cracks found on Dripping Springs jobs",
        "Underwater spa inspections when the shell is the question",
        "Long plumbing runs under rock and deck — located before we dig",
        "Belterra, Caliterra, Headwaters, and Highpointe",
        "Leakalyzer check before a full detection",
        "Scheduled from Leander — timing confirmed when you call",
      ],
      faqs: [
        {
          question: "How much does pool leak detection cost in Dripping Springs?",
          answer:
            "Residential leak detection starts at $650 for a basic pool with a single pump. Pool and spa with a single pump is $750. If a residential pool is losing more than ½ inch per day and we cannot locate the leak after on-site testing, you pay only the $120 down payment.",
        },
        {
          question: "Do Dripping Springs spas leak differently than the pool?",
          answer:
            "Often yes. We have found spa-wall cracks with calcium buildup and tile pulling away from plaster on Dripping Springs jobs, separate from a plumbing leak in a long run. We dye-test and dive the spa instead of assuming the main pool is the source.",
        },
        {
          question: "Can you find a leak under a Hill Country deck without opening the whole yard?",
          answer:
            "Yes. We pressure-test and use electronic locating to mark the run, then open that spot. Belterra and Caliterra lots are too big, and too rocky, for a blind trench.",
        },
      ],
    },
    "pool-equipment-repair": {
      heroIntro:
        "Dripping Springs equipment work includes chlorinator replacements on local pads, plus pumps and heaters that see well water and a long Hill Country season. Danielle leads the electrical side as RAIL-certified Installer of Record.",
      title: "Chlorinators, heaters, and pumps on Dripping Springs pads",
      paragraphs: [
        "Belterra, Caliterra, and Headwaters pads commonly have salt systems, heaters, and variable-speed pumps. A lot of Dripping Springs homes are on private wells. That water is hard on salt cells and heat exchangers, which is why a chlorinator gets replaced while the pump still runs. Older 290-corridor pads are more often a single-speed pump and a gas heater that have simply aged out.",
        "We have replaced chlorinators on Dripping Springs equipment pads. Pump diagnostics are $120 and heater diagnostics are $150, each with a $50 credit toward approved repairs. Danielle is Installer of Record for the licensed electrical work.",
        `${site.raicLicensed.inline}. We schedule Dripping Springs from Leander and confirm timing when you call.`,
      ],
      typicalPools:
        "Salt systems, heaters, and variable-speed pumps in Belterra, Caliterra, and Headwaters; older single-speed pads along US 290 and in downtown Dripping Springs.",
      highlights: [
        "Chlorinator replacements on Dripping Springs pads",
        "Pump diagnostic $120 and heater diagnostic $150 — $50 credit toward repairs",
        "Well water is common here — salt cells and heaters see it",
        "Danielle, RAIL-certified Installer of Record",
        "Belterra, Caliterra, Headwaters, and Highpointe",
        `${site.raicLicensed.inline}`,
      ],
      faqs: [
        {
          question: "How much does pool equipment diagnosis cost in Dripping Springs?",
          answer:
            "A pump diagnostic is $120 and a heater diagnostic is $150. Each includes a $50 credit toward approved repairs. A chlorinator replacement is quoted from what is on the pad, not from a flat menu.",
        },
        {
          question: "Do you replace saltwater chlorinators in Dripping Springs?",
          answer:
            "Yes. We have replaced chlorinators on Dripping Springs pads. Many homes here are on wells, and those cells fail before the pump does. We confirm that before we sell a cell.",
        },
        {
          question: "Who handles heater electrical work in Dripping Springs?",
          answer:
            "Danielle, our RAIL-certified Installer of Record. Heaters, lights, and automation need that license. The company carries the RAIC contractor license for the work.",
        },
      ],
    },
    "pool-renovations": {
      heroIntro:
        "Dripping Springs replaster starts with the leaks we already find here: tile pulling off plaster, and spa cracks. We leak-check every renovation pool before the new surface. The consultation is free.",
      title: "Dripping Springs replaster, after the spa and tile leaks are closed",
      paragraphs: [
        "Belterra and Caliterra pools from the 2000s are entering the years when plaster looks tired and waterline tile lets go. Highpointe and Headwaters add spas and rock that make a resurface more than a flat marcite job. Hill Country sun on an open lot finishes the wear. Older downtown and 290-corridor pools are often past that point already.",
        "On Dripping Springs leak calls we have identified tile-to-plaster separation and spa-wall cracks with calcium. Those are the problems a new finish will cover and then lose. We leak-check every renovation pool before plaster and repair that damage first. Pebble Tec and Pebble Sheen are applied only by certified installers.",
        "Chris manages the project from the free on-site consultation through walkthrough. Replaster is quoted after we see the shell, the spa, and the access. We schedule Dripping Springs from Leander and confirm timing when you call.",
      ],
      typicalPools:
        "2000s Belterra and Caliterra gunite and spas that are due for a new surface, Headwaters and Highpointe pools with rock and waterline detail, and older downtown Dripping Springs shells.",
      highlights: [
        "Leak-check every Dripping Springs pool before plaster",
        "Tile separation and spa cracks repaired before the new finish",
        "Free on-site consultation",
        "Pebble Tec and Pebble Sheen applied only by certified installers",
        "Belterra, Caliterra, Headwaters, and Highpointe",
        "Chris manages consult through walkthrough",
      ],
      faqs: [
        {
          question: "How do I know if my Dripping Springs pool needs replastering?",
          answer:
            "Rough or stained plaster, tile pulling away from the shell, or a Belterra or Caliterra surface that is 15–25 years old usually means it is time. Spa cracks are a leak, not a finish problem, and they get repaired first. A free consultation is how we separate the two.",
        },
        {
          question: "Do you leak-check before replastering in Dripping Springs?",
          answer:
            "Yes. We have found tile-to-plaster separation and spa-wall cracks on Dripping Springs leak jobs. Every renovation pool is leak-checked before plaster so that damage is repaired first.",
        },
        {
          question: "How much does Dripping Springs pool replastering cost?",
          answer:
            "It is quoted after a free on-site consultation. Spa cracks, tile, coping, rock access, and the finish you choose all change the price. We do not publish a flat replaster number.",
        },
      ],
    },
    "pool-inspections": {
      heroIntro:
        "Dripping Springs buyers in Belterra and Caliterra inherit spas, long plumbing runs, and plaster that Hill Country sun has already aged. Chris, our PHTA Certified Pool Inspector, writes the report before you own those problems.",
      title: "Pool inspections for Dripping Springs resale and Hill Country spas",
      paragraphs: [
        "A Belterra or Caliterra listing photo will not show tile separating from plaster or a spa crack with calcium in it. We have found both on Dripping Springs leak calls. A buyer's inspection is the time to see them, along with the heater, salt system, and whether a long buried run is suspect.",
        "Chris performs the inspection. $360 for a standard pool or pool/spa, up to two hours, photos and a written report (exclusions apply). The visit is visual and operational. It is not a dive with a hydrophone. If the report flags a spa crack, tile separation, or water loss, leak detection is the next step and it is priced separately.",
        "We schedule Dripping Springs inspections from Leander and confirm timing when you call. Option-period clients should call as soon as they are under contract.",
      ],
      typicalPools:
        "Belterra and Caliterra resales with spas, Headwaters and Highpointe pools with longer equipment runs, and older downtown Dripping Springs gunite.",
      highlights: [
        "CPI-certified inspections by Chris",
        "Spas, tile lines, and plaster called out — leak detection quoted if they look active",
        "$360 standard pool or pool/spa inspection (exclusions apply)",
        "Written report and photos for Belterra, Caliterra, and Headwaters buyers",
        "Well-water equipment and salt systems noted when they are on the pad",
        "Scheduled from Leander — timing confirmed when you call",
      ],
      faqs: [
        {
          question: "How much does a pool inspection cost in Dripping Springs?",
          answer:
            "A standard pool or pool/spa inspection is $360 (exclusions apply). Chris, our Certified Pool Inspector, does the visit — up to two hours — and delivers a written report with photos. A spa dive and leak detection are separate.",
        },
        {
          question: "Will the inspection catch a Dripping Springs spa leak?",
          answer:
            "It will catch what we can see: cracks, calcium, tile pulling off the plaster, and equipment that is not running. Confirming an active leak with dye, a hydrophone, or pressure testing is leak detection, not part of the $360 inspection. The report will say when you need that next.",
        },
        {
          question: "Can you inspect a Belterra or Caliterra pool during option period?",
          answer:
            "Call when you go under contract. We schedule Dripping Springs from Leander and will tell you if we can make the option window before you count on the date.",
        },
      ],
    },
  },
};
