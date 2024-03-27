const vorpal = require('vorpal')()
const Table = require('cli-table')
const BlockChain = require('./blockchain')
const blockChainInstance = new BlockChain()

vorpal
    .command('mine', '挖矿')
    .action(function (args, callback) {

        let result = blockChainInstance.mine()
        if (result) {

            if (!Array.isArray(result)) {
                result = [result]
            }
            const keys = Object.keys(result[0])
            const table = new Table({
                head: keys,
            })

            const res = result.map(v => {
                return keys.map(h => v[h])
            })
            table.push(...res)
            console.log(table.toString())

        }
        callback()
    })

vorpal
    .command('chain', '区块链打印')
    .action(function (args, callback) {
        this.log('Hello, Vorpal!')
        const result = blockChainInstance.blockChain
        if (result) {
            console.log(result)
        }
        callback()
    })


vorpal.exec('help')
vorpal
    .delimiter('$')
    .show()