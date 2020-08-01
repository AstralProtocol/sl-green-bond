import Web3 from 'web3'

export class TransactionChecker {
  constructor(infuraProjectId, account) {
    if (!PRODUCTION) { /* environment variable set in Webpack config */
      this.web3ws = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    } else {
      this.web3ws = new Web3(new Web3.providers.WebsocketProvider(`wss://rinkeby.infura.io/ws/v3/${infuraProjectId}`))
      this.web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${infuraProjectId}`))
    }

    this.account = account.toLowerCase()
  }

  subscribe(topic) {
    this.subscription = this.web3ws.eth.subscribe(topic, (err) => {
      if (err) { console.error(err) }
    })
  }

  watchTransactions() {
    console.log('Watching all pending transactions...')
    const self = this

    this.subscription.on('data', (txHash) => {
      setTimeout(async () => {
        try {
          const tx = await self.web3.eth.getTransaction(txHash)
          if (tx != null) {
            console.log(tx.from)
            if (self.account === tx.to.toLowerCase()) {
              console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestampe: new Date() })
            }
          }
        } catch (err) {
          console.error(err)
        }
      }, 60000)
    })
  }
}
