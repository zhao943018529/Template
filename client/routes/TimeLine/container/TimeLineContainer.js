import { connect } from 'react-redux';
import TimeLineView from '../components/TimeLineView';
import { createRequest } from '../../../utilities/fetch';

const mapStateToProps = state => ({
    article: state.article,
    user: state.user,
    tag: state.tag,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createRequest: (...args) => {
        dispatch(createRequest(...args));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineView);