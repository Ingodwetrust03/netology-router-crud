import {useContext, useState} from "react";
import {PostsContext} from "./PostsContext";
import {useParams} from "react-router";
import useRedirect from "../hooks/useRedirect";
import {Link} from "react-router-dom";




const RedactorPost = () => {
    const {loading, posts} = useContext(PostsContext)
    const params = useParams()
    const[errorMessage, setErrorMessage] = useState(false)
    const[errorMessageText, setErrorMessageText] = useState("")
    let postIdToNumber = +params.postId
    let postContent = posts.filter(el => el.id === postIdToNumber ? el.content : "")
    const [content, setValue] = useState(
        {content: postContent[0].content}
    );

    const getValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setErrorMessage(false)
        const {name, value} = e.target;
        setValue({...content, [name]: value});
    }


    const redactPost = (e) => {
        e.preventDefault();
        const regExp = new RegExp('^[<>{}&;"«»\']+$')
        if (!content.content) {
            setErrorMessage(true)
            setErrorMessageText("Заполните текстовое поле")
        }else if(!regExp.test(content.content)) {
            setErrorMessage(true)
            setErrorMessageText("Спецсимволы не доспустимы")
        } else {
            setErrorMessage(false)
            setErrorMessageText("")
            fetch(`http://localhost:7070/posts/${params.postId}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: params.postId,
                    content: content.content
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(()=>{
                    setValue({content: ""})
                    useRedirect(`/posts/${params.postId}`);
                })


        }
    }



    return (
        <div>
            {loading ? <p>Загрузка данных...</p> : ''}
            <p>{errorMessageText}</p>

            <form className="row g-3" key={params.postId} onSubmit={redactPost}>
                <Link to="/posts/" className="close__button"></Link>
                <div className="col-12">
                    <textarea className="form-control" id="newPost" name="content" cols={30} rows={10} value={content.content} onChange={getValue}/>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={errorMessage}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default RedactorPost;