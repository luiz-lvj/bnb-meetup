import { ethers } from "ethers";
import { NftAbi } from "./nft";
import { useState } from "react";

import styled from "styled-components";

const nftAddress = "0x8139c60eF7a41E0474ACE2abE6329D88342Cdf19";
const sortAddress = "0x0A10aeeb6f283Ce38E1840b3FC64E0BB190EAAed";



function App() {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");

  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");

  async function connectMetamask(){
    if(!window.ethereum){
      alert("Install Metamask");
      return;
    }
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = provider.getSigner();
      setSigner(web3Signer);
      const accounts = await provider.send('eth_requestAccounts' ,[]);
      setAccount(accounts[0]);

    } catch(err){
      console.log(err);
      alert("Error Connecting MEtamask!");
    }

  }
  async function sendNft(){
    try{
      const NftContract = new ethers.Contract(nftAddress, NftAbi, signer);
      if(address == ""){
        alert("Endereço vazio!");
        return;
      }

      console.log(address)

      if(!ethers.utils.isAddress(address)){
        alert("Endereço inválido!");
        return;
      }
      const tx = await NftContract.functions.mint(address);
      await tx.wait();

      console.log(tx);

      alert("Concluído!");
        
    } catch(err){
      console.log(err);
      alert("Error");
    }
  }
  return (
    <StyleApp>
      <div className="App">

        <button onClick={connectMetamask}>
        {account == "" ? "Conectar Metamask": `${account.slice(0, 8)}...`  }</button>

        <input 
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Digite seu endereço"
        ></input>

        <button
        onClick={sendNft}
        >Receber NFT</button>

        
        
      </div>
    </StyleApp>
  );
}

const StyleApp = styled.div`

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: yellow;
    color: black;
  }

  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  button, input {
    margin: 8px;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
  }

  button {
    cursor: pointer;
    background-color: black;
    color: yellow;
  }

  input {
    width: 300px;
  }
`;


export default App;
