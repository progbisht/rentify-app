import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
// import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacePage from './pages/PlacePage';
import PlacesPage from './pages/PlacesPage';
import NewPlaceForm from './pages/NewPlaceForm';
import WishlistPage from './pages/WishlistPage';



// axios.defaults.baseURL = 'https://rentify-app-wr4l.onrender.com';
// axios.defaults.withCredentials = true

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout/> } >
          <Route index element={ <IndexPage /> } />
          <Route path='login' element={ <LoginPage /> } />
          <Route path='register' element={ <RegisterPage /> } />
          <Route path='account' element={ <ProfilePage/> } />
          <Route path='account/wishlist' element={ <WishlistPage/> } />
          <Route path='account/places' element={ <PlacesPage /> } />
          <Route path='account/places/new' element={ <NewPlaceForm/> } />
          <Route path='account/places/:id' element={ <PlacePage/> } />
          <Route path='account/places/edit/:id' element={ <NewPlaceForm/> } />
          <Route path='place/:id' element={ <PlacePage/> }/>
        </Route>
      </Routes>  
    </UserContextProvider>
  );
}

export default App;
