import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';

class Paginate extends Component {
    constructor(props) {
        super(props);

        const { totalRecords = null, pageLimit = 30, currentPage } = props;
        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 25;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
        this.currentPage = typeof currentPage === 'number' ? currentPage : 1;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    }

    render() {
        return (
            <div class="pagination">
                <a href="#" onClick={() => this.props.selectPage(this.currentPage > 1 ? this.currentPage - 1 : 1)}>
                    <span className="fa fa-arrow-left fa-lg"></span></a>
                {this.totalPages <= 5
                    ?
                    <>
                        {Array.apply(null, Array(this.totalPages)).map((val, i) => {
                            return (
                                <a
                                    className={this.currentPage == i + 1 ? "active" : "hide-pagination-links"}
                                    onClick={() => this.props.selectPage(i + 1)}
                                    href="#">{i + 1}
                                </a>
                            )
                        })}
                        <a href="#"
                            onClick={() => this.props.selectPage(
                                this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages)}>
                            <span className="fa fa-arrow-right fa-lg"></span>
                        </a>
                    </>
                    :
                    <span>
                        {Array.apply(null, Array(4)).map((val, i) => {
                            return (
                                this.currentPage === 1 || this.currentPage === 2 || this.currentPage === 3
                                    ?
                                    <a
                                        className={this.currentPage == i + 1 ? "active" : "hide-pagination-links"}
                                        onClick={() => this.props.selectPage(i + 1)}
                                        href="#">{i + 1}
                                    </a>
                                    :
                                    ""
                            )
                        })
                        }

                        {this.currentPage != 1 && this.currentPage != 2 && this.currentPage != 3
                            ?
                            <>
                                <a
                                    className={this.currentPage == 1 ? "active" : "hide-pagination-links"}
                                    onClick={() => this.props.selectPage(1)}
                                    href="#">1
                                </a>
                                <a className="hide-pagination-links">...</a>
                            </>
                            :
                            ""
                        }
                        {this.currentPage < this.totalPages - 2
                            ?
                            <>
                                {Array.apply(null, Array(3)).map((val, i) => {
                                    return (
                                        this.currentPage != 1 && this.currentPage != 2 && this.currentPage != 3
                                            ?
                                            <a
                                                className={i == 1 ? "active" : "hide-pagination-links"}
                                                onClick={() => this.props.selectPage(this.currentPage + i - 1)}
                                                href="#">{this.currentPage + i - 1}
                                            </a>
                                            :
                                            ""
                                    )
                                })}
                                <a className="hide-pagination-links">...</a>
                            </>
                            :
                            <>
                                <a
                                    className={this.currentPage == this.totalPages - 3 ? "active" : "hide-pagination-links"}
                                    onClick={() => this.props.selectPage(this.totalPages - 3)}
                                    href="#">{this.totalPages - 3}
                                </a>
                                <a
                                    className={this.currentPage == this.totalPages - 2 ? "active" : "hide-pagination-links"}
                                    onClick={() => this.props.selectPage(this.totalPages - 2)}
                                    href="#">{this.totalPages - 2}
                                </a>
                                <a
                                    className={this.currentPage == this.totalPages - 1 ? "active" : "hide-pagination-links"}
                                    onClick={() => this.props.selectPage(this.totalPages - 1)}
                                    href="#">{this.totalPages - 1}
                                </a>
                            </>
                        }
                        <a
                            className={this.currentPage == this.totalPages ? "active" : "hide-pagination-links"}
                            onClick={() => this.props.selectPage(this.totalPages)}
                            href="#">{this.totalPages}
                        </a>
                        <a href="#"
                            onClick={() => this.props.selectPage(
                                this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages)}>
                            <span className="fa fa-arrow-right fa-lg"></span>
                        </a>
                    </span>
                }

            </div>
        )
    }


}

export default (Paginate);

