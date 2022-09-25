import React from "react";
import Words from "./Words";

import imagem0 from "../assets/0.png";
import imagem1 from "../assets/1.png";
import imagem2 from "../assets/2.png";
import imagem3 from "../assets/3.png";
import imagem4 from "../assets/4.png";
import imagem5 from "../assets/5.png";
import imagem6 from "../assets/6.png";
import gameover from "../assets/gameover.png";

export default function App() {

    const alfabeto =
        ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const imagens = [imagem0, imagem1, imagem2, imagem3, imagem4, imagem5, imagem6, gameover];

    const [habilitarInput, setHabilitarInput] = React.useState("disabled");
    const [acionarLetras, setAcionarLetras] = React.useState("disabled");
    const [habilitarLetras, setHabilitarLetras] = React.useState([...alfabeto]);
    const [palavra, setPalavra] = React.useState("");
    const [letraErrada, setLetraErrada] = React.useState(0);
    const [chute, setChute] = React.useState([...Words]);
    const [imagem, setImagem] = React.useState('');
    const [respostaInput, setRespostaInput] = React.useState('');
    const [botaoReiniciar, setBotaoReiniciar] = React.useState(true);
    Words.sort(embararalhar);

    function acionado() {
        const habilitarBotoes = [...acionarLetras, true];
        setHabilitarLetras(habilitarLetras);
        setHabilitarInput("enabled");
        setAcionarLetras(habilitarBotoes);
        setImagem(imagens[0]);
        setBotaoReiniciar(habilitarBotoes);

        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i];
                console.log(caracter)
                setPalavra(caracter.split(/ +/).join('').normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
            }
            return string;
        }
    }

    function embararalhar() {
        return Math.random() - 0.5;
    }

    function pressionarBotao(item) {
        setChute([...chute, item]);


        if (!palavra.includes(item)) {
            setLetraErrada(letraErrada + 1);
            console.log('contando + 1')
        }

        //BOTOES
        if (letraErrada >= 6) {
            alert(`A Palavra Secreta! ${palavra.toLocaleUpperCase()}\nNão foi dessa vez 🥹 BOTAO`);
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setLetraErrada(letraErrada + 6);
            setChute(palavra)
            console.log('entrou letra errada');
            setImagem(letraErrada + 6)
        }

    }
    console.log('saiu')

    function inserirPalavra() {
        //const palavra = [...respostaInput.split('').join(''), setRespostaInput];
        //setChute(palavra);
        console.log('entrou aqui')
        // setHabilitarInput("disabled");
        // setAcionarLetras("disabled");
        setRespostaInput('');

        //input palavra INCORRETA NAO ESTÁ RENDERIZANDO A PALAVRA
        if (!respostaInput.includes(palavra)) {
            const palavraErrada = letraErrada + 6;
            setChute(palavra)
            setLetraErrada(palavraErrada);
            console.log('palavra errada INPUT entrou')
            alert("PERDEU INPUT");
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setImagem(palavraErrada)
            //
        }
        //input palavra CORRETA
        if (respostaInput.includes(palavra)) {
            const palavraInput = palavra;
            setLetraErrada(palavraInput);
            alert("✨ Você GANHOU! ✨ INPUT")
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setChute(palavraInput)
            console.log('entrou input palavra certa')
        }
        //RENDERIZAR RESPOSTA SE CORRETA
        if (respostaInput.includes(palavra)) {
            setChute(respostaInput)
            setImagem(imagens[7])
        }
        if (palavra.includes(chute)) {
            alert('voce ganhou')
        }
    }

    function reiniciarJogo() {
        window.location.reload();
        setHabilitarLetras("enabled");
        setHabilitarInput("enabled");
        setAcionarLetras("enabled");
        setImagem(imagens[0]);
        setBotaoReiniciar(false)
    }
    return (
        <>
            <h1>Hangman Game</h1>
            <span className="palavra-button"><button onClick={acionado}>Escolher Palavra</button></span>
            {botaoReiniciar ? <button onClick={reiniciarJogo} className="reiniciarButton">Jogar Novamente</button> : ''}

            {imagem ? <img src={imagens[letraErrada]} alt="texto alternativo" /> : ''}



            {respostaInput.includes(palavra) && !chute.includes(palavra) ? palavra.split('').map((letra, i) => {
                return (
                    <div className="letrasNaTela"><span  className="letrasNaTelaVermelho" key={i}>{palavra.includes(letra) ? letra.toLocaleUpperCase() : ''}</span></div>)
            }) : palavra.split('').map((letra, i) => {
                return (
                    <div className="letrasNaTela"><span className="letrasNaTelaVerde" key={i}>{chute.includes(letra) ? letra.toLocaleUpperCase() : ''}</span></div>)
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
