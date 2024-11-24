(If you Are viewing this on Apify, please go to the [GitHub Repository](https://github.com/Luna-BLox/Luna-Crawler) instead.)

# Luna Crawler
Luna Crawler is a web crawler for Roblox. It is built using the [Crawlee](https://github.com/apify/crawlee) framework in Node CommonJS (CJS).

## Usage
All you need to do is run these commands:

```shell
git clone https://github.com/Luna-BLox/Luna-Crawler.git
cd Luna-Crawler
npm run start
```

And then you're done 🎉
## Support
| Device | Supported |
|--|--|
| Windows |✅|
| Mac OS | ✅|
| Linux | ✅|

Don't have a high end PC? No problem! You can use the [Apify Cloud](https://apify.com/lunablox/luna-crawler?fpr=lcvev) to run the crawler for you.

## Supported Scrapes

- [x] Charts (Discovery)
- [x] [Games](#game-example)
- [x] [Communities](#community-example) (Groups)
- [x] [Badges](#badge-example)
- [x] [Users](#user-example)
- [ ] Games/User Search

> [!CAUTION]
> These schemas aren't final and can be changed at any time!

### Game Example
```json
{
	"type": "game",
	"title": "Example Game",
	"description": "Example Game Description",
	"creator": "Community or Roblox User",
	"creatorUrl": "Roblox User or Community Url",
	"likes": 12345678,
	"dislikes": 12345678,
	"active": "1,234",
	"favorites": "1,234",
	"visits": "99.9K+",
	"voicechat": "Not Supported",
	"camera": "Not Supported",
	"created": "1/1/2024",
	"updated": "1/1/2024",
	"serversize": 12345678,
	"genre": "N/A",
	"subgenre": "N/A"
}
```
- [x] Name
- [x] Author
- [ ] Maturity Level
- [ ] Thumbnails 
- [x] Likes
- [x] Dislikes
- [x] Description
- [x] Active
- [x] Favorites
- [x] Visits
- [x] Voice Chat Support
- [x] Camera Support
- [x] Created
- [x] Updated
- [x] Server Size
- [x] Genre & Subgenre
- [ ] Social Links
- [ ] Badges
- [ ] Events
- [ ] Store (Subscription and Gamepasses)

### Community Example
```json
{
	"type": "community",
	"url": "https://www.roblox.com/communities/12345678/Example#!/about",
	"name": "Example Community",
	"creator": "RobloxUser",
	"creatorUrl": "https://www.roblox.com/users/1234567890/profile",
	"members": 1234567890,
	"description": "Example Community",
	"roles": [
		{
			"name": "Member",
			"assigned": "1k+"
		},
		{
			"name": "Owner",
			"assigned": "1"
		},
		...
	],
	"games": [
		{
		"name": "Example Game",
			"url": "https://www.roblox.com/games/refer?PlaceId=1234567890"
		},
		{
		"name": "Another Example Game",
			"url": "https://www.roblox.com/games/refer?PlaceId=1234567890"
		},
		...
	]
}
```

- [x] Name
- [x] Creator
- [x] Member count
- [x] Description
- [x] Roles
- [x] Games
- [ ] Social Links
- [ ] Events
- [ ] Store
- [ ] Affiliates

### Badge Example
```json
{
	"type": "badge",
	"url": "https://www.roblox.com/badges/1234567890/Example-Badge",
	"name": "Example Badge",
	"creator": "Roblox User",
	"game": "Example Game",
	"gameUrl": "https://www.roblox.com/games/refer?PlaceId=1234567890"
}
```

- [x] Name
- [ ] Author (50% - Missing Author URL)
- [x] Updated
- [x] Description
- [x] Game

### User Example
```json
{
	"type": "user",
	"url": "https://www.roblox.com/users/1234567890/profile/",
	"pfp": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot...",
	"displayName": "Roblox User",
	"username": "@robloxuser",
	"friends": 123,
	"followers": 1234567,
	"following": 1234567,
	"about": "Example About"
}
```
- [x] Display name
- [x] username
- [x] Friend Count
- [x] Follower Count
- [x] Following Count
- [x] About/Description
- [ ] Creations
- [ ] Currently Wearing
- [ ] Friends
- [ ] Communities
- [ ] Favorites
- [ ] Roblox Badges
- [ ] Badges
- [ ] Statistics

> [!NOTE] 
> If you want to help out, please don't hesitate to [clone the repository](#usage) and create a [Pull Request](https://github.com/Luna-BLox/Luna-Crawler/pulls).