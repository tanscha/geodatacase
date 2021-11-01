import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useState} from "react";

function App() {
    const [firstName, firstNameSetState] = useState("");
    const [lastName, lastNameSetState] = useState("");
    const [mail, mailSetState] = useState("");
    const [password, passwordSetState] = useState("");
    const [repeatPassword, rePasswordSetState] = useState("");
    const [simPassword, setSimilar] = useState(true);


    const passwordCheck = (event) => {
        if (!(password === repeatPassword)){
            setSimilar(false);
            console.log("Ulike passord")
            event.preventDefault();
        }
    }

    const register = (event) => {
        passwordCheck(event);
        postRegister().then(r => {
        }).catch(error => {
            console.log(error);
        })
    };
    async function postRegister(){
        await axios({
            method: 'post',
            url: 'http://localhost:8080/register',
            data: {
                firstName: firstName, lastName: lastName, mail: mail, password: password,
            }
        }).then(function (response){
            console.log('Data: ', response.data);
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data);
            }
        })
    }

  return (
    <div className="App">
      <header className="App-header">
          <div className="container">
              <div className="infoCol">
                  <h3 className="header2">Informasjon</h3>
                  <p className="infoText">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam nec enim eu nisl tincidunt egestas blandit ac elit.
                      Nulla facilisis, turpis id faucibus rutrum, nibh sem lacinia erat, venenatis imperdiet turpis ex sit amet mi.
                      In bibendum varius luctus. Sed aliquet sem eget aliquam aliquet.
                      Quisque tempus aliquam dui sit amet fermentum. Nulla faucibus ultrices commodo.
                      <br/>
                      <b>Nullam tincidunt</b> fermentum ligula, sed placerat nibh luctus malesuada.
                      Sed feugiat convallis risus, at tincidunt orci commodo a.
                      Proin pulvinar lacus aliquet enim blandit, et sollicitudin eros mattis.
                  </p>
                  <button className="registeredBtn">Jeg har konto</button>
              </div>
              <div className="regCol">
                  <h3 className="header1">Opprett bruker</h3>
                  <form onSubmit={event => register(event)} className="form">
                      <div className="form-group">
                          <b>Fornavn</b>
                          <br/>
                          <input id="firstname" type="text" name="firstname" size="sm"
                                     onChange={event => firstNameSetState(event.target.value)}
                              />
                      </div>
                      <div className="form-group">
                          <b>Etternavn</b>
                          <br/>
                          <input id="lastname" type="text" name="lastname" size="sm"
                                 onChange={(event => lastNameSetState(event.target.value))}
                          />
                      </div>
                      <div className="form-group">
                          <b>E-postadresse</b>
                          <br/>
                          <input id="mail" type="text" name="mail" size="50"
                                 required="*"
                                 onChange={(event => mailSetState(event.target.value))}
                          />
                      </div>
                      <div className="form-group">
                          <b>Passord</b>
                          <br/>
                          <input id="password" type="text" name="password" size="sm"
                                 required="*"
                                 onChange={(event => passwordSetState(event.target.value))}
                          />
                      </div>
                      <div className="form-group">
                          <b>Gjenta passord</b>
                          <br/>
                          <input id="repeatPassword" type="text" name="repeatPassword" size="sm"
                                 required="*"
                                 onChange={(event => rePasswordSetState(event.target.value))}
                          />
                      </div>
                      {!simPassword ?
                          <p style={{ color: "red", fontsize: "11pt"}}>
                              Ulike passord!
                          </p>
                      :
                          <></>
                      }
                      <div className="row">
                      <input type="checkbox" id="consent" name = "consent" required="*"/>
                      <label className="consent">Jeg godtar <a href="">Databehandlingsavtalen</a></label>
                      <button type="submit" className="submitBtn">Registrer</button>
              </div>
                  </form>
              </div>
          </div>
      </header>
    </div>
  );
}

export default App;
