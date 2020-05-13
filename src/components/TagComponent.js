import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import TagList from './TagList';
import AddTagModal from "./AddTagModal";
import UpdateTag from './UpdateTagComponent';
import { connect } from 'react-redux'
import {
	fetchTagsIfNeeded,
	postTag,
	fetchParents,
	putTag,
	removeTag
	//   invalidateSubreddit
} from '../redux/ActionTypes'
import UpdateTagComponent from './UpdateTagComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Tag extends Component {
	constructor(props) {
		super(props);
		const { match } = props

		this.state = {
			isAddTagModalOpen: false,
		};

		this.match = match;
		this.toggleModal = this.toggleModal.bind(this);
		this.isModalOpen = this.isModalOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeTag = this.removeTag.bind(this);

	}

	toggleModal(modal) {
		switch (modal) {
			case "toggleAddTagModal":
				return this.setState({ isAddTagModalOpen: !this.state.isAddTagModalOpen });
		}
	}

	isModalOpen(modal) {
		switch (modal) {
			case "isAddTagModalOpen":
				return this.state.isAddTagModalOpen;
		}
	}

	handleSubmit(values) {
		this.toggleModal("toggleAddTagModal");
		this.props.postTag(values.name, values.parent);
	}

	removeTag(id) {
		const children = this.props.tags.items.filter((tag) => tag.parent == id)
			.map((children) => children.name)
			.join(", ")
		if (children.length != 0) {
			alert("Cannot delete tag due to having the following children: \n" + children)
		} else {
			this.props.removeTag(id)
		}
	}


	componentDidMount() {
	}

	render() {
		const updateTag = ({ match }) => {
			return (
				<UpdateTagComponent
					tags={this.props.tags}
					tag_id={match.params.tagId}
				/>
			)
		};
		if (this.props.tags.isFetching) {
			return (
				<div>Loading</div>
			)
		}

		if (this.props.tags.errMess) {
			return (<div>{this.props.tags.errMess}</div>)
		}

		// return(<Route exact path='/tags/:tagId' component={updateTag} />)

		if (window.location.pathname == "/admin/tags/all") {
			return (
				<div>
					<TagList
						{...(this.props)}
						removeTag={this.removeTag} />
					<AddTagModal
						tags={this.props.tags.items}
						postTag={this.props.postTag}
						handleSubmit={this.handleSubmit}
						isModalOpen={this.isModalOpen}
						toggleModal={this.toggleModal} />

				</div>
			)
		}

		if (this.props.addTag) {
			return (
				<AddTagModal
					tags={this.props.tags.items}
					postTag={this.props.postTag}
					handleSubmit={this.handleSubmit}
					isModalOpen={this.isModalOpen}
					toggleModal={this.toggleModal} />
			)
		}
		else {
			return (
				<Route exact path={`${this.props.match.path}/:tagId`} component={updateTag} />
			)
		}
	}
}

// function mapStateToProps(state) {
// 	const { items: parents } = state.Parents
// 	const { isFetching, lastUpdated, items: tags } = state.Tags
// 		|| {
// 		isFetching: true,
// 		items: []
// 	}


// 	return {
// 		parents,
// 		tags,
// 		isFetching,
// 		lastUpdated
// 	}
// }


const mapStateToProps = state => {
	return {
		tags: state.Tags,
		// categories: state.Categories,
	}
}
const mapDispatchToProps = (dispatch) => ({
	postTag: (name, parent) => dispatch(postTag(name, parent)),
	putTag: (id, name, parent) => dispatch(putTag(id, name, parent)),
	removeTag: (id) => dispatch(removeTag(id)),
	// fetchParents: (id) => dispatch(fetchParents(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

