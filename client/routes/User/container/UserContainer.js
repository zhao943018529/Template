import { connect } from 'react-redux';
import UserView from '../components/UserView';

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
