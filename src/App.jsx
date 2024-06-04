import { useState,useCallback,useEffect,useRef } from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setnumber]=useState(false);
  const [char, setchar]=useState(false);
  const [Password,setPassword]=useState("");

  const passwordRef=useRef(null);
// usecallback is a hook ehic takes a function and array of dependencies as parameter
  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789";
    if(char) str+="_-!@#$%&*";
    for (let i = 1; i <=length; i++) {
      let charindex=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(charindex)
      
    }
    setPassword(pass)
  },[length,number,char,setPassword])


  const copyPass=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 26);
    window.navigator.clipboard.writeText(Password)
  },[Password])

  // passwordGenerator()
  useEffect(()=>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])

  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='my-3 text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={Password} 
            className='outline-node w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button className='outline-node bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPass}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => {
                    setnumber((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={char}
                  id="characterInput"
                  onChange={() => {
                      setchar((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        <div className='flex justify-center items-center h-full mt-3 mb-1'>
          <button className='outline-node bg-blue-700 text-white px-3  py-0.5 shrink-0 rounded-xl' onClick={passwordGenerator}>Generate</button>
          </div>
      </div>
  )
}

export default App
