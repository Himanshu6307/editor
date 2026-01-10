import React from 'react'
import AppRouting from './Routing/AppRouting'
import { Toaster } from 'react-hot-toast'
import useGetCurrentUser from './hooks/getCurrentUser'

function App() {

   useGetCurrentUser()

  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <AppRouting />

    </>
  )
}

export default App