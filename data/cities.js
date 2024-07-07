export const cities = [
  {
    id: 1,
    name: "Negombo",
    imageURL: require("../assets/negombo.png"),
    latitude: 7.2008,
    longitude: 79.8737,
    hotels: [
      {
        name: "Jetwing Beach",
        number: "Stay 1",
        image: require("../assets/jetwing.jpeg"),
      },
      {
        name: "Heritance Negombo",
        number: "Stay 2",
        image: require("../assets/heritance.jpeg"),
      },
    ],
    vibe: "Beach",
    temp: 30,
    restaurants: [
      {
        name: "Tuk Tuk Wine and Dine",
        image: require("../assets/tuktuk.jpeg"),
      },
      {
        name: "Prego Italian Cuisine",
        image: require("../assets/prego.jpeg"),
      },
      {
        name: "Choys Restaurant",
        image: require("../assets/Choys.jpeg"),
      },
      {
        name: "Lords Restaurant Complex",
        image: require("../assets/lords.jpeg"),
      },
    ],
    events: [
      {
        name: "Tales of Year Party",
        image: require("../assets/talesOfYear.jpeg"),
      },
      {
        name: "Goodbye 2021",
        image: require("../assets/musicTillDawn.jpeg"),
      },
    ],
    bars: [
      {
        name: "Moremo Pub & Restaurant-මෝමො",
        image: require("../assets/momo.jpeg"),
      },
      {
        name: "Toro Pub & Restaurant",
        image: require("../assets/toro.jpeg"),
      },
      {
        name: "Sundown Rooftop Bar",
        image: require("../assets/sundown.jpeg"),
      },
    ],
  },
  {
    id: 2,
    name: "Colombo",
    imageURL: require("../assets/colombo.png"),
    latitude: 6.9271,
    longitude: 79.8612,
    hotels: [
      {
        name: "Cinnamon Grand",
        number: "Stay 1",
        image: require("../assets/cinnomon.jpeg"),
      },
      {
        name: "Shangri-La Colombo",
        number: "Stay 2",
        image: require("../assets/shangrilla.jpeg"),
      },
      {
        name: "Galle Face Hotel Colombo",
        number: "Stay 3",
      },
    ],
    vibe: "Urban",
    temp: 32,
    restaurants: [
      {
        name: "Nuga Gama",
        image: require("../assets/nuga_gama.png"),
      },
      {
        name: "Ministry of Crab",
        image: require("../assets/MinistryofCrab.jpeg"),
      },
      {
        name: "Upali's by Nawaloka",
        image: require("../assets/UpalisByNawaloka.jpeg"),
      },
      {
        name: "Monsoon Colombo",
        image: require("../assets/monsoon.jpeg"),
      },
    ],
  },
  {
    id: 3,
    name: "Kandy",
    imageURL: require("../assets/kandy.png"),
    latitude: 7.2906,
    longitude: 80.6337,
    hotels: [
      {
        name: "Earl's Regency",
        number: "Stay 1",
        image: require("../assets/earls.jpeg"),
      },
      {
        name: "The Grand Kandyan",
        number: "Stay 2",
        image: require("../assets/kandyan.jpeg"),
      },
    ],
    vibe: "Cultural",
    temp: 25,
  },
  {
    id: 4,
    name: "Galle",
    imageURL: require("../assets/galle.png"),
    latitude: 6.0321,
    longitude: 80.217,
    hotels: [
      {
        name: "Jetwing Lighthouse",
        number: "Stay 1",
        image: require("../assets/lighthouse.jpeg"),
      },
      {
        name: "Amari Galle",
        number: "Stay 2",
        image: require("../assets/amari.jpeg"),
      },
    ],
    vibe: "Historic",
    temp: 28,
  },
];
