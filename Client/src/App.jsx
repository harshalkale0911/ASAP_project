import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./Component/landing";
import UpdateUsers from "./UpdateUser";
import Users from "./Users";
import Create from "./create";
import LoginPage from "./Component/login";
import Homepage from "./Component/home";




function App() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />}/>
          <Route path="/update" element={<UpdateUsers />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/landing" element={<Landing />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
