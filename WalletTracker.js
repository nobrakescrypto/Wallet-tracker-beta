import React, { useEffect, useState } from 'react';

const BECKER_WALLET = '0x8d7a4fBDc7C6C75E2d5F1946e325570c63E1e8e1'; // example

function WalletTracker() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchWalletData() {
      try {
        const response = await fetch(`https://api.covalenthq.com/v1/eth-mainnet/address/${BECKER_WALLET}/balances_v2/?key=ckey_demo`);
        const data = await response.json();
        setTokens(data.data.items);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
      }
    }

    fetchWalletData();
  }, []);

  return (
    <div>
      <h2>Token Holdings</h2>
      <ul>
        {tokens.map((token) => (
          <li key={token.contract_address}>
            {token.contract_name}: {parseFloat(token.balance / Math.pow(10, token.contract_decimals)).toFixed(2)} {token.contract_ticker_symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WalletTracker;
