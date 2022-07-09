import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import authApi from "../api/Auth";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";
import AppTextInput from "../components/AppTextInput";
import Header from "../components/Header";
import AppText from "../components/AppText";
import jwt_decode from "jwt-decode";
import AuthContext from "../auth/context";
import storage from "../auth/storage";
const Login = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const [visible, setvisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [autherror, setAutherror] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    let formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", data.username);
    formdata.append("password", data.password);
    setvisible(true);
    const result = await authApi.login(formdata);

    if (!result.ok) {
      setAutherror("You can't sign your credentials are not correct !");
      setSuccess(false);
      console.log(result.data);
      setvisible(false);
      return;
    }
    storage.StoreToken(result.data.access_token);
    authContext.setuser(jwt_decode(result.data.access_token));
    storage.storeUser(jwt_decode(result.data.access_token));
    setAutherror();
    setvisible(false);
  };
  return (
    <>
      <ActivityIndicator visible={visible} />
      <View style={styles.container}>
        <Header Title="Log in" OnBackPress={() => navigation.goBack()} />
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^([a-z0-9]){4,20}$/,
                message: "Invalid Username",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Username"
                icon="account"
                autoCapitalize="none"
              />
            )}
            name="username"
          />
          {errors.username && errors.username.type == "required" && (
            <ErrorMessage message="Username is required" />
          )}
          {errors.username && errors.username.type == "pattern" && (
            <ErrorMessage message="Invalid Username" />
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                icon="lock"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            )}
            name="password"
          />
          {errors.password && errors.password.type == "required" && (
            <ErrorMessage message="Password is required" />
          )}
          {errors.password && errors.password.type == "pattern" && (
            <ErrorMessage message="Invalid Password" />
          )}
          {autherror && <ErrorMessage message={autherror} />}
        </View>
        <View style={styles.BtnContainer}>
          <AppButton title={"LOG IN"} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  BtnContainer: {
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  formContainer: {
    paddingHorizontal: "5%",
    marginTop: "10%",
  },
  success: {
    color: "green",
    fontWeight: "bold",
    fontSize: 25,
  },
});
