import React from "react";
import Words from "./Words";
import styled from "styled-components";

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
    const [letras, setLetras] = React.useState([...alfabeto]);
    const [palavra, setPalavra] = React.useState("");
    const [letraErrada, setLetraErrada] = React.useState(0);
    const [chute, setChute] = React.useState([...Words], 0);
    const [imagem, setImagem] = React.useState('');
    const [respostaInput, setRespostaInput] = React.useState('');
    const [botaoReiniciar, setBotaoReiniciar] = React.useState(false);
    const [colorGreen, setColorGreen] = React.useState(false);
    Words.sort(embararalhar);

    function acionado() {
        const habilitarBotoes = [...acionarLetras, true];
        setLetras(letras);
        setHabilitarInput("enabled");
        setAcionarLetras(habilitarBotoes);
        setImagem(imagens[0]);
        // setBotaoReiniciar(habilitarBotoes);

        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i];
                if (caracter === chute) {
                    alert("Você ganhou")
                }
                console.log(caracter)
                setPalavra(caracter.split(/ +/).join('').normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
                // setPalavra(caracter.split(" ").join(''));
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
        }
        if (letraErrada >= 6) {
            alert(`A Palavra Secreta! ${palavra.toLocaleUpperCase()}\nNão foi dessa vez 🥹 BOTAO`);
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setLetraErrada(letraErrada + 6);
            setChute(palavra)
            console.log('entrou letra errada');
            setImagem(letraErrada + 6)
            setBotaoReiniciar(true)
            setColorGreen(false)
        }
    }

    function removerSpecials(index) {
        console.log(index)
        adicionarLetrasEspeciais(index)
        let texto = index
        texto = texto.replace(/[A]/, "ÀÁÂÃÄÅ");
        texto = texto.replace(/[a]/, "àáâãäå");
        texto = texto.replace(/[E]/, "EÈÉÊË");
        texto = texto.replace(/[ÍÌÎ]/, "I");
        texto = texto.replace(/[Ç]/, "C");
        texto = texto.replace(/[ç]/, "c");
        return texto.replace(/[^a-z0-9]/gi, '');

    }
    function adicionarLetrasEspeciais(index) {
        let palavras = index;
        for (let i = 0; i < palavras.length; i++) {
            if (removerSpecials(palavras[i]) === palavra) {
                console.log(`A palavra ${palavras[i]} foi encontrada`);
                setChute(palavras[i])
            }
        }
    }

    function inserirPalavra() {
        setRespostaInput('');

        if (!respostaInput.includes(palavra)) {
            const palavraErrada = letraErrada + 6;
            setChute(palavra)
            setLetraErrada(palavraErrada);
            console.log('palavra errada INPUT entrou')
            alert("PERDEU INPUT");
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setImagem(palavraErrada);
            setColorGreen(false)
        }
        if (respostaInput.includes(palavra)) {
            alert("✨ Você GANHOU! ✨");
            const palavraInput = palavra;
            setChute(palavraInput);
            setLetraErrada(palavraInput);
            setHabilitarInput("disabled");
            setAcionarLetras("disabled");
            setBotaoReiniciar(true);
            setColorGreen(true)
        }
        if (respostaInput.includes(palavra)) {
            setChute(respostaInput);
            setImagem(imagens[7])
            setColorGreen(true)
        }
        if (palavra.includes(chute)) {
            alert('voce ganhou')
        }
    }

    function reiniciarJogo() {
        window.location.reload()
        const habilitarBotoes = [...acionarLetras, true];
        setLetras(letras);
        setHabilitarInput("enabled");
        setAcionarLetras(habilitarBotoes);
        setImagem(imagens[0]);
        botaoReiniciar(true)
        for (let i = 0; i < Words.length; i++) {
            let string = Words[i].toString().split(' ');
            for (let i = 0; i < string.length; i++) {
                let caracter = string[i];
                if (caracter === chute) {
                    alert("Você ganhou")
                }
                console.log(caracter)
                setPalavra(caracter.split(/ +/).join('').normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
            }
            return string;
        }
    }

    return (
        <>
            <Header>Hangman Game</Header>

            {botaoReiniciar || letraErrada >= 7 || (respostaInput === palavra && respostaInput !== palavra)
                ? <ButtonRestartGame onClick={reiniciarJogo}>Jogar Novamente</ButtonRestartGame>
                : <ButtonWordChooser onClick={acionado}>Escolher Palavra</ButtonWordChooser>
            }

            {imagem ? <Image src={imagens[letraErrada]} alt="texto alternativo" /> : <Image src={imagens[0]} alt="texto alternativo" />}

            {palavra.split('').map((letra, i) => {
                return (
                    <div className="letrasNaTela">
                        <span className={colorGreen ? 'letrasNaTelaVerde' : 'letrasNaTelaVermelho'} key={i}>
                            {chute.includes(letra) ? letra.toLocaleUpperCase() : ''}</span>
                    </div>
                )
            })}

            <List>
                <li>
                    {acionarLetras === "disabled"
                        ? letras.map((item, index) =>
                            <button type="button" key={index} className="colorDisabled" disabled><p onClick={() => removerSpecials(index)}>{item}</p></button>)
                        : letras.map((item, index) =>
                            <button onClick={() => pressionarBotao(item, index)} type="button" key={index} className={chute.includes(item) ? "colorDisabled" : "colorEnabled"} enabled><p>{item}</p></button>)
                    }
                </li>
            </List>

            <Footer> <span>Já sei a palavra!</span>
                {
                    habilitarInput === "disabled"
                        ? <input type="text" className="Disabled" disabled></input>
                        : <input onChange={(e) => setRespostaInput(e.target.value)} value={respostaInput} type="text" className="Enabled" enabled></input>
                } <button onClick={inserirPalavra}>Chutar</button>
            </Footer>
        </>
    )
}

const Header = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
    color: chocolate;
    font-family: 'Holtwood One SC', serif;
    font-size: 70px;
    text-shadow: black 0.1em 0.1em 0.2em;
`
const ButtonWordChooser = styled.button`
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 4px;
    color: white;
    margin-top: 2%;
    margin-left: 65%;
    margin-bottom: 13%;
    font-size: 15px;
    background-color: chocolate;
    padding: 5px;
    cursor: pointer;
`
const ButtonRestartGame = styled.button`
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 4px;
    color: white;
    margin-top: 2%;
    margin-left: 65%;
    font-size: 15px;
    background-color: rgb(41, 80, 157);
    padding: 5px;
    cursor: pointer;
    margin-bottom: 13%;
`
const Image = styled.img`
    margin: auto 26%;
    width: 150px;
    height: 200px;
    position: fixed;
    top:18%;
`
const List = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    position: fixed;
    top: 46%;
    left: 28.5%;
    bottom: 0;
/* button{
    width: 30px;
    height: 35px;
    border: none;
    border-radius: 5px;
    margin: 10px;
    color: white;
    background-color: chocolate;
    cursor: pointer;
} */
`
const Footer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 39vw;
    left: 16%;
    bottom: 0;
span{
    color: chocolate;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 5px;
    text-shadow: rgb(8, 8, 8) 0.1em 0.1em 0.2em;
    font-weight: 600;
}
input{
    width: 50vw;
    height: 31.5px;
}
button{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: chocolate;
    border-color: chocolate;
    padding: 5px;
    border-radius: 2px;
    color: white;
    margin-left: 5px;
    width: 50px;
    height: 31.5px;
    cursor: pointer;
}
`
