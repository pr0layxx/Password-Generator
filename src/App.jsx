import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLenght] = useState("8");
  const [allowNumber, setAllownumber] = useState(true);
  const [allowChar, setAllowChar] = useState(false);
  const passwordGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) str += "1234567890";
    if (allowChar) str += "~!@#$%^&*()_+}{|:?><[]:";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowNumber, allowChar, setPassword]);

  //useRef
  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumber, allowChar, passwordGenerator]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 py-3 my-8 bg-gray-700
        text-orange-500 "
      >
        <h1 className=" text-white text-center my-3">Password Generator </h1>
        <div
          className="flex shadow rounded-lg
        overflow-hidden mb-4"
        >
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5
          shrink-0"
            onClick={copyPassToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowNumber}
              id="numberInput"
              onChange={() => {
                setAllownumber((prev) => !prev); // toggle the value
              }}
            />
          </div>
          <label htmlFor="numberInput"> Number </label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowChar}
              id="charInput"
              onChange={() => {
                setAllowChar((prev) => !prev); // toggle the value
              }}
            />
          </div>
          <label htmlFor="charInput">Character </label>
        </div>
      </div>
    </>
  );
}

export default App;
