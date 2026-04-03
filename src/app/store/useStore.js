// store/useCounterStore.js
import { create } from 'zustand'

const useAppStore = create((set) => ({
  isLogined: false,
  auth_name: '' ,
  role: '',

  // Single function to set login data
  setLogin: (role,name) =>
    set({
      isLogined: true,
      auth_name: name,
      role:role
    }),
 
  // Logout function
  setLogout: () =>
    set({
      isLogined: false,
      auth_name: '',
      role: ''
    }),
   
    
}))

export default useAppStore
