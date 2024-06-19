import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Header';
import Sidebar from '../Sidebar';
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const defaultColors = {
  primary: "#f6ebeb",
  secondary: "#ffb9b9",
  tertiary: "#ee7272",
  lightBlue: "#97ddf6",
  primaryBlue: "#64D5FF",
  darkBlue: "#2E7DDA",
};

const formatColorKey = (key) => {
  switch (key) {
    case 'primary':
      return 'Navbar, Hero Section, Light Shade of Footer';
    case 'secondary':
      return 'Moderate Color of Footer';
    case 'tertiary':
      return 'Dark Color of Footer';
    case 'lightBlue':
      return 'Icons';
    case 'primaryBlue':
      return 'Doctor Cards Hover, Banner Section, Icons';
    case 'darkBlue':
      return 'Icon';
    default:
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
};

const ColorSettings = () => {
  const [colors, setColors] = useState(defaultColors);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const docRef = doc(db, "colours", "colorSettings");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, defaultColors);
          setColors(defaultColors);
        } else {
          setColors(docSnap.data());
        }
      } catch (err) {
        console.error("Error loading colors:", err);
        toast.error("Failed to load colors.");
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, []);

  const handleColorChange = (colorKey) => (color) => {
    setColors((prevColors) => ({ ...prevColors, [colorKey]: color.hex }));
  };

  const saveColors = async () => {
    setSubmitLoading(true);
    try {
      const docRef = doc(db, "colours", "colorSettings");
      await setDoc(docRef, colors);
      toast.success("Colors saved successfully!");
    } catch (err) {
      console.error("Error saving colors:", err);
      toast.error("Failed to save colors.");
      setError(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetToDefaultColors = async () => {
    setColors(defaultColors);
    try {
      const docRef = doc(db, "colours", "colorSettings");
      await setDoc(docRef, defaultColors);
      toast.success("Colors reset to default successfully!");
    } catch (err) {
      console.error("Error resetting colors:", err);
      toast.error("Failed to reset colors.");
      setError(err);
    }
  };

  const renderSkeleton = () => (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Sidebar />
      <div className="page-wrapper ml-64 p-5">
        <div className="content">
          <div className="page-header mb-4">
            <div className="flex items-center">
              <div className="w-full">
                <ul className="breadcrumb flex items-center space-x-2">
                  <li className="breadcrumb-item">
                    <Skeleton width={80} height={20} />
                  </li>
                  <li className="breadcrumb-item">
                    <Skeleton width={20} height={20} />
                  </li>
                  <li className="breadcrumb-item active">
                    <Skeleton width={100} height={20} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <div className="bg-white p-4 rounded shadow">
                  <Skeleton width={100} height={24} className="mb-2" />
                  <Skeleton height={250} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Skeleton width={100} height={40} className="mr-2" />
            <Skeleton width={150} height={40} />
          </div>
        </div>
      </div>
    </>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return <div>Error loading colors. Please try again later.</div>;
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Sidebar />
      <div className="page-wrapper ml-64 p-5"> {/* Adjust margin-left based on your sidebar width */}
        <div className="content">
          <div className="page-header mb-4">
            <div className="flex items-center">
              <div className="w-full">
                <ul className="breadcrumb flex items-center space-x-2">
                  <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right"></i>
                  </li>
                  <li className="breadcrumb-item active">Color Settings</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            {Object.keys(colors).map((colorKey) => (
              <div key={colorKey} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <div className="bg-white p-4 rounded shadow">
                  <h4 className="mb-2 text-lg font-medium">{formatColorKey(colorKey)}</h4>
                  <SketchPicker
                    color={colors[colorKey] || '#ffffff'}
                    onChange={handleColorChange(colorKey)}
                    disableAlpha={true}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary mr-2"
              onClick={saveColors}
              disabled={submitLoading}
            >
              {submitLoading ? "Submitting..." : "Submit"}
            </button>
            <button className="btn btn-secondary" onClick={resetToDefaultColors}>Reset to Default</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorSettings;
