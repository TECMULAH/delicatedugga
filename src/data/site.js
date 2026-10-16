import media from "./media.json";

export const contact = {
  email: "thestripyhorse@gmail.com",
  phone: "+263 785 277 896",
  phoneHref: "tel:+263785277896",
  whatsapp: "https://wa.link/67smjk",
  whatsappWith: (text) =>
    `https://wa.me/263785277896?text=${encodeURIComponent(text)}`,
  whatsappNumber: "263785277896",
  facebook: "https://www.facebook.com/delicateduggapottery/",
  instagram: "https://www.instagram.com/delicate.dugga/",
  shop: "The Stripy Horse Company",
  address: [
    "Shop 25, Paddington Square",
    "178 Ed Mnangagwa Rd (Old Enterprise Rd)",
    "Harare, Zimbabwe",
  ],
};

export const studioImages = [
  { src: media["hero-1"], alt: "Hand-painted animal mugs, plates and a jug" },
  { src: media["hero-2"], alt: "Stacks of unglazed thrown mugs" },
  { src: media["hero-3"], alt: "Handmade Delicate Dugga pottery" },
  { src: media["hero-4"], alt: "Painted Zimbabwean tableware" },
  { src: media["hero-5"], alt: "Studio pottery from the collection" },
  { src: media["hero-6"], alt: "Hand-decorated cups and bowls" },
  { src: media["hero-7"], alt: "African animal designs on ceramic" },
  { src: media["hero-8"], alt: "Finished pieces from the studio" },
  { src: media["hero-9"], alt: "A close look at painted pottery" },
];

export const aboutImages = {
  brushes: media["about-1"],
  studio: media["about-2"],
  detail: media["about-3"],
  wheel: media["about-4"],
  group: media["team-group"],
};

export const team = [
  {
    name: "Sascha Barr",
    role: "Owner / Manager",
    image: media["team-sascha"],
    bio: [
      "I grew up on a coffee estate in the Eastern Highlands of Zimbabwe and I have always had a passion for art and design. My mother is a fine artist and my sister a graphic designer, so there is something creative in my blood. I always enjoyed art through school, then chose to follow a career in horses, my other passion.",
      "Horse racing and breeding gave me the chance to travel and live around the world. I came back to Zimbabwe, where I live with my husband and daughter. In Harare I run an equine livery yard for up to 35 horses, and a small bed and breakfast.",
      "In June 2018 I took over the Ros Byrne Pottery business. I love running Delicate Dugga. I am truly blessed to have a supportive family and a wonderful team behind me. There is something special about being creative and designing pottery that feeds my soul and inspires me.",
    ],
  },
  {
    name: "Motion Gamela",
    role: "Thrower",
    image: media["team-motion"],
    bio: [
      "Motion was born in the rural areas of Chibuwe, in the Chipinge district of the Eastern Highlands, in 1971. He attended Chibuwe Primary School. His family were rural farmers and could not afford to send him to secondary school. As a teenager he came to Harare looking for work and a better life. He spent three years as a security guard, then in 1994 joined Ros Byrne Pottery as a clay maker.",
      "While making clay he studied throwing, and stayed at Ros Byrne Pottery for 24 years. In June 2018 he joined Delicate Dugga as our primary thrower and potter. His favourite pieces to throw are teapots and mugs.",
      "Motion is married with three children and has a family home in Rusape. He enjoys motorbikes and fishing on Lake Chivero. He is a very talented potter, and incredibly quick. It is great to have him on the team.",
    ],
  },
  {
    name: "Pedzisani Nyagome",
    role: "Clay maker & kiln operator",
    image: media["team-pedzi"],
    bio: [
      "Pedzi is 62 and was born and educated in Mt Darwin. In 1976, during the Rhodesian war, he left for the city to look for work. He joined Mrs Byrne senior as a gardener. In 1981 he joined Ros Byrne Pottery as a general hand and cleaner, and learned clay making and kiln operating. He worked for Ros Byrne Pottery for over 30 years.",
      "He is married with five grown-up children and still has a family home in Mt Darwin. He enjoys music and watching sport. He joined Delicate Dugga in June 2018.",
      "Pedzi makes the clay, tests it, operates the kilns, fettles the ware, and makes some of our modelled animals and Christmas decorations.",
    ],
  },
  {
    name: "Patrick Beaton",
    role: "Artist",
    image: media["team-patrick"],
    bio: [
      "Patrick is 35 and was born in Harare. He lived and was educated in the Tafara high-density suburb, and discovered his talent for art at high school. After school he joined his brother learning sculpture at the National Gallery in the City of Harare, working in scrap metal.",
      "In 2006 he joined Ros Byrne Pottery as an artist and decorator, and stayed until production closed in 2015. He then joined Chart Pottery in Graniteside until they closed a year later, and worked as a waiter until he joined Delicate Dugga in June 2018.",
      "Patrick loves abstract painting, music, chess and tennis. He has a son and still lives in Tafara. He is highly skilled and pays great attention to the detail of every design.",
    ],
  },
  {
    name: "Linnet Pwitiko",
    role: "Artist",
    image: media["team-linnet"],
    bio: [
      "Linnet comes from Goromonzi village. She is a single mother of four children, two of whom are still at school. She started at Ros Byrne Pottery as an artist and decorator, learned a great deal there over six years, and was the only woman in a group of the studio’s top ten artists. She has always been grateful to Ros for what she learned.",
      "She later joined Kwamasas Pottery, then stayed at home to look after her children and kept painting there. She started at Delicate Dugga when she needed to provide for her children.",
      "Linnet is a passionate artist who does beautiful, detailed work. In her own time she paints wooden tea trays, which we sell at The Stripy Horse Company, to help educate her children.",
    ],
  },
  {
    name: "Nyararai Matambo",
    role: "Bender & artist",
    image: media["team-nyararai"],
    bio: [
      "Nyararai comes from Epworth and was born in Chivhu in 1969. He is married with four children. He went to Haig Park School and Ellis Robins School. After school he worked at the Dairy Marketing Board and then at the Lyons Tea factory.",
      "He joined Ros Byrne Pottery in the late 1990s as a decorator and was promoted to senior bender and rimmer. He received a five-year service certificate and was often worker of the month. He later joined Kwamasasa Pottery, and when it closed he worked as a security guard.",
      "In 2023 he joined Delicate Dugga as a bender and artist. He is a happy presence in the studio. He plays soccer, watches television and goes to church.",
    ],
  },
];

