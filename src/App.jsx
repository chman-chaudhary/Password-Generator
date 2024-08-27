import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAlw, setNumAlw] = useState(true);
  const [charAlw, setCharAlw] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (numAlw) str += "0123456789";
    if (charAlw) str += "!@#$%^&*(){}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAlw, charAlw, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  useEffect(() => {
    passwordGenerator()
  }, [length, numAlw, charAlw, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto showed-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">

        <h1 className="text-white text-center my-3">Password generator</h1>

        <div className="flex shodow rounded-lg overflow-hidden mb-4">
          
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            type="button"
            className="bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={copyPassword}
          >Copy</button>

        </div>

        <div className="flex text-sm gap-x-5">

            <div className="flex item-center gap-x-1">
              <input type="range" min={5} max={20} value={length} className="cursor-pointer" onChange={(evt) => {
                setLength(evt.target.value)
              }}/>
              <label>Length : {length}</label>
            </div>

            <div className="flex item-center gap-x-1">
              <input type="checkbox" defaultChecked={numAlw} id="numInput" onClick={() => {
                setNumAlw((prev) => !prev);
              }} className="cursor-pointer"/>
              <label htmlFor="numInput">Numbers</label>
            </div>

            <div className="flex item-center gap-x-1">
              <input type="checkbox" defaultChecked={charAlw} id="charInput" onClick={() => {
                setCharAlw((prev) => !prev);
              }} className="cursor-pointer"/>
              <label htmlFor="charInput">Characters</label>
            </div>

        </div>

      </div>
    </>
  );
}

export default App;
