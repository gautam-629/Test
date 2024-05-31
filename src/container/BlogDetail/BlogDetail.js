import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css';
import { Booking, LoadingSpinner } from '../../Components';

import { LiaCalendarAltSolid } from 'react-icons/lia';

import { Helmet } from 'react-helmet-async';

// services
import { getCMS } from '../../services/home/home.services';
import {
	getBlog,
	getBlogReviews,
	getBlogs,
} from '../../services/blog/blog.services';

import { getFileUrl } from '../../utils/imageURL';
import htmlParser from '../../utils/htmlParser';
import CommentForm from './Form/CommentForm';
import BlogComments from './BlogComments';

const DEFAULT_PAGE_SIZE = 7;
const contact_slug = 'contact-page';

const BlogDetail = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	const navigateToBlog = (slug) => {
		navigate(`/blog-detail/${slug}`);
	};
	
	const navigateToBlogs = () => {
		navigate('/blogs');
	};

	// Queries
	const { data: blog, isLoading: blogLoading } = useQuery(
		['blog-detail', slug],
		() => getBlog(slug, 1),
		{
			enabled: !!slug,
		}
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: blogs, isLoading: blogsLoading } = useQuery(['blogs'], () =>
		getBlogs(0, DEFAULT_PAGE_SIZE)
	);
	const { data: allBlogReviews, isLoading: allBlogReviewsLoading } = useQuery(
		['all-blog-reviews'],
		() => getBlogReviews()
	);

	if (
		blogLoading ||
		contactCMSLoading ||
		blogsLoading ||
		allBlogReviewsLoading
	) {
		<LoadingSpinner />;
	}
	//console.log(getFileUrl(blog?.image),'blog image');
	const pageTitle = blog?.title;//'My Dynamic Page Title';
	// Initialize pageDescription as an empty string
	let pageDescription = '';

	// Split the title into words and extract the first 5 words if title exists
	const desc = blog?.title;
	if (desc) {
		//console.log(desc,'desc');
	  const words = desc.split(' ');
	  //console.log(words,'words');
	  pageDescription = words.slice(0, 5).join(' ');
	  //console.log(pageDescription,'pageDescription');
	}
  //const pageDescription = 'This is a dynamically generated description for my page.';
  //const pageImageURL =  'https://api.humanxglobal.com//uploads/2024-04/unauth-1712128203542-d74fc562443e49d98bb02284e7d962d2.png';
  const pageImageURL =getFileUrl(blog?.image);
  //const pageImageURL = 'https://api.humanxglobal.com//uploads/2024-04/unauth-1712583827760-8fb0bcf6f22c47fe9a61571e26336b3c.png'; // URL of the image to be shared


	const parsedDescription = blog?.description
		? htmlParser(blog.description)
		: null;

	const filteredBlogs = blogs?.data?.filter((item) => item.slug !== slug);
	// console.log("Filtered Blogs:", filteredBlogs);

	const blogId = blog ? blog.id : null;

	const blogReviews = allBlogReviews
		? allBlogReviews.filter((review) => review.blogId === blogId)
		: [];

	return (
		<>
			 {/* <Helmet>
				<title>{`${blog?.title}  | HumanX | BPO and IT Outsourcing `}</title>
				<meta
					name="description"
					content={`${blog?.title} | HumanX | BPO and IT Outsourcing `}
				/>

				<meta
					property="og:title"
					content={`${blog?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<meta
					property="og:description"
					content={`${blog?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={window.location.href} />
				<link rel="canonical" href={`/blog-detail/${slug}`} />
				<meta
					property="og:image"
					content={`https://api.humanxglobal.com/${blog?.image}`}
				/>
			</Helmet>  */}


{/* <Helmet>
                <title>{`${blog?.title} | HumanX | BPO and IT Outsourcing`}</title>
				
                <meta
                    name="description"
                    content={`${blog?.description || ''} | HumanX | BPO and IT Outsourcing`}
                />
                {blog && (
                    <>
                        <meta property="og:title" content={`${blog.title} | HumanX | BPO and IT Outsourcing`} />
                        <meta property="og:description" content={`${blog.description || ''} | HumanX | BPO and IT Outsourcing`} />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content={window.location.href} />
                        <link rel="canonical" href={`/blog-detail/${slug}`} />
                        <meta property="og:image" content={`${blog?.image}`} />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={`${blog.title} | HumanX | BPO and IT Outsourcing`} />
                        <meta name="twitter:description" content={`${blog.description || ''} | HumanX | BPO and IT Outsourcing`} />
                        <meta name="twitter:image" content={`${blog.image}`} />
                    </>
                )}
            </Helmet> */}

<Helmet>
        {/* Meta tags for Facebook sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImageURL} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
		 {/* Meta tags for Twitter sharing */}
		 <meta name="twitter:title" content={pageTitle} />
  		<meta name="twitter:description" content={pageDescription} />
  		<meta name="twitter:image" content={pageImageURL} />
  		<meta name="twitter:card" content="summary_large_image" />
      </Helmet>


			<section className="fixSection">
				<div className="blogContainer">
					<div className="blogDetail">
						<div className="titleMain__Blogs blogDetail__text">
							{blog?.title}
						</div>

						<div className="blogDetail__caption blogDetail__text">
							<div className="blog-user-wrapper">
								<img
									className="blog-user-image"
									src={getFileUrl(blog?.authorImage)}
									alt="user image"
								/>

								<div className="blog-user-desc">
									<span className="blogs__caption">{blog?.authorName}</span>
									<span className="blogs__caption_text">
										{blog?.authorDesignation}
									</span>
								</div>
							</div>
							<span className="blogs__date">
								<LiaCalendarAltSolid className="caption__small-icons" />
								{blog?.publishedDate}
							</span>
						</div>
						<div className="blogDetail__img">
							<img
								src={getFileUrl(blog?.image)}
								alt="top image"
								className="blogs__Image"
							/>
						</div>
						<div className="blogDetail__desc blogDetail__text">
							{parsedDescription}
						</div>

						{/* blogs tags */}
						<div className="blogTags">
							{blog?._tags &&
								blog._tags.map((tag, index) => (
									<span key={index} className="blogTag">
										{tag}
									</span>
								))}
						</div>

						{/* Comment Form */}
						<CommentForm
							blogReviews={blogReviews}
							blogId={blogId}
							blog={blog}
						/>
						<BlogComments blogReviews={blogReviews} />
					</div>

					{/* Other Blogs Section */}
					<div className="blogs__Section">
						<div className="blogs__Title">Read More</div>
						<div className="blogs__Content">
							{filteredBlogs?.map((blog) => (
								<div
									className="blogs__Card selector"
									key={blog?.id}
									onClick={() => navigateToBlog(blog?.slug)}
								>
									<div className="blog__Img">
										<img
											src={getFileUrl(blog?.image)}
											alt="blog image"
											className="blogs__Image"
										/>
									</div>
									<div className="blog__Text">
										<div className="blogs__caption">
											<LiaCalendarAltSolid className="blogs__captionIcons" />
											{blog?.publishedDate}
										</div>
										<div className="blog__subHeading truncated-text">
											{blog?.title}
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="blogs__button">
							<button
								className="button-viewall button-primary button-hover-primary"
								onClick={() => navigateToBlogs()}
							>
								View All
							</button>
						</div>
					</div>
				</div>
			</section>

			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default BlogDetail;
