import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import "./App.css";
import Store from "./Pages/Store";
import Home from "./Pages/Home";
import About from "./Pages/About";
import LayOut from "./components/Layouts/LayOut";
import ContactUs from "./Pages/ContactUs";
import ProductDetail from "./components/products/ProductDetail";
import AuthContext from "./store/AuthContext";
import AuthForm from "./components/Auth/AuthForm";
import CartContext from "./store/CartContext";

function App() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    if (authCtx.isLogin) {
      const email = localStorage.getItem("email");
      fetch(
        `https://crudcrud.com/api/a45653ee98cb48c7be256782a3687989/${email}`
      )
        .then((res) => {
          return res.json().then((data) => {
            for (const key in data) {
              cartCtx.getItem({ ...data[key]});
              console.log(data[key]._id);
            }
          });
        })
        .catch((err) => alert(err.message));
    }
  }, [authCtx.isLogin]);
  return (
    <>
      <LayOut>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/Home" />
          </Route>
          {!authCtx.isLogin && (
            <Route path="/login">
              <AuthForm />
            </Route>
          )}
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Store" exact>
            {authCtx.isLogin && <Store />}
            {!authCtx.isLogin && <Redirect to="./login" />}
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/contact">
            <ContactUs />
          </Route>
          <Route path="/Store/:id">
          {!authCtx.isLogin ? history.goBack() : <ProductDetail />}
          </Route>
          <Route path="*">
            <Redirect to="./" />
          </Route>
        </Switch>
      </LayOut>
    </>
  );
}
export default App;