import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/BackendURL.jsx";
// Import pages and component
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Home } from "./pages/Home.jsx";
import { Footer } from "./component/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx"
import { CheckoutForm } from "./pages/CheckoutForm.jsx"
import { Cancel } from "./pages/Cancel.jsx";
import { Success } from "./pages/Success.jsx";
import { Form } from "./pages/Form.jsx";
import { DisclaimerView } from "./pages/DisclimerView.jsx";
import { PrivacyPolicyView } from "./pages/PrivacyPolicyView.jsx";
import { PostEdit } from "./pages/PostEdit.jsx";
import { PostView } from "./pages/PostView.jsx";
import { Navbar } from "./component/Navbar.jsx"
import { AuthorList } from "./pages/AuthorList.jsx";
import { AuthorProfile } from "./pages/AuthorProfile.jsx"
import { ShoppingCart } from "./pages/ShoppingCart.jsx";
import { Mentories } from "./pages/Mentories.jsx";
import { Reviews } from  "./pages/Reviews.jsx";
import { PenToPrint } from "./pages/PenToPrint.jsx";
import { PostList } from "./pages/PostList.jsx";
import { Cover } from "./pages/Cover.jsx"; 
import { SignUpAdvisor } from "./pages/SignUpAdvisor.jsx";
import { SignUpMember } from "./pages/SignUpMember.jsx";
import { PenApi } from "./pages/PenApi.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain.
    // You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Cover />} path="/" />
                        <Route element={<Form/>} path="/form" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<SignUpAdvisor />} path="/signup-advisor" />
                        <Route element={<SignUpMember />} path="/signup-member" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<AuthorList />} path="/author-list" />
                        <Route element={<AuthorProfile />} path="/author-profile" />
                        <Route element={<PostList />} path="/posts" />
                        <Route element={<PostEdit />} path="/post-edit" />
                        <Route element={<PostView />} path="/post-view" />
                        <Route element={<Mentories />} path="/mentories" />
                        <Route element={<PenToPrint />} path="/pen-to-print" />
                        <Route element={<Reviews />} path="/reviews" />
                        <Route element={<ShoppingCart />} path="/shopping-cart" />
                        <Route element={<DisclaimerView />} path="/disclaimer-view" />
                        <Route element={<PrivacyPolicyView />} path="/privacy-policy-view" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                        <Route element={<CheckoutForm />} path="/checkout" />
                        <Route element={<Success />} path="?success=true"/>
                        <Route element={<Cancel />} path="?canceled=true"/>
                        <Route element={<PenApi/>} path="pen-api"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
