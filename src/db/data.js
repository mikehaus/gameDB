export const TEST_GAME = {
  uid: 41494,
  status: "inProgress",
  title: "Cyberpunk 2077",
  background_image:
    "https://media.rawg.io/media/crop/600/400/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
  rawg_id: 41494,
  metacritic: 73,
  notes: "",
};

export const TEST_GAME_2 = {
  uid: 58175,
  status: "toDo",
  title: "God of War",
  rawg_id: 58175,
  metacritic: 94,
  background_image:
    "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
  notes: "",
};

export const TEST_GAME_3 = {
  uid: 326243,
  status: "toDo",
  title: "Elden Ring",
  background_image:
    "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg",
  rawg_id: 326243,
  metacritic: 95,
  notes: "Cool game!",
};

export const TEST_GAME_4 = {
  uid: 799265,
  status: "completed",
  title: "The Last of Us Part 1",
  background_image:
    "https://media.rawg.io/media/crop/600/400/games/71d/71df9e759b2246f9769126c98ac997fc.jpg",
  rawg_id: 799265,
  metacritic: 89,
  notes: "",
};

const seedData = [TEST_GAME];

// todo: look at putting in a map for efficient retrieval
export const INITIAL_DATA = {
  games: {
    games: seedData,
    todo: [],
    inProgress: seedData,
    completed: [],
    archived: [],
  },
};
