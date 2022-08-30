const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256')


const allowlist = 
["0xEb407793433b60419b382454cB2C3D10E1c4a932",
"0x2331365949e47F629A61E33047Cc1fF6a18dD62C",
"0xF536B7DF9E7dc3B20dBaC96CEbA7285F323D4667",
"0xEDE75729315fd68f57107f2EaE80bfa7e90Ee2F1",
"0x53b6521F567BF0E9D698aa71D4d6d018Ac3C6e75",
"0x0d0c10e134cCEF33BDbe3B41d784687EbDE53079",
"0x6ac2B5703D220322270b820F6f34d6d88b467826",
"0x365ABFE34592c5d1C57A2160B4e732c344c4033e",
"0xD9E758941fED6F1659Cea187F9C819b087A7A56e",
"0xf63D5B2b7C43d2465B1c0eaB04805c74069005a9"]

const leaves = allowlist.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})

export default function handler(req, res) {
  console.log('root', tree.getRoot())
  const {address} = JSON.parse(req.body)
  
  const leaf = keccak256(address)
  const proof = tree.getHexProof(leaf)

  res.status(200).json({ address, proof })
}