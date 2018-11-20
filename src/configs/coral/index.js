const CoralConfig = {
  gasLimitSuggestion: 400000,
  safeSendScoreThreshold: 20,
  safeSendEscrowContractAddress: '0x1a11A79adf8F33E425be7916bC27aDd5072f2744',
  safeSendEscrowContractAbi: [
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_tokenAddress",
  				"type": "address"
  			},
  			{
  				"name": "_recipient",
  				"type": "address"
  			},
  			{
  				"name": "_amount",
  				"type": "uint256"
  			}
  		],
  		"name": "rescueOrphanedTokens",
  		"outputs": [
  			{
  				"name": "_success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_tokenAddress",
  				"type": "address"
  			},
  			{
  				"name": "_recipient",
  				"type": "address"
  			},
  			{
  				"name": "_amount",
  				"type": "uint256"
  			}
  		],
  		"name": "rescueApprovedTokens",
  		"outputs": [
  			{
  				"name": "_success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "recoverer",
  		"outputs": [
  			{
  				"name": "",
  				"type": "address"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [
  			{
  				"name": "_recoverer",
  				"type": "address"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "constructor"
  	}
  ]
};

export { CoralConfig };
