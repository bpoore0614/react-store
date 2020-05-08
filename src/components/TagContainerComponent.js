// import React, { Component } from 'react'
// // import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import {
//   fetchTagsIfNeeded,
// //   invalidateSubreddit
// } from '../redux/ActionTypes'
// // import Picker from '../components/Picker'
// // import Posts from '../components/Posts'

// class AsyncApp extends Component {
//   constructor(props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleRefreshClick = this.handleRefreshClick.bind(this)
//   }

//   componentDidMount() {
//     const { dispatch } = this.props
//     dispatch(fetchTagsIfNeeded())
//   }

// //   componentDidUpdate(prevProps) {
// //     if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
// //       const { dispatch, selectedSubreddit } = this.props
// //       dispatch(fetchTagsIfNeeded(selectedSubreddit))
// //     }
// //   }

//   handleChange(nextSubreddit) {
//     // this.props.dispatch(selectSubreddit(nextSubreddit))
//     this.props.dispatch(fetchTagsIfNeeded())
//   }

//   handleRefreshClick(e) {
//     e.preventDefault()

//     const { dispatch, selectedSubreddit } = this.props
//     // dispatch(invalidateSubreddit(selectedSubreddit))
//     dispatch(fetchTagsIfNeeded())
//   }

//   render() {
//       alert("render")
//     const { tags, isFetching, lastUpdated } = this.props
    
//     return (
//         <div>
//             {alert(JSON.stringify(this.props))}
//         </div>
//     //   <div>
//     //     <Picker
//     //       value={selectedSubreddit}
//     //       onChange={this.handleChange}
//     //       options={['reactjs', 'frontend']}
//     //     />
//     //     <p>
//     //       {lastUpdated && (
//     //         <span>
//     //           Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
//     //         </span>
//     //       )}
//     //       {!isFetching && (
//     //         <button onClick={this.handleRefreshClick}>Refresh</button>
//     //       )}
//     //     </p>
//     //     {isFetching && posts.length === 0 && <h2>Loading...</h2>}
//     //     {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
//     //     {posts.length > 0 && (
//     //       <div style={{ opacity: isFetching ? 0.5 : 1 }}>
//     //         <Posts posts={posts} />
//     //       </div>
//     //     )}
//     //   </div>
//     )
//   }
// }

// // AsyncApp.propTypes = {
// //   selectedSubreddit: PropTypes.string.isRequired,
// //   posts: PropTypes.array.isRequired,
// //   isFetching: PropTypes.bool.isRequired,
// //   lastUpdated: PropTypes.number,
// //   dispatch: PropTypes.func.isRequired
// // }

// const mapStateToProps = state => ({
//     items: state.items
// })



// export default connect(mapStateToProps)(AsyncApp)