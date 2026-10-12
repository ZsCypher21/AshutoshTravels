/**
 * Featured destinations.
 * Source: TravelWeb.pdf — Kathmandu Valley, Patan Valley, Bhaktapur Valley,
 * Pokhara, Chitwan and Lumbini pages. Text is rewritten; facts are kept unless
 * flagged with `needsVerification` or listed in docs/content-notes.md.
 */
import type { Destination } from "@/lib/types";

export const destinations: Destination[] = [
  {
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    region: "Central Nepal",
    tagline: "Palaces, stupas and mountain sunrises",
    summary:
      "Nepal's capital and its two sister cities, ringed by mountains and filled with palaces, stupas and temples. The valley is also the gateway to sunrise viewpoints and hill towns.",
    overview: [
      "Kathmandu is the capital and largest metropolitan city of Nepal. It shares the Kathmandu Valley with two historic cities, Lalitpur (Patan) and Bhaktapur, and is surrounded by four major hills: Shivapuri, Phulchowki, Nagarjun and Chandragiri.",
      "Nepali is the common language, and many residents also speak Newari, as the city is the centre of Newar people and culture. English is widely understood. Kathmandu has the most advanced infrastructure of any urban area in Nepal.",
    ],
    facts: [
      { label: "Official name", value: "Kathmandu Metropolitan City" },
      { label: "Location", value: "Central Nepal" },
      { label: "Status", value: "Capital of Nepal" },
      { label: "Altitude", value: "1,336 m" },
      { label: "Languages", value: "Nepali, Newari" },
      {
        label: "Population",
        value: "1,081,845 city; 1,647,092 valley (2001 census)",
        needsVerification: "2001 census figures from the PDF; replace with current census data.",
      },
      { label: "Nearby", value: "Lalitpur (Patan), Bhaktapur, Nagarkot, Dhulikhel, Pokhara, Chitwan" },
    ],
    climate: {
      text: "The valley enjoys a pleasant climate for most of the year. Between October and March, nights turn cold and the days are short, though mid-morning to afternoon is usually sunny and warm. Temperatures rise from April, often with afternoon storms.",
    },
    attractionsTitle: "Highlights in and around the valley",
    attractions: [
      {
        name: "Kathmandu Durbar Square",
        group: "In the valley",
        tags: ["UNESCO World Heritage", "Palace"],
        description:
          "A complex of palaces, courtyards and temples built between the 12th and 18th centuries, once the seat of Kathmandu's Malla kings. Look for the 17th-century stone inscription set into the palace wall, written in 15 languages. The square remains the city's social, religious and urban heart, and the palace houses three museums.",
      },
      {
        name: "Swayambhunath Stupa",
        group: "In the valley",
        tags: ["UNESCO World Heritage", "Buddhist"],
        description:
          "Watching over the valley from a hilltop on its western side, this great stupa is one of Nepal's holiest Buddhist sites. Its origins are linked to the legend of the valley's creation from a primordial lake. Also known as Samhengu, it is a World Heritage Site, with the National Museum and the Museum of Natural History at the foot of the hill.",
      },
      {
        name: "Pashupatinath Temple",
        group: "In the valley",
        tags: ["UNESCO World Heritage", "Hindu"],
        description:
          "One of the most sacred Hindu shrines in the world, 5 km east of the city centre. The richly ornamented pagoda houses the sacred lingam of Lord Shiva, and chronicles record the temple before 400 AD. Devotees take ritual dips in the holy Bagmati River that flows beside it.",
      },
      {
        name: "Boudhanath Stupa",
        group: "In the valley",
        tags: ["UNESCO World Heritage", "Buddhist"],
        description:
          "About 6 km east of downtown Kathmandu, Boudhanath is the largest stupa in the valley, rising 36 metres and one of the finest examples of stupa design anywhere. It is also known as Khasti, or \"dew drops\", after the story that its builders mixed the mortar with dew during a severe drought.",
      },
      {
        name: "Changu Narayan Temple",
        group: "In the valley",
        tags: ["UNESCO World Heritage", "Hindu"],
        description:
          "Set on a ridge about 12 km east of the city and dedicated to Lord Vishnu, this is one of the finest and oldest examples of pagoda architecture, embellished with exquisite wood and stone carving.",
      },
      {
        name: "Kirtipur",
        group: "In the valley",
        tags: ["Newar town"],
        description:
          "An ancient Newar township on a ridge 10 km southwest of Kathmandu, a natural fortress with a proud and courageous history. Wander quaint streets of artistic houses and temple squares, and visit the Chilamchu stupa and the temple of Bagh Bhairab. Kirtipur's people are known for their building and weaving skills.",
      },
      {
        name: "Dakshinkali & Chobhar",
        group: "In the valley",
        tags: ["Hindu", "Gorge"],
        description:
          "Dakshinkali, 22 km from the city on the valley's southern rim, is dedicated to the goddess Kali and is one of Kathmandu's most popular places of worship, busiest on Tuesdays and Saturdays when animal sacrifices are offered. On the way back, stop at Chobhar Gorge, the narrow cleft said to have been cut by Manjushree to drain the lake that once filled the valley.",
      },
      {
        name: "Hattiban",
        group: "In the valley",
        tags: ["Nature", "Outdoor"],
        description:
          "A 15 km drive from Kathmandu, Hattiban sits some 400 m above the valley among pine and fir forest. Enjoy pony rides, mountain biking, nature walks and hikes to Champa Devi Hill (2,054 m), or to Khokana and Bungamati for a taste of rural valley life.",
      },
      {
        name: "Nagarkot",
        group: "Beyond the valley",
        tags: ["Sunrise viewpoint", "2,175 m"],
        description:
          "The most popular mountain viewpoint near Kathmandu, 30 km to the east and a favourite weekend getaway. At sunrise, the Himalaya from Dhaulagiri in the west past Everest to Kanchenjunga in the east emerges from the darkness in breathtaking splendour.",
      },
      {
        name: "Dhulikhel",
        group: "Beyond the valley",
        tags: ["Newar town", "1,440 m"],
        description:
          "Just past Banepa, 32 km east of Kathmandu, this traditional Newar town is a wonderful place to spend the night and wake to sunrise over the Himalayan range. Once an important stop on the ancient trade route to Tibet, its glorious past lives on in handsome buildings and intricate woodcarving.",
      },
      {
        name: "Balthali Village",
        group: "Beyond the valley",
        tags: ["Countryside retreat"],
        description:
          "A quiet settlement on a plateau beyond Panauti, about 40 km from Kathmandu, where the Roshi and Ladku Khola rivers meet. Terraced rice fields and ochre thatched farmhouses frame clear views of Dorje Lakpa, Langtang and the wider Himalayan range on the northern horizon.",
      },
      {
        name: "Bandipur",
        group: "Beyond the valley",
        tags: ["Heritage hill town", "1,030 m"],
        description:
          "A beautifully preserved hilltop town in Tanahun District, 143 km west of Kathmandu and 80 km east of Pokhara. Once a simple Magar village, it grew into a prosperous trading centre with neoclassical facades, shuttered windows and slate-paved streets. Visit the Bindyabasini temple, Thani Mai, Tindhara and Raniban, trek down to Siddha Cave or hike to Ramkot village.",
      },
      {
        name: "Tansen (Palpa)",
        group: "Beyond the valley",
        tags: ["Hill town"],
        needsVerification: "The PDF gives Tansen's altitude as 4,300 m, which is incorrect; altitude omitted until confirmed.",
        description:
          "A small, ancient hill town on the route between Pokhara and Lumbini, loved for its culture, serene atmosphere, friendly people and pleasant weather in every season. On clear days you can see Dhaulagiri, Annapurna, Manaslu, Gauri Shankar and more.",
      },
      {
        name: "Kakani",
        group: "Beyond the valley",
        tags: ["Mountain views", "1,982 m"],
        description:
          "A quieter, more pristine retreat 23 km northwest of Kathmandu, with close-up views of Ganesh Himal, Langtang and the Annapurnas, and oak and rhododendron forest on the slopes leading down to Balaju.",
      },
      {
        name: "Daman",
        group: "Beyond the valley",
        tags: ["Panoramic views", "2,400 m"],
        description:
          "For travellers seeking the ultimate Himalayan panorama, Daman is worth the extra distance. Some 80 km southwest of the valley on the highway towards the Indian border, it reveals the world's highest mountain range from horizon to horizon.",
      },
      {
        name: "Gorkha",
        group: "Beyond the valley",
        tags: ["History", "1,135 m"],
        description:
          "131 km west of Kathmandu, reached by a road branching north from the Kathmandu–Pokhara highway at Abu Khaireni. The ancestral home of the Shah dynasty and the original Gorkha soldiers, it is crowned by Gorkha Durbar, a fort, palace and temple with superb views of the valleys and the Manaslu range.",
      },
      {
        name: "Manakamana",
        group: "Beyond the valley",
        tags: ["Pilgrimage", "Cable car", "1,302 m"],
        description:
          "A hilltop temple in Gorkha dedicated to the wish-fulfilling goddess Manakamana (\"mana\" means heart, \"kamana\" means wish). A 10-minute cable car ride from Kurintar takes you to the top.",
      },
    ],
    image: { alt: "Kathmandu Valley at dawn", tone: "dawn" },
    seo: {
      title: "Kathmandu Valley Tours: Temples, Stupas & Day Trips",
      description:
        "Explore Kathmandu Durbar Square, Swayambhunath, Pashupatinath, Boudhanath and sunrise viewpoints like Nagarkot with Ashutosh Travels & Tours.",
    },
  },

  {
    slug: "patan",
    name: "Patan (Lalitpur)",
    region: "Kathmandu Valley",
    tagline: "The city of fine arts",
    summary:
      "A UNESCO-listed city of temples, Buddhist monasteries and master craftsmanship, famed for metalwork and stone carving.",
    overview: [
      "Patan, officially Lalitpur, is one of Nepal's major cities, in the southwest of the Kathmandu Valley. It is best known for its rich cultural heritage, especially its arts and crafts, and is called the city of festivals and feasts, fine ancient art, and metal and stone sculpture.",
      "Temples of many sizes and styles fill the western side of Patan Durbar Square, chief among them the Krishna Temple, the Bhimsen Temple and the Golden Temple of Hiranya Varna.",
    ],
    facts: [
      { label: "Location", value: "Kathmandu Valley" },
      { label: "Status", value: "UNESCO World Heritage Site (Cultural)" },
      { label: "Major attractions", value: "Krishna Temple with 21 golden pinnacles; Tusha Hiti royal bath" },
      {
        label: "Population",
        value: "162,991 (2001 census)",
        needsVerification: "2001 census figure from the PDF; replace with current data.",
      },
    ],
    attractionsTitle: "Must-see sites in Patan",
    attractions: [
      {
        name: "Krishna Temple",
        tags: ["Shikhara style", "17th century"],
        description:
          "This red-stone temple to Lord Krishna was built in the 17th century and is considered one of the jewels of Durbar Square. It is regarded as the first temple built in the shikhara style, which gives it a commanding presence, and it is often compared to sacred Mount Meru.",
      },
      {
        name: "Golden Temple (Hiranya Varna Mahavihar)",
        tags: ["Buddhist monastery", "12th century"],
        description:
          "Known to Newars as Kwa Bahal, this unique Buddhist monastery was founded in the 12th century, with records from 1409. Its modest entrance gives no hint of the magnificent courtyard within, where stone gateways were made by artisans whose descendants still work in the woodcarving trade.",
      },
      {
        name: "Kumbheshwar Temple",
        tags: ["Five-tiered pagoda", "Shiva"],
        description:
          "A five-storey pagoda to Lord Shiva built by King Jayasthiti Malla, with golden embellishments added in 1422 AD. Its natural spring is said to be fed by the sacred glacial lake of Gosainkunda, and ritual bathing and a fair are held here during the Janai Purnima festival.",
      },
      {
        name: "Jagatnarayan Temple",
        tags: ["Shikhara style", "Vishnu"],
        description:
          "A tall red-brick shikhara temple dedicated to Lord Vishnu, with fine metal statues of Garuda, Ganesh and Hanuman.",
      },
      {
        name: "Mahabouddha",
        tags: ["Buddhist", "Terracotta"],
        description:
          "East of Durbar Square, this Buddhist temple of clay bricks is engraved with hundreds of Buddha images and is celebrated for its fine terracotta work.",
      },
      {
        name: "Rudra Varna Mahavihar",
        tags: ["Buddhist monastery"],
        description:
          "A monastery with a remarkable collection of images and idols in metal, stone and wood. Legend says ancient kings were crowned here, and many treasures offered by devotees can still be seen.",
      },
      {
        name: "The Ashokan Stupas",
        tags: ["3rd century BC"],
        description:
          "Emperor Ashoka is said to have visited in 250 BC and built four stupas at the four corners of Patan, in Pulchowk, Lagankhel, Ebahi and Teta (on the way to Sano Gaun).",
      },
    ],
    image: { alt: "Temples of Patan Durbar Square", tone: "temple" },
    seo: {
      title: "Patan (Lalitpur) Heritage Tours: Durbar Square & Golden Temple",
      description:
        "Discover Patan's Krishna Temple, Golden Temple, Kumbheshwar and Mahabouddha on a cultural tour with Ashutosh Travels & Tours.",
    },
  },

  {
    slug: "bhaktapur",
    name: "Bhaktapur",
    region: "Kathmandu Valley",
    tagline: "The city of devotees",
    summary:
      "A showcase of Newari architecture, with pagoda squares, the Golden Gate and famous homemade curd, khopa dhau.",
    overview: [
      "Bhaktapur, also known as Bhadgaon or the City of Devotees, is the third major town of the Kathmandu Valley. It was the capital of the whole valley from the 14th to the 16th century, and much of its great architecture dates from the late 17th century. Rising on the northern bank of the Hanumante River, it is renowned for Newari architecture.",
      "Bhaktapur Durbar Square gathers pagoda and shikhara temples around the brick-and-wood Palace of Fifty-Five Windows. Statues of ancient kings on stone columns, guardian deities in their shrines, and woodcarving on every strut, lintel, gateway and window come together like a well-orchestrated symphony.",
      "Don't leave without tasting Bhaktapur's famous homemade curd, known locally as khopa dhau, or browsing the square for handmade souvenirs such as woodcarvings, puppets, thangkas and caps. All foreign visitors pay an entry fee to Durbar Square.",
    ],
    facts: [
      { label: "Location", value: "Kathmandu Valley" },
      { label: "Status", value: "UNESCO World Heritage Site (Cultural)" },
      {
        label: "UNESCO listed",
        value: "1979",
      },
      { label: "Signature sight", value: "The Golden Gate (Sun Dhoka)" },
    ],
    attractionsTitle: "Highlights of Bhaktapur",
    attractions: [
      {
        name: "The Lion Gate",
        tags: ["1696 AD"],
        description:
          "A massive gate dating from 1696 AD, guarded on each side by huge stone lions, with imposing images of Lord Shiva and the goddess Ugrachandi.",
      },
      {
        name: "The Golden Gate (Sun Dhoka)",
        tags: ["Metalwork masterpiece"],
        description:
          "Often called the most beautiful gate of its kind in the world, richly moulded with mythical creatures of marvellous intricacy. Erected by King Ranjit Malla, it leads into the main courtyard of the Palace of Fifty-Five Windows.",
      },
      {
        name: "Palace of Fifty-Five Windows",
        tags: ["15th century", "Woodcarving"],
        needsVerification:
          "The PDF's text for this site mixes in a description of Patan's palace (Keshav Narayan Chowk); only the parts that refer to Bhaktapur are kept.",
        description:
          "Built during the reign of King Yaksha Malla in 1427 AD and remodelled by King Bhupatindra Malla in the 17th century. Its balcony of fifty-five windows is considered a unique masterpiece of woodcarving.",
      },
      {
        name: "The Art Gallery",
        tags: ["Museum"],
        description:
          "Ancient paintings from Hindu and Buddhist traditions across many periods, especially valued by researchers of both faiths.",
      },
      {
        name: "Statue of King Bhupatindra Malla",
        tags: ["Sculpture"],
        description:
          "Atop a column facing the palace, the king is shown in an attitude of worship. It is considered the most magnificent of the square's many statues.",
      },
      {
        name: "Nyatapola Temple",
        tags: ["1702 AD", "Five-tiered pagoda"],
        description:
          "Nepal's most famous pagoda, built in 1702 AD by King Bhupatindra Malla and dedicated to Siddhilaxmi, the tantric mother goddess. Its name means \"five-tiered\" in Newari, symbolising the five elements: water, earth, fire, wind and sky.",
      },
      {
        name: "Pashupati Temple",
        tags: ["Hindu", "Folklore"],
        description:
          "Folklore tells of a Bhaktapur devotee of Lord Pashupati who dreamed that Shiva asked for a temple to live in. He obeyed, and the temple was built.",
      },
    ],
    image: { alt: "Nyatapola Temple in Bhaktapur", tone: "dusk" },
    seo: {
      title: "Bhaktapur Durbar Square Tours: Nyatapola & the Golden Gate",
      description:
        "Visit Bhaktapur's Golden Gate, Palace of Fifty-Five Windows and Nyatapola Temple, and taste its famous curd, with Ashutosh Travels & Tours.",
    },
  },

  {
    slug: "pokhara",
    name: "Pokhara",
    region: "Western Nepal",
    tagline: "Lakes, mountain reflections and the start of great treks",
    summary:
      "Nepal's lakeside adventure capital, with Annapurna and Machhapuchhre views, caves, waterfalls and trailheads for famous treks.",
    overview: [
      "Pokhara, headquarters of Kaski District, is one of Nepal's largest cities and one of its most popular destinations. Sitting at 827 m, about 200 km west of the Kathmandu Valley, it is a place of remarkable natural beauty and a centre for adventure.",
      "Several beautiful lakes and stunning panoramas of Himalayan peaks make Pokhara enchanting in every season.",
    ],
    facts: [
      { label: "Location", value: "West of the Kathmandu Valley" },
      { label: "Altitude", value: "827 m" },
      { label: "Distance from Kathmandu", value: "About 200 km" },
      { label: "Famous for", value: "Mountain views, lakes and trekking" },
      { label: "Temperature range", value: "15°C to 35°C" },
    ],
    climate: {
      text: "Pokhara's climate is subtropical, but its elevation keeps temperatures moderate: summer averages 25–35°C and winter around 5–15°C.",
    },
    attractionsTitle: "Things to see in Pokhara",
    attractions: [
      {
        name: "Phewa Lake",
        tags: ["Boating", "Mountain reflections"],
        description:
          "The second-largest lake in Nepal, roughly 1.5 km by 4 km, and the centre of Pokhara life. Visit the pagoda-style Barahi temple to the water goddess on its island, and admire Machhapuchhre and Annapurna mirrored in the water; the south-eastern shore has the best views. The lake is up to about 47 m deep and its water is warm.",
      },
      {
        name: "Begnas & Rupa Lakes",
        tags: ["Peaceful retreat", "Fishing"],
        description:
          "About 13–15 km from Pokhara, at the end of a road that turns north off the Kathmandu highway. Begnas is the valley's second-largest lake, and the pair's relative isolation makes them a perfect nature retreat for boating and fishing.",
      },
      {
        name: "World Peace Pagoda",
        tags: ["Viewpoint", "Buddhist"],
        description:
          "A massive Buddhist stupa on a hilltop above the southern shore of Phewa Lake. A short hike brings you to spectacular views of the Annapurna range and the city.",
      },
      {
        name: "Davis Falls (Patale Chhango)",
        tags: ["Waterfall"],
        description:
          "One of Pokhara's best-known sights, fed by Phewa Lake. A modern legend tells of a foreigner named David swept into the underground passage beneath the falls when the dam's floodgates opened, never to be seen again.",
      },
      {
        name: "Mahendra Cave",
        tags: ["Limestone cave"],
        description:
          "Known locally as Chamero Odhaar, the \"House of Bats\". Discovered by shepherd boys around 1950 and named after the late King Mahendra, the large limestone cave is lit for visitors and known for rocks that glitter in the light.",
      },
    ],
    extras: [
      {
        title: "Treks from Pokhara",
        intro:
          "Pokhara is the start and end point of many of Nepal's most popular trekking routes. Longer treks of one to three weeks include the Annapurna Circuit, Annapurna Sanctuary and Jomsom trek. Shorter favourites include:",
        items: [
          { name: "Ghachowk Trek", description: "" },
          { name: "Naudanda Trek", description: "" },
          { name: "Ghorepani Circuit", description: "" },
          { name: "Kahun Danda", description: "" },
          { name: "Sarangkot", description: "" },
        ],
      },
    ],
    image: { alt: "Phewa Lake with Machhapuchhre reflected", tone: "lake" },
    seo: {
      title: "Pokhara Tours: Phewa Lake, Peace Pagoda & Annapurna Treks",
      description:
        "Plan your Pokhara trip with Ashutosh Travels & Tours: Phewa Lake, World Peace Pagoda, Devi's Fall, Mahendra Cave and treks into the Annapurna region.",
    },
  },

  {
    slug: "chitwan",
    name: "Chitwan",
    region: "Inner Terai, South-Central Nepal",
    tagline: "Rhinos, tigers and the wild Terai",
    summary:
      "Nepal's oldest national park, home to the one-horned rhino and the Bengal tiger, with jungle walks, canoe rides and Tharu culture.",
    overview: [
      "Chitwan is one of the few remaining undisturbed corners of the Terai, the lowland belt that once stretched along the foothills of India and Nepal. Its flora and fauna are exceptionally rich.",
      "The park shelters one of the last populations of the one-horned Asian rhinoceros and is one of the last refuges of the Bengal tiger. It is a great place to spot the Bengal florican, giant hornbill and grass owl, while gharial thrive in the Narayani River and mugger crocodiles live in its many lakes.",
    ],
    facts: [
      { label: "Park established", value: "1974", needsVerification: "As stated in the PDF; confirm the official establishment year." },
      { label: "World Heritage status", value: "1984" },
      { label: "Mammal species", value: "At least 43" },
      { label: "Bird species", value: "More than 450" },
      { label: "Amphibians & reptiles", value: "45 species" },
      { label: "Average rainfall", value: "About 203 cm (80 in)" },
      { label: "Temperature range", value: "2°C to 40°C" },
    ],
    climate: {
      text: "Chitwan has a humid tropical monsoon climate. November to February is generally dry and cool, warming by the end of March. June to September is hot and very humid, with the monsoon arriving mid-June and lasting until mid-September.",
    },
    attractionsTitle: "Wildlife of Chitwan National Park",
    attractions: [
      {
        name: "Large mammals",
        description:
          "Elephants and Indian rhinos are the largest residents, joined by gaur, sambar, Indian muntjac, chital, hog deer, mainland serow, chousingha and wild boar.",
      },
      {
        name: "Predators",
        description:
          "Tigers, leopards and dholes hunt here, while striped hyenas scavenge. Sloth bears are among the park's star attractions.",
      },
      {
        name: "Smaller carnivores",
        description:
          "Golden jackal, yellow-throated marten, ratel, smooth-coated otter, small and large Indian civets, spotted linsang, common palm civet, binturong, several mongoose species, and leopard, marbled and fishing cats.",
      },
      {
        name: "And more",
        description:
          "Rhesus monkeys, Hanuman langurs, Indian pangolin, flying squirrels, Indian porcupine, hispid hare and the Ganges river dolphin.",
      },
    ],
    extras: [
      {
        title: "Things to do in Chitwan",
        items: [
          {
            name: "Elephant safari",
            description:
              "The traditional way to explore the jungle: from an elephant's back you can see over the tall grass for a clear view of the wildlife.",
            needsVerification:
              "Listed in the PDF. Many operators have moved away from elephant rides; confirm whether to keep offering this.",
          },
          {
            name: "Jungle walk",
            description:
              "Get up close with nature on foot, guided by our experts, encountering wild animals, birds and plants at ground level.",
          },
          {
            name: "Jungle drive",
            description:
              "A thrilling 4WD drive deep into the jungle, often off the beaten track, for the best chance of spotting rare animals, birds and plants.",
          },
          {
            name: "Canoe ride",
            description:
              "A slow, peaceful paddle along the Rapti River, listening to the water and watching the birds, with a good chance of seeing crocodiles in the wild.",
          },
          {
            name: "Bird watching",
            description:
              "With hundreds of species and important breeding sites, Chitwan is a treat for birders, especially in autumn when migrating flocks arrive.",
          },
          {
            name: "Tharu cultural dance",
            description:
              "An evening of local Tharu dances, performed mostly by men to the beat of drums: a highlight you should not miss.",
          },
        ],
      },
    ],
    image: { alt: "Grasslands and forest of Chitwan National Park", tone: "forest" },
    seo: {
      title: "Chitwan National Park Safari: Rhinos, Tigers & Jungle Activities",
      description:
        "Jungle walks, 4WD drives, canoe rides and bird watching in Chitwan National Park, home of the one-horned rhino and the Bengal tiger.",
    },
  },

  {
    slug: "lumbini",
    name: "Lumbini",
    region: "Terai, southern Nepal",
    tagline: "Birthplace of Lord Buddha",
    summary:
      "The sacred garden where Siddhartha Gautama was born, marked by Emperor Ashoka's pillar and a place of pilgrimage for the world.",
    overview: [
      "Lumbini, in the Terai plains of southern Nepal, is where the Buddha was born in 623 BC. The site is marked by a stone pillar erected by Emperor Ashoka in 249 BC, inscribed to identify it as the birthplace.",
      "A UNESCO World Heritage Site, Lumbini is being developed with international support as a supreme Buddhist pilgrimage destination and a symbol of world peace. The Sacred Garden centres on the Ashoka Pillar, beside the renovated Mayadevi Temple and the Puskarini pond where Queen Mayadevi bathed before giving birth.",
    ],
    facts: [
      { label: "Location", value: "South-western Nepal" },
      { label: "Elevation", value: "About 100 m" },
      { label: "Status", value: "UNESCO World Heritage Site" },
      { label: "Known for", value: "Religious and historical sites" },
      { label: "Nearby", value: "Kapilvastu" },
      { label: "Best time to visit", value: "Late September to mid-March" },
    ],
    climate: {
      text: "Lumbini has a tropical monsoon climate with cold, hot, monsoon and transitional seasons. The coldest period runs from early December to the end of January, when temperatures can fall to around 6°C. The weather is pleasant most of the year.",
    },
    attractionsTitle: "Sacred places to visit",
    attractions: [
      {
        name: "Sacred Garden",
        description:
          "The birthplace of Prince Siddhartha, with the Ashokan pillar whose inscription identifies the spot as the Buddha's birthplace.",
      },
      {
        name: "Mayadevi Temple",
        description:
          "Dedicated to Maya Devi, the Buddha's mother, and believed to stand over one of Ashoka's original stupas. Panels depicting the holy birth were installed by Malla kings who ruled the Karnali region from the 11th to the 15th century. The site was rediscovered by a German archaeologist in 1895.",
      },
      {
        name: "Puskarini Pond",
        description:
          "The sacred pool beside the Mayadevi Temple where Queen Mahamaya is believed to have bathed before giving birth, and where the newborn Siddhartha was first bathed.",
      },
      {
        name: "Sanctum of the Birthplace",
        description:
          "Uncovered by careful excavation beneath the ruins of the old Mayadevi temple, a single stone slab deep in the sanctum marks the exact spot of the Buddha's birth.",
      },
    ],
    extras: [
      {
        title: "Further along the Buddhist trail",
        intro: "The original site also highlights these sites associated with the Buddha's life:",
        items: [
          {
            name: "Maha Bodhi Temple",
            description:
              "Known for its 1,700-year-old image of the Buddha, which faces the place where he attained enlightenment.",
            needsVerification: "This temple and Kushinagar are in India; confirm whether they are part of a tour offered.",
          },
          {
            name: "Kushinagar",
            description:
              "Where the Buddha is said to have attained parinirvana, with many stupas, viharas and chaityas recalling the event.",
          },
        ],
      },
    ],
    image: { alt: "The Mayadevi Temple and Sacred Garden at Lumbini", tone: "glacier" },
    seo: {
      title: "Lumbini Pilgrimage Tours: Birthplace of Lord Buddha",
      description:
        "Visit the Sacred Garden, Mayadevi Temple and Ashoka Pillar at Lumbini, the UNESCO-listed birthplace of the Buddha, with Ashutosh Travels & Tours.",
    },
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
