import { GetAccountRank } from "../services/GetAccountRank.js";

class GetAccountRankController {
    async handle(request, response) {
        const getAccountRank = new GetAccountRank();

        const accountData = await getAccountRank.execute(request.query);

        return response.json(accountData);
    }
}

export { GetAccountRankController };
