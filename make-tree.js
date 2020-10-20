import * as Block from 'multiformats/block'

const create = async function * ({ codec, hasher }) {
  const value = { hello: 'world' }
  const hello = await Block.encode({ value, codec, hasher })
  yield hello

  // hello.bytes - encoded binary data
  // hello.cid - CID address

  const bbbb = await Block.encode({ value: { foo: hello.cid }, codec, hasher })
  yield bbbb

  const cccc = await Block.encode({ value: { bar: hello.cid, prop: 31337 }, codec, hasher })
  yield cccc

  const dddd = await Block.encode({ value: { one: bbbb.cid, two: cccc.cid }, codec, hasher })
  yield dddd
}

export default create
