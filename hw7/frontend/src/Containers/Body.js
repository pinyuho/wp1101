import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// for Tab usage
import Box from '@material-ui/core/Box';
import { Tab } from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@mui/lab';

// infile import
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import Table from './Table'

const Wrapper = styled.section`
  width: 700px;
  // display: flex;
  // flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } = useScoreCard();

  const [tableCards, setTableCards] = useState([]);

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  // for Tab setting
  const [value, setValue] = useState('1');
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    console.log(tableCards)
    setTableCards([])
    const {
      data: { message, cards },
    } = await axios.post('/', {
      name,
      subject,
      score,
    });

    if (!cards) addErrorMessage(message);
    else {
      setTableCards(cards)
      addCardMessage(message)
    };
  };

  const handleQuery = async () => {
    const {
      data: { cards, message },
    } = await axios.get('/', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (cards.length === 0) {
      setTableCards([])
      addErrorMessage(message)
    } else {setTableCards(cards)};  //addRegularMessage(...cards);
  };

  return (
    <Wrapper>
      <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChangeValue} aria-label="lab API tabs example" centered>
          <Tab label="Add" value="1" />
          <Tab label="Query" value="2" />
        </TabList>
      </Box>
       <TabPanel value="1">  {/* ADD VIEW */}
        <Row>
          {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
          <TextField
            className={classes.input}
            placeholder="Name"
            value={name}
            onChange={handleChange(setName)}
          />
          <TextField
            className={classes.input}
            placeholder="Subject"
            style={{ width: 240 }}
            value={subject}
            onChange={handleChange(setSubject)}
          />
          <TextField
            className={classes.input}
            placeholder="Score"
            value={score}
            onChange={handleChange(setScore)}
            type="number"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!name || !subject}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Row>
      </TabPanel>
      <TabPanel value="2">   {/* QUERY VIEW */}
        <Row>
          <StyledFormControl>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={queryType}
                onChange={handleChange(setQueryType)}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio color="primary" />}
                  label="Name"
                />
                <FormControlLabel
                  value="subject"
                  control={<Radio color="primary" />}
                  label="Subject"
                />
              </RadioGroup>
            </FormControl>
          </StyledFormControl>
          <TextField
            placeholder="Query string..."
            value={queryString}
            onChange={handleChange(setQueryString)}
            style={{ flex: 1 }}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!queryString}
            onClick={handleQuery}
          >
            Query
          </Button>
        </Row>
        </TabPanel>
    </TabContext>

    <ContentPaper variant="outlined">
      {messages.map((m, i) => (
        <Typography variant="body2" key={m + i} style={{ color: m.color }}>
          {m.message}
        </Typography>
      ))}
    </ContentPaper>
    {Table(tableCards)}
    </Wrapper>
  );
};

export default Body;
