import { RiotAPI } from "../adapters/RiotAPI.js";

class GetAccountRank {
    async execute({ username, tagline }) {
        const riotAPI = new RiotAPI();
        const accountData = await riotAPI.getRank(username, tagline);

        return accountData;
    }
}

export { GetAccountRank };
