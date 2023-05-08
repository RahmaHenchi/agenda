import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';

import AddEvent from './pages/AddEvent';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateEvent from './pages/UpdateEvent';
import Events from './pages/Events';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

import { login } from './redux/actions/userActionCreators';

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  if (token && user) {
    dispatch(login(user, token))
  }
  return (
    <>
    <Loading />
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/events' component={Events} />
            <Route path='/addEvent' component={AddEvent} />
            <Route path='/updateEvent/:id' component={UpdateEvent} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
