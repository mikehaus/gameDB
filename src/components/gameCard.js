import React, { useState } from "react";
import {
  Box,
  Badge,
  Image,
  IconButton,
  Tooltip,
  Spacer,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  Textarea,
  Text,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

import useGameCard from "./hooks/useGameCard";

import { useGameContext } from "../context/gameContext";
import { updateGameInContext } from "../context/hooks/useGameStateReducer";

/**
 * Presentational display component for a game on the kanban board;
 *
 * @param {game} Game class object
 * @returns Game Card tile
 */

function GameCard({ game }) {
  const { title, status, background_image, metacritic, notes } = game;

  const [value, setValue] = useState(notes);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useGameContext();

  const {
    getColorScheme,
    moveNextStatus,
    movePreviousStatus,
    handleDelete,
    getNextStatus,
    getPreviousStatus,
  } = useGameCard({ game });

  const DUMMY_IMG_URL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3v17tk_02_vZcths0bHw_mPr2XSI7WbondA&usqp=CAU";

  const displayImage = background_image || DUMMY_IMG_URL;

  const handleModalOpen = () => {
    onOpen();
  };

  const handleNoteChange = (e) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    const updatedGame = {
      notes: value,
      ...game,
    };
    dispatch(updateGameInContext(updatedGame));
    onClose();
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        m="0 0 10px 0"
        _hover={{
          border: "4px solid teal",
        }}
        position="relative"
        onClick={handleModalOpen}
      >
        <Image src={displayImage} alt={title} objectFit="cover" />
        <Tooltip label="Delete game" placement="top">
          <IconButton
            position="absolute"
            top="2"
            right="2"
            icon={<DeleteIcon />}
            bgColor="red.600"
            _hover={{
              bgColor: "red.500",
            }}
            onClick={handleDelete}
            borderRadius="lg"
          />
        </Tooltip>

        <Box p="4" bgColor="gray.900">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme={getColorScheme()}>
              {status}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              METACRITIC: {metacritic}
            </Box>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {title}
            </Box>
            <Spacer />
            {status !== "toDo" && (
              <Tooltip label={`Update ${title} to ${getPreviousStatus()}`}>
                <IconButton
                  colorScheme="green"
                  aria-label="update game previous category"
                  icon={<ChevronLeftIcon />}
                  onClick={movePreviousStatus}
                  ml={2}
                  size="lg"
                  boxSize={8}
                />
              </Tooltip>
            )}
            <Tooltip label={`Update ${title} to ${getNextStatus()}`}>
              <IconButton
                colorScheme="green"
                aria-label="update game next category"
                icon={<ChevronRightIcon />}
                onClick={moveNextStatus}
                ml={2}
                size="lg"
                boxSize={8}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <Text ml={6}>Notes:</Text>
          <Textarea value={value} onChange={handleNoteChange} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default GameCard;
