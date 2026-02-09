import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <OrderPage />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <PaymentPage />
            </Layout>
          }
        />
        <Route
          path="/success"
          element={
            <Layout>
              <SuccessPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
