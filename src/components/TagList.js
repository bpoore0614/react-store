import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';


const TagList = props => (
    <div className="col-12 col-md-5 m-1" key="tags">
        
        <h4>Tags</h4>
        {props.tags.items.map((tag) => {
            if (tag.name == 'root') {
                return
            }
            return (
                <div>
                    <div key={tag._id} style={{ marginLeft: tag.level * 20 + 'px' }}>
                        <p>{tag.name}</p>
                        <div className="row">
                            <div className="col-6">
                                <Link to={`${props.match.path}/` + tag._id}>
                                    <Button outline >
                                        <span className="fa fa-pencil fa-lg"></span>
                                    </Button >
                                </Link>
                                <Button onClick={(() => props.removeTag(tag._id))}
                                    className="btn text-white bg-danger">
                                    <span className="txt-white">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        )}
                </div>
)

export default TagList