import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import ActivityIndicator from "../components/ActivityIndicator";
import Header from "../components/Header";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";
import { Picker } from "@react-native-picker/picker";
import customerApi from "../api/Customer";
import MyCheckbox from "../components/MyCheckBox";
import ImageInput from "../components/ImageInput";
import AuthContext from "../auth/context";
import { useIsFocused } from "@react-navigation/native";
import CPreview from "./CPreview";

const CAdd = ({ navigation }) => {
  const isFocused = useIsFocused();

  const authContext = useContext(AuthContext);
  const MAXSTEPS = 5;
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState(null);
  const [category, setcategory] = useState([]);
  const [formStep, setformStep] = useState(0);
  const [selectedUnity, setSelectedUnity] = useState("KILOGRAM");
  const [selectedTime, setSelectedTime] = useState(5);
  const [imageUrie, setimageUrie] = useState();
  const [finish, setfinish] = useState(false);
  const [preview, setpreview] = useState(null);
  const handleConfirmImage = (uri) => {
    setimageUrie(uri);
    setValue("image", uri);
  };

  const completeFormStep = () => {
    setvisible(true);
    setTimeout(() => {
      setvisible(false);
    }, 1000);
    setformStep((cur) => cur + 1);
  };
  const previousFormStep = () => {
    setvisible(true);
    setTimeout(() => {
      setvisible(false);
    }, 1000);
    setformStep((cur) => cur - 1);
  };
  const getCategories = async () => {
    setvisible(true);
    const categoriesResult = await customerApi.getCategories();
    if (!categoriesResult.ok) {
      seterror("Error Fetching Data");
      setvisible(false);
      return;
    }
    setdata({ categories: categoriesResult.data });
    setvisible(false);
  };
  const renderButton = () => {
    if (formStep === 0) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"NEXT"}
            onPress={() => {
              completeFormStep();
              setValue("meal.cooker", { username: authContext.user.user_name });
              setValue("available", true);
            }}
            width="40%"
          />
        </View>
      );
    }
    if (formStep === 1) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={false}
            title={"Previous"}
            onPress={() => {
              previousFormStep();
              setcategory([]);
            }}
            width="40%"
          />
          <AppButton
            disabled={!category.length}
            title={"NEXT"}
            onPress={() => {
              completeFormStep();
              setValue("meal.categories", category);
              if (selectedUnity == "KILOGRAM") setValue("unity", selectedUnity);
            }}
            width="40%"
          />
        </View>
      );
    }
    if (formStep === 2) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={false}
            title={"Previous"}
            onPress={() => {
              previousFormStep();
              setcategory([]);
            }}
            width="40%"
          />
          <AppButton
            disabled={!isValid}
            title={"NEXT"}
            onPress={() => {
              completeFormStep();
              if (selectedTime == 5) setValue("meal.timeForConsumption", 5);
            }}
            width="40%"
          />
        </View>
      );
    }
    if (formStep === 3) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={false}
            title={"Previous"}
            onPress={() => {
              previousFormStep();
            }}
            width="40%"
          />
          <AppButton
            disabled={!isValid}
            title={"NEXT"}
            onPress={() => {
              completeFormStep();
            }}
            width="40%"
          />
        </View>
      );
    }
    if (formStep === 4) {
      return (
        <View style={styles.BtnContainer}>
          <AppButton
            disabled={!isValid}
            title={"Previous"}
            onPress={previousFormStep}
            width="40%"
          />
          <AppButton
            disabled={!imageUrie}
            title={"Finish"}
            onPress={handleSubmit(onSubmit)}
            width="40%"
          />
        </View>
      );
    }
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    useByDate: "2020-12-13T11:15:42",
    available: true,
    quantity: "",
    price: "",
    unity: "",
    geolocation: {
      latitude: 50.6333,
      longitude: 3.0667,
      distance: null,
    },
    meal: {
      title: "",
      description: "",
      timeForConsumption: "",
      categories: [],
      cooker: {
        username: authContext.user.user_name,
      },
    },
    mode: "all",
  });
  const onchangecatvalue = (value) => {
    if (value.status) {
      setcategory([...category, value.value]);
    } else {
      let newCat = category.filter((c) => c != value.value);
      setcategory(newCat);
    }
  };
  const onSubmit = async (data) => {
    setpreview(data);
    setfinish(true);
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (isFocused) {
      console.log("hannnnnna");
      reset();
    }
  }, [isFocused]);
  return (
    <>
      {!finish ? (
        <View style={styles.container}>
          <ActivityIndicator visible={visible} />
          <Header
            Title="Add New Meal"
            OnBackPress={() => navigation.goBack()}
          />
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
                      value: /^([A-Za-z0-9 .',]){4,200}$/,
                      message: "Invalid Title",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Title"
                      icon="format-title"
                    />
                  )}
                  name="meal.title"
                />
                {errors.meal &&
                  errors.meal.title &&
                  errors.meal.title.type == "required" && (
                    <ErrorMessage message="Title is required" />
                  )}
                {errors.meal &&
                  errors.meal.title &&
                  errors.meal.title.type == "pattern" && (
                    <ErrorMessage message="Invalid Title" />
                  )}
                <Controller
                  control={control}
                  rules={{
                    required: true,

                    pattern: {
                      value: /^([A-Za-zéèê0-9 .',]){4,900}$/,
                      message: "Invalid Title",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Description"
                      icon="clipboard-text"
                      multiline={true}
                    />
                  )}
                  name="meal.description"
                />
                {errors.meal &&
                  errors.meal.title &&
                  errors.meal.title.type == "required" && (
                    <ErrorMessage message="Description is required" />
                  )}
                {errors.meal &&
                  errors.meal.description &&
                  errors.meal.description.type == "pattern" && (
                    <ErrorMessage message="Invalid Description" />
                  )}
              </View>
            )}
            {formStep === 1 && (
              <>
                <AppText style={styles.categorieTitle}>
                  Select Categories
                </AppText>

                <ScrollView
                  contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    marginTop: 5,

                    width: "100%",
                  }}
                >
                  {data &&
                    data.categories.map((a) => (
                      <MyCheckbox
                        key={a.name}
                        name={a.name}
                        onChange={onchangecatvalue}
                      />
                    ))}
                </ScrollView>
              </>
            )}
            {formStep === 2 && (
              <>
                <AppText>Quantity</AppText>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^([0-9]){1,3}$/,
                      message: "Invalid Number",
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
                  name="quantity"
                />
                {errors.quantity && errors.quantity.type == "required" && (
                  <ErrorMessage message="Required Input" />
                )}
                {errors.quantity && errors.quantity.type == "pattern" && (
                  <ErrorMessage message="Invalid Input" />
                )}
                <AppText>Unity</AppText>
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
                  selectedValue={selectedUnity}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedUnity(itemValue);
                    setValue("unity", itemValue);
                  }}
                >
                  <Picker.Item label="Part" value="PART" />
                  <Picker.Item label="Kilogram" value="KILOGRAM" />
                  <Picker.Item label="Gram" value="GRAM" />
                  <Picker.Item label="Liter" value="LITER" />
                </Picker>
              </>
            )}
            {formStep == 3 && (
              <>
                <AppText>Price</AppText>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^([0-9]){1,3}$/,
                      message: "Invalid Number",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AppTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="10 cent"
                      icon="numeric"
                      autoCapitalize="none"
                      width="40%"
                    />
                  )}
                  name="price"
                />
                {errors.price && errors.price.type == "required" && (
                  <ErrorMessage message="Required Input" />
                )}
                {errors.price && errors.price.type == "pattern" && (
                  <ErrorMessage message="Invalid Input" />
                )}
                <AppText>Time for Consumption</AppText>
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
                  selectedValue={selectedTime}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedTime(itemValue);
                    setValue("meal.timeForConsumption", itemValue);
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((a) => (
                    <Picker.Item
                      label={a + " hours"}
                      value={a}
                      key={a.toString()}
                    />
                  ))}
                </Picker>
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
          </View>
          {renderButton()}
        </View>
      ) : preview ? (
        <CPreview
          params={preview}
          OnNewPress={() => {
            setfinish(false);
            setimageUrie();
            setformStep(0);
            reset();
          }}
          onHomePress={() => {
            setfinish(false);
            setformStep(0);
            setimageUrie();
            reset();
            navigation.navigate("Home");
          }}
          onPreview={() => {
            setfinish(false);
            setpreview(null);
          }}
        />
      ) : null}
    </>
  );
};

export default CAdd;

const styles = StyleSheet.create({
  imgageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 300,
  },
  categorieTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary,
  },
  container: {
    flex: 1,
    // position: "relative",
  },
  formContainer: {
    paddingHorizontal: "5%",
    marginTop: "10%",
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
  BtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
});
