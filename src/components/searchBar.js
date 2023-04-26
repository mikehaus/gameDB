import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  Text,
  useToast,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { BASE_URL, RAWG_SECRET } from "../utils/constants";
import SearchResultsList from "./searchResultsList";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const slug = searchTerm.split(" ").join("-").toLowerCase();
  const URL = BASE_URL + `games?search=${slug}?token&key=${RAWG_SECRET}`;

  const searchingRef = useRef(false);

  useEffect(() => {
    const getResults = setTimeout(() => {
      fetch(URL)
        .then((resp) => resp.json())
        .then(({ results }) => {
          searchingRef.current = true;
          if (searchTerm) {
            setResults(results.slice(0, 15));
          } else {
            setResults([]);
          }
        })
        .catch((err) => console.error(err));
    }, 500);

    return () => {
      searchingRef.current = false;
      clearTimeout(getResults);
    };
  }, [searchTerm]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearchInputUpdate = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      searchingRef.current = false;
      setResults([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      toast({
        title: "Search Box Empty",
        description: "Please enter a term to search for",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onOpen();
  };

  return (
    <Flex>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          value={searchTerm}
          onChange={handleSearchInputUpdate}
          placeholder="Search for a game..."
          size="md"
          borderRadius="md"
          w="2xl"
          variant="filled"
        />
      </InputGroup>
      <Tooltip label="Search for a game">
        <Button
          aria-label="Search Games"
          size="md"
          onClick={handleSearch}
          borderRadius="md"
          colorScheme="teal"
        >
          Search
        </Button>
      </Tooltip>

      {/*searchingRef.current && (
        <Box boxSize="xl">
          <SearchResultsList searchResults={results} />
        </Box>
      )*/}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Games</ModalHeader>
          <ModalBody>
            {results.length ? (
              <SearchResultsList closeModal={onClose} searchResults={results} />
            ) : (
              <Text size="md">Couldn't find any results!</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default SearchBar;
