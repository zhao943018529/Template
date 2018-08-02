import createHistory from 'history/createBrowserHistory';
import qs from 'qs';


const history = createHistory();

function addQuery(history){
    const location = history.location;
    history.location={...location,query:qs.parse(location.search,{ ignoreQueryPrefix: true })};
}

addQuery(history);

export const unlisten = history.listen(()=>{
    addQuery(history);
});

export default history;