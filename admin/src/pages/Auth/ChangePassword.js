import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Eye from '../../components/form/Eye';
import Loader from '../../components/form/Loader';
import { pageRoutes } from '../../routes/PageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import PanelLayout from '../../shared/layout/PanelLayout';
import { changePasswordSchema } from '../../utills/schema';
import ErrorMessage from '../../components/form/ErrorMessage';
import { authChangePassword } from '../../redux/actions/authAction';


const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEye, setIsEye] = useState(false);
    const [isEye1, setIsEye1] = useState(false);
    const [isEye2, setIsEye2] = useState(false);
    const { isLoading } = useSelector((state) => state.authReducers);


    const initialValues = {
        new_password: "",
        current_password: "",
        confirm_password: ""
    };

    const handleChangePassword = (values) => {
        const callback = (response) => {
            if (response.success) {
                navigate(pageRoutes?.myProfile);
            };
        };
        const data = {
            current_password: values?.current_password,
            new_password: values?.new_password
        };
        dispatch(authChangePassword({ payload: data, callback }));
    };

    if (isLoading) {
        return <Loader />;
    };
    return (
        <PanelLayout>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text pb-4">
                        Change Password
                    </h4>
                    <div className="ct_white_bg">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={changePasswordSchema}
                            onSubmit={(values, actions) => {
                                handleChangePassword(values);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue,
                            }) => (
                                <form className="mt-5">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group mb-4">
                                                <label className="ct_fw_600 mb-2">Current Password</label>
                                                <div className="position-relative">
                                                    <input
                                                        type={isEye ? "text" : "password"}
                                                        className="form-control ct_input pe-5 ct_border_op_10"
                                                        placeholder="Current Password"
                                                        id="current_password"
                                                        value={values.current_password}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Eye isEye={isEye} onClick={() => setIsEye(!isEye)} />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="current_password"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-4">
                                                <label className="ct_fw_600 mb-2">
                                                    New Password</label>
                                                <div className="position-relative">
                                                    <input
                                                        type={isEye1 ? "text" : "password"}
                                                        className="form-control ct_input pe-5 ct_border_op_10"
                                                        placeholder="New Password"
                                                        id="new_password"
                                                        value={values.new_password}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Eye isEye={isEye1} onClick={() => setIsEye1(!isEye1)} />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="new_password"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-4">
                                                <label className="ct_fw_600 mb-2">Confirm Password</label>
                                                <div className="position-relative">
                                                    <input
                                                        type={isEye2 ? "text" : "password"}
                                                        className="form-control ct_input pe-5 ct_border_op_10"
                                                        placeholder="Confirm Password"
                                                        id="confirm_password"
                                                        value={values?.confirm_password}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <Eye isEye={isEye2} onClick={() => setIsEye2(!isEye2)} />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    touched={touched}
                                                    fieldName="confirm_password"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="ct_orange_btn ms-auto ct_border_radius_10 ct_h_40" onClick={handleSubmit}>
                                        Save Password
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </PanelLayout>
    )
};

export default ChangePassword;