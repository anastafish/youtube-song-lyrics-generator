import Head from 'next/head'
import { useState, useRef, useEffect} from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      console.log('worked')
      const res = await fetch('/api/hello', {
        method:'POST',
        "Content-Type": "application/json",
        body: prompt
      })
      const text = await res.json()
      console.log(text)
      setResponse(text)
      setPrompt('')
    }
    catch (err) {
      console.log(err)
    }   

    
  }
  return (
    <div className='w-[100vw] flex flex-col items-center justify-center gap-3'>
      <Head>
        <title>Song Lyrics</title>
      </Head>
      <h1 className='text-[40px] font-extrabold'>Song Lyrics</h1>
      {response && <h1 className='text-[30px] font-bold'>{response.title}</h1>}
      {response && <div className='flex flex-col overflow-scroll h-[400px] no-scrollbar'>
        <h1 className='text-[20px] font-semibold text-center p-5'>{response.transcript.text}</h1>
      </div>}
      <input
         type="text" 
         value={prompt} 
         onChange={handleChange}
         className='p-2 border-black border-[2px] rounded-md placeholder:text-center'
         placeholder='Youtube URL'
         onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
         }}
         />
      <button 
        onClick={handleSubmit}
        className='border-black border-[3px] p-3 rounded-lg hover:bg-green-400'
        >
          Get Lyrics
          </button>
    </div>
  )
}
