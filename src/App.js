import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress  }  from '@material-ui/core';

import QuizForm from './quizPages/QuizForm';
import QuizResults from './quizPages/QuizResults';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#eca1a6',
        minHeight: '750px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loader: {
        display: 'flex',
        marginTop: '200px',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
    },
    header: {
        height: '50px',
        margin: '0px auto',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: '28px'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '650px',
        width: '80%',
        marginBottom: '50px'
    }
}));

function App() {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(true);
    const [quizpage, setQuizpage] = useState(true);

    const load = async () => {
        setTimeout(() => { setIsLoading(false); }, 3000);
    };

    useEffect(() => { 
        load();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography className={classes.title}>
                    welcome to the quiz app
                </Typography>    
            </div>
            {isLoading ? 
                <div className={classes.loader}>
                    <CircularProgress color="secondary" />
                </div>
                :
                <div className={classes.content}>
                    {quizpage ? <QuizForm setQuizpage={setQuizpage} /> : <QuizResults setQuizpage={setQuizpage} />}
                </div>
            }
        </div>
    );
}

export default App;
