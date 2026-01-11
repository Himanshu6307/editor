import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdAddLink } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';
import { AxiosInstance } from '../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProjects } from '../Store/Slices/user.slice';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [popup, setPopup] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { userProject } = useSelector(state => state.user)
  const navigate = useNavigate()


  const handleCreateProject = async () => {

    setIsLoading(true)

    try {
      if (!projectName.trim()) {
        toast.error('Please enter a project name')
        setIsLoading(false)
        return
      }

      const response = await AxiosInstance.post('/user/createproject', { name: projectName }, { withCredentials: true })

      console.log('Project created:', response.data)

      dispatch(setUserProjects([...userProject, response.data]))
      setIsLoading(false)
      setProjectName('')
      setPopup(false)

    } catch (error) {
      setIsLoading(false)
      toast.error("Error creating project")
      console.log('Error creating project:', error)
    }
  }

  return (
    <div className='bg-black h-[100vh] text-white p-4 relative flex flex-col gap-6'>


      <div>
        <button onClick={() => { setPopup(true) }} className='px-3 py-2 bg-white flex gap-2 justify-center items-center rounded-2xl'>
          <span className='text-black text-[15px] font-medium'>Create</span>
          <span> <MdAddLink size={25} className='text-black' /></span>
        </button>
      </div>

      {userProject.length!=0?<div className='flex flex-col gap-4'>
         <h1 className='text-white'>Projects</h1>
        <div className='flex gap-4'>
          {userProject.length != 0 && userProject?.map((project,index) => (
            <>
              <div key={index}>
                <button onClick={()=>{navigate(`/project/${project?._id}`)}} className='px-3 py-2 bg-white flex flex-col gap-1 justify-center items-center rounded-2xl'>
                  <span className='text-black text-[14px] font-normal'>{project?.name}</span>
                  <span className='text-black text-[12px] font-normal'>Collabrators: {project?.participants?.length}</span>
                </button>
              </div>
            </>
          ))
          }
        </div>
      </div>:<div className='flex justify-center items-center text-white'>No Projects </div>}



      {/* Modal for creating project */}

      {popup && (
        <div onClick={() => { setPopup(false) }} className='fixed inset-0 bg-opacity-50 flex justify-center items-center z-50'>
          <div onClick={(e) => e.stopPropagation()} className='bg-gray-900 p-8 rounded-lg shadow-lg w-96'>
            <h2 className='text-2xl font-bold mb-6 text-white'>Create New Project</h2>

            <input
              type='text'
              placeholder='Enter Project Name'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className='w-full px-4 py-2 mb-6 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none'
            />

            <div className='flex gap-4'>

              <button
                onClick={handleCreateProject}
                className='flex-1 justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
              >
                {!isLoading ? "Create" : <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />}


              </button>
              <button
                onClick={() => {
                  setPopup(false)
                  setProjectName('')
                }}
                className='flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  )
}

export default Home