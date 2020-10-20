import * as Block from 'multiformats/block'
import { sha256 as hasher } from 'multiformats/hashes/sha2'
import * as codec from '@ipld/dag-cbor'
import makeTree from './make-tree.js'
import { ok, deepStrictEqual as same } from 'assert'

const blocks = {}

const opts = { codec, hasher }

const run = async () => {
  let last
  for await (const { bytes, cid } of makeTree(opts)) {
    // instead of using the full blocks being yield we re-create
    // them to show an example of how this is normally done when reading
    // from raw data sources
    const block = await Block.create({ bytes, cid, ...opts })
    blocks[block.cid.toString()] = block
    last = cid
  }
  const root = blocks[last.toString()]
  const { one, two } = root.value
  const blockOne = blocks[one.toString()]
  const blockTwo = blocks[two.toString()]
  ok(blockTwo.value.prop, 31337)

  same(blockOne.value.foo, blockTwo.value.bar)
  const hello = blocks[blockOne.value.foo.toString()]
  same(hello.value, { hello: 'world' })
}
run()
