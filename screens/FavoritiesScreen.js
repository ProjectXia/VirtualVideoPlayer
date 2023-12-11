import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromfavlist,
  selectfavlistItems,
} from "../features/favoritiesSlice";
import { setStream, setValue } from "../features/playSlice";
import { useNavigation } from "@react-navigation/native";

const FavoritiesScreen = () => {
  const selectFav = useSelector(selectfavlistItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
        marginTop: 35,
        borderWidth: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#EEEDED",
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginBottom: 10,
          width: "100%",
        }}
      >
        <MaterialIcons name="favorite" size={30} color={"red"} />
        <Text style={{ fontSize: 18, paddingLeft: 30 }}>
          List of Favorities [{selectFav.length}]
        </Text>
      </View>
      <FlatList
        data={selectFav}
        horizontal={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setStream("Local"));
                dispatch(setValue(item.http));
                navigation.navigate("Play");
              }}
            >
              <Image
                source={{ uri: item.logo }}
                width={190}
                height={190}
                style={{ margin: 2 }}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 5, top: 5 }}
                onPress={() => {
                  dispatch(removeFromfavlist({ id: item.id }));
                }}
              >
                <MaterialIcons name="cancel" size={35} color={"red"} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default FavoritiesScreen;
