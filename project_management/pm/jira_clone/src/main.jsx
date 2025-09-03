import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"   // auto-generated
import Cookies from "universal-cookie"
import "./styles.css"

// Setup cookies + auth
const cookies = new Cookies()
const isAuthenticated = () => cookies.get("user")?.token

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { isAuthenticated },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Render the app
const rootElement = document.getElementById("root") 
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
