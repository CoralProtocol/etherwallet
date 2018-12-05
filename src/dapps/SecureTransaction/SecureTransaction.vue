<template>
  <div class="send-currency-container-safe-send">
    <interface-container-title :title="$t('common.sendSafeSendTx')" />

    <div class="send-form">
      <div class="form-block amount-to-address">
        <div class="amount">
          <div class="title">
            <h4>Amount</h4>
            <p
              class="title-button prevent-user-select"
              @click="setBalanceToAmt"
            >
              Entire Balance
            </p>
          </div>

          <div class="the-form amount-number">
            <input
              :value="amount"
              type="number"
              step="any"
              placeholder="Amount"
              @input="debouncedAmount"
            />
            <i
              :class="[
                  parsedBalance < amount || amount < minimumAmount
                    ? 'not-good'
                    : '',
                'fa fa-check-circle good-button'
              ]"
              aria-hidden="true"
            />
          </div>
          <div
            v-if="
              amount > parsedBalance
            "
            class="error-message-container"
          >
            <p>{{ $t('common.dontHaveEnough') }}</p>
          </div>
        </div>
        <div class="to-address">
          <div class="title">
            <h4>
              To Address
              <blockie
                v-show="validAddress && address.length !== 0"
                :address="
                  resolvedAddress !== ''
                    ? resolvedAddress.toLowerCase()
                    : address
                "
                :size="8"
                :scale="16"
                width="32px"
                height="32px"
                class="blockie-image"
              />
            </h4>

            <p
              class="copy-button prevent-user-select"
              @click="copyToClipboard('address');"
            >
              {{ $t('common.copy') }}
            </p>
          </div>
          <div class="the-form address-block">
            <textarea
              v-ens-resolver="address"
              ref="address"
              name="name"
              autocomplete="off"
              @input="debounceInput"
            />
            <i
              :class="[
                validAddress && address.length !== 0 ? '' : 'not-good',
                'fa fa-check-circle good-button'
              ]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <span class="minimum-amount-text"
        >Minimum amount: {{ minimumAmount }} ETH</span
      >
    </div>

    <div class="send-form">
      <div class="title-container">
        <div class="title">
          <div class="title-helper">
            <h4>{{ $t('common.speedTx') }}</h4>
            <popover :popcontent="$t('popover.whatIsSpeedOfTX')" />
          </div>
          <p>{{ $t('common.txFee') }}: {{ transactionFee }} ETH</p>
        </div>
        <div class="buttons">
          <div
            :class="[
              gasPrice === highestGas / 4 ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(highestGas / 4);"
          >
            {{ $t('common.slow') }}
          </div>
          <div
            :class="[
              gasPrice === highestGas / 2 ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(highestGas / 2);"
          >
            {{ $t('common.regular') }}
          </div>
          <div
            :class="[
              gasPrice === highestGas ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(highestGas);"
          >
            {{ $t('common.fast') }}
          </div>
        </div>
      </div>
      <div class="the-form gas-amount">
        <input v-model="gasAmount" type="number" placeholder="Gas Amount" />
        <div class="good-button-container">
          <p>Gwei</p>
          <i
            class="fa fa-check-circle good-button not-good"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <div class="send-form advanced">
      <div class="advanced-content">
        <div class="toggle-button-container">
          <h4>Advanced</h4>
          <div class="toggle-button">
            <span>Gas Limited</span>
            <!-- Rounded switch -->
            <div class="sliding-switch-white">
              <label class="switch">
                <input
                  type="checkbox"
                  @click="advancedExpend = !advancedExpend;"
                />
                <span class="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div v-if="advancedExpend" class="input-container">
          <div class="the-form user-input">
            <input
              v-model="gasLimit"
              :placeholder="$t('common.gasLimit')"
              type="number"
              name=""
            />
          </div>
        </div>
      </div>
      <div
        class="advanced-content safe-send-container"
      >
        <div class="toggle-button-container">
          <h4>Security Level</h4>
          <div class="toggle-button">
            <div class="buttons">
              <div
                :class="[
                  protectionLevel === 'low' ? 'active' : '',
                  'small-circle-button-green-border'
                ]"
                @click="protectionLevel = 'low';"
              >
                {{ $t('common.low') }}
              </div>
              <div
                :class="[
                  protectionLevel === 'high' ? 'active' : '',
                  'small-circle-button-green-border'
                ]"
                @click="protectionLevel = 'high';"
              >
                {{ $t('common.high') }}
              </div>
            </div>
          </div>
        </div>
        <div class="input-container">
          SafeSend is an escrow smart contract that protects your transaction
          from fraud and theft. To learn more about SafeSend, please
          <a
            target="_blank"
            href="http://storage.googleapis.com/safesend/index.html"
            >visit the information page</a
          >.
        </div>
      </div>
    </div>

    <div class="submit-button-container">
      <div>
        <i
          :class="[
            validNetwork ? '' : 'not-good',
            'fa fa-check-circle good-button'
          ]"
          aria-hidden="true"
        />
        You must use the mainnet network of your web3 provider (metamask, etc.) to use SafeSend.
      </div>
      <br />
      <div>
        Your estimated SafeSend Fee (in addition to gas):&nbsp;~{{
          safeSendPriceEstimate
        }}&nbsp;ETH
      </div>
      <br />
      <div
        :class="[
          validAddress && validAmount && validNetwork && address.length !== 0 ? '' : 'disabled',
          'submit-button large-round-button-green-filled'
        ]"
        @click="confirmationModalOpen"
      >
        Send Secured Transaction
      </div>
      <interface-bottom-text
        :link-text="$t('interface.learnMore')"
        :question="$t('interface.haveIssues')"
        link="mailto:support@myetherwallet.com"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InterfaceContainerTitle from '@/layouts/InterfaceLayout/components/InterfaceContainerTitle';
