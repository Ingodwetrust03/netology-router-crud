import {useContext, useState} from "react";
import {PostsContext} from "./PostsContext";
import {redirect} from "../hooks/redirect";
import {Link} from "react-router-dom";


const CreatePost = () => {
    const {loading, error} = useContext(PostsContext)
    const[errorMessage, setErrorMessage] = useState(false)
    const[errorMessageText, setErrorMessageText] = useState("")
    const [content, setValue] = useState(
        {
            content: "",
        }
    );

    const getValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setErrorMessage(false)
        const {name, value} = e.target;
        setValue({...content, [name]: value});
    }


    const addNewPost = (e) => {
        e.preventDefault();
        const regExp = new RegExp('^\\w[^<>]+$')
        if (!content.content) {
            setErrorMessage(true)
            setErrorMessageText("Заполните текстовое поле")
        }else if(!regExp.test(content.content)) {
            setErrorMessage(true)
            setErrorMessageText("Спецсимволы не доспустимы")
        } else {
            setErrorMessage(false)
            setErrorMessageText("")
            fetch("http://localhost:7070/posts", {
                method: "POST",
                body: JSON.stringify({
                    content: content.content
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(()=>{setValue({content: ""})})


            redirect("/posts/");
             }
        }



    return (
        <div>

            {loading ? <p>Загрузка данных...</p> : ''}
            {error ? <p>Ошибка при передаче данных</p> : ''}
            <p>{errorMessageText}</p>

            <form className="row g-3"  onSubmit={addNewPost}>
                <Link to="/posts/" className="close__button"></Link>
                <div className="col-12">
                    <textarea className="form-control" id="newPost" name="content" placeholder="Введите сообщение" cols={30} rows={10} value={content.content} onChange={getValue}/>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={errorMessage}>Опубликовать</button>
                </div>
            </form>

        </div>
    )
}

export default CreatePost;