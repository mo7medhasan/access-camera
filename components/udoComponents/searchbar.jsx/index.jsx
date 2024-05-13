"use client"
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
 import {useRef} from "react";

export default function SearchBar() {
  const {replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const InputRef = useRef();
  const params = new URLSearchParams(searchParams);
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const searchValue = InputRef.current.value.trim();
    if (searchValue !== '') {
       params.set('search', searchValue);
      replace(`${pathname}?${params.toString()}`);
    }
  }
  return (
    <div>
      <div className="relative">
      <form   onSubmit={handleSubmit}>
      <input
          type="text"
          className=" p-3 pl-[45px] rounded-2xl w-[80%] 
          md:w-[60%] xl:w-[25%]  border border-[#ddd] 
          bg-transparent"
          placeholder="Enter Something To Search"
          name="search"
          ref={InputRef}

        />

        <button  type="submit" className="absolute inset-y-0 start-0 grid place-content-center px-4">
          <SearchIcon
            className="
            text-[#ddd]"
            
          />
        </button>
      </form>
      </div>
    </div>
  );
}
