import React from "react";
import Words from "./Words";

import imagem0 from "../assets/imagem0.png";
// import imagem1 from "../assets/imagem1.png";
// import imagem2 from "../assets/imagem2.png";
// import imagem3 from "../assets/imagem3.png";
// import imagem4 from "../assets/imagem4.png";
// import imagem5 from "../assets/imagem5.png";
// import imagem6 from "../assets/imagem6.png";

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const [habilitarInput, setHabilitarInput] = React.useState("disabled");
    const [habilitarLetras, setHabilitarLetras] = React.useState([...alfabeto]);
    const [acionarLetras, setAcionarLetras] = React.useState("disabled");
    // const [finalizada, setFinalizada] = React.useState([]);
    const [imagem, setImagem] = React.useState("");
    const [underline, setUnderline] = React.useState("");
    const [caractere, setCaractere] = React.useState("");
    const [palavra, setPalavra] = React.useState([...Words])
    const [palavrasCorretas, setPalavrasCorretas] = React.useState([]);
    const [chute, setChute] = React.useState([])


    Words.sort(embararalhar)
    function acionado(index, item) {
        setHabilitarInput("enabled");
        setHabilitarLetras(habilitarLetras);
        setImagem(imagem0);
        setAcionarLetras("enabled");
        setCaractere([]);

        //transformando o Array em string
        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            setUnderline(string.join(' '))
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i];
                console.log(caracter.split('').join(''))
                setUnderline(caracter.split('').join(''));
                setCaractere(caracter)
                setPalavra(caracter);
            }
            return string;
        }
    }

    function embararalhar() {
        return Math.random() - 0.5;
    }

    return (
        <>
            <h1>Hangman Game</h1>

            <span className="palavra-button"><button onClick={acionado}>Escolher Palavra</button></span>

            {imagem ? <img src={imagem} alt="texto alternativo" /> : " "}

            {underline.split('').map((letra, i) => {
                return (
                    <span className="letrasNaTela" key={i}>{chute.includes(letra) ? letra : ''}</span>)
            })}

            <ul>
                <li>
                    {acionarLetras === "disabled"
                        ? habilitarLetras.map((item, index) =>
                            <button type="button" key={index} className="colorDisabled" disabled><p>{item}</p></button>)
                        : habilitarLetras.map((item, index) =>
                            <button type="button" key={index} className="colorEnabled" enabled><p>{item}</p></button>)
                    }
                </li>

            </ul>
            <div className="palavra"> <span>Já sei a palavra!</span>
                {
                    habilitarInput === "disabled"
                        ? <input type="text" className="Disabled" disabled></input>
                        : <input type="text" className="Enabled" enabled></input>
                } <button>Chutar</button></div>
        </>
    )
}
