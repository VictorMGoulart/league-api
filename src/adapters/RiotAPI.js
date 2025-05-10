import axios from "axios";
import { getTimerInMinutes } from "../commons/get-timer-in-minutes.mjs";
import { multikillMapper } from "../commons/multikill.mjs";
import { RIOT_API_URL } from "../constants.mjs";

const axiosConfig = {
    headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
    },
};

export class RiotAPI {
    constructor() {}

    async getPUUID(username, tagline) {
        try {
            const responseUser = await axios.get(
                `https://americas.${RIOT_API_URL}/riot/account/v1/accounts/by-riot-id/${username}/${tagline}`,
                axiosConfig
            );

            return responseUser.data.puuid;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async getEncryptedSummonerID(puuid, region = "br1") {
        try {
            const responseUser = await axios.get(
                `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
                axiosConfig
            );

            return responseUser.data[0].summonerId;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async getRank(username, tagline, region = "br1") {
        try {
            const puuid = await this.getPUUID(username, tagline);

            const {
                data: [summonerStats],
            } = await axios.get(
                `https://${region}.${RIOT_API_URL}/lol/league/v4/entries/by-puuid/${puuid}`,
                axiosConfig
            );

            if (!summonerStats || summonerStats?.status?.status_code) {
                return;
            }

            const responseData = {
                wins: summonerStats.wins,
                losses: summonerStats.losses,
                winrate:
                    Math.round(
                        (summonerStats.wins /
                            (summonerStats.wins + summonerStats.losses)) *
                            100 *
                            100
                    ) /
                        100 +
                    "%",
                rank: `${summonerStats.tier} ${summonerStats.rank}`,
                leaguePoints: summonerStats.leaguePoints,
                gamesPlayed: summonerStats.wins + summonerStats.losses,
            };

            return responseData;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async getLastMatchStats(username, tagline) {
        try {
            const puuid = await this.getPUUID(username, tagline);

            const {
                data: [lastGameID],
            } = await axios.get(
                `https://americas.${RIOT_API_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`,
                axiosConfig
            );

            if (!lastGameID || lastGameID?.status?.status_code) {
                return;
            }

            const { data: gameStats } = await axios.get(
                `https://americas.${RIOT_API_URL}/lol/match/v5/matches/${lastGameID}`,
                axiosConfig
            );

            if (!gameStats || gameStats?.status?.status_code) {
                return;
            }

            const playerStats = gameStats.info.participants.filter(
                (participant) => participant.puuid === puuid
            )[0];

            const creepScore =
                playerStats.neutralMinionsKilled +
                playerStats.totalMinionsKilled;

            const responseData = {
                kills: playerStats.kills,
                deaths: playerStats.deaths,
                assists: playerStats.assists,
                result: playerStats.win ? "WIN" : "LOSE",
                champion: playerStats.championName,
                largestMultikill: multikillMapper[playerStats.largestMultiKill],
                creepScore: creepScore,
                matchDuration: getTimerInMinutes(
                    playerStats.challenges.gameLength
                ),
                enemyVisionPings: playerStats.enemyVisionPings,
            };

            return responseData;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
