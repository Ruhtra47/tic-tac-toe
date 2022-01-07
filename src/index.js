import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

const StyledTabuleiro = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabuleiroLinha = styled.div`
  display: flex;
  flex-direction: row;
`;

const Casa = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  font-size: 60;
  border: 1px solid #000;
`;

const App = () => {
  const jogoInicial = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [jogo, setJogo] = useState(jogoInicial);
  const [simboloAtual, setSimboloAtual] = useState("X");
  const [jogando, setJogando] = useState(true);

  const Tabuleiro = (j) => {
    return (
      <StyledTabuleiro>
        <TabuleiroLinha>
          <Casa data-pos="00" onClick={(e) => Jogar(e)}>
            {j[0][0]}
          </Casa>
          <Casa data-pos="01" onClick={(e) => Jogar(e)}>
            {j[0][1]}
          </Casa>
          <Casa data-pos="02" onClick={(e) => Jogar(e)}>
            {j[0][2]}
          </Casa>
        </TabuleiroLinha>
        <TabuleiroLinha>
          <Casa data-pos="10" onClick={(e) => Jogar(e)}>
            {j[1][0]}
          </Casa>
          <Casa data-pos="11" onClick={(e) => Jogar(e)}>
            {j[1][1]}
          </Casa>
          <Casa data-pos="12" onClick={(e) => Jogar(e)}>
            {j[1][2]}
          </Casa>
        </TabuleiroLinha>
        <TabuleiroLinha>
          <Casa data-pos="20" onClick={(e) => Jogar(e)}>
            {j[2][0]}
          </Casa>
          <Casa data-pos="21" onClick={(e) => Jogar(e)}>
            {j[2][1]}
          </Casa>
          <Casa data-pos="22" onClick={(e) => Jogar(e)}>
            {j[2][2]}
          </Casa>
        </TabuleiroLinha>
      </StyledTabuleiro>
    );
  };

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return (
        <button
          onClick={() => {
            Reiniciar();
            setJogando(true);
          }}
        >
          Jogar novamente
        </button>
      );
    }
  };

  const VerificarVitoria = () => {
    let pontos = 0;

    for (let i = 0; i < 3; i++) {
      pontos = 0;
      for (let j = 0; j < 3; j++) {
        if (jogo[i][j] === simboloAtual) {
          pontos++;
        }
      }

      if (pontos >= 3) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      pontos = 0;
      for (let j = 0; j < 3; j++) {
        if (jogo[j][i] === simboloAtual) {
          pontos++;
        }
      }

      if (pontos >= 3) {
        return true;
      }
    }

    pontos = 0;
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d]) {
        pontos++;
      }
    }

    if (pontos >= 3) {
      return true;
    }

    pontos = 0;
    let l = 0;
    for (let c = 2; c >= 0; c--) {
      if (jogo[l][c] === simboloAtual) {
        pontos++;
      }
      l++;
    }

    if (pontos >= 3) {
      return true;
    }

    return false;
  };

  const TrocaJogador = () => {
    simboloAtual === "X" ? setSimboloAtual("O") : setSimboloAtual("X");
  };

  const Posicao = (e) => {
    const p = e.target.getAttribute("data-pos");
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))];
    return pos;
  };

  const EspacoVazio = (e) => {
    if (jogo[Posicao(e)[0]][Posicao(e)[1]] === "") {
      return true;
    } else {
      return false;
    }
  };

  const Jogar = (e) => {
    if (jogando) {
      if (EspacoVazio(e)) {
        jogo[Posicao(e)[0]][Posicao(e)[1]] = simboloAtual;
        TrocaJogador();
        if (VerificarVitoria()) {
          TrocaJogador();
          alert("Jogador " + simboloAtual + " venceu!");
          setJogando(false);
        }
      } else {
        alert("Este espaço já foi selecionado");
      }
    }
  };

  const Reiniciar = () => {
    setJogando(false);
    setJogo(jogoInicial);
    setSimboloAtual("X");
  };

  return (
    <div>
      <div>
        <p>Quem joga: {simboloAtual}</p>
      </div>
      <div>{Tabuleiro(jogo)}</div>
      <div>{BtnJogarNovamente()}</div>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>,
  document.querySelector("#root")
);
