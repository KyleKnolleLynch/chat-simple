import React from "react";
import ReactDOM from "react-dom";
import { Container } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Chat from 'chat/Chat';

import "./index.css";

const App = () => (
  <Container>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam aspernatur recusandae totam earum blanditiis qui dolor at incidunt fugit inventore reiciendis ducimus unde cum est praesentium eos laboriosam, doloremque, corporis dolores cupiditate asperiores magnam exercitationem ipsum. Ratione assumenda commodi voluptate molestiae doloribus debitis, repudiandae earum voluptates vel ab quaerat id?</p>
    <h1>Chat..</h1>
    <Chat />
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur et voluptatem atque non placeat quam asperiores, laudantium officia amet possimus quibusdam, consectetur maxime, cumque hic alias quo quisquam minus ad iure ex! Voluptates, libero explicabo? Hic voluptatum quae odio dolores?</p>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
