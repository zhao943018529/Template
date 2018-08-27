import { connect } from 'react-redux';
import IndexUser from '../components/IndexUser';
import { createRequest } from '../../../../../utilities/fetch';

const mapStateToProps = state => ({
    user: state.user,
    article: state.article,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createRequest: (...args) => {
        dispatch(createRequest(...args))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexUser);

