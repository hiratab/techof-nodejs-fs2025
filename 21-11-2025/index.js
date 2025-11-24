import bcrypt from "bcrypt";

const main = async () => {

  const hash = await bcrypt.hash("123456", 10)
  const compare = await bcrypt.compare("123456", hash)
  console.log(`hash: ${hash} compare: ${compare}`)
  
  const hash1 = await bcrypt.hash("123456", 10)
  const compare1 = await bcrypt.compare("123456", hash1)
  console.log(`hash1: ${hash1} compare: ${compare1}`)
  const wrongPass = await bcrypt.compare("qwerty", hash1)
  console.log(`hash1: ${hash1} compare: ${wrongPass}`)
}

main()
