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
	postCategory,
	putCategory,
	removeCategory
	//   invalidateSubreddit
} from '../../redux/ActionTypes'
import AddCategoryModal from './AddCategoryModal';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Category extends Component {
	constructor(props) {
		super(props);
		let { match } = props


		this.state = {
			isAddCategoryModalOpen: false,
		};

		this.match = match;
		this.toggleModal = this.toggleModal.bind(this);
		this.isModalOpen = this.isModalOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeCategory = this.removeCategory.bind(this);
	}

	toggleModal(modal) {
		switch (modal) {
			case "toggleAddCategoryModal":
				return this.setState({ isAddCategoryModalOpen: !this.state.isAddCategoryModalOpen });
		}
	}

	isModalOpen(modal) {
		switch (modal) {
			case "isAddCategoryModalOpen":
				return this.state.isAddCategoryModalOpen;
		}
	}

	handleSubmit(values) {
		this.toggleModal("toggleAddCategoryModal");
		this.props.postCategory(values.name, values.parent);
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
			return (
				<div>Loading</div>
			)
		}

		if (this.props.categories.errMess) {
			alert(this.props.errMEss)
			return (<div>{this.props.categories.errMess}</div>)
		}

		if (window.location.pathname == "/admin/categories/all") {
			return (
				<div>
					<CategoryList {...(this.props)}
						removeCategory={this.removeCategory} />
					<AddCategoryModal
						categories={this.props.categories.items}
						postCategory={this.props.postCategory}
						isModalOpen={this.isModalOpen}
						toggleModal={this.toggleModal}
						handleSubmit={this.handleSubmit}
					/>

				</div>
			)
		}

		if (this.props.addCategory) {
			return (
				<AddCategoryModal
					categories={this.props.categories.items}
					postCategory={this.props.postCategory}
					isModalOpen={this.isModalOpen}
					toggleModal={this.toggleModal}
					handleSubmit = {this.handleSubmit}
				/>

			)
		}
		else {
			return (
				<Route path={`${this.props.match.path}/:categoryId`} component={updateCategory} />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);
