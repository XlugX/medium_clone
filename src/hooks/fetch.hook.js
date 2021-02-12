import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false),
          [response, setResponse] = useState(null),
          [error, setError] = useState(null),
          [options, setOptions] = useState({});
    const baseUrl = 'https://conduit.productionready.io/api';

    const setFetch = (options = {}) => {
        setOptions(options);
        setIsLoading(true);
    };

    useEffect(() => {
        if(!isLoading) {
            return
        }
        axios( baseUrl + url, options)
        .then(res => {
            console.log('result', res);
            setIsLoading(false);
            setResponse(res.data);
        }).catch(error => {
            setIsLoading(false);
            setError(error.response.data);
        })
    }, [isLoading, url, options]);
    return [{isLoading, response, error}, setFetch]
}

export default useFetch;