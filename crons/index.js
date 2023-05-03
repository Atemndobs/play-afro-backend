import cron from "node-cron";
import { setMusicDailyRanking } from "./music-ranking";

cron.schedule("0 0 * * *", function () {
  console.log("cron job for every day at 12:00 AM");
  setMusicDailyRanking();
});

// cron.schedule("*/10 * * * * *", function () {
//   console.log("testing cron job");
//   setMusicDailyRanking();
// });
