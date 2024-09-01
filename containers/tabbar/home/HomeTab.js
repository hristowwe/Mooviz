import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { getMovieByGenre, getMovies } from "../../../api/movies";
import Logo from "../../../assets/svgs/Logo";
import { moderateScale } from "../../../common/constants";
import MHeader from "../../../components/common/MHeader";
import MovieCard from "../../../components/MovieCard";
import { StackNav } from "../../../navigation/NavigationKeys";
import { styles } from "../../../themes";

const RenderHeaderItem = React.memo(() => {
  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        <Logo width={moderateScale(30)} height={moderateScale(30)} />
      </View>
    );
  };
  return (
    <View>
      <MHeader homeHeader={true} isHideBack={true} isLeftIcon={<LeftIcon />} />
    </View>
  );
});

export default function HomeTab() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const colors = useSelector((state) => state.theme.theme);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const genreId = response.notification.request.content.data.genre;
        try {
          const movie = await getMovieByGenre(genreId);

          if (movie) {
            navigation.navigate(StackNav.MovieDetails, {
              item: movie,
              fromNotification: true,
            });
          }
        } catch (error) {
          console.error("Failed to fetch movie by genre:", error);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <MovieCard
      item={item}
      onPress={() => {
        navigation.navigate(StackNav.MovieDetails, {
          item: item,
        });
      }}
    />
  );

  return (
    <View
      style={[
        styles.flex,
        styles.center,
        { backgroundColor: colors.backgroundColor },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<RenderHeaderItem />}
          contentContainerStyle={localStyles.contentContainerStyle}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  contentContainerStyle: {
    ...styles.ph20,
    ...styles.pb20,
  },
});
