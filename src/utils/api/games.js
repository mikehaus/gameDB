/** FILE TO SIMULATE API FUNCTIONS TO UPDATE DB DATA
 * NOTE: In real project I'd replace this with a server and do this implementation stuff on the backend.
 * It would also be broken up by gets/puts or queries and mutations
 */

export function getGameByUid(uid, gameArr) {
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].uid === uid) return gameArr[i];
  }
  return null;
}

export function addGame(game, gameArr) {
  gameArr.push(game);
  return gameArr;
}

export function updateGame(game, gameArr) {
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i].uid === game.uid) {
      gameArr.splice(i, 1, game);
      return gameArr;
    }
  }
}

export function deleteGame(game, gameArr) {
  return gameArr.filter((g) => g.uid !== game.uid);
}

export function getGamesByStatus(gameArr, status) {
  return gameArr.filter((game) => game.status === status);
}
