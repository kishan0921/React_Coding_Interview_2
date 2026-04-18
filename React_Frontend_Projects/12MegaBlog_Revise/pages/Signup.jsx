import React from 'react'

// isske ander kuch khaas ni h, bas ek component import krwaayenge bs.
import { Signup as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='py-8'>

        {/* // signup component bana hua render kr diya hu. */}
        <SignupComponent />
    </div>
  )
}

export default Signup