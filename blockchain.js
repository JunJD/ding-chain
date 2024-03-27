/**
 * 迷你区块链
 * 区块链的生成
 * 交易
 * 非对称加密
 * 挖矿
 * p2p网络
 */

/**
 * [
 *  {
 *      index: number 索引
 *      timestamp: Date 时间戳
 *      hash: Hash 当前节点Hash
 *      prevHash: Hash 链上上一个Hash
 *      nonce: number 随机数
 *  }
 * ]
 */
const crypto = require('crypto')
class BlockChain {
    constructor() {
        this.blockChain = []
        this.data = "[]"
        this.difficulty = 2
        this.blockChain = [].concat([this.createGenesisBlock()])
    }
    createGenesisBlock() {
        return this.createNewBlock()
    }
    getGenesisBlock() {
        return this.blockChain[0]
    }
    createNewBlock() {

        // 1. 生成新的区块 页新的记账加入了区块链
        // 2. 不停的计算hash 直到计算出符合符合条件的哈希值，获得记账劝
        const data = this.data

        const index = this.blockChain.length
        let nonce = 0
        const prevHash = this.getBlockChain().hash ?? 0
        let timestamp = Date.now(new Date())
        let hash = this.computedHash(index, prevHash, timestamp, data, nonce)
        while (!this.isValidProof(hash)) {
            nonce++
            timestamp = Date.now()
            hash = this.computedHash(index, prevHash, timestamp, data, nonce)
        }
        const block = {
            index,
            timestamp,
            hash,
            prevHash,
            nonce
        }
        return block
    }
    // 获取最新区块
    getBlockChain() {
        return this.blockChain[this.blockChain.length - 1] ?? {}
    }
    // 挖矿
    mine() {
        const newBlock = this.createNewBlock()
        if (this.isValidNewBlock(newBlock, this.getBlockChain())) {
            this.blockChain.push(newBlock)
        }
        return newBlock
    }
    isValidNewBlock(newBlock, prevBlock) {
        // 1. 判断新区块的index是否等于上一个区块+1
        if (newBlock.index !== prevBlock.index + 1) {
            return false
        }
        // 2. 判断新区块时间戳是否大于上一个区块
        if (newBlock.timestamp < prevBlock.timestamp) {
            return false
        }
        // 3. 判断新区块的prevBlock是否是上一个区块
        if (newBlock.prevHash !== prevBlock.hash) {
            console.log('isValidNewBlock', 3);
            return false
        }
        // 4. 
        if (!this.isValidProof(newBlock.hash)) {
            return false
        }
        return true
    }
    // 校验区块链
    isValidChain(blockChain) {
        // 1. 判断区块链长度是否大于1
        if (blockChain.length < 1) {
            return false
        }
        // 2. 判断区块链的第一个区块
        let isValidGenesis = JSON.stringify(blockChain[0]) === JSON.stringify(this.getGenesisBlock())
        if (!isValidGenesis) {
            console.log(isValidGenesis, 2);
            return false
        }
        // 3. 判断区块链的连续性
        for (let i = 1; i < blockChain.length; i++) {
            console.log(blockChain[i], blockChain[i - 1]);
            if (!this.isValidNewBlock(blockChain[i], blockChain[i - 1])) {
                console.log(i + 1, 'i+1');
                return false
            }
            // 4. 判断区块链的合法性
            if (!this.isValidProof(blockChain[i].hash)) {
                console.log('4--')
                return false
            }
            console.log('valid true');
        }
        return true

    }
    isValidProof(guessHash) {
        return guessHash.slice(0, this.difficulty) === '0'.repeat(this.difficulty)
    }
    computedHash(index, prevHash, timestamp, data, nonce) {
        // 使用nodejs中自带的加密的库 ==> crypto
        return crypto.createHash('sha256')
            .update(index + prevHash + timestamp + data + nonce)
            .digest('hex')
    }
}
// const blockChainInstance = new BlockChain()
// blockChainInstance.maine()
// blockChainInstance.maine()
// blockChainInstance.maine()
// blockChainInstance.maine()
// console.log(blockChainInstance.blockChain[1].index, 'indexindex', blockChainInstance.blockChain[1].hash = '00222002', '222')
// // console.log(blockChainInstance.blockChain)
// blockChainInstance.isValidChain(blockChainInstance.blockChain)

module.exports = BlockChain;