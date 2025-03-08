import { ModeToggle } from "@/@core/components/modo-toggle"
import { AppView } from "@/modules/AppView"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className="w-screen min-h-screen overflow-hidden dark:bg-[#0F0F10]">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <AppView />
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  )
}

export default App
