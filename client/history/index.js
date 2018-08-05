import createHistory from 'history/createBrowserHistory';
import qs from 'qs';


const history = createHistory();

function addQuery(history){
    const location = history.location;
    history.location={...location,query:qs.parse(location.search,{ ignoreQueryPrefix: true })};
}

addQuery(history);

const unlisten = history.listen(()=>{
    addQuery(history);
});

const push = history.push;

export default history;
export {
    push,
    unlisten
};