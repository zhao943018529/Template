import {connect} from 'react-redux';
import HomeView from '../components/HomeView';
import {createRequest} from '../../../utilities/fetch';

const mapStateToProps=state=>({
    article:state.article,
    user:state.user,
});

const mapDispatchToProps = dispatch=>({
    dispatch,
    createRequest:(...args)=>{
        dispatch(createRequest(...args));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(HomeView);