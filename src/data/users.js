export const users = [
  {
    id: 1,
    name: 'Luka',
    handle: 'LukaBrujah',
    gamerscore: 1245,
    level: 18,
    gamesCount: 24,
    achievementsCount: 38,
    friendsCount: 127,
    following: 45,
    followers: 41,
    bio: 'Explorando mundos, desbloqueando tudo o que aparece no caminho.',
    status: 'online',
    currentGameId: 1,
    isCurrentUser: true,
    avatarColors: ['#12322A', '#8BF000'],
    initials: 'LK',
  },
  {
    id: 2,
    name: 'Lucas',
    handle: 'LucasNova',
    gamerscore: 980,
    level: 14,
    gamesCount: 19,
    achievementsCount: 31,
    friendsCount: 86,
    status: 'online',
    currentGameId: 1,
    avatarColors: ['#1A2438', '#6C7CFF'],
    initials: 'LC',
  },
  {
    id: 3,
    name: 'Marina',
    handle: 'MarinaDrift',
    gamerscore: 1120,
    level: 16,
    gamesCount: 21,
    achievementsCount: 34,
    friendsCount: 94,
    status: 'online',
    currentGameId: 3,
    avatarColors: ['#3A1230', '#FF4FD8'],
    initials: 'MR',
  },
  {
    id: 4,
    name: 'Rafael',
    handle: 'RafaEcho',
    gamerscore: 760,
    level: 11,
    gamesCount: 15,
    achievementsCount: 22,
    friendsCount: 58,
    status: 'online',
    currentGameId: null,
    avatarColors: ['#2A1A08', '#E8B84A'],
    initials: 'RF',
  },
  {
    id: 5,
    name: 'Camila',
    handle: 'CamiSiege',
    gamerscore: 1340,
    level: 20,
    gamesCount: 27,
    achievementsCount: 48,
    friendsCount: 141,
    status: 'away',
    currentGameId: 2,
    avatarColors: ['#102418', '#A6FF2A'],
    initials: 'CM',
  },
  {
    id: 6,
    name: 'Adrielle',
    handle: 'AdriQuest',
    gamerscore: 890,
    level: 13,
    gamesCount: 17,
    achievementsCount: 26,
    friendsCount: 73,
    status: 'online',
    currentGameId: 8,
    avatarColors: ['#24102A', '#E26BFF'],
    initials: 'AD',
  },
  {
    id: 7,
    name: 'Denis',
    handle: 'DenisForge',
    gamerscore: 430,
    level: 7,
    gamesCount: 9,
    achievementsCount: 12,
    friendsCount: 34,
    status: 'offline',
    lastSeen: 'Há 6 horas',
    currentGameId: null,
    avatarColors: ['#201010', '#FF7A18'],
    initials: 'DN',
  },
  {
    id: 8,
    name: 'Caike',
    handle: 'CaikeOrbit',
    gamerscore: 610,
    level: 9,
    gamesCount: 12,
    achievementsCount: 18,
    friendsCount: 41,
    status: 'offline',
    lastSeen: 'Há 3 dias',
    currentGameId: 7,
    avatarColors: ['#101828', '#4DA3FF'],
    initials: 'CK',
  },
];

export const currentUser = users.find((user) => user.isCurrentUser);

export function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}

export function searchUsers(query) {
  const term = query.trim().toLowerCase();
  if (!term) return users;
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.handle.toLowerCase().includes(term)
  );
}

export const friends = users.filter((user) => !user.isCurrentUser);
