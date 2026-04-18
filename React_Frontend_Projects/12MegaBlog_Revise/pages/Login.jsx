import React from 'react'
// isske ander kuch khaas ni h, bas ek component import krwaayenge bs.
import { Login as loginComponent } from '../components'
function Login() {
  return (
    <div className='py-8'>
      {/* // signup component bana hua render kr diya hu. */}
        <loginComponent />
    </div>
  )
}

export default Login