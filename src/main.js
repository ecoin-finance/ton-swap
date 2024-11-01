import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Importando as bibliotecas necessárias
import { TonClient, toNano } from "@ton/ton"; //https://cdn.jsdelivr.net/npm/@ton/ton/dist/index.js
import { DEX, pTON } from "@ston-fi/sdk";

// Verificando o conteúdo de DEX
console.log("DEX:", DEX);

(async () => {
    try {
        // Inicializando o cliente
        const client = new TonClient({
            endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        });

        // Inicializando o router usando a versão v1
        const router = client.open(
            DEX.v2_1.Router.create(
                "kQALh-JBBIKK7gr0o4AVf9JZnEsFndqO0qTCyT-D-yBsWk0v" // CPI Router v1
            )
        );

        // Inicializando o proxy para pTON usando a versão v1
        const proxyTon = pTON.v2_1.create(
            "kQACS30DNoUQ7NfApPvzh7eBmSZ9L4ygJ-lkNWtba8TQT-Px" // pTON v1
        );

        // Definindo os parâmetros da transação de swap
        const userWalletAddress = "UQBry_ewauy7EZ8UzqQwAkQY4T402qNlvyUYyldsE4XhY-xy"; 
        const txParams = await router.getSwapTonToJettonTxParams({
            userWalletAddress: userWalletAddress,
            proxyTon: proxyTon,
            offerAmount: toNano("1"), // 1 TON
            askJettonAddress: "kQDLvsZol3juZyOAVG8tWsJntOxeEZWEaWCbbSjYakQpuYN5", // TestRED
            minAskAmount: "1", // Não menos que 1 nano TestRED
            queryId: 12345,
        });

        console.log("Transaction Parameters:", txParams);


        // Send tx
        //const result = await client.net.sendTransaction(txParams);
        //console.log("Transaction Result:", result);
        // console.log("Transaction Result:", result);


    } catch (error) {
        console.error("Erro:", error);
    }
})();