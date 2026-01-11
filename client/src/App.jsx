import React from 'react'
import AppRouting from './Routing/AppRouting'
import { Toaster } from 'react-hot-toast'
import useGetCurrentUser from './hooks/getCurrentUser'
import useGetCurrentUserProjects from './hooks/getUserProject'

function App() {

  useGetCurrentUser()
  useGetCurrentUserProjects()
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