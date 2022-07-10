import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import axios from "axios";

function Editor() {
  const editorRef = React.createRef();

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

  const open = () => {
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
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  return (
    <div>
      Editor
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: "https://7libras.s3.nl-ams.scw.cloud/editor/test.png",
            name: "test.png",
          },
          uiSize: {
            width: "1000px",
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
      <button type="button" onClick={open}>
        Save
      </button>
    </div>
  );
}

export default Editor;
