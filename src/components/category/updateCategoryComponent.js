import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fetchCategoryParents, putTag } from '../../redux/ActionTypes';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Link, StaticRouter } from 'react-router-dom';
import CategoryForm from './CategoryFormComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class UpdateTag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            category: null,
            categoryIdNotFound: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const id = this.props.category_id
        this.props.putCategory(id, values.name, values.parent);
        this.setState({ redirect: true })
    }

    async componentDidMount() {
        try {
            await this.props.fetchCategoryParents(this.props.category_id);
            if (this.props.categories) {
                const category = this.props.categories.items.filter((category) => category._id == this.props.category_id)[0]
                if (category) {
                    this.setState({ category: category })
                } else {
                    const error = "Tag Id is not a valid tag Id";
                    this.setState({
                        categoryIdNotFound: true,
                        error: error
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    render() {
        if (this.props.parents.didInvalidate || this.state.categoryIdNotFound) {
            return (
                <div>error {this.state.error + " " + this.props.categories.errMess + " " + this.props.parents.errMess} </div>
            )
        } else if (this.state.category) {
            return (
                <div>
                    <CategoryForm
                        parents={this.props.parents.categories}
                        category={this.state.category}
                        putCategory={this.props.putCategory}
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
    fetchCategoryParents: (categoryId) => dispatch(fetchCategoryParents(categoryId)),
    // putTag: (tagId, name, parent) => dispatch(putTag(tagId, name, parent))
})
const mapStateToProps = state => {
    return {
        // tags: state.Tags,
        parents: state.Parents,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTag)
