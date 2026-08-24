import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import Loader from '../../components/form/Loader';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordSchema } from '../../utills/schema';
import ErrorMessage from '../../components/form/ErrorMessage';
import { authForgotPassword } from '../../redux/actions/authAction';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authReducers);

    const initialValues = {
        email: ""
    };

    const handleSubmitEmail = (values) => {
        const callback = (response) => {
            if (response.success) {
                navigate(pageRoutes?.login);
            }
        };
        dispatch(authForgotPassword({ payload: values, callback }));
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <section className="ct_login_bg">
            <div className="container">
                <div className="row">
                    <div className="col-xxl-8 col-xl-10 col-lg-10 col-md- mx-auto">
                        <div className="ct_login_white_bg ct_mt_60 ct_mb_60">
                            <div className="ct_login_left_img">
                                <img  loading="lazy" src="assets/img/login_img.jpg" alt="" />
                            </div>
                            <div className="ct_login_form">
                                <div className=" mb-4">
                                    <h4 className="ct_fs_24 ct_fw_600 ">Forgot your password?</h4>
                                    <p className="mb-0 mt-3">
                                        Don’t worry, happens to all of us. Enter your email below to
                                        recover your password
                                    </p>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={forgotPasswordSchema}
                                    onSubmit={(values, actions) => {
                                        handleSubmitEmail(values);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    }) => (
                                        <form className="mt-4" onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                <label for="" className="ct_fw_400 mb-2 ct_text_4B5563 ">Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control ct_input ct_border_grey"
                                                    placeholder="Email"
                                                    id="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values?.email}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="email"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button type="button" onClick={handleSubmit} className="ct_orange_btn w-100">Submit</button>
                                            </div>
                                            <p className="text-center mt-3">
                                                Already know your password?
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate(pageRoutes.login)
                                                }} className="ct_fw_600 ct_orange_link">{" "}Login</a>
                                            </p>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ForgotPassword;