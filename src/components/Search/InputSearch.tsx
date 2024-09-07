import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'


const InputSearch = () => {
  const navigate = useNavigate()

  const debounce = (func: (text: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return function (text: string) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(text)
      }, delay)
    }
  }

  const debounceSearch = debounce((keyword: string) => {
    navigate(`/search?title=${keyword}`)
  }, 300)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchText = e.target.value
    debounceSearch(searchText)

  }
  return (
    <div className="relative">
      <Search className="absolute top-3 left-2 text-slate-700" size={"1.1rem"} />
      <Input type="search" className="rounded-full ps-8" placeholder="Search" onChange={handleSearch} />
    </div>
  )
}

export default InputSearch