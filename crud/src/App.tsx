
import './App.css'
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomePage from "./components/HomePage";
import CreatePost from "./components/CreatePost";
import GetPost from "./components/GetPost";
import {PostsProvider} from "./components/PostsContext";
import Page404 from "./components/Page404";
import RedactorPost from "./components/RedactorPost";


function App() {


  return (
    <BrowserRouter>
      <div className="container">
          <PostsProvider>
        <Routes>
            <Route path="/"  element={<HomePage />} />
          <Route path="/posts/"  element={<HomePage/>} />
            <Route path="posts">
                <Route path="new" element={<CreatePost />} />
                <Route path=":postId" element={<GetPost />} />
                <Route path="redact/:postId" element={<RedactorPost />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
          </PostsProvider>

      </div>
    </BrowserRouter>
  )
}

export default App
