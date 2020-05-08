import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import UpdateCategory from './updateCategoryComponent';
import CategoryList from './CategoryListComponent';
import NewCategory from './NewCategoryComponent';
import { connect } from 'react-redux'
import {
	fetchCategories,
	postCategory,
	putCategory,
	removeCategory
	//   invalidateSubreddit
} from '../../redux/ActionTypes'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Category extends Component {
	constructor(props) {
		super(props);
		let { match } = props
		

		this.state = {
			modalId: null,
		};

		this.match = match;
		// this.toggleModal = this.toggleModal.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.removeCategory = this.removeCategory.bind(this);

	}

	showModal(id) {
		this.setState(
			{
				modalId: id,
			});
	};
	hideModal(id) {
		this.setState({
			modalId: null,
		})
	}

	removeCategory(id) {
		const children = this.props.categories.items.filter((category) => category.parent == id)
			.map((children) => children.name)
			.join(", ")
		if (children.length != 0) {
			alert("Cannot delete category due to having the following children: \n" + children)
		} else {
			this.props.removeCategory(id)
		}
	}


	componentDidMount() {
		this.props.fetchCategories();
	}

	render() {
		const updateCategory = ({ match }) => {
			return (
				<UpdateCategory
					categories={this.props.categories}
					category_id={match.params.categoryId}
				/>
			)
		};
		if (this.props.categories.isFetching) {
			alert("loading")
			return (
				<div>Loading</div>
			)
		}

		if (this.props.categories.errMess) {
			alert(this.props.errMEss)
			return (<div>{this.props.categories.errMess}</div>)
		}

		if (this.props.categories.items && this.match.isExact) {
			return (
				<div>
					<CategoryList {...(this.props)}
						removeCategory={this.removeCategory} />
					<NewCategory
						categories={this.props.categories.items}
						postCategory={this.props.postCategory} />

				</div>
			)
		}
		else{
			return(
				<Route path={`${this.props.match.path}/:categoryId`}  component={updateCategory} />
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		categories: state.Categories
	}
}
const mapDispatchToProps = (dispatch) => ({
	postCategory: (name, parent) => dispatch(postCategory(name, parent)),
	putCategory: (id, name, parent) => dispatch(putCategory(id, name, parent)),
	removeCategory: (id) => dispatch(removeCategory(id)),
	fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);
