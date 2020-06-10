import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
// import Menu from './MenuComponent';
// import Header from './HeaderComponent';
// import Footer from './FooterComponent';
// import DishDetail from './DishdetailComponent';
import Tag from './TagComponent';
import { baseUrl } from '../shared/baseUrl'
import { ListCart } from './cart/ListCartComponent';
import { CartPage } from './cart/CartPageComponent';
import Review from './review/ReviewComponent';
import UpdateReview from './review/UpdateReviewComponent';
import Image from './image/ImageComponent';
import AdminProduct from './product/ProductComponent';
import UserProduct from './product/UserProductComponent';
import Register from './user/SignUpComponent';
import Login from './user/LoginComponent';

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
  logoutUser,
  fetchCart,
  postCart,
  putCart,
  postUser,
  deleteCart,
  autoLogIn,
  getUser
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

  async componentDidMount() {
    await this.props.autoLogIn();
    if (this.props.auth.isAuthenticated) {
      await this.props.getUser();
    }
    this.props.fetchTags();
    this.props.fetchCategories();
    this.props.fetchImages();
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  async componentWillUpdate(prevProps, prevState) {

    // if (token && jwtDecode(token).exp < Date.now() / 1000) {
    //   localStorage.removeItem('token');
    //   await this.props.logoutUser();
    // }
    // alert("test")
  }

  redirect() {
    this.props.fetchCart();
    this.props.history.push("/products/all")
  }
  render() {

    const Signup = () => (
      <Register postUser={this.props.postUser}
        user={this.props.user}
      />
    )



    const LogoutUser = () => {
      this.props.logoutUser();
      this.props.fetchCart();
      return (
        <Redirect to={"/products/all"} />
      )
    }


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

    if (
      !this.props.auth.isLoading
      && !this.props.tags.isFetching
      && !this.props.categories.isFetching
      && !this.props.images.isFetching
      && !this.props.products.isFetching
      && !this.props.cart.isFetching
    ) {
      return (

        <div>
          <div className="fixed-top light-background">
            <Header
              cart={this.props.cart}
              auth={this.props.auth}
              location={this.props.location}
              putCart={this.props.putCart}
              deleteCart={this.props.deleteCart}
            />
          </div>

          <div className="container-fluid position-sm-body position-lg-body">
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
              <PrivateRoute path='/admin/products' component={AdminProduct} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={LogoutUser} />
              <Route exact path='/products/all' component={UserProduct} />
              <Route exact path='/product/:productName' component={UserProduct} />
              <Route exact path='/products/:productName' component={UserProduct} />
              <Route path='/products' component={UserProduct} />
              <Route exact path='/reviews' component={Review} />
              <Route path='/reviews/:reviewId' component={ReviewWithId} />
              <Route path='/images' component={Image} />
              <Route path='/Register' component={Signup} />
              <Route path='/cart' component={() =>
                <CartPage
                  cart={this.props.cart}
                  putCart={this.props.putCart}
                  deleteCart={this.props.deleteCart}
                />} />

              <Route path='/test' component={() =>
                <Register postUser={this.props.postUser}
                  user={this.props.user}
                // location={}
                />} />

              <Route exact path='/products/add-product' component={() => <AdminProduct addProduct={true} />} />

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
          </div>
        </div>

      );
    } else {
      return (
        <div>LOADING</div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTags: () => dispatch(fetchTags()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchImages: () => dispatch(fetchImages()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCart: () => dispatch(fetchCart()),
  postTag: (name, parent) => dispatch(postTag(name, parent)),
  logoutUser: () => dispatch(logoutUser()),
  autoLogIn: () => dispatch(autoLogIn()),
  getUser: () => dispatch(getUser()),

  //categories
  // fetchCategories: () => dispatch(fetchCategories()),
  postCategory: (name, parent) => dispatch(postCategory(name, parent)),
  putCategory: (id, name, parent) => dispatch(putCategory(id, name, parent)),
  removeCategory: (id) => dispatch(removeCategory(id)),
  postCart: (item) => dispatch(postCart(item)),
  putCart: (item) => dispatch(putCart(item)),
  postUser: (user) => dispatch(postUser(user)),
  deleteCart: (item) => dispatch(deleteCart(item))


})
const mapStateToProps = state => {
  alert(JSON.stringify(state.Auth))
  return {
    auth: state.Auth,
    cart: state.Cart,
    products: state.Products,
    tags: state.Tags,
    categories: state.Categories,
    images: state.Images,
    user: state.User
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));