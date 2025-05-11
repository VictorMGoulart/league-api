import { Router } from "express";
import { GetAccountRankController } from "./controllers/GetAccountRankController.js";
import { GetChampionWinrateController } from "./controllers/GetChampionWinrateController.js";

const router = Router();

const getAccountRank = new GetAccountRankController();
const getChampionWinrate = new GetChampionWinrateController();

router.get("/get-account-rank", getAccountRank.handle);
router.get("/get-champion-winrate", getChampionWinrate.handle);

export { router };
