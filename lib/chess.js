

export async function getChessStats() {

    const res = await fetch('https://api.chess.com/pub/player/tartturnip/stats');
    return res.json();
}