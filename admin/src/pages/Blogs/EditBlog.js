import { Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import { addBlokSchema } from "../../utills/schema";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useSelector, useDispatch } from "react-redux";
import ImageUpload from "../../components/ImageUploader";
import PanelLayout from "../../shared/layout/PanelLayout";
import { updateBlog } from "../../redux/actions/authAction";
import ErrorMessage from "../../components/form/ErrorMessage";
import RichTextEditor from "../../shared/components/others/RichTextEditor";

const EditBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useLocation()?.state?.data || {};
  const [textData, setTextData] = useState(data?.blog_content || "");
  const { isLoading } = useSelector((state) => state.authReducers);

  const initialValues = {
    title: data?.title || "",
    file: data?.blogImage ? data?.blogImage[0]?.image : "",
  };

  useEffect(() => {
    setTextData(data?.blog_content);
  }, [data]);

  const handleUpdateBlog = (values) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(pageRoutes?.blogManagement);
      }
    };

    const formdata = new FormData();
    if (values?.file && typeof values.file !== "string")
      formdata.append("image", values.file);
    formdata.append("title", values.title.trim());
    formdata.append("blog_id", data?.blog_id);
    formdata.append("blog_content", textData);

    dispatch(updateBlog({ payload: formdata, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <SubHeader label="Edit Blog Details" />
      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className="ct_px_30_new pt-4">
              <Formik
                initialValues={initialValues}
                validationSchema={addBlokSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                  handleUpdateBlog(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setTouched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="ct_fw_600 mb-2">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_border_op_10"
                            placeholder="Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="title"
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="title"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <ImageUpload
                          subLabel={true}
                          name="file"
                          label="Image"
                          value={values.file}
                          onChange={setFieldValue}
                          onBlur={setTouched}
                          error={errors.file}
                          touched={touched.file}
                          placeholderLabel="Upload your image here"
                        />{" "}
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="ct_fw_600 mb-2 mt-4">
                            Content <span className="text-danger">*</span>
                          </label>

                          <RichTextEditor
                            value={textData}
                            onChange={(data) => setTextData(data)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 justify-content-end">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}
                        className="ct_outline_btn px-5"
                      >
                        Cancel
                      </a>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="ct_orange_btn px-5"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default EditBlog;
