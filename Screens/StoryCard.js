// Modules Import
import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";

// Files Import
import CustomText from "../Utility/CustomText";

export default class StoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
      is_liked: this.props.story.value.is_liked,
      likes: 0,
    };
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light" ? true : false,
        });
      });
  }

  likeActive = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("is_liked")
        .set(false);
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("is_liked")
        .set(true);
    }
  };

  fetchStories = () => {
    firebase
      .database()
      .ref("/posts/" + this.state.story_id)
      .on("value", (snapshot) => {
        this.setState({
          is_liked: snapshot.val().is_liked,
          likes: snapshot.val().likes,
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchStories();
  }

  render() {
    let story = this.state.story_data;
    let id = this.state.story_id;
    let likes = this.state.likes;
    let is_liked = this.state.is_liked;
    let images = {
      image_1: require("../assets/story_image_1.png"),
      image_2: require("../assets/story_image_2.png"),
      image_3: require("../assets/story_image_3.png"),
      image_4: require("../assets/story_image_4.png"),
      image_5: require("../assets/story_image_5.png"),
    };
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("StoryScreen", {
            story: story,
            id: id,
            likes: likes,
            is_liked: is_liked,
          })
        }
      >
        <View>
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <View style={styles.storyImage}>
              <Image
                source={images[story.preview_images]}
                style={{
                  resizeMode: "contain",
                  width: Dimensions.get("window").width - 60,
                  height: 250,
                  borderRadius: 10,
                }}
              ></Image>
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <CustomText
                  design={styles.storyTitleText}
                  children={story.title}
                />
                <CustomText
                  design={styles.storyAuthorText}
                  children={story.author}
                />
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <CustomText
                design={styles.descriptionText}
                children={story.description}
              />
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => this.likeActive()}>
                <View
                  style={
                    this.state.is_liked
                      ? styles.likeButtonLiked
                      : styles.likeButton
                  }
                >
                  <View style={styles.likeIcon}>
                    <Ionicons
                      name={"heart"}
                      size={30}
                      color={"white"}
                      style={{ width: 30, marginLeft: 20, marginTop: 5 }}
                    />
                  </View>
                  <View>
                    <CustomText
                      design={styles.likeText}
                      children={this.state.likes}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: -20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#2f345d",
    borderRadius: 20,
    height: undefined,
    padding: 10,
  },
  cardContainerLight: {
    marginTop: -20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    height: undefined,
    padding: 10,
    margin: 10,
    borderColor: "lightyellow",
    borderWidth: 5,
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleTextContainer: {
    flex: 1,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 18,
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
  },
  actionContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  likeButtonLiked: {
    backgroundColor: "#eb3948",
    borderRadius: 30,
    width: 160,
    height: 40,
    flexDirection: "row",
  },
  likeText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
  likeButton: {
    backgroundColor: "#eb3948",
    borderRadius: 30,
    width: 160,
    height: 40,
    flexDirection: "row",
    borderWidth: 2,
  },
});
