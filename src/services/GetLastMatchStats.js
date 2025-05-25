import { RiotAPI } from "../adapters/RiotAPI.js";

class GetLastMatchStats {
    async execute({ username, tagline }) {
        const riotAPI = new RiotAPI();
        const gameStats = await riotAPI.getLastMatchStats(username, tagline);

        return gameStats;
    }
}

export { GetLastMatchStats };
