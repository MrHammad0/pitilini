import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PUBLIC ROUTES
import Home from './landingPage/home';
import Login from './login/login';
import Signup from './login/signup'
import SignupCollaborator from './login/collaboratorSignup'
import MlcProduct from './stripeProduct/mlcUsaProduct';
import MlcUsaShip from './stripeProduct/mlcUsaShip'
import MlcEuropeProduct from './stripeProduct/mlcEuropeProduct';
import MlcEuropeShip from './stripeProduct/mlcEuropeShip'
import GetMlcShip from './admin/getMlcProduct'
import GetCUPShip from './admin/getCupProduct'
import GetUSDShip from './admin/getUsdProduct'
import Shipment from './stripeProduct/shipment'
//CUP

import CUPUsaProduct from './stripeProduct/CUPUsaProduct';
import CUPUsaShip from './stripeProduct/CUPUsaShip'
import CUPEuropeProduct from './stripeProduct/CUPEuropeProduct';
import CUPEuropeShip from './stripeProduct/CUPEuropeShip'

//USD
import USDUsaProduct from './stripeProduct/USDUsaProduct'
import USDUsaShip from './stripeProduct/USDUsaShip'
import USDEuropeProduct from './stripeProduct/USDEuropeProduct';
import USDEuropeShip from './stripeProduct/USDEuropeShip'
// USER PRIVATE ROUTES
import Wallet from './user/wallet/wallet'
import Set from './user/Set'
import Setting from './user/setting'
import Change from './user/change'
import ChangePassword from './user/changePassword'
import ClientDashboard from './pages/ClientDashboard';
import Dashboard from './user/dashboard';
import Transfer from './user/transfer/transfer';
import TransferFunds from './user/transfer/transferFunds';
import Invest from './investment/invest'
import Investment from './investment/investement'
import Recharge from './recharge/recharge'


// COLLABORATOR PRIVATE ROUTES
import CollaboratorWallet from './collaborator/wallet/wallet'
import CollaboratorCreateAccount from './Transaction/collaboratorCreateAccount';
import CollaboratorTransferFunds from './collaborator/transfer/collaboratorTransferFunds';
import Land from './collaborator/land';
import ChangeP from './collaborator/changeP'
import SettingC from './collaborator/settingC'
import InvestCollaborator from '../src/collaborator/investment/invest'
import RechargeCollaborator from '../src/collaborator/recharge/recharge'
import TransferCollaborator from '../src/collaborator/transfer/transfer'
import ChangeCollaboratorPassword from './collaborator/changePassword'
import CreateAccountC from './collaborator/createAccountC';

// ADMIN PRIVATE ROUTES
import AdminDash from './admin/adminDash'
import AdminTransfer from './admin/adminTransfer';
import AdminSetting from './admin/adminSetting';
import AdminChangePassword from './admin/adminChangePassword';
import AdminCreateAccount from './admin/adminCreateAccount';
import UserReports from './admin/userReports'
import CollaboratorReports from './admin/collaboratorReports'
import UserDetails from './admin/userDetails'
import CollaboratorDetails from './admin/collaboratorDetails'
import AdministratorTransferFunds from './admin/adminSendMoney'


