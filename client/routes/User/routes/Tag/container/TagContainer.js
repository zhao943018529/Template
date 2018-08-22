import { connect } from "react-redux";
import TagView from '../components/TagView';
import { createRequest } from '../../../../../utilities/fetch';


const mapStateToProps = state => ({
    tag: state.tag
});

const mapPropsToDispatch = dispatch => ({
    createRequest: (...args) => {
        dispatch(createRequest(...args));
    },
    dispatch,
});

export default connect(mapStateToProps, mapPropsToDispatch)(TagView);