// api.js
const API_KEY = 'X1BIWGNJ3XROFOZB';  // Remplace par ta clé API

// Fonction pour récupérer le prix actuel d'un ETF
export async function fetchEtfPrice(symbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json();
        
        if (!data["Global Quote"] || !data["Global Quote"]["05. price"]) {
            throw new Error(`Données non disponibles pour le symbole: ${symbol}`);
        }

        return {
            currentPrice: parseFloat(data["Global Quote"]["05. price"]),
            dailyChange: parseFloat(data["Global Quote"]["10. change percent"]),
        };
    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error);
        return null;
    }
}
