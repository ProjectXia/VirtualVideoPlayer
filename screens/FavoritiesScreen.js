import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
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
        <Text style={{ fontSize: 20, fontWeight: "800", paddingLeft: 20 }}>
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
        ListEmptyComponent={
          <View
            style={{
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/69/f0/c4/69f0c4bf1628e22dfdb8248fa479503b.jpg",
              }}
              width={150}
              height={150}
            />
            <Text style={{ fontSize: 16, color: "gray", fontWeight: "600" }}>
              Favorities list is Empty
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default FavoritiesScreen;
