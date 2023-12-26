import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserSignInForm from "./components/userSignInForm";
import { BlogEditor } from "./components/blog-editor.component";
import HomePage from "./components/home-component";
import { Layout } from "./components/layout";
import BlogPage from "./components/blog-page";
import UserSignUpForm from "./components/userSignUpForm";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/queries";
import { AuthProvider } from "./context/auth/authContext";
import RequireAuth from "./common/RequireAuth";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {/* <Router>
         <Navbar />
        
        <Routes>
           <Route path="/signup" element={<UserAuthForm />} />
           <Route path="/" element={<HomePage />} />
           <Route path="/blogeditor" element={<BlogEditor />} />
           <Route path="/blog" element={<Blog/>}/>
           <Route path="/signin" element={<UserSignForm />} />
           <Route path="blog/:blog_id" element={<BlogPage />} />
        
        </Routes>
        
      </Router> */}
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="signup" element={<UserSignUpForm />} />
              <Route path="home" element={<HomePage />} />
              <Route path="signin" element={<UserSignInForm />} />
              <Route path="blog/:blog_id" element={<BlogPage />} />
            </Route>
            <Route
              path="/blogeditor"
              element={
                <RequireAuth>
                  <BlogEditor />
                </RequireAuth>
              }
            />

            {/* <Route path="/blog" element={<Blog/>}/> */}
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
