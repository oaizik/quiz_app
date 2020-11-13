import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button }  from '@material-ui/core';

import questionData from '../data/questionData.json';

const useStyles = makeStyles(theme => ({
    quiz: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d6cbd3'
    },
    title: {
        textAlign: 'center',
        fontSize: '20px',
        marginTop: '10px'
    },
    questions: {
        width: '1000px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    question: {
        marginTop: '40px',
        width: '300px',
        height: '110px'
    },
    question_title: {
        fontSize: '20px',
        color: 'black',
        height: '30px'
    },
    radios: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '250px',
        height: '90px'
    },
    submit: {
        width: '250px',
        height: '50px',
        margin: '20px auto',
        backgroundColor: 'black',
        color: 'white'
    }
}));

export default function QuizForm({setQuizpage}) {
    const classes = useStyles()
    const [value, setValue] = useState(new Array(10));

    const handleChange = (e) => {
        let radios_array = new Array(10);
        radios_array = value;
        radios_array[Number(e.target.name) - 1] = e.target.value;
        setValue(radios_array);
    };

    const checkAnswers = () => {
        let correct_answers = 0;
        for (let i = 0; i < 10; i++) {
            if (value[i] === questionData.answersArray[i]) {
                correct_answers += 1;
            }
        }
        return correct_answers;
    }

    const submitClicked = async() => {
        let correct_answers = await checkAnswers().toString();
        let history_length = localStorage.getItem('scores') ? localStorage.getItem('scores').length : 0;
        if (history_length) {
            let score_history = JSON.parse(localStorage["scores"]);
            let new_score_array = [];
            for (let i = 0; i < Object.keys(score_history).length; i++) {
                let temp_q = Object.values(score_history)[i];
                new_score_array.push(temp_q);
            };
            new_score_array.push(correct_answers);
            localStorage["scores"] = JSON.stringify(new_score_array);
        } else {
            let scores = [correct_answers];
            localStorage["scores"] = JSON.stringify(scores);
        };
        setQuizpage(false);
    };

    return (
        <div className={classes.quiz}>
            <Typography className={classes.title}>
                Good Luck, its a bit trickey questions
            </Typography>    
            <div className={classes.questions}>
                {questionData &&
                    questionData.questions.map((q) => (
                    <div
                        className={classes.question}
                        key={q.q_id}
                    > 
                        <FormControl component="fieldset">
                            <FormLabel className={classes.question_title} component="legend">
                                {q.q_title}
                            </FormLabel>
                            <RadioGroup className={classes.radios} name={`${q.q_id}`} value={value[q.q_id - 1]} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label={`${q.q_answers.a_1}`} />
                                <FormControlLabel value="2" control={<Radio />} label={`${q.q_answers.a_2}`} />
                                <FormControlLabel value="3" control={<Radio />} label={`${q.q_answers.a_3}`} />
                                <FormControlLabel value="4" control={<Radio />} label={`${q.q_answers.a_4}`} />
                            </RadioGroup>
                        </FormControl>
                    </div> ))
                }
            </div>
            <Button className={classes.submit} onClick={submitClicked}>
                Submit
            </Button>
        </div>
    )
}
