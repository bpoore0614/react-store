import React, { useState } from 'react';
import ImageCarousel from '../image/ImageCarouselComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReviewStars, SingleReviewStars } from '../review/ReviewStarsComponent';
import { AddToCart } from '../cart/AddToCartComponent';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseUrl } from '../../shared/baseUrl';

function formatDate(unformattedDate) {
    const date = new Date(unformattedDate)
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
    return (`${month}-${day}-${year}`)
}

const Reviews = (props) => (
    props.product.reviews.map(review => (
        <div key={review._id} className="">

            {/* TODO allow username on review */}
            <span className="mr-3"><FontAwesomeIcon icon={faUser} size="2x" /></span>
            <span>{review.user}</span>
            <div>
                <SingleReviewStars
                    review={review}
                />
            </div>
            <p>{formatDate(review.createdAt)}</p>
            <p>{review.review}</p>
        </div>
    ))
)

const Description = (props) => (
    <div>
        {/* <h4 className="text-center">Description</h4> */}
        <p>{props.description}</p>
    </div>

)

const DispayProduct = props => {
    const [section, setSection] = useState({ reviews: false, description: true });
    const {product, postCart } = props;

    const toggleSection = () => {
        const switchedSection = { ...section };
        switchedSection.reviews = !switchedSection.reviews;
        switchedSection.description = !switchedSection.description;
        setSection(switchedSection)
    }
    return (
        <div className="container-fluid mt-3">
            <div className="row" key="tags">
                <div className="col-12 d-md-none text-center font-weight-bold">
                    <h2>{product.name}</h2>
                    <hr className="dropdown-divider" />
                </div>
                <div className="offset-2 offset-md-0 col-8 col-md-4">
                    <div className="">
                        <ImageCarousel
                            product={product}
                        />
                    </div>

                </div>
                <div className="col-12 col-md-6 text-center text-md-left">
                    <div className="d-none d-md-block font-weight-bold">
                        <h2>{product.name}</h2>
                        <hr className="dropdown-divider" />
                    </div>
                    <div className="mb-1">
                        Categories:
                        {product.categories.map((category, i) => (
                        <Link to={"#"} className="text-capitalize">
                            {i < product.categories.length - 1 ? category.name + ", " : category.name}
                        </Link>
                    ))}
                    </div>
                    <div className="mb-2">Tags:
                        {product.tags.map((tag, i) => (
                        <Link to={"#"} className="text-capitalize">
                            {i < product.tags.length - 1 ? tag.name + ", " : tag.name}
                        </Link>
                    ))}
                    </div>

                    <div className="mb-2">
                        <ReviewStars
                            reviews={product.reviews}
                        />
                    </div>

                    <div className="mb-1">
                        <span className="mr-3 font-weight-bold">${(product.price / 100).toFixed(2)}</span>
                    </div>
                    <div>
                        <span className=" justify-content-center">
                            <AddToCart
                                product={product}
                                postCart={postCart}
                            />
                        </span>
                    </div>

                    {/* </div> */}

                </div>

                <div className="col-2">
                    <p>todo</p>
                    <p>this will display a table</p>
                </div>
            </div>


            <div className="row">
                <div className="col-12 col-md-6">
                    <div onClick={toggleSection}
                        className={`${section.description ? "border-top border-bottom border-dark" : ""} d-flex justify-content-between mb-3 pointer`} >
                        <h3>DESCRIPTION</h3>
                        <span className="d-md-none">{section.description ? <FontAwesomeIcon icon={faCaretDown} size="2x" /> : ""}</span>
                        <span className="d-none d-md-block">{section.description ? <FontAwesomeIcon icon={faCaretRight} size="2x" /> : ""}</span>
                    </div>
                    <div onClick={toggleSection}
                        className={`${section.reviews ? "border-top border-bottom border-dark" : ""} d-flex justify-content-between mb-3 pointer`} >
                        <h3>REVIEWS</h3>
                        <span className="d-md-none">{section.reviews ? <FontAwesomeIcon icon={faCaretDown} size="2x" /> : ""}</span>
                        <span className="d-none d-md-block">{section.reviews ? <FontAwesomeIcon icon={faCaretRight} size="2x" /> : ""}</span>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    {section.description
                        ?
                        <div>
                            <h4>Description</h4>
                            <Description
                                description={product.description}
                            />
                        </div>
                        :
                        <div>
                            <h4>Reviews</h4>
                            <Reviews
                                product={product}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>todo</p>
                    <p>this will display like items</p>
                </div>
            </div>
        </div >

    )
}

export default DispayProduct