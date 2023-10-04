import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './style/App.css';

import ScrollTop from './utils/scrollTop';
import Header from './components/Header/Header';
import Register from './components/Auth/Register';
import Restoring from './components/Auth/Restoring';
import Shipped from './components/Auth/Shipped';
import NewPass from './components/Auth/NewPass';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/notPages/NoPages';
import { useEffect, useState } from 'react';
import Invitation from './pages/Invitation/Invitation';
import axios from 'axios';
import ShippedTwo from './components/Auth/ShippedTwo';
import Statisticss from './pages/statistics/Statistics';
import Advertisers from './pages/statistics/Advertisers/Advertisers';
import InternalPage from './pages/statistics/InternalPage/InternalPage';
import Venues from './pages/statistics/Venues';
import Advertising from './pages/statistics/Advertising/Advertising';
import Auctions from './pages/statistics/Auctions';
import { AuthProvider, useAuth } from './AuthContext';
import Advertisements from './pages/statistics/Advertisements';
import Manager from './pages/statistics/Manager';
import CampaignDetails from './pages/statistics/InternalStatic';
import SyteDetails from './pages/statistics/InternalSyte';
import Moderation from './pages/Moderation/Moderation';


function App() {

  const [userMe, setUserMe] = useState([])

  const [userPrav, setuserPrav] = useState([])

  const [SuperUser, setSuperUser] = useState([])

  const apiUrl = process.env.REACT_APP_API_URL;

  const loginEndpoint = '/api/users_admin/me';

  const token = localStorage.getItem('access_token');

  const { refreshToken } = useAuth();

  useEffect(() => {
  
      const url = `${apiUrl}${loginEndpoint}`;
  
          axios.get(url, {

              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
              }

          })
          .then(res => {

            setUserMe(res.data.user.role)

            setuserPrav(res.data.user.role)

            setSuperUser(res.data.user.is_superuser)

          })

          .catch(error => {

            if (error.response && error.response.status === 401) {

              refreshToken();

            } else {
              
            }
              
          });

  }, []);

  const [campId, setcampId] = useState([])

  const commonRoute = (

    <>

          <Route path="/admin_home" element={<Admin />} />

          <Route path="/campaign-details/:campaign_id" element={<CampaignDetails />} />

          <Route path="/syte-details/:syte_id" element={<SyteDetails />} />

          <Route path="/Moderation" element={<Moderation />} />

          { (userPrav.includes('admin') || SuperUser ) &&  

          <Route path="/invitation" element={<Invitation userMe={userMe} />} />

          }

          <Route path='/statistics'  element={<Statisticss />} />

          {/* <Route path='/Advertisers'  element={<Advertisers />} /> */}

          { (userPrav.includes('sitemoderator') || SuperUser ) &&       

          <Route path='/Venues'  element={<Venues />} />

          }

          <Route path='/InternalPage/:camp_id'  element={<InternalPage campId={campId}/>} />
          

          {(userPrav.includes('lotmoderator') || SuperUser ) && (

             <Route path='/Auctions' element={<Auctions />} />

          )}
          

          {(userPrav.includes('advmoderator') || SuperUser ) &&

          <>

            <Route path='/Advertising'  element={<Advertising  setcampId={setcampId}  />} />

          </>  

          }


          {(userPrav.includes('manager') || userPrav.includes('supermanager') || SuperUser ) &&

          <Route path='/Manager'  element={<Manager />} />

          }
          

    </>

  );



  return (

    <BrowserRouter>

    <div className="app">

      <ScrollTop />

      {token ? <Header userPrav={userPrav} SuperUser={SuperUser} /> : null }

        <Routes>

          <Route path='/'  element={ token ? <Navigate to="/admin_home" /> : <Navigate to="/Login" /> } />

          <Route path='/Login'  element={<Register />} />

          <Route path='/restoring'  element={<Restoring />} />

          <Route path='/shipped'  element={<Shipped />} />

          <Route path='/passwordsuccessfully'  element={<ShippedTwo />} />

          <Route path='/newpassword/:token'  element={<NewPass />} />

          <Route path="*" element={<Navigate to="/404" />} />

          <Route path='/404' element={<NotFound />} />

          {token && commonRoute }
          

        </Routes>

    </div>

    </BrowserRouter>
  
  );
}

export default App;
