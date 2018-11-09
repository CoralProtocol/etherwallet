const CoralConfig = {
  gasLimitSuggestion: 400000,
  safeSendScoreThreshold: 2,
  safeSendEscrowContractAddress: '0x45ff795bd14c45493258b0863e600ff515d3963b',
  safeSendEscrowContractAbi: [
    {
      constant: true,
      inputs: [],
      name: 'active',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'provider',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_tokenAddress',
          type: 'address'
        },
        {
          name: '_recipient',
          type: 'address'
        },
        {
          name: '_amount',
          type: 'uint256'
        }
      ],
      name: 'rescueOrphanedTokens',
      outputs: [
        {
          name: '_success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getMargin',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'withdrawProfits',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newMinFee',
          type: 'uint256'
        }
      ],
      name: 'updateMinimumFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newMaxFee',
          type: 'uint256'
        }
      ],
      name: 'updateMaximumFee',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'MIN_GAS_DELIVER',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_newFeeRate',
          type: 'uint256'
        }
      ],
      name: 'updateFeeRate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'minFeeInWei',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'MIN_GAS_WITHDRAWAL',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_tokenAddress',
          type: 'address'
        },
        {
          name: '_recipient',
          type: 'address'
        },
        {
          name: '_amount',
          type: 'uint256'
        }
      ],
      name: 'rescueApprovedTokens',
      outputs: [
        {
          name: '_success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'feeRate',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_amount',
          type: 'uint256'
        }
      ],
      name: 'calculateFee',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'maxFeeInWei',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'MIN_GAS_DEPOSIT',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'recoverer',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'partner',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCurrentProfit',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_escrowId',
          type: 'bytes32'
        }
      ],
      name: 'getEscrow',
      outputs: [
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'uint256'
        },
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          name: '_provider',
          type: 'address'
        },
        {
          name: '_partner',
          type: 'address'
        },
        {
          name: '_providerMargin',
          type: 'uint256'
        },
        {
          name: '_minFeeInWei',
          type: 'uint256'
        },
        {
          name: '_maxFeeInWei',
          type: 'uint256'
        },
        {
          name: '_feeRate',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_id',
          type: 'bytes32'
        }
      ],
      name: 'LogEscrowDeposit',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_id',
          type: 'bytes32'
        }
      ],
      name: 'LogEscrowWithdrawal',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_id',
          type: 'bytes32'
        }
      ],
      name: 'LogEscrowTransfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_time',
          type: 'uint256'
        }
      ],
      name: 'LogDepositsPaused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_time',
          type: 'uint256'
        }
      ],
      name: 'LogDepositsUnpaused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_minFee',
          type: 'uint256'
        },
        {
          indexed: false,
          name: '_time',
          type: 'uint256'
        }
      ],
      name: 'LogMinimumFeeUpdated',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_maxFee',
          type: 'uint256'
        },
        {
          indexed: false,
          name: '_time',
          type: 'uint256'
        }
      ],
      name: 'LogMaximumFeeUpdated',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_feeRate',
          type: 'uint256'
        },
        {
          indexed: false,
          name: '_time',
          type: 'uint256'
        }
      ],
      name: 'LogFeeRateUpdated',
      type: 'event'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_recipient',
          type: 'address'
        },
        {
          name: '_threshold',
          type: 'uint256'
        }
      ],
      name: 'deposit',
      outputs: [
        {
          name: '',
          type: 'bytes32'
        }
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_escrowId',
          type: 'bytes32'
        }
      ],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_escrowId',
          type: 'bytes32'
        },
        {
          name: '_relay',
          type: 'bool'
        }
      ],
      name: 'deliver',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_escrowId',
          type: 'bytes32'
        }
      ],
      name: 'viewEscrowProvider',
      outputs: [
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'uint256'
        },
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '_escrowId',
          type: 'bytes32'
        }
      ],
      name: 'viewEscrowUser',
      outputs: [
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'address'
        },
        {
          name: '',
          type: 'uint256'
        },
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'pauseDeposits',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'unpauseDeposits',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getEscrowCount',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ]
};

export { CoralConfig };
