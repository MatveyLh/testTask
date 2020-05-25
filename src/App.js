import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import './App.css';
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";


const App = () => {
    let title = useRef(null);
    let description = useRef(null);
    const [posts,setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(10);


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://itstrana.vh118.hosterby.com/start_up/api/startap/startap/');
            setPosts(res.data.results);
            setLoading(false);
        }
        fetchPosts();

    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    function handleSubmit(event) {
        event.preventDefault();
        let title = document.querySelector('.title');
        let description = document.querySelector('.description');
        const dataPost = {
            title: title.value,
            description: description.value,
            image: null,
            price: 1,
            cost: 1,
            state: 1,
            incubator: "",
            investor: null,
            n_shots: false,
            n_investor: false,
            n_markets: false,
            url_news: null,
            url: "",
            registration_time: "2020-04-01T10:05:16.385218+03:00",
            creation_time: "2019.0",
            type: 0,
            phone: "",
            author: 1
        }
        axios.post(`http://itstrana.vh118.hosterby.com/start_up/api/startap/startap/`, dataPost)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            } )
    }
    return (
        <div className={'container mt-5'}>
            <h1 className={'text-primary mb-3'}>
                MyApp
            </h1>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>

            <div>
                <form onSubmit={handleSubmit.bind(this)}>
                    <input className={'title'} ref={title} type='text' required={true}/>
                    <input className={'description'} ref={description} type='text' required={true}/>
                    <input type='submit' required={true}/>
                </form>
            </div>
        </div>
    )
}
export default App;