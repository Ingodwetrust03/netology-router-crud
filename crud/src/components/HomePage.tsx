import {useContext} from "react";
import {PostsContext} from "./PostsContext";
import {Link} from "react-router-dom";

const HomePage = () => {
    const {posts, loading, error} = useContext(PostsContext)

    return (
        <>
            {loading ? <p>Загрузка данных...</p> : ''}
            {error ? <p>Ошибка при передаче данных</p> : ''}

            <Link to="/posts/new" className="btn btn-primary new-post">Создать пост</Link>
            <ul className="posts__list">
                {posts.sort((a, b) =>  b.id - a.id).map(user => <li className="post" key={user.id}>
                    <Link to={`/posts/${user.id}`}>
                    <div className="user">
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/70" alt="User" />
                        </div>
                        <div>
                            <h4>User</h4>
                        </div>
                    </div>
                    <div className="content">
                        {user.content}
                    </div>
                    </Link>
                </li>
                )}
            </ul>
        </>
    )
}

export default HomePage;