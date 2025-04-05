import { ThemeProvider } from "@/providers/theme-provider"
import Generator from "./components/Generator/Generator"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Generator/>
    </ThemeProvider>
  )
}

export default App
