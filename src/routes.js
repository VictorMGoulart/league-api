import { Router } from "express";
import { GetAccountRankController } from "./controllers/GetAccountRankController";
import { GetWinrateByChampionController } from "./controllers/GetWinrateByChampionController";

const router = Router();

const getAccountRank = new GetAccountRankController();
const getWinrateByChampion = new GetWinrateByChampionController();

router.get("/get-account-rank", getAccountRank.handle);
router.get("/get-winrate-by-champion", getWinrateByChampion.handle);

export { router };
