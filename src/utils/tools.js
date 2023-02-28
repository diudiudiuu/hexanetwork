import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'
import sessionStore from "@/utils/sessionStore"
import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'




// 退出登录
const logout = () => {
  sessionStore.remove()
  const variable = useVariableStore()
  variable.$reset()
}

//nonce 算法
const enctryNonce = () => {
  const constant = useConstantStore()
  const variable = useVariableStore()

  // const hmac = crypto.createHmac('sha512', constant.secret);
  // hmac.update(`${variable.user.id}_${variable.user.nonce}`);
  // const enctry_nonce = hmac.digest('hex');

  // const hmacDigest = Base64.stringify();

  // d2cd61ffdf6885e699eb76a94c64f87068f2526ffbf9c238583f44ab9c26ee5833830827247ad92327b2aa66b96e46c9a24456716a765b82f075e166d2533af4   17597
  // d2cd61ffdf6885e699eb76a94c64f87068f2526ffbf9c238583f44ab9c26ee5833830827247ad92327b2aa66b96e46c9a24456716a765b82f075e166d2533af4  17597
  return hmacSHA512(`${variable.user.id}_${variable.user.nonce}`, constant.secret).toString()
}



const tools = {
  logout,
  enctryNonce
}

export default tools 