import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import FeatherIcon from "feather-icons-react";
import { blogimg2, imagesend } from "../../imagepath";
import { Link } from "react-router-dom";
import { getAllDocuments, deleteDocument } from "../../../services/dbService";
import { deleteFileFromStorage } from "../../../services/storageService"; // Import the delete function
import { Timestamp } from "firebase/firestore";
import { Modal, Button } from "antd";
import { getCurrentUser } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const BlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
    }
    const fetchBlogs = async () => {
      try {
        const snapshot = await getAllDocuments("blogs"); // Assuming 'blogs' is the collection name
        const blogData = snapshot.docs.map((doc) => {
          const data = doc.data();
          let publicationDate;

          if (data.publicationDate instanceof Timestamp) {
            publicationDate = data.publicationDate
              .toDate()
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
          } else if (
            data.publicationDate.seconds &&
            data.publicationDate.nanoseconds
          ) {
            const timestamp = new Timestamp(
              data.publicationDate.seconds,
              data.publicationDate.nanoseconds
            );
            publicationDate = timestamp.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } else {
            publicationDate = new Date(data.publicationDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
          }

          return {
            id: doc.id,
            ...data,
            publicationDate,
          };
        });
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const showDeleteModal = (blogId) => {
    setBlogToDelete(blogId);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      const blogToDeleteData = blogs.find((blog) => blog.id === blogToDelete);
      await deleteDocument("blogs", blogToDelete);
      if (blogToDeleteData.imageUrl) {
        await deleteFileFromStorage(blogToDeleteData.imageUrl);
      }
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogToDelete)
      );
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  return (
    <div>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        <Sidebar
          id="menu-item11"
          id1="menu-items11"
          activeClassName="blog-grid"
        />
        {/* Sidebar */}
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/blogview">Blog </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item active">Blogs</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              {blogs.map((blog) => (
                <div key={blog.id} className="col-sm-6 col-md-6 col-xl-4">
                  <div className="blog grid-blog">
                    <div className="blog-image">
                      <Link to={`/blog/${blog.id}`}>
                        <img
                          className="img-fluid"
                          src={blog.imageUrl} // Replace with blog.image if it has an image URL
                          alt="#"
                        />
                      </Link>
                      <ul className="nav view-blog-list blog-views">
                        <li>
                          <FeatherIcon icon="eye" />
                          {blog.views}
                        </li>
                      </ul>
                    </div>
                    <div className="blog-content">
                      <div className="blog-grp-blk">
                        <div className="blog-img-blk">
                          <Link to={`/profile/${blog.authorId}`}>
                            <img
                              className="img-fluid"
                              src={blogimg2} // Replace with author.image if it has an image URL
                              alt="#"
                            />
                          </Link>
                          <div className="content-blk-blog ms-2">
                            <h4>
                              <Link to={`/profile/${blog.authorId}`}>
                                {blog.author}
                              </Link>
                            </h4>
                            <h5>{blog.authorTitle}</h5>
                          </div>
                        </div>
                        <span>
                          <FeatherIcon icon="calendar" />
                          {blog.publicationDate}
                        </span>
                      </div>
                      <h3 className="blog-title">
                        <Link to={`/blog/blog-details/${blog.id}`}>
                          {blog.title}
                        </Link>
                      </h3>
                      <p>{blog.excerpt}</p>
                      <Link
                        to={`/blog/blog-details/${blog.id}`}
                        className="read-more flex items-center"
                      >
                        Read more in {blog.readTime} Minutes
                        <i className="fa fa-long-arrow-right ml-2" />
                      </Link>
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/editblog/${blog.id}`}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 px-2 rounded-lg transition duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => showDeleteModal(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 px-2 rounded-lg transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
      {isDeleteModalOpen && (
        <div
          className={
            isDeleteModalOpen
              ? "modal fade show delete-modal"
              : "modal fade delete-modal"
          }
          style={{
            display: isDeleteModalOpen ? "block" : "none",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src={imagesend} alt="#" width={50} height={46} />
                <h3>Are you sure you want to delete this blog?</h3>
                <div className="m-t-20">
                  <Button
                    onClick={handleCancelDelete}
                    className="btn btn-white me-2"
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogView;
