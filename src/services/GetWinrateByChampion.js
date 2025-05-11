import { OPGGWebscraper } from "../adapters/OPGGWebscraper.js";
import { championsIds } from "../common/ChampionsID.js";

class GetChampionWinrate {
    async execute({ username, tagline, searchedChampion }) {
        const mappedSearchedChampion = Object.keys(championsIds).find((key) =>
            key.includes(searchedChampion.toUpperCase())
        );

        const opggWebscraper = new OPGGWebscraper();
        const playerStats = await opggWebscraper.getChampionWinrate(
            username,
            tagline,
            mappedSearchedChampion
        );

        return playerStats;
    }
}

export { GetChampionWinrate };