export const stockists = [
  {
    region: "Harare",
    name: "The Stripy Horse Company",
    lines: [
      "Shop 25, Paddington Square",
      "178 Ed Mnangagwa Rd (Old Enterprise Rd)",
      "Harare, Zimbabwe",
    ],
    image: media["shop-harare"],
    alt: "Delicate Dugga pottery on display",
    map: "https://www.google.com/maps/search/?api=1&query=Paddington+Square+178+Ed+Mnangagwa+Road+Harare",
  },
  {
    region: "Victoria Falls",
    name: "Shearwater Rainforest Shop & Cafe",
    lines: ["Victoria Falls Visitor Centre", "Livingstone Way", "Victoria Falls"],
    image: media["shop-falls"],
    alt: "Victoria Falls",
    map: "https://www.google.com/maps/search/?api=1&query=Victoria+Falls+Visitor+Centre+Livingstone+Way",
  },
  {
    region: "Victoria Falls",
    name: "Shearwater Shop",
    lines: ["Victoria Falls International Airport"],
    map: "https://www.google.com/maps/search/?api=1&query=Victoria+Falls+International+Airport",
  },
  {
    region: "Victoria Falls",
    name: "Rokoteka Traders",
    lines: ["10–12 Landela Complex", "Victoria Falls"],
    map: "https://www.google.com/maps/search/?api=1&query=Landela+Complex+Victoria+Falls",
  },
  {
    region: "Copenhagen",
    name: "African Touch Interiors",
    lines: ["Frederiksborggade 20", "1360 København", "Copenhagen, Denmark"],
    image: media["shop-denmark"],
    alt: "African Touch Interiors in Copenhagen",
    map: "https://www.google.com/maps/search/?api=1&query=African+Touch+Frederiksborggade+20+Copenhagen",
  },
];

export const paintingSessions = [
  {
    place: "Maize & Mingle Cafe",
    where: "136 Acturus Rd, Harare",
    when: "Thursdays, 12:30–4pm",
    extra: "Saturdays, 8:30am–12:30pm",
    image: media["paint-1"],
  },
  {
    place: "Luna’s Restaurant",
    where: "Hunters Moon Complex, 3 Ridgeway North",
    when: "Fridays, 12:30–4pm",
    image: media["paint-2"],
  },
];

export { media };