import { CoralConfig } from '@/configs/coral';
import InterfaceBottomText from '@/components/InterfaceBottomText';
import Blockie from '@/components/Blockie';
import normalise from '@/helpers/normalise';
import BigNumber from 'bignumber.js';
import * as unit from 'ethjs-unit';
import fetch from 'node-fetch';
import utils from 'web3-utils';

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'interface-bottom-text': InterfaceBottomText,
    blockie: Blockie
  },
  props: {
    tokensWithBalance: {
      type: Array,
      default: function() {
        return [];
      }
    },
    getBalance: {
      type: Function,
      default: function() {}
    },
    highestGas: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      protectionLevel: 'low',
      advancedExpend: false,
      validAmount: false,
      validNetwork: false,
      validAddress: false,
      minimumAmount: 0,
      amount: 0,
      safeSendPriceEstimate: 0,
      amountValid: true,
      nonce: 0,
      gasLimit: 21000,
      data: '0x',
      gasAmount: 0,
      parsedBalance: 0,
      address: '',
      transactionFee: 0,
      selectedCurrency: { symbol: 'ETH', name: 'Ethereum' },
      raw: {},
      signedTx: '',
      resolvedAddress: ''
    };
  },
  computed: {
    ...mapGetters({
      account: 'account',
      gasPrice: 'gasPrice',
      web3: 'web3',
      wallet: 'wallet',
      network: 'network',
      ens: 'ens'
    })
  },
  watch: {
    address(newVal) {
      this.address = newVal;
      if (this.verifyAddr()) {
        this.validAddress = false;
      } else {
        this.estimateGas();
        this.validAddress = true;
      }
    },
    amount(newVal) {
      const CoralSafeSendContract = new this.$store.state.web3.eth.Contract(
        CoralConfig.safeSendEscrowContractAbi,
        CoralConfig.safeSendEscrowContractAddress
      );
      const from = this.wallet.getAddressString();
      const gas = 100000;
      CoralSafeSendContract.methods.minFeeInWei().call({from, gas})
        .then(res => {
          this.minimumAmount = this.web3.utils.fromWei(res, 'ether');
          this.validAmount =  ((10 ** 18) * parseFloat(newVal, 10)) >= parseFloat(res, 10);
        })

    },
    parsedBalance(newVal) {
      this.parsedBalance = newVal;
    },
    gasAmount(newVal) {
      this.gasAmount = newVal;
      if (this.verifyAddr()) {
        this.estimateGas();
      }
      this.$store.dispatch('setGasPrice', Number(newVal));
    },
    selectedCurrency(newVal) {
      this.selectedCurrency = newVal;
      this.estimateGas();
    }
  },
  mounted() {
    const address = this.$store.state.wallet.getAddressString();

    this.web3.eth
      .getBalance(address)
      .then(res => {
        this.balance = this.web3.utils.fromWei(res, 'ether');
        this.$store.dispatch('setAccountBalance', this.balance);
        this.parsedBalance = this.balance;
        this.gasAmount = this.gasPrice;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
      this.web3.eth.net
        .getId()
        .then(res => {
          this.networkID = res;
          this.validNetwork = this.networkID === CoralConfig.chainID;
          console.log('mount me', this.networkID, CoralConfig.chainID, this.validNetwork)
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
      const CoralSafeSendContract = new this.$store.state.web3.eth.Contract(
        CoralConfig.safeSendEscrowContractAbi,
        CoralConfig.safeSendEscrowContractAddress
      );
      const from = this.wallet.getAddressString();
      const gas = 100000;
      CoralSafeSendContract.methods.minFeeInWei().call({from, gas})
        .then(res => {
          this.minimumAmount = this.web3.utils.fromWei(res, 'ether');
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
  },
  methods: {
    debouncedAmount: utils._.debounce(function(e) {
      this.amount = new BigNumber(e.target.value).decimalPlaces(18).toFixed();
      this.getSafeSendFee();
      if (this.verifyAddr()) {
        this.estimateGas();
      }
    }, 500),
    debounceInput: utils._.debounce(function(e) {
      this.address = normalise(e.target.value);
    }, 110),
    copyToClipboard(ref) {
      this.$refs[ref].select();
      document.execCommand('copy');
    },
    async createTx() {
      this.nonce = await this.$store.state.web3.eth.getTransactionCount(
        this.wallet.getAddressString(),
        'latest'
      );
      const value = this.amount === '' ? 0 : unit.toWei(this.amount, 'ether');
      const CoralSafeSendContract = new this.$store.state.web3.eth.Contract(
        CoralConfig.safeSendEscrowContractAbi,
        CoralConfig.safeSendEscrowContractAddress
      );
      const to =
        this.resolvedAddress !== '' ? this.resolvedAddress : this.address;
      const protectionLevel =
        CoralConfig[`${this.protectionLevel}Threshold`];
      const query = CoralSafeSendContract.methods['deposit'](
        to,
        protectionLevel
      );
      const encodedABI = query.encodeABI();
      const gasLimit =
        parseInt(this.gasLimit) > CoralConfig.gasLimitSuggestion
          ? this.gasLimit
          : CoralConfig.gasLimitSuggestion; // assures minimum gas is provided
      this.raw = {
        from: this.$store.state.wallet.getAddressString(),
        value: value,
        to: CoralConfig.safeSendEscrowContractAddress,
        nonce: this.nonce,
        gas: gasLimit,
        data: encodedABI,
        gasPrice: Number(unit.toWei(this.$store.state.gasPrice, 'gwei')),
        chainId: CoralConfig.chainID || 1
      };

      if (this.address === '') {
        delete this.raw['to'];
      }
      this.$store.state.web3.eth.sendTransaction(this.raw);
    },
    confirmationModalOpen() {
      this.createTx();
      window.scrollTo(0, 0);
    },
    changeGas(val) {
      this.gasAmount = val;
      this.createDataHex();
      this.$store.dispatch('setGasPrice', Number(val));
    },
    setBalanceToAmt() {
      this.amount = this.parsedBalance - this.transactionFee;
      this.getSafeSendFee();
    },
    createDataHex() {
      let amount;
      if (this.selectedCurrency.name !== 'Ethereum' && this.address !== '') {
        if (this.amount !== 0) {
          amount = this.amount;
        } else {
          amount = 0;
        }
        const jsonInterface = [
          {
            constant: false,
            inputs: [
              { name: '_to', type: 'address' },
              { name: '_amount', type: 'uint256' }
            ],
            name: 'transfer',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ];
        const contract = new this.web3.eth.Contract(
          jsonInterface,
          this.selectedCurrency.addr
        );
        this.data = contract.methods['minFeeInWei']
          .transfer(
            this.address,
            new BigNumber(amount)
              .times(new BigNumber(10).pow(this.selectedCurrency.decimals))
              .toFixed()
          )
          .encodeABI();
      } else {
        this.data = '0x';
      }
    },
    setSelectedCurrency(e) {
      this.selectedCurrency = e;
    },
    estimateGas() {
      const isEth = this.selectedCurrency.name === 'Ethereum';
      const bnAmount = new BigNumber(this.amount);
      this.web3.eth
        .estimateGas({
          from: this.wallet.getAddressString(),
          value: isEth
            ? this.amount === ''
              ? 0
              : unit.toWei(bnAmount, 'ether')
            : 0,
          to: isEth ? this.address : this.selectedCurrency.addr,
          data: this.data
        })
        .then(res => {
          this.transactionFee = unit.fromWei(
            unit.toWei(this.gasPrice, 'gwei') * res,
            'ether'
          );
          this.gasLimit = res;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
    async getSafeSendFee() {
      const rates = await fetch(
        'https://cryptorates.mewapi.io/ticker?filter=ETH'
      ).then(res => res.json());
      if (
        rates &&
        rates.data &&
        rates.data.ETH &&
        rates.data.ETH.quotes &&
        rates.data.ETH.quotes.USD &&
        rates.data.ETH.quotes.USD.price
      ) {
        const ETHUSDPrice = rates.data.ETH.quotes.USD.price;
        const amountOfEth = this.amount === '' ? 0 : this.amount;
        const baseFee = 0.3 / ETHUSDPrice;
        const mainFee = 0.0015 * amountOfEth;
        const maxFee = 10 / ETHUSDPrice;
        if (baseFee + mainFee > maxFee) {
          this.safeSendPriceEstimate = isNaN(maxFee.toFixed(3))
            ? 0
            : maxFee.toFixed(3);
        } else {
          this.safeSendPriceEstimate = isNaN((baseFee + mainFee).toFixed(3))
            ? 0
            : (baseFee + mainFee).toFixed(3);
        }
      } else {
        this.safeSendPriceEstimate = 0;
      }
    },
    verifyAddr() {
      if (this.address.length !== 0 && this.address !== '') {
        const valid = this.web3.utils.isAddress(this.address);
        if (!valid) {
          return true;
        }
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'SecureTransaction.scss';
</style>
