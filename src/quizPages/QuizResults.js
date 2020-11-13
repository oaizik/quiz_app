import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button }  from '@material-ui/core';

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
    sub_title: {
        textAlign: 'center',
        fontSize: '16px'
    },
    results: {
        margin: '30px auto',
        height: '450px'
    },
    scoresHistory: {
        margin: '20px auto',
        width: '800px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    submit: {
        width: '250px',
        height: '50px',
        margin: '20px auto',
        backgroundColor: 'black',
        color: 'white'
    }
}));

export default function QuizResults({setQuizpage}) {
    const classes = useStyles();
    const [scoresHistory, setScoresHistory] = useState(undefined);
    const [lastScore, setLastScore] = useState(undefined);

    useEffect(() => { 
        let score_history = JSON.parse(localStorage["scores"]);
        let new_score_array = [];
        let counter = 0;
        for (counter = 0; counter < Object.keys(score_history).length - 1; counter++) {
            let temp_q = Object.values(score_history)[counter];
            new_score_array.push(temp_q);
        };
        setLastScore(Object.values(score_history)[counter]); 
        setScoresHistory(new_score_array);
    }, []);

    const returnClicked = async() => {
        setQuizpage(true);
    };

    return (
        <div className={classes.quiz}>
            <Typography className={classes.title}>
                {lastScore ? `you made ${lastScore} answers!!` : 'claculating your result'}
            </Typography>   
            <div className={classes.results}>
                <Typography className={classes.sub_title}>
                    {scoresHistory && scoresHistory.length > 0 && 'Your score history:'} 
                </Typography> 
                <div className={classes.scoresHistory}>
                    {scoresHistory && scoresHistory.map((q, i) => (
                        <div> 
                        <Typography className={classes.title}>
                            {scoresHistory[i]} 
                        </Typography>
                        </div> ))
                    }
                </div>
            </div>
            <Button className={classes.submit} onClick={returnClicked}>
                return
            </Button>
        </div>
    )
}
