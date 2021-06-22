import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Expenses from './components/Expenses';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/expenses/:date">
          <Expenses />
        </Route>
        <Redirect to={{ pathname: '/expenses/2021-01' }} />
      </Switch>
    </Router>
  );
}

export default App;
