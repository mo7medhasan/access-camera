"use client"
import { resetTheme } from '@/serverActions/Theme';

const ThemeSelector = ({ theme }) => {
//   const router = useRouter()



const handleThemeChange = async () => {
    const newTheme =  theme === 'dark' ? 'light' : 'dark';
    
     /* logic to determine new theme */;
    // Now you can access cookies because you're on the client-side
    await resetTheme(newTheme)
  };
  return (
    <div>
      <button
        onClick={()=>handleThemeChange()}
        aria-label="switch theme"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold
         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
         focus-visible:outline-2 focus-visible:outline-offset-2 
         focus-visible:outline-indigo-600"
      >
     { theme === 'dark' ? 'Light Mode' : 'Dark Mode' }
      </button>
    </div>
  )
}
export default ThemeSelector

