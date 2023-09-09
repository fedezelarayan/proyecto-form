import Edit from "./views/Edit";
import Home from "./views/Home";
import Form from "./views/form";
import Formularios from "./views/formularios";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Switch>
        <Route exact path = "/" component={Home} />
        <Route path = "/survey" component={Form} />
        <Route path = "/surveys" component={Formularios} />
        <Route path = "/edit" component={Edit} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
