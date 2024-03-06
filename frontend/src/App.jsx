import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header";
import { CreateListings } from "./pages/CreateListings";
import { ViewListings } from "./pages/ViewListings";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/create-listings" element={<CreateListings />}></Route>
        <Route path="/view-listings" element={<ViewListings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
