import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const settingData = [
  { name: "About", detail: "App Version 1.0.0" },
  { name: "Account", detail: "" },
  { name: "Appearance", detail: "" },
  { name: "Help & Support", detail: "" },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginTop: 45 }}>
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
                  <View>
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
                  <View>
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
    </View>
  );
};

export default SettingsScreen;
