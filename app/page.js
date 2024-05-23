import Feed from '@/components/Feed'
import React from 'react'

export default function Home(){
  
  return (<section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      <span className='orange_gradient text-center'> 
        Create, Copy, Edit and Delete Posts
      </span>
    </h1>
    <p className='desc text-center'>
      A fullstack apllication show-casing CRUD functionalities. Sign in to create posts!
    </p>

    <Feed />
  </section>)
}