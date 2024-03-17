import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState();
  const [color, setColor] = useState("blue");

  //  use Refhook
  const passwordrefrance = useRef(null);

  const PasswordGernator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0987654321";
    if (CharAllowed) str += "(){}&^%$#@!";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, CharAllowed, setpassword]);

  const CopyPasswordToClipboard = useCallback(() => {
    passwordrefrance.current?.select();
    passwordrefrance.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setColor("blueviolet");
  }, [password]);
  useEffect(() => {
    PasswordGernator();
  }, [length, numberAllowed, CharAllowed, PasswordGernator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg text-center px-4  py-3 my-8 text-orange-500 bg-gray-700 ">
        <h1 className="text-white text-center my-3">PasswordGernator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="PasswordOnly"
            readOnly
            ref={passwordrefrance}
          />
          <button
            onClick={CopyPasswordToClipboard}
            className="outline-none text-white px-7 py-2.5 shring-0"
            style={{ background: color }}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbersInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbersInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
