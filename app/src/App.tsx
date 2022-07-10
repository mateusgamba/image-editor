import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function App(): JSX.Element {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    axios
      .get("https://image-editor-playground.herokuapp.com/api/images")
      .then(function (response) {
        setFiles(response.data);
      });
  }, []);

  axios.interceptors.request.use(function (config) {
    document.body.classList.add("loading-indicator");
    return config;
  });

  axios.interceptors.response.use(function (response) {
    document.body.classList.remove("loading-indicator");
    return response;
  });

  return (
    <div className="container-xl">
      <h1>Images</h1>

      <div className="row">
        {files.map((img: any, index: number) => (
          <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
            <div className="box">
              <Link to={`/editor?url=${img.url}`}>
                <img src={img.url} alt={img.file} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
