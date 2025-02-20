import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header/Header";
import { CreateListings } from "./pages/CreateListings";
import { ViewListings } from "./pages/ViewListings";
import { Listing } from "./pages/Listing";
import { SearchPage } from "./pages/SearchPage";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/listings/search" element={<SearchPage />}></Route>
        <Route path="/listings/create" element={<CreateListings />}></Route>
        <Route path="/listings/view" element={<ViewListings />}></Route>
        {/* Path with placeholder must be at the end else /listings/create
        and /listings/view will never be reached, always reaching /listings/:id instead */}
        <Route path="/listings/:id" element={<Listing />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
