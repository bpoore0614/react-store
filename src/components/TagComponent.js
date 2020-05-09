import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import NewTag from './NewTagComponent';
import TagList from './TagList';
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
			modalId: null,
		};

		this.match = match;
		// this.toggleModal = this.toggleModal.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.removeTag = this.removeTag.bind(this);

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

		if (this.props.tags.items && this.match.isExact) {
			return (
				<div>
					<TagList
					{...(this.props)}
						removeTag={this.removeTag} />
					<NewTag
						tags={this.props.tags.items}
						postTag={this.props.postTag} />

				</div>
			)
		}
		else{
			return(
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

