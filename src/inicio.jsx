import { Pantalla } from "./Componentes/pantalla";
import { evaluate } from "mathjs";
import { useState } from "react";
import React from "react";

export const Inicio = () => {
  const [input, setInput] = useState("");
  const [operador, setOperador] = useState(false);

  const agregarInput = (e) => {
    const value = e.target.value;
    const esNumero = !isNaN(value);

    if (!esNumero && input === "") {
      return;
    }

    if (!esNumero && operador) {
      return;
    }

    setOperador(!esNumero);
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setOperador(false);
  };

  const result = () => {
    try {
      setInput(evaluate(input).toString());
      setOperador(false);
    } catch (error) {
      setInput("Error");
    }
  };

  const signos = ["+", "-", "*", "/"];

  return (
    <div className="bg-gradient-to-b from-[#c1afa0]/10 to-[#6c584c] min-h-screen p-4">
      <div className="justify-items-center p-4 m-4 border border-black rounded-lg">
        <aside className="justifyitems-center">
          <Pantalla input={input} />
        </aside>
        <div className="grid grid-cols-2 border border-black rounded-lg">
          <div className="grid grid-cols-3 m-4 p-4 justify-items-stretch">
            {[...Array(10).keys()].map((num) => (
              <button
                key={num}
                onClick={agregarInput}
                value={num}
                className="border border-black rounded-lg text-center m-2 hover:scale-105 hover:text-white hover:bg-[#1a1a1a] transition-all duration-0.5"
              >
                {num}
              </button>
            ))}
            <button
              onClick={agregarInput}
              value={"."}
              className="border border-black rounded-lg text-center m-2 hover:scale-105 hover:text-white hover:bg-[#1a1a1a] transition-all duration-0.5"
            >
              .
            </button>
            <button
              onClick={result}
              className="border border-black rounded-lg text-center m-2 hover:scale-105 hover:text-[#1a1a1a] hover:bg-white transition-all duration-0.5"
            >
              =
            </button>
          </div>
          <div className="grid grid-cols-2 m-4 p-4 justify-items-stretch">
            {signos.map((signo) => (
              <button
                key={signo}
                className="border rounded-lg border-black text-center m-2 hover:scale-105 hover:text-white hover:bg-[#1a1a1a] transition-all duration-0.5"
                onClick={agregarInput}
                value={signo}
                disabled={operador}
              >
                {signo}
              </button>
            ))}
            <button
              className="border  border-black rounded-lg text-center m-2 hover:scale-105 hover:text-white hover:bg-red-500 transition-all duration-0.5 "
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
