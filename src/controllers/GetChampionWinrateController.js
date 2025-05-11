import { GetChampionWinrate } from "../services/GetWinrateByChampion.js";

class GetChampionWinrateController {
    async handle(request, response) {
        const getWinrateOnChampion = new GetChampionWinrate();

        const playerStats = await getWinrateOnChampion.execute(request.query);

        return response.json(playerStats);
    }
}

export { GetChampionWinrateController };
