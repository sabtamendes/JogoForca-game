import { Body } from "../style"
import { Words } from "./Words"
export default function App() {

  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  return (
    <>
      <h1>Hangman Game</h1>
      <span className="palavra-button"><button>Escolher Palavra</button></span>
        <img src="./Assets/imagem0.png" /> 
      <ul>
        <li>{alfabeto.map(item => <button><p>{item}</p></button>)}</li>
      </ul>
      <div className="palavra"> <span>Já sei a palavra!</span> <input type="text"></input> <button>Chutar</button></div>
    </>
  )
}
