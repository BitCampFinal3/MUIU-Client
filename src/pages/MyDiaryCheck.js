import React from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
    margin-top: 50px;
    height: 80vh;
    width: 100vw;
    max-width: 600px;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 393px) {
        transform: translateX(-3.33%);
        height: 92vh;
    }
`;

const DatePicker = styled.div`
    margin-top: 20px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const DiaryEntry = styled.div`
    width: 80%;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const EntryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const TimeBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
`;

const EntryDateText = styled.span`
    font-size: 14px;
    color: #555;
`;

const EntryTitle = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
`;

const EntryContent = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
`;

const CommentSection = styled.div`
    width: 80%; 
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
`;

const CommentTitle = styled.h3`
    margin: 0 0 10px 0;
    font-size: 16px;
`;

const CommentWriter = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: #555;
`;

const CommentContent = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: #333;
`;

const MyDiaryCheck = () => {
    return (
        <Container>
            <DatePicker>
                <KeyboardArrowLeftIcon/>
                <CalendarTodayIcon style={{ width: '18px' }} />
                <span>Today</span>
                <KeyboardArrowRightIcon />
            </DatePicker>

            <DiaryEntry>
                <EntryHeader>
                    <img src={`${process.env.PUBLIC_URL}/svg/good.svg`} alt="좋음" />
                    <MoreVertIcon />
                </EntryHeader>
                <TimeBlock>
                    <AccessTimeFilledIcon style={{ width: '15px' }} />
                    <EntryDateText>28 May 21</EntryDateText>
                </TimeBlock>
                <EntryTitle>비트캠프에서의 첫 날</EntryTitle>
                <EntryContent>
                    오늘은 비트캠프에 처음 왔다.
                    <br />
                    처음에는 많이 긴장했지만, 새로운 분들이 친절하게 맞아주셔서 금방 긴장이 풀렸다.
                    <br /><br />
                    오늘은 HTML, CSS, JavaScript에 대해 간단하게 배웠다.
                    앞으로도 열심히 해야지.
                </EntryContent>
            </DiaryEntry>

            <CommentSection>
                <CommentTitle>댓글</CommentTitle>
                <hr />
                <CommentWriter>상담사 한서준</CommentWriter>
                <CommentContent>참 대~단 하시네요ㅋㅋ</CommentContent>
                <hr />
            </CommentSection>
        </Container>
    );
};

export default MyDiaryCheck;