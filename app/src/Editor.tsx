import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Editor() {
  const editorRef = React.createRef();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const url = searchParams.get("url");

  function dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.split(",")[1]);

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const save = () => {
    if (Boolean(editorRef?.current)) {
      const editor = editorRef?.current as any;
      const instance = editor.getInstance();
      const imgBase64 = instance.toDataURL();

      var formData = new FormData();
      formData.append("file", dataURItoBlob(imgBase64));

      axios({
        method: "post",
        url: "https://image-editor-playground.herokuapp.com/api/images",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          navigate("/");
        })
        .catch(function (response) {
          console.log("Error", response);
        });
    }
  };

  return (
    <div className="container-xl">
      <h1>Images - Editor</h1>
      <div className="row mb-3">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
        <div className="col-6 text-end">
          <button type="button" className="btn btn-primary" onClick={save}>
            Save Image
          </button>
        </div>
      </div>
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: url,
            name: "test.png",
          },
          uiSize: {
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </div>
  );
}

export default Editor;
