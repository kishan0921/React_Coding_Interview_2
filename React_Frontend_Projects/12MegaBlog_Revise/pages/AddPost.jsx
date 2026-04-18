import React from 'react'

// Ab hume yaha pe Container & PostForm chahiye hoga.
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    // padding py-8
    <div className='py-8'>
      {/* then yaha pe hum call kr lete h, apna container */}
        <Container>
          {/* and container ke ander apna PostForm */}
            <PostForm />
        {/* then Container close kr denge  */}
        </Container>
    </div>
  )
}

export default AddPost