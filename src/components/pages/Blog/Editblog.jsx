import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextEditor from "../../TextEditor";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getDocument, updateDocument } from "../../../services/dbService";
import { uploadFile } from "../../../services/storageService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../../services/authService";
const EditBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const [fileChosen, setFileChosen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
    }

    const fetchBlog = async () => {
      try {
        const doc = await getDocument("blogs", id);
        if (doc.exists) {
          const data = doc.data();
          setValue("title", data.title);
          setValue("author", data.author);
          setValue("tags", data.tags.join(","));
          setValue("status", data.status);
          setImageUrl(data.imageUrl); // Set the image URL from the document data
          if (editorRef.current && data.content) {
            editorRef.current.setEditorContent(data.content);
          }
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Error fetching blog data");
      }
    };

    fetchBlog();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      let newimageUrl = imageUrl;
      if (image) {
        const imagePath = `blog-images/${image.name}`;
        newimageUrl = await uploadFile(image, imagePath);
      }

      const content = await new Promise((resolve) => {
        setTimeout(() => {
          const editor = document.querySelector(".ck-editor__editable");
          if (editor) {
            resolve(editor.innerHTML);
          } else {
            resolve("");
          }
        }, 100);
      });

      const blogData = {
        title: data.title,
        author: data.author,
        tags: data.tags.split(","),
        status: data.status,
        content,
        imageUrl: newimageUrl, // Use the new or existing image URL
        publicationDate: new Date(),
      };

      await updateDocument("blogs", id, blogData);
      toast.success("Blog has been updated. Thank you!");
      reset(); // Reset the form fields
      if (editorRef.current) {
        editorRef.current.clearEditor();
      }
      setIsSubmitting(false);
      navigate("/blogview"); // Redirect to blog view after update
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error in updating blog");
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileChosen(true);
      const file = e.target.files[0];
      setImage(e.target.files[0]);

      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    } else {
      setFileChosen(false);
    }
  };

  return (
    <div className="main-wrapper">
      <ToastContainer />
      <Header />
      <Sidebar
        id="menu-item11"
        id1="menu-items11"
        activeClassName="edit-blog"
      />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Blog</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Blog</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Blog Details</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Blog Title <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("title", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Author Name <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("author", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Tags <small>(separated with a comma)</small>{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("tags", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group select-gender">
                          <label className="gen-label">
                            Blog Status <span className="login-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                value="Active"
                                {...register("status", { required: true })}
                              />
                              Active
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                value="Inactive"
                                {...register("status", { required: true })}
                              />
                              Inactive
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="form-group summer-mail">
                          <TextEditor ref={editorRef} />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="form-group local-top-form">
                          <label className="local-top">
                            Avatar <span className="login-danger">*</span>
                          </label>
                          <div className="settings-btn upload-files-avator">
                            <input
                              type="file"
                              accept="image/*"
                              {...register("image")}
                              className="hide-input"
                              id="file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="file"
                              className="upload"
                              style={{
                                color: fileChosen ? "#2FCE2E" : "initial",
                              }}
                            >
                              {fileChosen ? "File Chosen" : "Choose File"}
                            </label>
                          </div>
                          {imageUrl && (
                            <div>
                              <img
                                src={imageUrl}
                                alt="Selected Image"
                                style={{ maxWidth: "100%", marginTop: "10px" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            <span>
                              {isSubmitting ? "Updating..." : "Update"}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary cancel-form"
                            onClick={() => {
                              navigate("/blogview");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-overlay" data-reff="" />
    </div>
  );
};

export default EditBlog;
