import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleAlbumPage from './components/SingleAlbumPage';
import LandingPage from './components/LandingPage';
import Entities from './components/Entities';
import AddEntityPage from './components/AddEntityPage';
import UpdateEntitiesPage from './components/UpdateEntitiesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/album" element={<SingleAlbumPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/entities' element={<Entities/>}/>
        <Route path='/add-entity' element={<AddEntityPage />} />
        <Route path="/update-entity/:id" element={<UpdateEntitiesPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
