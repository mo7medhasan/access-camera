"use client";
import { resetTheme } from "@/serverActions/Theme";

const ThemeSelector = ({ theme }) => {
  //   const router = useRouter()

  console.log(theme, "adsssssss");

  const handleThemeChange = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    /* logic to determine new theme */ // Now you can access cookies because you're on the client-side
    await resetTheme(newTheme);
  };
  return (
    <div>
      {/* <button
        onClick={()=>handleThemeChange()}
        aria-label="switch theme"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold
         text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
         focus-visible:outline-2 focus-visible:outline-offset-2 
         focus-visible:outline-indigo-600"
      >
     { theme === 'dark' ? 'Light Mode' : 'Dark Mode' }
      </button> */}
                        <div className="ml-4 flex items-center md:ml-6">

      <label
        for="AcceptConditions"
        class="relative h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#ff1193] "
      >
        <input
          onClick={() => handleThemeChange()}
          type="checkbox"
          id="AcceptConditions"
          class="peer sr-only accent-black"
        />
        <span className="text-[5px] px-[2px]">
          
        { theme === 'dark' ? 'Light Mode' : 'Dark Mode' }

        </span>
        <span class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
      </label>
    </div>
    </div>
  );
};
export default ThemeSelector;
