import {useNavigate} from "react-router-dom";



const useRedirect = (url) => {
   const navigate = useNavigate();
   navigate(url);
}

export default useRedirect;
