import React, { useState } from 'react';
import questions from '../pages/questionary_page/page_content';
import vacanciesContent from '../pages/vacancy_page/page_content';
import ContactInfoQuestionarySection from '../contact_info_questionary_section';
import CasesQuestionarySection from '../cases_questionary_section';
import MainQuestionarySection from '../main_questionary_section';
import ProfQuestionarySection from '../prof_questionary_section';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useMediaQuery } from 'react-responsive';
import deviceSizes from '../../../responsive_design/device_sizes';

const QuestionarySection = (props) => {
    const isMobile = useMediaQuery({ query: `(max-width: ${deviceSizes.mobileMaxWidth}px)` });
    const [contactInfoAnswers, setContactInfoAnswers] = useState(questions.main_questions);
    const [questionaryAnswers, setQuestionaryAnswers] = useState(questions.questionnaire);
    const [profQuestionaryAnswers, setProfQuestionaryAnswers] = useState(questions.prof_questionnaire);
    const [vacancyCases, setVacancyCases] = useState(vacanciesContent[props.vacancy].questionaryCases);
    const [getEmailCopy, setGetEmailCopy] = useState(false);

    const onAnswersUpdate = (questionIndex, questionAnswer, hookFunction, questions) => {
        hookFunction(questions.map((answer, index) => {
            if (index === questionIndex) {
                answer.answer = questionAnswer;
            }
            return answer;
        }));
    };

    return (
        <div className={`questionary-section${isMobile ? ' mobile' : ''}`}>
            <div className="content">
                <ContactInfoQuestionarySection
                    questions={contactInfoAnswers}
                    onUpdateAnswer={onAnswersUpdate}
                    onUpdateAnswerHook={setContactInfoAnswers}
                />
                <CasesQuestionarySection
                    questions={vacancyCases}
                    onUpdateAnswer={onAnswersUpdate}
                    onUpdateAnswerHook={setVacancyCases}
                />
                <MainQuestionarySection
                    questions={questionaryAnswers}
                    onUpdateAnswer={onAnswersUpdate}
                    onUpdateAnswerHook={setQuestionaryAnswers}
                />
                <ProfQuestionarySection
                    questions={profQuestionaryAnswers}
                    onUpdateAnswer={onAnswersUpdate}
                    onUpdateAnswerHook={setProfQuestionaryAnswers}
                />
                <div className="send-button" onClick={() => {
                    console.log(contactInfoAnswers);
                    console.log(questionaryAnswers);
                    console.log(profQuestionaryAnswers);
                    console.log(vacancyCases);
                }}>Отправить</div>
                <FormControlLabel
                    className="get-email-copy"
                    control={
                        <Checkbox
                            checked={getEmailCopy}
                            onChange={() => setGetEmailCopy(!getEmailCopy)}
                            value="getEmailCopy"
                            color="default"
                        />
                    }
                    label="Получить копию на эл. почту"
                />
            </div>
        </div >
    );
};

export default QuestionarySection;
