import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';

import { useNavigate } from 'react-router-dom';

import './Blog.css';
import { Booking, LoadingSpinner } from '../../Components';

import { LiaCalendarAltSolid } from 'react-icons/lia';

import { Helmet } from 'react-helmet-async';

// services
import { getBlogs } from '../../services/blog/blog.services';
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';

const DEFAULT_PAGE_SIZE = 4;
const BLOG_PAGE_SIZE = 6;
const blog_slug = 'blogs-page';
const contact_slug = 'contact-page';

const Blog = () => {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(0);

	const navigateToBlog = (slug) => {
		navigate(`/blog-detail/${slug}`);
	};

	// Queries
	const { data: blogs, isLoading: blogsLoading } = useQuery(
		['blogs', currentPage],
		() => getBlogs(currentPage * BLOG_PAGE_SIZE, BLOG_PAGE_SIZE)
	);
	const { data: blogCMS, isLoading: blogCMSLoading } = useQuery(
		['blog-cms', blog_slug],
		() => getCMS(blog_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', blog_slug],
		() => getCMSPageName(blog_slug, DEFAULT_PAGE_SIZE)
	);

	if (
		blogsLoading ||
		blogCMSLoading ||
		contactCMSLoading ||
		pageNameCMSLoading
	) {
		return <LoadingSpinner />;
	}

	// Function to handle clicking on a page number
	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber?.selected);
		window.scrollTo(0, 0);
	};

	return (
		<>
			<Helmet>
				<title>{`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing`}</title>
				<meta
					name="description"
					content={`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href="/blogs" />
			</Helmet>
			<section className="fixSection">
				<div className="blog">
					<div className="blog__title">
						<div className="titleSub">Blogs</div>
						<div className="titleMain">{blogCMS?.[0]?.title}</div>
						<div className="titleDesc blog__titleDesc">
							{removeHtml(blogCMS?.[0]?.description)}
						</div>
					</div>
					<div className="blog__content">
						{blogs?.data?.map((blog) => (
							<div
								className="blogCard selector"
								key={blog?.id}
								onClick={() => navigateToBlog(blog?.slug)}
							>
								<div className="blogCard__img">
									<img
										src={getFileUrl(blog?.image)}
										alt="card image"
										className="blogCard__img"
									/>
								</div>

								<div className="blogCard__content">
									<div className="blogCaption">
										<span className="blogCaption-text">
											<LiaCalendarAltSolid />
											{blog?.publishedDate}
										</span>
									</div>

									<div className="blogCard__title">{blog?.title}</div>
									{/* <div className="blogCard__desc truncated-text">
										{removeHtml(blog?.description)}
									</div> */}
								</div>
							</div>
						))}
					</div>

					<div className="blogCard__pagination">
						<ReactPaginate
							previousLabel="Prev"
							nextLabel="Next"
							breakLabel="..."
							onPageChange={handlePageClick}
							pageRangeDisplayed={BLOG_PAGE_SIZE}
							pageCount={Math.ceil(blogs?.pagination?.total / BLOG_PAGE_SIZE)}
							renderOnZeroPageCount={null}
							containerClassName={'pagination'}
							pageClassName={'pagination__link'}
							disabledClassName={'pagination__link--disabled'}
							activeClassName={'pagination__link--active'}
							nextClassName={'pagination__link--next'}
							previousClassName={'pagination__link--prev'}
							forcePage={currentPage}
						/>
					</div>
				</div>
			</section>

			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default Blog;
