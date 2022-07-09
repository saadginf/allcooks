import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import authApi from "../api/Auth";

import CountryPicker from "react-native-country-picker-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import SwitchSelector from "react-native-switch-selector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";
import AppTextInput from "../components/AppTextInput";
import Header from "../components/Header";
import AppText from "../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
const Register = ({ route, navigation }) => {
  const MAXSTEPS = 7;
  const [visible, setvisible] = useState(false);
  const [countryCode, setCountryCode] = useState();
  const [formStep, setformStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [showCn, setShowCn] = useState(false);
  const [autherror, setAutherror] = useState();
  const [date, setDate] = useState();
  const [imageUrie, setimageUrie] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [token, settoken] = useState();
  const [userRegistred, setuserRegistred] = useState(false);
  const [selectedexp, setSelectedexp] = useState("5");

  const getToken = async () => {
    setvisible(true);
    const result = await authApi.getRegisterToken();
    if (!result.ok) {
      setvisible(false);
      navigation.goBack();
      alert("Check your Conncetion");
    }
    settoken(result.data.access_token);
    setvisible(false);
  };
  const checkUser = async () => {
    setvisible(true);
    const result = await authApi.userExist(
      getValues("username"),
      getValues("email"),
      token
    );

    if (!result.ok) {
      setAutherror(result.data.message);
      setSuccess(false);
      setvisible(false);
      return;
    }
    setSuccess(true);
    setAutherror();
    setvisible(false);
  };
  useEffect(() => {
    getToken();
  }, []);
  const completeFormStep = () => {
    if (formStep === 0) {
      checkUser();

      if (!success) {
        return;
      }
    }

    setvisible(true);
    setTimeout(() => {
      setvisible(false);
    }, 1000);

    if (formStep === 4 && route.params.role === "CUSTOMER") {
      setformStep((cur) => cur + 2);
    } else {
      setformStep((cur) => cur + 1);
    }
  };

  const previousFormStep = () => {
    if (formStep === 4 && route.params.role === "CUSTOMER") {
      setformStep((cur) => cur - 2);
    }
    if (formStep === 5) {
      setIsSelected(false);
    }
    setvisible(true);
    setTimeout(() => {
      setvisible(false);
    }, 1000);
    setformStep((cur) => cur - 1);
  };
  const renderButton = () => {
    if (userRegistred) {
      return;
    }
    if (formStep > 6) {
      return;
    } else if (formStep === 0) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"NEXT"}
            onPress={completeFormStep}
            width="40%"
          />
        </View>
      );
    } else if (formStep === 1) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            title={"Previous"}
            onPress={previousFormStep}
            width="40%"
          />
          {date && (
            <AppButton
              disabled={!isValid}
              title={"NEXT"}
              onPress={completeFormStep}
              width="40%"
            />
          )}
        </View>
      );
    } else if (formStep === 2) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"Previous"}
            onPress={previousFormStep}
            width="40%"
          />
          {isValid && countryCode && (
            <AppButton
              disabled={!isValid}
              title={"NEXT"}
              onPress={completeFormStep}
              width="40%"
            />
          )}
        </View>
      );
    } else if (formStep === 6) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"Previous"}
            onPress={previousFormStep}
            width="40%"
          />
          <AppButton
            disabled={!isSelected}
            title={"Finish"}
            onPress={handleSubmit(onSubmit)}
            width="40%"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"Previous"}
            onPress={previousFormStep}
            width="40%"
          />
          <AppButton
            disabled={!isValid}
            title={"NEXT"}
            onPress={completeFormStep}
            width="40%"
          />
        </View>
      );
    }
  };
  const options = [
    {
      label: "Male",
      value: "MALE",
      imageIcon: require("../assets/gman.png"),
      activeColor: colors.primary,
    },

    {
      label: "femelle",
      value: "FEMALE",
      imageIcon: require("../assets/gwomen.png"),
      activeColor: colors.primary,
    },
  ];
  const handleConfirm = (date) => {
    setDate(date);
    setValue("dateOfBirth", format(date, "yyyy-MM-dd'T'HH:mm:ss") + "Z");
    setShow(false);
  };
  const handleConfirmImage = (uri) => {
    setimageUrie(uri);
    setValue("image", uri);
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      profil: route.params.role,
      yearsOfExperience: "5",
      username: "",
      password: "",
      validatePassword: "",
      email: "",
      phoneNumber: "",
      sex: "MALE",
      dateOfBirth: "",
      address: {
        country: "",
        city: "",
        number: "",
        street: "",
        zipCode: "",
      },
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    console.log(data);

    setvisible(true);
    let image = data.image;
    delete data["image"];
    delete data["validatePassword"];

    const result = await authApi.registerUser(data, image, token);
    console.log(result);
    setvisible(false);
    if (!result.ok) {
      setAutherror("You can't sign up, try later!");
      setvisible(false);
      return;
    }
    setvisible(false);
    setuserRegistred(true);
  };
  return (
    <>
      <ActivityIndicator visible={visible} />

      <View style={styles.container}>
        <Header Title="Register" OnBackPress={() => navigation.goBack()} />
        {userRegistred && (
          <View style={styles.registredContainer}>
            <MaterialCommunityIcons
              name="account-check"
              size={100}
              color="green"
            />
            <AppText>User Created Succefuly</AppText>
            <AppButton
              title="login"
              onPress={() => navigation.navigate("login")}
              width="60%"
            />
          </View>
        )}

        {!userRegistred && (
          <View style={styles.formContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: ((formStep + 1) / MAXSTEPS) * 100 + "%" },
                ]}
              ></View>
            </View>
            {formStep === 0 && (
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,

                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid E-mail",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="E-mail"
                      icon="mail"
                      autoCapitalize="none"
                    />
                  )}
                  name="email"
                />
                {errors.email && errors.email.type == "required" && (
                  <ErrorMessage message="E-mail is required" />
                )}
                {errors.email && errors.email.type == "pattern" && (
                  <ErrorMessage message="Invalid E-mail" />
                )}
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
                      onFocus={() => setAutherror()}
                      onChangeText={(text) => {
                        onChange(text);
                        if (autherror) {
                          setAutherror();
                        }
                      }}
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
                {autherror && <ErrorMessage message={autherror} />}
                {success && (
                  <View style={styles.successContainer}>
                    <MaterialCommunityIcons
                      color="green"
                      name="check-circle"
                      size={15}
                    />
                    <AppText style={styles.successText}>
                      Email And Username Verified
                    </AppText>
                  </View>
                )}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message: "Invalid Password",
                    },
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
                  <>
                    <ErrorMessage message="Invalid Password" />
                    <ErrorMessage message="Minimum 8 in caracters" />
                    <ErrorMessage message="At least 1 upper case" />
                    <ErrorMessage message="At least 1 lower case" />
                    <ErrorMessage message="At least 1 digit" />
                    <ErrorMessage message="At least 1 special character," />
                  </>
                )}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Validate Password"
                      icon="lock"
                      secureTextEntry={true}
                      autoCapitalize="none"
                    />
                  )}
                  name="validatePassword"
                />

                {errors.validatePassword &&
                  errors.validatePassword.type == "validate" && (
                    <ErrorMessage message={errors.validatePassword.message} />
                  )}
              </View>
            )}
            {formStep === 1 && (
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                      message: "Invalid Phone Number",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Phone Number"
                      icon="cellphone"
                    />
                  )}
                  name="phoneNumber"
                />
                {errors.phoneNumber &&
                  errors.phoneNumber.type == "required" && (
                    <ErrorMessage message="Phone Number is required" />
                  )}
                {errors.phoneNumber && errors.phoneNumber.type == "pattern" && (
                  <ErrorMessage message="Invalid Phone Number" />
                )}
                <TouchableOpacity onPress={() => setShow(true)}>
                  <AppTextInput
                    value={date ? format(date, "dd-MM-yyyy") : ""}
                    icon="calendar"
                    placeholder="Date Of Birth"
                    editable={false}
                  />
                </TouchableOpacity>
                <SwitchSelector
                  initial={0}
                  onPress={(item) => setValue("sex", item)}
                  textColor="black" //'#7a44cf'
                  selectedColor="white"
                  buttonColor={colors.primary}
                  borderColor={colors.primary}
                  hasPadding
                  valuePadding={0}
                  options={options}
                  height={50}
                />
              </View>
            )}
            {formStep === 2 && (
              <View>
                <View style={styles.location}>
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter={true}
                    withFlag={true}
                    withCountryNameButton={true}
                    withCallingCode
                    withAlphaFilter={true}
                    withEmoji={false}
                    onSelect={(item) => {
                      setValue("address.country", item.name);
                      setCountryCode(item.cca2);
                    }}
                    visible={showCn}
                  />
                </View>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^([A-Za-z0-9]){3,20}$/,
                      message: "Invalid City",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="City"
                      icon="city"
                      autoCapitalize="none"
                    />
                  )}
                  name="address.city"
                />
                {errors.address &&
                  errors.address.city &&
                  errors.address.city.type == "required" && (
                    <ErrorMessage message="City is required" />
                  )}
                {errors.address &&
                  errors.address.city &&
                  errors.address.city.type == "pattern" && (
                    <ErrorMessage message="Invalid City name" />
                  )}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^([A-Za-z0-9]){3,20}$/,
                      message: "Invalid Street",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Street"
                      icon="home-city"
                      autoCapitalize="none"
                    />
                  )}
                  name="address.street"
                />
                {errors.address &&
                  errors.address.street &&
                  errors.address.street.type == "required" && (
                    <ErrorMessage message="Street is required" />
                  )}
                {errors.address &&
                  errors.address.street &&
                  errors.address.street.type == "pattern" && (
                    <ErrorMessage message="Invalid Street name" />
                  )}
                <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([0-9]){1,20}$/,
                      message: "Invalid Number",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Number"
                      icon="home"
                      autoCapitalize="none"
                    />
                  )}
                  name="address.number"
                />

                <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([0-9]){1,20}$/,
                      message: "Invalid Zipe Code",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Zip Code"
                      icon="numeric"
                      autoCapitalize="none"
                    />
                  )}
                  name="address.zipCode"
                />
              </View>
            )}
            {formStep === 3 && (
              <>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([A-Za-z0-9]){4,20}$/,
                      message: "Invalid Account",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="facebook.com/..."
                      icon="facebook"
                      autoCapitalize="none"
                    />
                  )}
                  name="facebook"
                />
                {errors.facebook && errors.facebook.type == "required" && (
                  <ErrorMessage message="Phone Number is required" />
                )}
                {errors.facebook && errors.facebook.type == "pattern" && (
                  <ErrorMessage message="Invalid Input" />
                )}
                <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([A-Za-z0-9]){4,20}$/,
                      message: "Invalid Account",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="instagram.com/..."
                      icon="instagram"
                      autoCapitalize="none"
                    />
                  )}
                  name="instagram"
                />
                {errors.instagram && errors.instagram.type == "required" && (
                  <ErrorMessage message="Phone Number is required" />
                )}
                {errors.instagram && errors.instagram.type == "pattern" && (
                  <ErrorMessage message="Invalid Input" />
                )}
                <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([A-Za-z0-9]){4,20}$/,
                      message: "Invalid Account",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="pinterest.com/..."
                      icon="pinterest"
                      autoCapitalize="none"
                    />
                  )}
                  name="pinterest"
                />
                {errors.pinterest && errors.pinterest.type == "required" && (
                  <ErrorMessage message="Phone Number is required" />
                )}
                {errors.pinterest && errors.pinterest.type == "pattern" && (
                  <ErrorMessage message="Invalid Input" />
                )}
              </>
            )}
            {formStep === 4 && (
              <>
                <View style={styles.imgageContainer}>
                  <ImageInput
                    imageUri={imageUrie}
                    onChangeImage={handleConfirmImage}
                    onStart={() => setvisible(true)}
                    onFinish={() => setvisible(false)}
                  />
                </View>
              </>
            )}
            {formStep === 5 && (
              <>
                <AppText>Yers of Experience in Cooking</AppText>
                {/* <Controller
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^([0-9]){1,2}$/,
                      message: "Invalid Account",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="1/2/3"
                      icon="numeric"
                      autoCapitalize="none"
                      width="40%"
                    />
                  )}
                  name="yearsOfExperience"
                />
                {errors.yearsOfExperience &&
                  errors.yearsOfExperience.type == "required" && (
                    <ErrorMessage message="Invalid Input" />
                  )}
                {errors.yearsOfExperience &&
                  errors.yearsOfExperience.type == "pattern" && (
                    <ErrorMessage message="Invalid Input" />
                  )} */}
                <Picker
                  numberOfLines={2}
                  itemStyle={{
                    color: colors.primary,
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  selectedValue={selectedexp}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedexp(itemValue);
                    setValue("yearsOfExperience", itemValue);
                  }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="4" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
                <AppText>Describe Yourself</AppText>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^([A-Za-z0-9 ,!@#$%^&*()_+="':.?]){4,3000}$/,
                      message: "Invalid Input",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Skills..."
                      icon="account-check"
                      autoCapitalize="none"
                      multiline={true}
                    />
                  )}
                  name="skills"
                />
              </>
            )}
            {formStep === 6 && (
              <>
                <AppText>
                  Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression. Le Lorem
                  Ipsum est le faux texte standard de l'imprimerie depuis les
                  années 1500, quand un imprimeur anonyme assembla ensemble des
                  morceaux de texte pour réaliser un livre spécimen de polices
                  de texte. Il n'a pas fait que survivre cinq siècles, mais
                  s'est aussi adapté à la bureautique informatique, sans que son
                  contenu n'en soit modifié. Il a été popularisé dans les années
                  1960 grâce à la vente de feuilles Letraset contenant des
                  passages du Lorem Ipsum, et, plus récemment, par son inclusion
                  dans des applications de mise en page de texte, comme Aldus
                  PageMaker.
                </AppText>
                <AppText>
                  Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression. Le Lorem
                  Ipsum est le faux texte standard de l'imprimerie depuis les
                  années 1500, quand un imprimeur anonyme assembla ensemble des
                  morceaux de texte pour réaliser un livre spécimen de polices
                  de texte.
                </AppText>
                <BouncyCheckbox
                  size={25}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  textStyle={{ textDecorationLine: "none" }}
                  text="I agree with the terms"
                  iconStyle={{ borderColor: "green" }}
                  onPress={(isChecked) => {
                    setIsSelected(isChecked);
                  }}
                />
                {autherror && <ErrorMessage message={autherror} />}
              </>
            )}
          </View>
        )}
        {renderButton()}
      </View>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
      />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  successText: {
    color: "green",
    marginLeft: 5,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  BtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
  location: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  progressBar: {
    borderWidth: 1,
    width: "100%",
    height: 15,
    borderRadius: 5,
    borderColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: 2,
    marginBottom: 20,
  },
  progressBarFill: {
    backgroundColor: colors.orange,
    height: "80%",
    borderRadius: 5,
  },
  imgageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 300,
  },
  imageUpload: {
    borderWidth: 10,
    padding: 10,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editimage: {
    position: "absolute",
    top: 0,
    left: 80,
  },
  registredContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});
