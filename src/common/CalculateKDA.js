export function calculateKDA(kills, deaths, assists) {
    return Number((kills + assists) / deaths).toFixed(2);
}
