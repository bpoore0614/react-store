import React, { Component } from 'react';

// import Menu from './MenuComponent';
// import Header from './HeaderComponent';
// import Footer from './FooterComponent';
// import DishDetail from './DishdetailComponent';
import Tag from './TagComponent';
import Review from './review/ReviewComponent';
import UpdateReview from './review/UpdateReviewComponent';
import Image from './image/ImageComponent';
import AdminProduct from './product/ProductComponent';
import UserProduct from './product/UserProductComponent';
import UserProudctList from './product/UserProductList';
import NotFoundPage from './notFoundPage';
import Unathorized from './NotAuthorizedPage';
// import Contact from './ContactComponent';
// import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UpdateTagComponent from './UpdateTagComponent';
import UpdateCategoryComponent from './category/updateCategoryComponent'
import Category from '../components/category/CategoryComponent';
import Header from './header/HeaderComponent';
import {
  putTag,
  postTag,
  removeTag,
  fetchTagsIfNeeded,
  fetchParents,
  fetchTags,
  fetchCategories,
  fetchImages,
  fetchProducts,
  removeCategory,
  postCategory,
  putCategory,
  loginUser,
  logoutUser
  //   invalidateSubreddit
} from '../redux/ActionTypes'
// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const axios = require('axios').default;

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { response: null }
  }


  componentDidMount() {
    this.props.fetchTags();
    this.props.fetchCategories();
    this.props.fetchImages();
    this.props.fetchProducts();
  }

  render() {
    const updateTag = ({ match }) => {
      return (
        <UpdateTagComponent
          tag_id={match.params.tagId}
        />
      )
    };


    const TagWithoutId = ({ match }) => {
      return (
        <Tag />
      )
    }


    const CategoriesWithoutId = ({ match }) => {
      return (
        <Category
        />
      )
    };

    const updateCategory = ({ match }) => {
      return (
        <UpdateCategoryComponent
        category_id={match.params.categoryId}
        />
      )
    };

    const ReviewWithId = ({ match }) => {
      return (
        <UpdateReview
          reviewId={match.params.reviewId}
        />
      )
    };

    

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAdmin
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/unathorized',
            state: { from: props.location }
          }} />
      )} />
    );

    return (
      <div>
        <Header
        // loginUser = {this.props.loginUser}
        // logoutUser = {this.props.logoutUser}
        // isAuthenticated = {this.props.auth.isAuthenticated}
        // authErr = {this.props.auth.errMess}
        // token = {this.props.auth.token}
        />

        {/* <Header /> */}
        {/* <TransitionGroup> */}
        {/* <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> */}
        <Switch location={this.props.location}>

          <PrivateRoute path="/admin/tags" component={Tag} />
          <PrivateRoute exact path="/admin/images/:imageId" component={Image} />
          <PrivateRoute path="/admin/images" component={Image} />
         
          {/* <Route path='/users/:id' render={(props) => <UserDetail {...props}/>}/> */}
          <Route exact path='/tags' component={Tag} />
          {/* <PrivateRoute path='/tags/:tagId' component={updateTag} /> */}
          <PrivateRoute path='/admin/categories' component={Category} />
          <PrivateRoute path='/admin/products' component={AdminProduct}/> 
          <Route exact path='/product/all' component={() => <UserProudctList items ={this.props.products.items} />} />
          <Route exact path='/product/:productName' component={UserProduct} /> 
          <Route path='/product' component={UserProduct} />
          <Route exact path='/reviews' component={Review} />
          <Route path='/reviews/:reviewId' component={ReviewWithId} />
          <Route path='/images' component={Image} />
      
          <Route exact path='/products/add-product' component={() => <AdminProduct addProduct ={true} />} /> 
          
          <Route path='/unathorized' component={Unathorized} />
          {/* <Route path='/test' component={Pagination} /> */}
          <Route path="*" component={NotFoundPage} />
          {/* <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} />} /> */}
          {/* <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> */}
          {/* <Redirect to="/home" /> */}
        </Switch>
        {/* </CSSTransition>
          </TransitionGroup> */}
        {/* <Footer /> */}
      </div >
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTags: () => dispatch(fetchTags()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchImages: ()=>dispatch(fetchImages()),
  fetchProducts: () =>dispatch(fetchProducts()),
  postTag: (name, parent) => dispatch(postTag(name, parent)),


  //categories
  // fetchCategories: () => dispatch(fetchCategories()),
  postCategory: (name, parent) => dispatch(postCategory(name, parent)),
  putCategory: (id, name, parent) => dispatch(putCategory(id, name, parent)),
  removeCategory: (id) => dispatch(removeCategory(id)),


})
const mapStateToProps = state => {
  return {
    auth: state.Auth,
    products: state.Products
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));