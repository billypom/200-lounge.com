# [200-lounge.com](https://200-lounge.com/)
Leaderboard for MK8DX 200cc Lounge. See current standings, previous match results, statistics, and more.
![Leaderboard](https://i.imgur.com/kqlMvBL.png)

# 🧑‍💻 API

If you plan on using the API, it would be really awesome if you included a User-Agent header. ❤️

```py
# User-Agent header simple example
headers = {'User-Agent': 'YOUR_APP_NAME'}
response = requests.get('https://200-lounge.com/api/all_players', headers=headers)
response = response.json()
...
```

## 🔌 Player data
Retrieve leaderboard stats with the following endpoints

- `/api/discord/[DISCORD_USER_ID]`
- `/api/player/[PLAYER_NAME]`

### Example:
```js
async function apiRequest(url) {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
}

// Both of these will have the same output
apiRequest("https://200-lounge.com/api/player/popuko");
apiRequest("https://200-lounge.com/api/discord/166818526768791552");
```

```json
[
    {
        "player_id":"123456789123",
        "country_code":"US",
        "player_name":"popuko",
        "mmr":977,
        "peak_mmr":977,
        "win_rate":"0.00",
        "last_ten":"0-1",
        "gain/loss (last 10)":"-23",
        "events_played":1,
        "largest_gain":-23,
        "largest_loss":-23,
        "rank_name":"Iron",
        "unban_date":1704663797
    }
]
```

## 🔌 Player MKC data
Useful for MKC staff team to check for player bans. `unban_date` is a Unix timestamp
- `/api/mkc/[MKC_FORUM_ID]`

### Example:
```js
async function apiRequest() {
  const response = await fetch("https://200-lounge.com/api/mkc/154");
  const result = await response.json();
  console.log(result);
}

```


```json
[
    {
        "mkc_id":154,
        "player_id":"123456789123",
        "player_name":"popuko",
        "country_code":"US",
        "unban_date":1704663797
    }
]
```

## 🔌 All players / List of players
Returns every player or a set of players from the leadeboard. Useful for [MogiBot](https://255mp.github.io/) caching.

- `/api/all_players`
- `/api/all_players?player_id=123456789123`

### Example:
```js
async function apiRequest() {
  const response = await fetch("https://200-lounge.com/api/all_players");
  const result = await response.json();
  console.log(result);
}
```

```json
[
    {
        "player_id":123123123123,
        "player_name":"mustea",
        "mmr":null
    },
    {
        "player_id":456456456456,
        "player_name":"LawrySauce",
        "mmr":null
    },
    {
        "player_id":"789789789789",
        "player_name":"royal",
        "mmr":2286
    },
    ...
]
```

Pass `player_id` as a query parameter, as many times as you need, to get only a list of specific players.

### Example:
```js
async function apiRequest() {
  const response = await fetch("https://200-lounge.com/api/all_players?player_id=166818526768791552&player_id=219494120010416128");
  const result = await response.json();
  console.log(result);
}
```

```json
[
  {
    "player_id": "123456789123",
    "player_name": "popuko",
    "mmr": 977
  },
  {
    "player_id": "987654321987",
    "player_name": "JulianSMM",
    "mmr": 5482
  }
]
```



### Credits

[Menu Icon](https://icons8.com/icon/59832/menu) by [Icons8](https://icons8.com)
