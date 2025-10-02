import React from "react";
import { useAppSelector } from "../../store/hooks.ts";
import "./loader.scss"; // Add your spinner CSS

const Loader = () => {
  const loading = useAppSelector((state) => state.loader.loading);  

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
