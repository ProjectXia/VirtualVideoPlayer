import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setValue, selectTourValue } from "../features/tourSlice";

const settingData = [
  { name: "About", detail: "App Version 1.0.0" },
  { name: "Account", detail: "Users accounts" },
  { name: "Appearance", detail: "App appearance light or dark" },
  { name: "Application Tour", detail: "App tour set enable or disable" },
  { name: "Help & Support", detail: "App help & support" },
];

const SettingsScreen = () => {
  const isSwitchOn = useSelector(selectTourValue);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("is tourr: " + isSwitchOn);
  const onToggleSwitch = () => {
    if (isSwitchOn) {
      dispatch(setValue(false));
    } else {
      dispatch(setValue(true));
    }
  };
  useEffect(() => {}, [isSwitchOn]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#EEEDED",
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginBottom: 50,
          width: "100%",
        }}
      >
        <MaterialIcons name="settings-applications" size={30} />
        <Text style={{ fontSize: 20, fontWeight: "800", paddingLeft: 20 }}>
          Settings
        </Text>
      </View>
      <FlatList
        data={settingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => {
          let iconName;
          if (item.item.name === "About") {
            iconName = "info-outline";
          } else if (item.item.name === "Account") {
            iconName = "account-circle";
          } else if (item.item.name === "Appearance") {
            iconName = "remove-red-eye";
          } else if (item.item.name === "Application Tour") {
            iconName = "tour";
          } else {
            iconName = "help-outline";
          }
          return (
            <View
              style={{
                flexDirection: "row",
                height: 60,
                paddingHorizontal: 15,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={iconName}
                size={30}
                style={{
                  marginRight: 10,
                  marginTop: -15,
                }}
              />
              <TouchableOpacity
                style={{
                  width: "100%",
                  borderBottomWidth: 2,
                  borderBottomColor: "lightgray",
                }}
                onPress={() => {
                  if (item.item.name === "About") {
                    navigation.navigate("About");
                  } else if (item.item.name === "Application Tour") {
                    navigation.navigate("Tour");
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>
                      {item.item.name}
                    </Text>
                    {item.item.detail === "" ? (
                      <View style={{ height: 12, paddingVertical: 2 }}></View>
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "gray",
                          paddingVertical: 2,
                        }}
                      >
                        {item.item.detail}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 60,
                    }}
                  >
                    {item.item.name === "Application Tour" && (
                      <Switch
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                        style={{ justifyContent: "center" }}
                      />
                    )}
                    <MaterialIcons
                      name={"chevron-right"}
                      size={30}
                      style={{
                        marginRight: 10,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