// PENDING
import StripeForm from './stripe/stripeForm';
import StripeUserForm from './stripe/stripeUserform'
import LinkForm from './stripe/linkForm'
import CreateAccount from './Transaction/createAccount';
import ChatBot from './user/chatBot';
import ForgetMail from './forgetPass/mail';
import ForgetPass from './forgetPass/forgetPassword';
import MainDashboard from './mainDashboard'
import RechargeForm from './user/RechargeForm';
import StripeNetflix from './stripe/NetflixStripeForm';
import MobileRecharge from './collaborator/payWithLink'
import FourFour from './fourFour'
// PRIVATE FILE OF USER
import UserPrivateRoutes from './PRIVATEROUTES/userPrivateRoutes'
// PRIVATE FILE OF COLLABORATOR
import CollaboratorPrivateRoutes from './PRIVATEROUTES/collaboratorPrivateRoutes'
// PRIVATE FILE OF ADMIN
import AdminPrivateRoutes from './PRIVATEROUTES/adminPrivateRoutes'
import PayLinkGen from './collaborator/payLinkGenerate'
function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/collaborator/signup" element={<SignupCollaborator />} />
        <Route exact path="/collaborator/payment" element={<StripeForm />} />

        {/* USER PRIVATE ROUTES */}
        <Route path='user' element={<UserPrivateRoutes />}>
          <Route exact path="Set" element={<Set />} />
          <Route exact path="Setting" element={<Setting />} />
          <Route exact path="change" element={<Change />} />
          <Route exact path="change/Password" element={<ChangePassword />} />
          <Route path="investment/invest" element={<Invest />} />
          <Route path="investment" element={<Investment />} />
          <Route exact path="client" element={<ClientDashboard />} />
          <Route path="recharge" element={<Recharge />} />
          <Route exact path="transfer" element={<Transfer />} />
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="wallet" element={<Wallet />} />
          <Route exact path="upgrade/collaborator/payment" element={<StripeUserForm />} />
          <Route path="Transaction/createAccount" element={<CreateAccount />} />
          <Route path="Transact/funds" element={<TransferFunds />} />
        </Route>

        {/* COLLABORATOR PRIVATE ROUTES */}
        <Route path='collaborator' element={<CollaboratorPrivateRoutes />}>
          <Route path="investment" element={<InvestCollaborator />} />
          <Route path="recharge" element={<RechargeCollaborator />} />
          <Route exact path="transfer" element={<TransferCollaborator />} />
          <Route exact path="wallet" element={<CollaboratorWallet />} />
          <Route path="Transaction/createAccount" element={<CreateAccountC />} />
          <Route path="Transact/funds" element={<CollaboratorTransferFunds />} />
          <Route path="changeP" element={<ChangeP />} />
          <Route path="changePassword" element={<ChangeCollaboratorPassword />} />
          <Route path="settingC" element={<SettingC />} />
          <Route path="land" element={<Land />} />
          <Route path="payment/link/generate" element={<PayLinkGen/>} />
        </Route>

        {/* ADMIN PRIVATE ROUTES */}
        <Route path='admin' element={<AdminPrivateRoutes />}>
          <Route path="user/reports" element={<UserReports />} />
          <Route path="collaborator/reports" element={<CollaboratorReports />} />
          <Route path="collaborator/details" element={<CollaboratorDetails />} />
          <Route path="user/details" element={<UserDetails />} />
          <Route path="Transact/funds" element={<AdministratorTransferFunds />} />
          <Route path="Transaction/createAccount" element={<AdminCreateAccount />} />
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="transfer" element={<AdminTransfer />} />
          <Route path="setting" element={<AdminSetting />} />
          <Route path="change/password" element={<AdminChangePassword />} />
        </Route>

        {/* PENDING */}
        <Route path="/link/payment/:paymentLinkId" element={<MobileRecharge />} />
        <Route exact path="/dashboard" element={<MainDashboard />} />
        <Route exact path="/netflix/payment" element={<StripeNetflix />} />
        <Route exact path="/stripe/link/form" element={<LinkForm />} />
        <Route path="/chat/ai" element={<ChatBot />} />
        <Route path="/forget/mail" element={<ForgetMail />} />
        <Route path="/forgetPass/:token" element={<ForgetPass />} />
        <Route path="/recharge" element={<RechargeForm />} />
        <Route path="/shipment" element={<Shipment/>} />
        <Route path="/mlc/usa/product" element={<MlcProduct/>} />
        <Route path="/mlc/Usa/ship" element={<MlcUsaShip/>} />
        <Route path="/mlc/Europe/product" element={<MlcEuropeProduct/>} />
        <Route path="/mlc/Europe/ship" element={<MlcEuropeShip/>} />
        <Route path="/get/mlc/ship" element={<GetMlcShip/>} />
        {/* // */}
        <Route path="/CUP/usa/product" element={<CUPUsaProduct/>} />
        <Route path="/CUP/Usa/ship" element={<CUPUsaShip/>} />
        <Route path="/CUP/Europe/product" element={<CUPEuropeProduct/>} />
        <Route path="/CUP/Europe/ship" element={<CUPEuropeShip/>} />
        <Route path="/get/CUP/ship" element={<GetCUPShip/>} />
         {/* // */}
         <Route path="/USD/usa/product" element={<USDUsaProduct/>} />
        <Route path="/USD/Usa/ship" element={<USDUsaShip/>} />
        <Route path="/USD/Europe/product" element={<USDEuropeProduct/>} />
        <Route path="/USD/Europe/ship" element={<USDEuropeShip/>} />
        <Route path="/get/USD/ship" element={<GetUSDShip/>} />
        

        <Route path="*" element={<FourFour/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
