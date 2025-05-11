import axios from "axios";
import { championsIds } from "../common/ChampionsID.js";

const OPGGHeaders = {
    headers: {
        accept: "*/*",
        "accept-language": "pt-BR,pt;q=0.9",
        rsc: "1",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        cookie: "_olvt=true; _ol=en_US; _opvc=10; _dd_s=rum=0&expire=1746378583790",
        "Referrer-Policy": "no-referrer-when-downgrade",
        "Cache-Control": "no-cache",
    },
};

export class OPGGWebscraper {
    constructor() {}

    async getChampionWinrate(username, tagline, searchedChampion) {
        const response = await axios.get(
            `https://op.gg/lol/summoners/br/${username}-${tagline}/champions?queue_type=SOLORANKED`,
            OPGGHeaders
        );

        const scrapedData = JSON.parse(
            response.data.match(/\{"data":\{"game_type":".*?"year":2025\}/s)
        )?.data;

        if (!scrapedData) {
            return;
        }

        const championStats = scrapedData.my_champion_stats;

        for (const stats of championStats) {
            if (stats.id === championsIds[searchedChampion.toUpperCase()]) {
                return {
                    wins: stats.win,
                    loses: stats.lose,
                    winrate: Math.round(stats.win_rate) + "%",
                    kills: stats.kda.kill,
                    assists: stats.kda.assist,
                    deaths: stats.kda.death,
                    kda: stats.kda.kda,
                    username,
                };
            }
        }

        return;
    }
}
