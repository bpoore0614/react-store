import React, { Component } from 'react';
import { baseUrl } from '../../shared/baseUrl';
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: props.product ? props.product.carouselImages[0] : null,
            xPosition: null
        }
    }

    selectImage(img) {
        this.setState({ selectedImage: img })
    }

    setStartXAxis(event) {

        const position = event.touches ? event.touches[0].clientX : event.screenX;
        this.setState({ xPosition: position })
    }

    setNextImage(event) {
        const imageIndex = this.props.product.carouselImages.findIndex(img => img === this.state.selectedImage);
        const carouselLength = this.props.product.carouselImages.length;
        const position = event.changedTouches ? event.changedTouches[0].clientX : event.screenX;
        if (position < this.state.xPosition) {
            if (imageIndex === carouselLength - 1) {
                this.setState({ selectedImage: this.props.product.carouselImages[0] })
            } else {
                this.setState({ selectedImage: this.props.product.carouselImages[imageIndex + 1] })
            }
        }
        if (position > this.state.xPosition) {
            if (imageIndex === 0) {
                this.setState({ selectedImage: this.props.product.carouselImages[carouselLength - 1] })
            } else {
                this.setState({ selectedImage: this.props.product.carouselImages[imageIndex - 1] })
            }
        }
    }
    render() {
        const { product } = this.props;
        const { selectedImage } = this.state;

        return (
            <div className="containter-fluid">
                <div className="row">
                    <div className="d-none d-md-block col-md-1 p-0">
                        <ul className="list-unstyled">
                            {product.carouselImages.map(img => (
                                <li className="mb-2" id={img._id + "carousel"} key={img._id + "carousel"}>
                                    <img
                                        onMouseEnter={() => this.selectImage(img)}
                                        className={`${selectedImage === img ? " selected" : " "} w-100 image-hover border border-dark rounded `}
                                        src={baseUrl + "/" + img.original}
                                        alt={img.alt} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12 col-md-11 position-relative pointer"
                        onMouseDown={this.setStartXAxis.bind(this)}
                        onMouseUp={this.setNextImage.bind(this)}
                        onTouchStart={this.setStartXAxis.bind(this)}
                        onTouchEnd={this.setNextImage.bind(this)}

                    >
                        <img
                            className="w-100 rounded"
                            draggable={false}
                            src={baseUrl + "/" + selectedImage.original}
                            alt={selectedImage.alt} />


                        <div className="text-center">
                            {product.carouselImages.map(img => (
                                selectedImage === img
                                    ?
                                    <Button key={img._id + "light"} onClick={() => this.selectImage(img)} className="btn-light"><FontAwesomeIcon icon={faCircleSolid} /></Button>
                                    :
                                    <Button key={img._id + "dark"} onClick={() => this.selectImage(img)} className="btn-light"><FontAwesomeIcon icon={faCircleRegular} /></Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageCarousel;