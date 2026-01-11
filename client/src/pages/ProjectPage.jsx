import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosInstance } from '../axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProjects } from '../Store/Slices/user.slice'

function ProjectPage() {
    const { projectId } = useParams()
    const dispatch = useDispatch()
    const { userProject,userDetail } = useSelector(state => state.user)
    const [showInvite, setShowInvite] = useState(false)
    const [collabratorEmail, setCollabratorEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleAddParticipants = async () => {
        setIsLoading(true)
        try {
            const response = await AxiosInstance.post(
                '/user/addparticipants',
                { collabratorEmail, projectId },
                { withCredentials: true }
            )
            console.log('Participant added:', response.data)

            const updatedArray = userProject?.map((p) => (p?._id == response.data._id ? response.data : p))

            dispatch(setUserProjects(updatedArray))
            setCollabratorEmail('')
            setShowInvite(false)
        } catch (error) {
            console.log('Error adding participant:', error)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className='text-black h-[100vh] flex'>
            <div className='w-[27%] bg-amber-300 relative'>
                <div className='w-full'>
                   {userProject?.filter((p)=>(p?.owner?._id==userDetail?._id)).length!=0 &&  <h3 onClick={() => setShowInvite(true)} className='flex justify-center items-center py-3 bg-white cursor-pointer'>Add Collabrator +</h3>}
                </div>

   
                {/* Absolute transparent invite panel (no bg color on outer div) */}

                {showInvite && (
                    <div onClick={() => setShowInvite(false)} className='absolute inset-0 flex justify-center items-center bg-black/50 z-50 h-[100vh] w-[100vw]'>

                        <div onClick={(e) => e.stopPropagation()} className='w-80 p-6 rounded-md shadow-lg bg-white'>

                            <h4 className='text-lg font-semibold mb-3'>Invite Collaborator</h4>

                            <input
                                type='email'
                                placeholder='Collaborator Email'
                                value={collabratorEmail}
                                onChange={(e) => setCollabratorEmail(e.target.value)}
                                className='w-full px-3 py-2 mb-4 border rounded'
                            />

                            <div className='flex gap-2'>
                                <button onClick={handleAddParticipants} className='flex-1 px-3 py-2 bg-blue-600 text-white rounded' disabled={isLoading}>{isLoading ? 'Adding...' : 'Invite'}</button>
                                <button onClick={() => { setShowInvite(false); setCollabratorEmail(''); }} className='flex-1 px-3 py-2 bg-gray-300 rounded'>Cancel</button>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            <div className='w-[13%] bg-amber-700'></div>
            <div className='flex-1 bg-amber-950'></div>

        </div>
    )
}

export default ProjectPage