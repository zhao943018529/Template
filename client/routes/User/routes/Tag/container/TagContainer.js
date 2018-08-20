import { connect } from "react-redux";
import TagView from '../components/TagView';
import { createRequest } from '../../../../../utilities/fetch';


const mapStateToProps = state => ({
    tag: state.tag
});

const mapPropsToDispatch = {
    createRequest
};

export default connect(mapStateToProps, mapPropsToDispatch)(TagView);