
const Block = require('./Block.js')
const crypto = require('crypto')
const fs = require('fs')

const axios  = require('axios')
class Blockchain {
  constructor() {
      this.blockchain =[]
      this.loadFromFile((response=>{

          this.blockchain =response

          if( this.blockchain.length==0){
              this.blockchain = [Block.genesis]
          }

          console.log("load chain:"+this.blockchain)
      }))

    this.difficulty = 3
  }

  get() {
    return this.blockchain
  }

  get latestBlock() {


      console.log("this.blockchain"+this.blockchain)
    return this.blockchain[this.blockchain.length - 1]
  }

  isValidHashDifficulty(hash) {

    for (var i = 0; i < hash.length; i++) {
      if (hash[i] !== '0') {

        break
      }
    }
    return i >= this.difficulty
  }

  calculateHashForBlock(block) {
    const { index, previousHash, timestamp, data, nonce } = block
    return this.calculateHash(
      index,
      previousHash,
      timestamp,
      data,
      nonce
    )
  }

  calculateHash(index, previousHash, timestamp, data, nonce) {
    return crypto
      .createHash('sha256')
      .update(index + previousHash + timestamp + data + nonce)
      .digest('hex')
  }

  mine(data) {
    const newBlock = this.generateNextBlock(data)

    try {
      this.addBlock(newBlock)


    } catch (err) {
      throw err
    }
  }

  generateNextBlock(data) {
    console.log('last block+'+ this.latestBlock.index)
    const nextIndex = this.latestBlock.index + 1
    const previousHash = this.latestBlock.hash
    let timestamp = new Date().getTime()
    let nonce = 0
    let nextHash = this.calculateHash(
      nextIndex,
      previousHash,
      timestamp,
      data,
      nonce
    )

    while (!this.isValidHashDifficulty(nextHash)) {
      nonce += 1
      timestamp = new Date().getTime()
      nextHash = this.calculateHash(
        nextIndex,
        previousHash,
        timestamp,
        data,
        nonce
      )
    }

    const nextBlock = new Block(
      nextIndex,
      previousHash,
      timestamp,
      data,
      nextHash,
      nonce
    )

    return nextBlock
  }

  addBlock(newBlock) {
    if (this.isValidNextBlock(newBlock, this.latestBlock)) {
      this.blockchain.push(newBlock)



    } else {
      throw 'Error: Invalid block'
    }
  }

  isValidNextBlock(nextBlock, previousBlock) {
    const nextBlockHash = this.calculateHashForBlock(nextBlock)

    if (previousBlock.index + 1 !== nextBlock.index) {


        console.log('previousBlock.index '+previousBlock.index)
        console.log('nextBlock.index '+nextBlock.index)

      console.log('false 1')
      return false
    } else if (previousBlock.hash !== nextBlock.previousHash) {
        console.log('false 2')
      return false
    } else if (nextBlockHash !== nextBlock.hash) {
        console.log('false 3')
      return false
    } else if (!this.isValidHashDifficulty(nextBlockHash)) {
        console.log('false 4')
      return false
    } else {
      return true
    }
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) {
      return false
    }

    const tempChain = [chain[0]]
    for (let i = 1; i < chain.length; i += 1) {
      if (this.isValidNextBlock(chain[i], tempChain[i - 1])) {
        tempChain.push(chain[i])
      } else {
        return false
      }
    }
    return true
  }

  isChainLonger(chain) {
    return chain.length > this.blockchain.length
  }

  replaceChain(newChain) {
    if (this.isValidChain(newChain) && this.isChainLonger(newChain)) {
      this.blockchain = JSON.parse(JSON.stringify(newChain))
    } else {
      throw 'Error: invalid chain'
    }
  }

  saveToFile() {
    // fs.writeFile('blockchain.txt', JSON.stringify(this.chain))

  console.log((this.blockchain))

     axios({
         headers:{
             'Content-type': 'application/json; charset=utf-8'
         },
          method:"post",
          url:"http://localhost:3031/blockchain",
          data:
           this.blockchain


      }).then((res)=>{
          console.log(res.data);
      })

  }

  loadFromFile(cb) {
    // const text = fs.readFileSync('blockchain.txt', 'utf8')
    // const blockchain = JSON.parse(text)
    // for (let i = 1; i < blockchain.length; i++) {
    //   this.chain[i] = blockchain[i]
    // }
       axios.get('http://localhost:3031/blockchain').then(response => {


         if(response.status==200){
             // let tmp = []

             if(response.data){
                 // tmp  =JSON.parse(response.data)

                 // console.log("response"+JSON.stringify(tmp[0]))
                 //
                 // console.log("length"+ (tmp.length))



                 // for (let i = 0; i < tmp.length; i++) {
                 //
                 //     this.blockchain[i] =  JSON.stringify(tmp[i])
                 //     // console.log(" this.blockchain[i]"+  this.blockchain[i])
                 // }
                 this.blockchain = response.data
                 cb(this.blockchain)
             }


         }




       })

  }
}

module.exports = Blockchain
