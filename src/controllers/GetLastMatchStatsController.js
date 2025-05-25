import { GetLastMatchStats } from "../services/GetLastMatchStats.js";

class GetLastMatchStatsController {
    async handle(request, response) {
        const getLastMatchStats = new GetLastMatchStats();

        const matchStats = await getLastMatchStats.execute(request.query);

        return response.json(matchStats);
    }
}

export { GetLastMatchStatsController };
