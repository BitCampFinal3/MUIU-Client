import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Main = styled.main`
  width: 100%;  
  box-sizing: border-box; 
  padding: 0; 
  
  .post-form {
    padding: 1.2rem;
  }

  .post-input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.35rem;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .editor-container {
    margin-bottom: 1.5rem;
  }

  .submit-btn {
    height: 3.5rem;
    width: 100%;
    border: none;
    border-radius: 0.35rem;
    background-color: #3A76E9;
    color: #fff;
    font-weight: 600;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .post-form, .post-input, .editor-container, .submit-btn {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem;
    }

    .toastui-editor-defaultUI {
      width: 100% !important; 
      min-width: 100% !important; 
      overflow-x: hidden; 
    }
  }
`;

const FundPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [team, setTeam] = useState('');
    const [fundStart, setFundStart] = useState(null);
    const [fundEnd, setFundEnd] = useState(null);
    const [businessStart, setBusinessStart] = useState(null);
    const [businessEnd, setBusinessEnd] = useState(null);
    const [targetAmount, setTargetAmount] = useState('');
    const editorRef = useRef();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const content = editorRef.current?.getInstance().getHTML();

        const postData = {
            title,
            content,
            team,
            fundPeriod: `${fundStart?.toLocaleDateString()} - ${fundEnd?.toLocaleDateString()}`,
            businessPeriod: `${businessStart?.toLocaleDateString()} - ${businessEnd?.toLocaleDateString()}`,
            targetAmount,
        };

        console.log('작성된 글:', postData);

        setTimeout(() => {
            navigate('/fund', { state: postData });
        }, 0);
    };

    return (
        <Main>
            <form className="post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="post-input"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <div className="editor-container">
                    <Editor
                        ref={editorRef}
                        initialValue=""
                        previewStyle="vertical"
                        height="300px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        placeholder="내용을 입력하세요"
                        plugins={[color]}
                    />
                </div>

                <input
                    type="text"
                    className="post-input"
                    placeholder="프로젝트팀을 입력하세요"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                />

                <label>모금 기간</label>
                <label>시작일:</label>
                <DatePicker 
                    selected={fundStart} 
                    onChange={(date) => setFundStart(date)} 
                    className="post-input" 
                    placeholderText="시작일 선택" 
                    required
                />
                <label>종료일:</label>
                <DatePicker 
                    selected={fundEnd} 
                    onChange={(date) => setFundEnd(date)} 
                    className="post-input" 
                    placeholderText="종료일 선택" 
                    required
                />

                <label>사업 기간</label>  
                <label>시작일:</label>
                <DatePicker 
                    selected={businessStart} 
                    onChange={(date) => setBusinessStart(date)} 
                    className="post-input" 
                    placeholderText="시작일 선택" 
                    required
                />
                <label>종료일:</label>
                <DatePicker 
                    selected={businessEnd} 
                    onChange={(date) => setBusinessEnd(date)} 
                    className="post-input" 
                    placeholderText="종료일 선택" 
                    required
                />

                <input
                    type="number"
                    className="post-input"
                    placeholder="목표 금액을 입력하세요"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                />

                <button type="submit" className="submit-btn">
                    작성 완료
                </button>
            </form>
        </Main>
    );
};

export default FundPost;