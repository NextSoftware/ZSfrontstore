import { Button } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import Cookies from "universal-cookie";

const ImageUpload = (props: any) => {
  const [file, setFile] = React.useState();
  const [fileDataURL, setFileDataURL] = React.useState("");
  const [user, setUser] = React.useState();
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const submitHandler = async () => {
    let data = new FormData();
    data.append("image", file, file?.name);

    await axios
      .post("/item-image/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data?._boundary}`,
        },
      })
      .then(async (response) => {
        console.log(response);
        await axios
          .post("/costumer-has-image", {
            customerId: props.userData?.id,
            imageId: await response.data.id,
          })
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = async (e: any) => {
    if (e.target.files != undefined) {
      const file = await e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        alert("Image type is not valid");
        setFileDataURL("");
      }
      setFile(file);
    }else{
      setFileDataURL("");
    }
  };
  React.useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result }: any = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
      console.log(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          // textAlign: "center",
          // justifyContent: "center",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",

        }}
      >
        <label htmlFor="image"> Selecione a image</label>
        {fileDataURL ? (
          <p className="img-preview-wrapper">
            {<img src={fileDataURL} alt="preview" width={"125px"} />}
          </p>
        ) : null}
        <input
          type="file"
          id="image"
          accept=".png, .jpg, .jpeg"
          onChange={changeHandler}
        />
        <Button
          onClick={() => submitHandler()}
          className="btn-primary max-width"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
