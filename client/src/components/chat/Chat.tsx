import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  AppBar, 
  Button, 
  Toolbar
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";
import Categories from "./Categories";
import Difficulties from "./Difficulties";
import api from "./scripts/api";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  const [categoriesAddVisible, setCategoriesAddVisible] = useState(false);
  const [difficultiesAddVisible, setDifficultiesAddVisible] = useState(false);

  useEffect(() => {
    countMessages();

  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location.pathname, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  const startBonus = async () => {
    localStorage.setItem('currentBonusPart','0');
    handleNextBonusPart();
  }
  
  const handleNextBonusPart = async () => {
    let currentBonusPart: number = 0;
    let currentBonusQuestion: any = {};
    if (Number(localStorage.getItem('currentBonusPart')) !== undefined) {
      currentBonusPart = Number(localStorage.getItem('currentBonusPart'));
    }
    if (Number(localStorage.getItem('currentBonusQuestion')) !== undefined) {
      currentBonusQuestion = JSON.parse(String(localStorage.getItem('currentBonusQuestion')));
    }
    console.log('start',localStorage.getItem('currentBonusQuestion'), localStorage.getItem('currentBonusPart'));
    if (currentBonusPart === 0) {
      await loadRandomBonuses();
      currentBonusQuestion = JSON.parse(String(localStorage.getItem('currentBonusQuestion')));
      localStorage.setItem('currentBonusQuestion', JSON.stringify(currentBonusQuestion));
      console.log('mid',localStorage.getItem('currentBonusQuestion'), currentBonusQuestion, localStorage.getItem('currentBonusPart'));
      await createMessage({
        variables: { createMessageInput: { content: currentBonusQuestion.leadin, chatId } },
      });
    }
    
    console.log(localStorage.getItem('currentBonusQuestion'), localStorage.getItem('currentBonusPart'));
    if (currentBonusPart % 2 === 1) {
      await createMessage({
        variables: { createMessageInput: { content: 'ANSWER: ' + currentBonusQuestion.answers[(currentBonusPart - 1) / 2], chatId } },
      });
    } else {
      await createMessage({
        variables: { createMessageInput: { content: currentBonusQuestion.parts[currentBonusPart / 2], chatId } },
      });
    }
    if (currentBonusPart === 5) {
      await createMessage({
        variables: { createMessageInput: { content: 'SET: ' + currentBonusQuestion.set.name + ' / CATEGORY: ' + currentBonusQuestion.subcategory, chatId } },
      });
    }
    scrollToBottom();
    localStorage.setItem('currentBonusPart', String(((currentBonusPart + 1) % 6)));
    console.log('end',localStorage.getItem('currentBonusQuestion'), localStorage.getItem('currentBonusPart'));
  };
  
  const loadRandomBonuses = async () => {
    await api.getRandomBonus().then(bonuses => {localStorage.setItem('currentBonusQuestion',JSON.stringify(bonuses[0]))});
  }; // TODO: update params to add category/difficulty/number/etc

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ height: "75vh", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages.length } })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => (
                <Grid container alignItems="center" marginBottom="1rem">
                  <Grid item xs={2} lg={1}>
                    <Stack
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={message.user.imageUrl}
                        sx={{ width: 52, height: 52 }}
                      />
                      <Typography variant="caption">
                        {message.user.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography sx={{ padding: "0.9rem" }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "0.25rem" }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                        {new Date(message.createdAt).toLocaleDateString()}{" "}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
      <Categories //TODO: UPDATE CATEGORIES TO HAVE CATEGORIES
      open={categoriesAddVisible}
      handleClose={() => setCategoriesAddVisible(false)}/>
      <Difficulties 
      open={difficultiesAddVisible}
      handleClose={() => setDifficultiesAddVisible(false)}/>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton size="large" edge="start" onClick={handleAddCategories}>
            <Button variant="contained">Categories</Button>
          </IconButton>
          <IconButton size="large" edge="start" onClick={handleAddDifficulties}>
            <Button variant="contained">Difficulties</Button>
          </IconButton>
          <IconButton size="large" edge="start" onClick={handleAddYearRange}>
            <Button variant="contained">Year Range</Button>
          </IconButton> */}
          <IconButton size="large" edge="start" onClick={startBonus}>
            <Button variant="contained" color="success">Start New Bonus</Button>
          </IconButton>
          <IconButton size="large" edge="start" onClick={handleNextBonusPart}>
            <Button variant="contained" color="secondary">Next Bonus Clue/Answer</Button>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Chat;
