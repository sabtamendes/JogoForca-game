import React from "react";
import Words from "./Words";

import imagem0 from "../assets/0.png";
import imagem1 from "../assets/1.png";
import imagem2 from "../assets/2.png";
import imagem3 from "../assets/3.png";
import imagem4 from "../assets/4.png";
import imagem5 from "../assets/5.png";
import imagem6 from "../assets/6.png";

export default function App() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const imagens = [imagem0, imagem1, imagem2, imagem3, imagem4, imagem5, imagem6];

    const [habilitarInput, setHabilitarInput] = React.useState("disabled");
    const [acionarLetras, setAcionarLetras] = React.useState("disabled");
    const [habilitarLetras, setHabilitarLetras] = React.useState([...alfabeto]);
    const [letra, setLetra] = React.useState("");
    const [letraErrada, setLetraErrada] = React.useState(0);
    const [chute, setChute] = React.useState([...Words]);
    const [imagem, setImagem] = React.useState("");
    const [respostaInput, setRespostaInput] = React.useState('');
    const [botaoReiniciar, setBotaoReiniciar] = React.useState(false)
    Words.sort(embararalhar);

    function acionado() {
        setHabilitarInput("enabled");
        setHabilitarLetras(habilitarLetras);
        setImagem(imagem0);
        setAcionarLetras("enabled");

        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i];
                console.log(caracter)
                setLetra(caracter.split('').join(''));
            }
            return string;
        }
    }

    function embararalhar() {
        return Math.random() - 0.5;
    }

    function pressionarBotao(item, index) {
        let regex = /^[a-z]+$/i;
        Words.forEach(palavra => {
            let valido = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/ +/).every(parte => regex.test(parte));
            return setChute([...chute, item, valido]);
        });

        if (!letra.includes(item)) {
            setLetraErrada(letraErrada + 1);
            // setHabilitarInput("disabled");
            // setAcionarLetras("disabled");
        }

        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i].toLocaleUpperCase()
                if (letraErrada >= 6) {
                    alert(`A Palavra Secreta é ${caracter}! \nNão foi dessa vez 🥹`)
                    setBotaoReiniciar(true);
                    setHabilitarInput("disabled");
                    setAcionarLetras("disabled");
                    setLetraErrada(letraErrada + 6);
                    
                   
                }
            }
            return string;
        }

    }

    function inserirPalavra() {
        const palavra = [...respostaInput.split('').join(''), setRespostaInput];
        setChute(palavra);
        setRespostaInput('');

       
        if(!respostaInput.includes(palavra)){
            setLetraErrada(letraErrada + 6);
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setBotaoReiniciar(true)
        }
    }

    return (
        <>
            <h1>Hangman Game</h1>

            {botaoReiniciar ? <button onClick={() => window.location.reload(false)} className="reiniciarButton">Jogar Novamente</button> : <span className="palavra-button"><button onClick={acionado}>Escolher Palavra</button></span>}

            {imagem ? <img src={imagens[letraErrada]} alt="texto alternativo" /> : " "}

            {letra.split('').map((letra, i) => {
                return (
                    <span className="letrasNaTela" key={i}>{chute.includes(letra) ? letra.toLocaleUpperCase() : ''}</span>)
            })}


            <ul>
                <li>
                    {acionarLetras === "disabled"
                        ? habilitarLetras.map((item, index) =>
                            <button type="button" key={index} className="colorDisabled" disabled><p>{item}</p></button>)
                        : habilitarLetras.map((item, index) =>
                            <button onClick={() => pressionarBotao(item, index)} type="button" key={index} className={chute.includes(item) ? "colorDisabled" : "colorEnabled"} enabled><p>{item}</p></button>)
                    }
                </li>

            </ul>
            <div className="palavra"> <span>Já sei a palavra!</span>
                {
                    habilitarInput === "disabled"
                        ? <input type="text" className="Disabled" disabled></input>
                        : <input onChange={(e) => setRespostaInput(e.target.value)} value={respostaInput} type="text" className="Enabled" enabled></input>
                } <button onClick={inserirPalavra}>Chutar</button></div>
        </>
    )
}
