

export default async function getLichessData() {
    const res = await fetch(
        'https://lichess.org/api/account',
        {
            headers: {
                'Authorization': 'Bearer ' + process.env.LICHESS_API_TOKEN
            }
        }
    );
    return res.json();
}


