import { Router } from "express";
import { GetAccountRankController } from "./controllers/GetAccountRankController.js";
import { GetChampionWinrateController } from "./controllers/GetChampionWinrateController.js";
import { GetLastMatchStatsController } from "./controllers/GetLastMatchStatsController.js";

const router = Router();

const getAccountRank = new GetAccountRankController();
const getChampionWinrate = new GetChampionWinrateController();
const getLastMatchStats = new GetLastMatchStatsController();

router.get("/get-account-rank", getAccountRank.handle);
router.get("/get-champion-winrate", getChampionWinrate.handle);
router.get("/get-last-match-stats", getLastMatchStats.handle);

export { router };
