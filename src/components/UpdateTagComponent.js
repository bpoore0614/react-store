import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fetchParents, putTag } from '../redux/ActionTypes';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Link, StaticRouter } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import TagForm from './TagFormComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class UpdateTag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tag: null,
            tagIdNotFound: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const id = this.props.tag_id
        this.props.putTag(id, values.name, values.parent);
        this.setState({ redirect: true })
    }

    async componentDidMount() {
        try {
            await this.props.fetchParents(this.props.tag_id);
            if (this.props.tags) {
                const tag = this.props.tags.items.filter((tag) => tag._id == this.props.tag_id)[0]
                if (tag) {
                    this.setState({ tag: tag })
                } else {
                    const error = "Tag Id is not a valid tag Id";
                    this.setState({
                        tagIdNotFound: true,
                        error: error
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    render() {
alert(JSON.stringify(this.state))
        if (this.props.parents.didInvalidate || this.state.tagIdNotFound) {
            return (
                <div>error {this.state.error + " " + this.props.tags.errMess + " " + this.props.parents.errMess} </div>
            )
        } else if (this.state.tag) {
            return (
                <div>
                    <TagForm
                        parents={this.props.parents.tags}
                        tag={this.state.tag}
                        putTag={this.props.putTag}
                        handleSubmit={this.handleSubmit.bind(this)}

                    />
                </div>
            )
        } else if (this.props.parents.isFetching) {
            return (
                <div>Loading</div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchParents: (tagId) => dispatch(fetchParents(tagId)),
    putTag: (tagId, name, parent) => dispatch(putTag(tagId, name, parent))
})
const mapStateToProps = state => {
    return {
        parents: state.Parents,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTag)
