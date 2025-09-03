import { createRootRoute, Outlet } from '@tanstack/react-router'
import React, { createContext } from 'react'
import Cookies from 'universal-cookie'
import TopNav from '../components/TopNav'

export const cookiesContext = createContext()
const cookies = new Cookies()

const isAuthenticated = () => cookies.get('user')?.token

export const Route = createRootRoute({
  component: () => (
    <cookiesContext.Provider value={cookies}>
      <TopNav />
      <Outlet />
    </cookiesContext.Provider>
  ),
  context: {
    isAuthenticated,
  },
})
