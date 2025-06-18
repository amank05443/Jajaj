import {useState,useEffect,useCallback,useMemo} from 'react';

export default function useTableApi(table, options ={}) {
    const {
        id=null,
        query={},
        autoFetch=true,
        related=[],
        dependencies = [],
    } = options;

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(autoFetch);
    const [error,setError] = useState(null);

    const buildUrl = useCallback(
        (overrideId = id) => {
            const base = `/api/${table}/${overrideId !== null ? `${overrideId}/` : ""}`;
            const params = new URLSearchParams();

            //Add query params
            for (let key in query){
                const value = query[key];
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(key,v));
                } else if (value !== undefined && value !== null){
                params.append(key,value);
                }
            }
            //Add related (include)
            if(related.length > 0) {
                params.append("include",related.join(","));
            }
            const queryString = params.toString();
            return queryString ? `${base}?${queryString}` : base;
        },
        [table,id,JSON.stringify(query),related.join(",")]
    );

    const url = useMemo(() => buildUrl(),[buildUrl]);

    const fetchData = useCallback(async() => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                credentials:'include', //for session auth
            });
            if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    },[url]);

    useEffect(() => {
        if(autoFetch) {fetchData();}
    },[fetchData,autoFetch,...dependencies]);

    const create = useCallback(
        async (payload)=> {
            try {
                const res = await fetch(`/api/$(table)/`,{
                    method : 'POST',
                    headers : {'Content-Type':'application/json'},
                    body: JSON.stringify(payload),
                });
                if(!res.ok) throw new Error(`Create failed:${res.status}`);
                const result = await res.json();
                setData(result);
                return result;
            } catch (err) {
                setError(err.message);
                throw err;
            }
        },
        [table]
    );

    const update = useCallback(
        async (updateId,updateData,method)=> {
            try {
                    const res = await fetch(`${url}${updateId}/`,{
                    method,
                    headers : {'Content-Type':'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(updateData),
                });
                if(!res.ok) throw new Error(`Update failed:${res.status}`);
                const result = await res.json();
                setData(result);
                return result;
            } catch (err) {
                setError(err.message);
                throw err;
            }
        },
        [table]
    );

    return {
        data,
        loading,
        error,
        refetch : fetchData,
        create,
        update,
    };
}