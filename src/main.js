import { PlaywrightCrawler, Dataset } from "crawlee";
import { Actor } from 'apify'

await Actor.init();

const inputs = await Actor.getInput()
const startUrls = inputs?.startUrls || ["https://www.roblox.com/charts/?device=all&country=all"]
const enqueAuthors = inputs?.enqueAuthors || false

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, enqueueLinks, log }) {
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/charts/")) {
      const gameLinks = await page.$$eval(".game-card-link", (elements) =>
        elements.map((el) => el.href)
      );
      log.info(`Gathered ${gameLinks.length} game links.`);
      for (const link of gameLinks) {
        await crawler.addRequests([link]);
      }
    } else if (page.url().includes("/games/")) {
      const gameInfo = await page.evaluate(() => {
        return {
          type: "game",
          title: document
            .querySelector(".game-title-container h1")
            ?.textContent?.trim(),
          description: document
            .querySelector(".game-description")
            ?.textContent?.trim(),
          creator: document
            .querySelector(".game-creator a")
            ?.textContent?.trim(),
          creatorUrl: document.querySelector(".game-creator a")?.href,
          likes: Number(document.querySelector("#vote-up-text")?.title?.trim()),
          dislikes: Number(
            document.querySelector("#vote-down-text")?.title?.trim()
          ),
          active: document
            .querySelectorAll(".game-stat")[0]
            ?.childNodes[1]?.textContent?.trim(),
          favorites: document
            .querySelectorAll(".game-stat")[1]
            ?.childNodes[1]?.textContent?.trim(),
          visits: document
            .querySelectorAll(".game-stat")[2]
            ?.childNodes[1]?.textContent?.trim(),
          voicechat: document
            .querySelectorAll(".game-stat")[3]
            ?.childNodes[1]?.textContent?.trim(),
          camera: document
            .querySelectorAll(".game-stat")[4]
            ?.childNodes[1]?.textContent?.trim(),
          created: document
            .querySelectorAll(".game-stat")[5]
            ?.childNodes[1]?.textContent?.trim(),
          updated: document
            .querySelectorAll(".game-stat")[6]
            ?.childNodes[1]?.textContent?.trim(),
          serversize: Number(document
            .querySelectorAll(".game-stat")[7]
            ?.childNodes[1]?.textContent?.trim()),
          genre: document
            .querySelectorAll(".game-stat")[8]
            ?.childNodes[1]?.textContent?.trim(),
          subgenre: document
            .querySelectorAll(".game-stat")[9]
            ?.childNodes[1]?.textContent?.trim() || "N/A",
        };
      });
      await Dataset.pushData(gameInfo);
      if (enqueAuthors) {
        if (gameInfo.creatorUrl.includes("/groups/")) {
          log.info("Added Creator Group (Migration to Communities) to queue");
          await crawler.addRequests([gameInfo.creatorUrl]);
        } else if (gameInfo.creatorUrl.includes("/users/")) {
          log.info("Added Creator User to queue");
          await crawler.addRequests([gameInfo.creatorUrl]);
        }
      }
      
      log.info(`Scraped game: ${gameInfo.title}`);
    } else if (page.url().includes("/users/")) {
      const userInfo = await page.evaluate(() => {
        return {
            type: "user",
            url: window.location.href,
            pfp: document.querySelector(".avatar-card-image").children[0]?.src,
            displayName: document.querySelector(".profile-name")?.textContent?.trim(),
            username: document.querySelector(".profile-display-name")?.textContent?.trim(),
            friends: Number(document.querySelector(".details-info").children[0]?.children[1]?.children[0]?.title?.trim()),
            followers: Number(document.querySelector(".details-info").children[1]?.children[1]?.children[0]?.title?.trim()),
            following: Number(document.querySelector(".details-info").children[2]?.children[1]?.children[0]?.title?.trim()),
            about: document.querySelector(".profile-about-content-text")?.textContent?.trim(),
        }
      })
      await Dataset.pushData(userInfo);
      log.info(`Scraped user: ${userInfo.username}`);
    } else if (page.url().includes("/communities/")) {
      const communityInfo = await page.evaluate(() => {
        const games = [];
        const roles = [];

        document.querySelectorAll("group-games-item").forEach((game) => {
          games.push({
            name: game.querySelector(".game-card-name")?.textContent?.trim(),
            url: game.childNodes[0]?.childNodes[1]?.href,
          });
        });

        document.querySelectorAll("ul")[9].children.forEach((role) => {
            roles.push({
                name: role.children[0]?.children[0]?.textContent,
                assigned: role.children[0]?.children[1]?.textContent || "0",
            })
        });
        return {
          type: "community",
          url: window.location.href,
          name: document.querySelectorAll(".group-name")[1]?.textContent?.trim(),
          creator: document.querySelectorAll(".group-owner")[1].childNodes[4]?.textContent?.trim(),
          creatorUrl:
          document.querySelectorAll(".group-owner")[1].childNodes[4]?.href,
          members: Number(document.querySelector(".group-members").childNodes[1]?.title?.trim()),
          description: document
            .querySelector(".group-description-content-text")
            ?.textContent?.trim(),
          roles,
          games,
        };
      });
      await Dataset.pushData(communityInfo);
      log.info(`Scraped community (Formerly Groups): ${communityInfo.name}`);
      if (enqueAuthors) {
        if (communityInfo.creatorUrl.includes("/users/")) {
          log.info("Added Creator User to queue");
          await crawler.addRequests([communityInfo.creatorUrl]);
        }
      }
    } else if (page.url().includes("/badges/")) {
      const badgeInfo = await page.evaluate(() => {
        return {
            type: "badge",
            url: window.location.href,
            name: document.querySelector(".item-name-container").children[0]?.textContent?.trim(),
            creator: document.querySelector(".item-name-container")?.children[2]?.children[0]?.textContent?.replace("By ", "")?.trim(),
            game: document.querySelector(".asset-info")?.children[0]?.textContent?.replace("Earn this Badge in: ", "")?.trim(),
            gameUrl: document.querySelector(".asset-info").children[0]?.children[0]?.href,
        }
      })
      await Dataset.pushData(badgeInfo);
      log.info(`Scraped badge: ${badgeInfo.name}`);
    }
  },
  headless: true, // Enable headless mode to run the crawler in the background
});

await crawler.run(startUrls);
