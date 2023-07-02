import {useContext} from "react";
import {PostsContext} from "./PostsContext";
import {useParams} from "react-router";
import {useNavigate, Link} from "react-router-dom";



const GetPost = () => {
    const {loading, posts} = useContext(PostsContext)
    const navigate = useNavigate();
    const params = useParams()

    const deletePost = () => {
        fetch(`http://localhost:7070/posts/${params.postId}`, {
            method: "DELETE",
        })
        navigate("/posts/");
    }


    return (
        <>
        {loading ? <p>Загрузка данных...</p> : ''}
        {!params ? <p>Элемент с таким айди не найден</p> : ''}

        {posts.map(elem => elem.id == params.postId ?
            <div className="postBlock" key={elem.id}>
                <Link to="/posts/" className="close__button"></Link>
                <div className="post" >
                    <div className="user">
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/70" alt="User" />
                        </div>
                        <div>
                            <h4>User</h4>
                        </div>
                    </div>

                    <div className="content">
                        {elem.content}
                    </div>
                    <div className="btns-row">
                        <Link to={`/posts/redact/${elem.id}`}  className="btn btn-primary">Изменить</Link>
                        <button type="button" className="btn btn-danger" onClick={deletePost}>Удалить</button>
                    </div>
                </div>
            </div>
        : "")}
        </>
    )
}

export default GetPost;