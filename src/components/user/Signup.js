import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signup } from "../../store/action/authActions";
import { useForm } from "react-hook-form";
import {
  EuiFieldPassword,
  EuiButtonEmpty,
  EuiIcon,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiCallOut,
} from "@elastic/eui";
import { useState } from "react";

const SignupForm = () => {
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const errorAlert = (error) => {
    setAlert(error);
    setTimeout(() => {
      if (error.status === "success") history.push("/");
      errorAlert({
        status: "",
        message: "",
      });
    }, 5000);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(signup(data, history, errorAlert));
  };
  const myErrors = {
    pattern: ["Incorrect Format"],
    required: ["Can't be empty"],
  };
  console.log(alert);
  return (
    <EuiModal>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>Signup</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <EuiModalBody>
          {alert.status && (
            <EuiCallOut
              title={alert.message}
              color={alert.status}
              iconType="user"
            ></EuiCallOut>
          )}
          <EuiFormRow
            label="Email"
            isInvalid={errors.username ? true : false}
            error={myErrors[errors.username ? errors.username.type : ""]}
          >
            <EuiFieldText
              type="text"
              placeholder="email"
              prepend={
                <EuiButtonEmpty size="xs" iconSide="right">
                  <EuiIcon type="email" />
                </EuiButtonEmpty>
              }
              {...register("username", {
                required: true,
                maxLength: 80,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </EuiFormRow>
          <EuiFormRow
            label="Password"
            isInvalid={errors.password ? true : false}
            error={myErrors[errors.password ? errors.password.type : ""]}
          >
            <EuiFieldPassword
              type="dual"
              placeholder="password"
              {...register("password", {
                required: true,
                max: 32,
                min: 8,
                maxLength: 32,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#.$@!%&*?]{8,30}$/i,
              })}
            />
          </EuiFormRow>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </EuiButtonEmpty>
          <EuiButton type="submit" fill>
            Signup
          </EuiButton>
        </EuiModalFooter>
      </form>
    </EuiModal>
  );
};
export default SignupForm;
