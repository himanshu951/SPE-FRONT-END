import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import GamerLoginPage from './components/GamerLogin';
import AdminLoginPage from './components/AdminLogin';
import HomePage from './components/Landingpage';
import GamerRegisterPage from './components/GamerRegister';
import AdminHome from './components/AdminHome';
import Navbar from './components/navbar';
import AdminGamerDetails from './components/adminGamerDetails';
import AddCategory from './components/adminAddcategory';
import AdminAddGame from './components/adminAddGame';
import GamerHome from './components/gamerHome';
import AdminAddBill from './components/adminGenerateBill';
import FormWala from './components/formWala';
import AdminSeeBill from './components/adminSeeBill';
import AdminViewByGid from './components/adminviewBillsByGid';
import ViewBill from './components/viewbill';
import GamerViewBill from './components/gamerSeeBill';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
      <Router>
        <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/admin/login" element={<AdminLoginPage/>}/>
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/gamer/login" element={<GamerLoginPage/>}/>
        <Route path="/gamer/register" element={<GamerRegisterPage/>}/>
        <Route path="/admin/gamer/:id" element={<AdminGamerDetails/>}/>
        <Route path="/admin/addcat" element={<AddCategory />}/>
        <Route path="/admin/addgame" element={<AdminAddGame/>}/>
        <Route path="/gamer/home" element={< GamerHome/>}/>
        <Route path="/admin/generatebill" element={< AdminAddBill/>} />
        <Route path="/admin/seebill" element={< AdminSeeBill/>} />
        <Route path="/admin/view/:id" element={< AdminViewByGid/>} />
        <Route path="/admin/bill/:billid/:gamerid" element={< ViewBill/>} />
        <Route path="/gamer/seebill" element={< GamerViewBill/>} />
        </Routes>
        
      </Router>
      <Footer/>
    </div>
  );
}

export default App;