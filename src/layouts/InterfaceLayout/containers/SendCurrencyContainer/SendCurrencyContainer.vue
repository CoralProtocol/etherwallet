<template>
  <div class="send-currency-container">
    <interface-container-title :title="$t('common.sendTx')" />

    <div class="send-form">
      <div class="form-block amount-to-address">
        <div class="amount">
          <div class="title">
            <h4>{{ $t('interface.sendTxAmount') }}</h4>
            <p
              class="title-button prevent-user-select"
              @click="setBalanceToAmt"
            >
              Entire Balance
            </p>
          </div>
          <currency-picker
            :currency="tokensWithBalance"
            :page="'sendEthAndTokens'"
            :token="true"
            @selectedCurrency="setSelectedCurrency"
          />
          <div class="the-form amount-number">
            <input v-model="amount" type="number" placeholder="Amount" />
            <i
              :class="[
                selectedCurrency.name === 'Ether'
                  ? parsedBalance < amount
                    ? 'not-good'
                    : ''
                  : selectedCurrency.balance < amount
                  ? 'not-good'
                  : '',
                'fa fa-check-circle good-button'
              ]"
              aria-hidden="true"
            />
          </div>
          <div
            v-if="
              selectedCurrency.name === 'Ether'
                ? amount > parsedBalance
                : selectedCurrency.balance < amount
            "
            class="error-message-container"
          >
            <p>{{ $t('common.dontHaveEnough') }}</p>
          </div>
        </div>
        <div class="to-address">
          <div class="title">
            <h4>
              {{ $t('interface.sendTxToAddr') }}
              <blockie
                v-show="validAddress && address.length !== 0"
                :address="resolvedAddress !== '' ? resolvedAddress : address"
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
    </div>

    <div class="send-form">
      <div class="title-container">
        <div class="title">
          <div class="title-helper">
            <h4>{{ $t('common.speedTx') }}</h4>
            <popover
              :popcontent="$t('popover.whatIsSpeedOfTransactionContent')"
            />
          </div>
          <p>{{ $t('common.txFee') }}: {{ transactionFee }} ETH</p>
        </div>
        <div class="buttons">
          <div
            :class="[
              gasPrice === 5 ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(5);"
          >
            {{ $t('common.slow') }}
          </div>
          <div
            :class="[
              gasPrice === 45 ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(45);"
          >
            {{ $t('common.regular') }}
          </div>
          <div
            :class="[
              gasPrice === 75 ? 'active' : '',
              'small-circle-button-green-border'
            ]"
            @click="changeGas(75);"
          >
            {{ $t('common.fast') }}
          </div>
        </div>
      </div>

      <div class="the-form gas-amount">
        <input
          v-model="gasAmount"
          type="number"
          name=""
          placeholder="Gas Amount"
        />
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
          <h4>{{ $t('common.advanced') }}</h4>
          <div class="toggle-button">
            <span>{{ $t('interface.dataGas') }}</span>
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
              v-model="data"
              v-bind:disabled="safeSendActive"
              type="text"
              name=""
              placeholder="Add Data (e.g. 0x7834f874g298hf298h234f)"
              autocomplete="off"
            />
          </div>
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
        v-if="network.type.chainID === 1"
        class="advanced-content">
        <div class="toggle-button-container">
          <h4>{{ $t('common.coralEscrow') }}</h4>
          <div class="toggle-button">
            <span>{{ $t('interface.coralEscrow') }}</span>
            <!-- Rounded switch -->
            <div class="sliding-switch-white">
              <label class="switch">
                <input
                  :checked="safeSendActive"
                  type="checkbox"
                  @click="toggleSafeSend" >
                <span class="slider round"/>
              </label>
            </div>
          </div>
        </div>
        <div
          v-if="safeSendActive"
          class="input-container">
          I agree to pay the fraud prevention transaction fee of 0.15% of my transaction + $0.30 USD.
          <br >
          <br >
          I have also read and agree with the Terms and Conditions of the MyEtherWallet Fraud Prevention Service.
          <br >
          <br >
          Please take note of your transaction hash. If it is not completed within 2 hours, please contact mew-support@heycoral.com
        </div>
      </div>
    </div>

    <div class="submit-button-container">
      <div
        :class="[
          validAddress && address.length !== 0 ? '' : 'disabled',
          'submit-button large-round-button-green-filled'
        ]"
        @click="confirmationModalOpen"
      >
        {{ $t('interface.sendTx') }}
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
import InterfaceContainerTitle from '../../components/InterfaceContainerTitle';
import CurrencyPicker from '../../components/CurrencyPicker';
import { CoralConfig } from '@/configs/coral';
import InterfaceBottomText from '@/components/InterfaceBottomText';
import Blockie from '@/components/Blockie';
import normalise from '@/helpers/normalise';
import BigNumber from 'bignumber.js';
import web3 from 'web3';
import * as unit from 'ethjs-unit';

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'interface-bottom-text': InterfaceBottomText,
    blockie: Blockie,
    'currency-picker': CurrencyPicker
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
    }
  },
  data() {
    const safeSendActive = localStorage.getItem('safeSendActive') === 'true' ? true : false;
    const data = safeSendActive ? 'Data cannot be sent with SafeSend Payment Protection at this time' : '0x';
    return {
      mainnet: this.$store.state.network.type.chainID === CoralConfig.chainID,
      advancedExpend: false,
      safeSendActive: safeSendActive,
      validAddress: true,
      amount: 0,
      amountValid: true,
      nonce: 0,
      gasLimit: 21000,
      data: data,
      gasAmount: this.gasPrice,
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
    parsedBalance(newVal) {
      this.parsedBalance = newVal;
    },
    gasAmount(newVal) {
      this.gasAmount = newVal;
      if (!this.verifyAddr()) {
        this.estimateGas();
      }
      this.$store.dispatch('setGasPrice', Number(newVal));
    },
    amount(newVal) {
      this.amount = newVal;
      if (!this.verifyAddr()) {
        this.estimateGas();
      }
    },
    selectedCurrency(newVal) {
      this.selectedCurrency = newVal;
      this.estimateGas();
    }
  },
  mounted() {
    if (this.account.balance) {
      this.parsedBalance = this.account.balance;
    }
  },
  methods: {
    debounceInput: web3.utils._.debounce(function(e) {
      this.address = normalise(e.target.value);
    }, 1500),
    copyToClipboard(ref) {
      this.$refs[ref].select();
      document.execCommand('copy');
    },
    async createTx() {
      const isEth = this.selectedCurrency.name === 'Ethereum';
      const safeSendActive = this.safeSendActive;
      this.nonce = await this.$store.state.web3.eth.getTransactionCount(
        this.wallet.getAddressString()
      );
      const chainID = await this.$store.state.web3.eth.net.getNetworkType();

      if (isEth && safeSendActive && chainID === CoralConfig.chainID) {
        localStorage.setItem('safeSendActive', 'true');
        const value = this.amount === '' ? 0 : unit.toWei(this.amount, 'ether');
        const safeSendContractAddress = CoralConfig.safeSendEscrowContractAddress;
        const CoralSafeSendContract = new this.$store.state.web3.eth.Contract(
          CoralConfig.safeSendEscrowContractAbi,
          safeSendContractAddress
        );
        const to = this.resolvedAddress !== '' ? this.resolvedAddress : this.address;
        const query = CoralSafeSendContract.methods['deposit'](to,CoralConfig.safeSendScoreThreshold);
        const encodedABI = query.encodeABI();
        const gasLimit =
          parseInt(this.gasLimit) > CoralConfig.gasLimitSuggestion
            ? this.gasLimit
            : CoralConfig.gasLimitSuggestion; // assures minimum gas is provided
        this.raw = {
          from: this.$store.state.wallet.getAddressString(),
          value: value,
          to: safeSendContractAddress,
          nonce: this.nonce,
          gas: gasLimit,
          data: encodedABI,
          gasPrice: Number(unit.toWei(this.$store.state.gasPrice, 'gwei')),
          chainId: CoralConfig.chainID || 1
        };
      } else {
        localStorage.setItem('safeSendActive', 'false');

        this.raw = {
          from: this.wallet.getAddressString(),
          gas: this.gasLimit,
          nonce: this.nonce,
          gasPrice: Number(unit.toWei(this.gasPrice, 'gwei')),
          value: isEth
            ? this.amount === ''
              ? 0
              : unit.toWei(this.amount, 'ether')
            : 0,
          to: isEth
            ? this.resolvedAddress !== ''
              ? this.resolvedAddress
              : this.address
            : this.selectedCurrency.addr,
          data: this.data,
          chainId: this.network.type.chainID || 1
        };
      }

      if (this.address === '') {
        delete this.raw['to'];
      }
      console.log('this.raw', this.raw)
      this.$store.state.web3.eth.sendTransaction(this.raw);
    },
    confirmationModalOpen() {
      this.createTx();
      window.scrollTo(0, 0);
    },
    toggleSafeSend() {
      this.safeSendActive = !this.safeSendActive;
      this.data = this.safeSendActive ? 'Data cannot be sent with SafeSend Payment Protection at this time' : '0x';
    },
    changeGas(val) {
      this.gasAmount = val;
      this.createDataHex();
      this.$store.dispatch('setGasPrice', Number(val));
    },
    setBalanceToAmt() {
      if (this.selectedCurrency.name === 'Ethereum') {
        this.amount = this.parsedBalance - this.transactionFee;
      } else {
        this.amount = this.selectedCurrency.balance;
      }
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
        this.data = contract.methods
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
      this.web3.eth
        .estimateGas({
          from: this.wallet.getAddressString(),
          value: isEth
            ? this.amount === ''
              ? 0
              : unit.toWei(this.amount, 'ether')
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
@import 'SendCurrencyContainer.scss';
</style>
