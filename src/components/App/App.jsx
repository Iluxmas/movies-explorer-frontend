import React from "react";
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import "./App.css";

export default function App() {

  return (

    <div className="page">
      {/* <Header isLogged={isLogged} onLogout={handleLogout} email={email} /> */}
      <Main></Main>
      <Footer/>
    </div>
  );
}
