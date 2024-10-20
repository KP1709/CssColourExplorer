import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../src/styles/app.css"
import { createRoutesFromElements, Route, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import MainPage from './pages/mainPage'
import ColourPage from './pages/colourPage'

const queryClient = new QueryClient()

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Outlet/>}>
        <Route path="*" element={<h2>Unknown Colour + URL path entered</h2>} />
        <Route path="/" element={<MainPage />}/>
        <Route path="/:colourWord" element={<ColourPage/>}/>
    </Route>
))

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
        <ReactQueryDevtools/>
      </QueryClientProvider>

    </>
  )
}

export default App
