import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

const useJsonFetch = (url, opts) => {
    const[data, setData] = useState(opts)
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    let location = useLocation();

    useEffect( () => {
            let controller

            const stop = () => {
                if (controller) {
                    controller.abort()
                }
            }

            const fetchData = async () => {
                try {
                    stop()

                    controller = new AbortController();
                    setLoading(true)

                    const response = await fetch(url, controller.signal)
                    if(!response.ok) {
                        throw new Error ("Ошибка при передаче данных")
                    }
                    const json = await response.json()
                    setData(json)
                } catch (error) {
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
            }


            fetchData();

            return () => {
                stop()
            }

        }, [location])

    return [data, loading, error]

}

export default useJsonFetch