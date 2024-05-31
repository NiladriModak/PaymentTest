import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pay from "./component/Pay";
import StudentReg from "./component/StudentReg";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/payment" element={<Pay />} />
        <Route path="/studentRegister" element={<StudentReg />} />
      </Routes>
    </Router>
  );
}

export default App;
