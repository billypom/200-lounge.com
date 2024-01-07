# 200-lounge.com
Leaderboard for MK8DX 200cc Lounge.

# API

## Player leaderboard data
Retrieve leaderboard stats with the following endpoints

- `/api/discord/[DISCORD_USER_ID]`
- `/api/player/[PLAYER_NAME]`

### Example:

#### `/api/discord/166818526768791552` or 
#### `/api/player/popuko`

```
[
    {
        "player_id":"166818526768791552",
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
        "rank_name":"Iron"
    }
]
```

## Player data
Useful for MKC staff team to check for player bans - `unban_date` is a Unix timestamp
- `/api/mkc/[MKC_FORUM_ID]`

### Example:

#### `/api/mkc/154`

```
[
    {
        "mkc_id":154,
        "player_id":"166818526768791552",
        "player_name":"popuko",
        "country_code":"US",
        "unban_date":null
    }
]
```

## All players
Useful for [MogiBot](https://255mp.github.io/) caching.
- `/api/all_players`

### Example:

#### `/api/all_players`

```
[
    {
        "player_id":71024311338536960,
        "player_name":"mustea",
        "mmr":null
    },
    {
        "player_id":71153366322913280,
        "player_name":"LawrySauce",
        "mmr":null
    },
    {
        "player_id":"80838419575484416",
        "player_name":"royal",
        "mmr":2286
    },
    {
        "player_id":"82703095506669568",
        "player_name":"Tyler",
        "mmr":2199
    },
    ...
]
```

### Credits

[Menu Icon](https://icons8.com/icon/59832/menu) by [Icons8](https://icons8.com)