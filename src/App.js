import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import "./styles/App.css";
import { usePosts } from "./components/hoocks/usePosts";
import PostService from "../src/API/PostService";
import BikeLoader from "./components/UI/loader/BikeLoader";
// import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./components/hoocks/useFetching";
import { getPageCout } from "./utils/page.jsx";
// import City from "./components/City";
// import CitiesList from "./components/CitiesList";
import ClassCounter from "./components/ClassCounter";

function App() {
  // const [cities, setCities] = useState([
  //   { name: "London", description: "is the capital of GB" },
  //   { name: "Kyiv", description: "is the capital of Ukraine" },
  // ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [posts, setPosts] = useState([]);
  // const [jetlms, setJetlms] = useState({ name: "user", password: "0123" });
  // const [jetlms, setJetlms] = useState("0123");
  // const changePassword = () => {
  //   setJetlms({ name: "user", password: "01234567" });
  //   console.log("jetlms", jetlms);
  // };

  // const [posts, setPosts] = useState([
  //   { id: "1", title: "Javascript", body: "Javascript - programming language" },
  //   { id: "2", title: "Java", body: "Java - programming language" },
  //   { id: "3", title: "Pyton", body: "Pyton - programming language" },
  // ]);
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
  // console.log(totalPages);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // async function fetchPosts() {
  //   setIsPostsLoading(true);
  //   const posts = await PostService.getAll();
  //   setTimeout(() => {
  //     setPosts(posts);
  //     setIsPostsLoading(false);
  //   }, 5000);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // const handlerChangeCity = (description) => {
  //   setCities(
  //     cities.map((city, index) => {
  //       if (index === currentIndex) {
  //         return { ...city, description: description };
  //       }
  //       return city;
  //     })
  //   );
  // };
  // const handlerSelectCity = (currentIndex) => {
  //   setCurrentIndex(currentIndex);
  // };

  return (
    <div className="App">
      {/* <ClassCounter/> */}
      {/* <City city={cities[currentIndex]} onChangeCity={handlerChangeCity} />
      <CitiesList cities={cities} onSelectCity={handlerSelectCity} /> */}

      {/* <button onClick={changePassword}>{jetlms.name}</button> */}
      <MyButton style={{ marginTop: "30px" }} onClick={fetchPosts}>
        Get posts from https://jsonplaceholder.typicode.com/posts
      </MyButton>
      <MyButton style={{ marginTop: "30px", marginLeft: "20px" }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && 
      <h1>Mistake has happened {postError}</h1>}
      {isPostsLoading ? (
        <BikeLoader/>
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
