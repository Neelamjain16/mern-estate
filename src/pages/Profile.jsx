import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import {updateUserStart,updateUserSuccess,updateUserFailure} from '../redux/user/userSlice.js'
function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch=useDispatch();
  // console.log(filePerc)
  //  console.log(file);
  // console.log(formData)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is'+progress+'%done')
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        }); 
      }
    );
  }
   const handleChange=(e)=>{
     setFormData({...formData,[e.target.id]:e.target.value})
   }

   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
         dispatch(updateUserStart());
         const res=await fetch(`/api/user/update/${currentUser._id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData),
         });
         const data=await res.json();
         if(data.success===false){
          dispatch(updateUserFailure(data.message));
          return;
         }
         dispatch(updateUserSuccess(data));
    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
   }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.avatar||  currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>{fileUploadError?(
        <span className='text-red-700'>Error Image upload(image must be less than 2mb)
        </span>):
         filePerc>0  && filePerc<100? (
          <span className='text-green-700'>{`uploading ${filePerc}%`}</span>
         ):filePerc===100 ?(
          <span className='text-green-700'>Image Successfully uploaded !</span>
         ):(
          ''
         )
          
         
      }</p>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'  defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile