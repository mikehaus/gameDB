import {
  Box,
  VStack,
  Image,
  Badge,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import { useGameContext } from "../context/gameContext";
import { addGameToContext } from "../context/hooks/useGameStateReducer";

/**
 * A list of search results from RAWG query to put in modal
 */

function SearchResultsList({ closeModal, searchResults }) {
  const listItems = searchResults.map((game) => (
    <ResultCard closeModal={closeModal} game={game} />
  ));

  return (
    <VStack spacing={2} align="stretch" w="100%">
      {listItems}
    </VStack>
  );
}

function ResultCard({ closeModal, game }) {
  const { name, background_image, metacritic, platforms, genres, id } = game;

  const { dispatch } = useGameContext();
  const toast = useToast();

  const addGame = () => {
    const newGame = {
      uid: id,
      title: name,
      background_image: background_image,
      rawg_id: id,
      status: "toDo",
      metacritic: metacritic,
      notes: "",
    };

    dispatch(addGameToContext(newGame));
    toast({
      title: `Added ${name} to To Do category`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    closeModal();
  };

  const gamePlatforms = platforms || [];
  const gameGenres = genres || [];

  const genreList = gameGenres.slice(0, 2).map((genre) => (
    <Badge colorScheme="red" borderRadius="full" px="2" mr={2}>
      {genre.name}
    </Badge>
  ));

  const platformList = gamePlatforms.slice(0, 2).map(({ platform }) => (
    <Badge colorScheme="teal" borderRadius="full" px="2" mr={2}>
      {platform.name}
    </Badge>
  ));

  return (
    <Box
      h="150px"
      display="flex"
      mb={1}
      p={5}
      borderRadius="md"
      bgColor="gray.900"
      boxShadow="lg"
      _hover={{
        bgColor: "gray.800",
      }}
      cursor="pointer"
      onClick={addGame}
    >
      <Box boxSize="200px">
        <Image
          src={background_image}
          alt={name}
          borderRadius="lg"
          objectFit="contain"
        />
      </Box>
      <Flex ml={5} direction="column">
        <Box mb="1" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
          <Heading size="md">{name}</Heading>
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          METACRITIC: {metacritic}
        </Box>
        <Box
          mt={5}
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="sm"
          textTransform="uppercase"
        >
          GENRES: {genreList}
        </Box>
        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="sm"
          textTransform="uppercase"
        >
          PLATFORMS: {platformList}
        </Box>
      </Flex>
    </Box>
  );
}

export default SearchResultsList;
