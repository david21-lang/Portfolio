// main.js
import { fetchEtfPrice } from './api.js';

// Données initiales
const etfs = [
    { name: "ETF1", symbol: "CW8.PA", purchasePrice: 100, quantity: 10 },  // Remplace "SPY" par le symbole de ton ETF
    { name: "ETF2", symbol: "VHVE.L", purchasePrice: 150, quantity: 5 },
    { name: "ETF3", symbol: "PUST.PA", purchasePrice: 200, quantity: 8 }
];

// Fonction pour afficher les données sur la page
async function displayEtfData() {
    const tableBody = document.getElementById('etfTableBody');
    tableBody.innerHTML = '';  // Vide le contenu existant

    for (const etf of etfs) {
        const data = await fetchEtfPrice(etf.symbol);
        if (data) {
            // Calcul de la valeur totale actuelle et du gain/perte total
            const currentTotalValue = (data.currentPrice * etf.quantity).toFixed(2);
            const initialTotalValue = (etf.purchasePrice * etf.quantity).toFixed(2);
            const totalGain = (((currentTotalValue - initialTotalValue) / initialTotalValue) * 100).toFixed(2);

            // Création d'une nouvelle ligne dans le tableau
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${etf.name}</td>
                <td>${etf.purchasePrice} €</td>
                <td>${etf.quantity}</td>
                <td>${data.currentPrice.toFixed(2)} €</td>
                <td>${currentTotalValue} €</td>
                <td>${data.dailyChange.toFixed(2)} %</td>
                <td>${totalGain} %</td>
            `;
            tableBody.appendChild(row);
        } else {
            // Si les données ne sont pas disponibles, afficher une erreur dans le tableau
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${etf.name}</td>
                <td>${etf.purchasePrice} €</td>
                <td>${etf.quantity}</td>
                <td colspan="4">Données non disponibles</td>
            `;
            tableBody.appendChild(row);
        }
    }
}

// Appelle la fonction pour récupérer et afficher les données au chargement de la page
window.onload = displayEtfData;
