import { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import "./styles/App.css";
import { usePosts } from "./components/hoocks/usePosts";
import PostService from "../src/API/PostService";
import BikeLoader from "./components/UI/loader/BikeLoader";
import { useFetching } from "./components/hoocks/useFetching";
import { getPageCout } from "./utils/page.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(4);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCout(totalCount, limit));
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={fetchPosts}>
        Get posts from https://jsonplaceholder.typicode.com/posts
      </MyButton>
      <MyButton
        style={{ marginTop: "30px", marginLeft: "20px" }}
        onClick={() => setModal(true)}
      >
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Mistake has happened {postError}</h1>}
      {isPostsLoading ? (
        <BikeLoader />
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="List of posts # 1"
        />
      )}
    </div>
  );
}

export default App;
