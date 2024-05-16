import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import TextEditor from '../../TextEditor';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { addDocument } from '../../../services/dbService';
import { uploadFile } from '../../../services/storageService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const [fileChosen, setFileChosen] = useState(false);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileChosen(true);
      setImage(e.target.files[0]);
    } else {
      setFileChosen(false);
      setImage(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      let imageUrl = '';
      if (image) {
        const imagePath = `blog-images/${image.name}`;
        imageUrl = await uploadFile(image, imagePath);
      }

      // Get the data from the text editor
      const content = await new Promise((resolve) => {
        setTimeout(() => {
          const editor = document.querySelector('.ck-editor__editable');
          if (editor) {
            resolve(editor.innerHTML);
          } else {
            resolve('');
          }
        }, 100);
      });

      const blogData = {
        title: data.title,
        author: data.author,
        tags: data.tags.split(','),
        status: data.status,
        content,
        imageUrl,
        publicationDate: new Date(),
        views: 0,
      };

      await addDocument('blogs', blogData);
      toast.success('Blog has been Published. Thank you!');
      setIsSubmitting(false);
      setFileChosen(false); // Reset file chosen state
      setImage(null); // Reset image state
      if (editorRef.current) {
        editorRef.current.clearEditor();
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error in Publishing blog');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-wrapper">
      <ToastContainer />
      <Header />
      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='add-blog' />
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
                  <li className="breadcrumb-item active">Add Blogs</li>
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
                            {...register('title', { required: true })}
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
                            {...register('author', { required: true })}
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
                            {...register('tags', { required: true })}
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
                                {...register('status', { required: true })}
                              />
                              Active
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                value="Inactive"
                                {...register('status', { required: true })}
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
                              {...register('image', { required: true })}
                              className="hide-input"
                              id='file'
                              onChange={handleFileChange}
                            />
                            <label htmlFor="file" className="upload" style={{ color: fileChosen ? '#2FCE2E' : 'initial' }}>
                              {fileChosen ? 'File Chosen' : 'Choose File'}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            <span>{isSubmitting ? "Publishing..." : "Publish"}</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary cancel-form"
                            onClick={() => {
                              // reset();
                              if (editorRef.current) {
                                editorRef.current.clearEditor();
                              }
                              setFileChosen(false); // Reset file chosen state
                              setImage(null); // Reset image state
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

export default AddBlog;