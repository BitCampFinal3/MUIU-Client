import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import userProfile from '../svg/user-de-profile.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../apis/memberApis';

const Content = styled.div`
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0;
    padding: 0 15px;

    .profile-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #e0e0e0;
        margin-right: 15px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .profile-type {
        font-size: 17px;
        color: #888;
        margin-bottom: 5px;
    }

    .profile-name {
        font-size: 25px;
        font-weight: bold;
    }

    .change-profile-btn {
        width: 80px;
        height: 25px;
        margin-right: 15px;
        border-radius: 5px;
        color: #888;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        margin-left: auto;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;

    .menu-button {
        flex: 1;
        text-align: center;
        padding: 10px;
        background-color: #FFF5CF;
        color: #FF9900;
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer;

        .menu-button-text {
            font-size: 12px;
        }
    }
`;

const MenuList = styled.div`
    .section {
        padding: 15px;

        .menu-item-arrow {
            color: #888;
            text-align: center;
            margin: auto 0;
            margin-right: 1.3rem;
        }
    }

    .flex-box {
        display: flex;
        justify-content: space-between;
    }

    .section-title {
        font-size: 23px;
        font-weight: bold;
        margin: 15px 0;
        padding-left: 15px;
    }

    .menu-item-counsel {
        display: flex;
        align-items: center;
        margin-top: 5px;
        padding-left: 20px;
        justify-content: space-between;

        .menu-item-text-counsel {
            color: #888;
            font-size: 13px;
        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-weight: bold;
        font-size: 20px;
        color: #444;

        :last-child {
            border-bottom: none;
        }

        .menu-item-icon {
            margin-right: 15px;
            font-size: 20px;
        }

        .menu-item-text {
            flex: 1;
            margin: 10px 0;
        }

        .menu-item-text2 {
            padding-top: 10px;
            font-size: 12px;
            color: #888;
            font-weight: normal;
        }
    }
`;

const RotatingArrow = styled(ArrowForwardIosIcon)`
    transform: ${({ rotate }) => (rotate ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s;
`;

const DeveloperInfo = styled.div`
    padding: 15px;
    font-size: 14px;
    color: #666;
    background-color: #f0f0f0;
    border-radius: 15px;
    margin: 10px 0;
`;

const DividerBox = styled.div`
    width: 93%;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 15px;
    margin: 15px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 16px;

    @media (max-width: 393px) {
        width: 90%;
    }
`;

const DividerButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: left; 
    align-items: center;
    padding: 15px;
    margin-left: 30px;
    font-weight: bold;
    &:focus {
        outline: none;
    }
`;

export const MyPage = () => {
    const [userData, setUserData] = useState(null); 
    const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const persistRoot = sessionStorage.getItem('persist:root');
    
                if (!persistRoot) {
                    navigate('/login');
                    return;
                }
    
                const parsedRoot = JSON.parse(persistRoot);
    
                if (!parsedRoot.memberSlice) {
                    navigate('/login');
                    return;
                }
    
                const memberSlice = JSON.parse(parsedRoot.memberSlice);
    
                if (!memberSlice.isLogin) {
                    navigate('/login');
                    return;
                }
    
                const token = localStorage.getItem('token');
                const userId = memberSlice.id;
    
                if (!token || !userId) {
                    navigate('/login');
                    return;
                }
    
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
    
                try {
                    const response = await axios.get(`http://localhost:9090/members/${userId}/name-role`, config);
    
                    if (response.status === 200 && response.data.item) {
                        setUserData(response.data.item);
                    } else {
                        navigate('/login');
                    }
    
                } catch (apiError) {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };
    
        fetchUserData();
    }, [navigate]);
    
    

    // userData가 null이 아닌지 확인 후 렌더링
    if (!userData) {
        return <div>유저 정보를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const handleStarredPlaceClick = () => {
        navigate('/starred-place');
    }

    const handleConsultationHistoryClick = () => {
        navigate('/consultation-record');
    };

    const handleDonationRecordClick = () => {
        navigate('/donation-record');
    };

    const handleProfilehangeClick = () => {
        alert('프로필 변경 모달 이동');
    };

    const handlePasswordChangeClick = () => {
        navigate('/change-password');
    };

    const handleSocialLinkClick = () => {
        alert('소셜 연동');
    };

    const handleLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSupportClick = () => {
        navigate('/support');
    };

    const handleDeveloperInfoClick = () => {
        setShowDeveloperInfo((prev) => !prev);
    };

    const handleAccountDeleteClick = async () => {
        if (window.confirm('정말 탈퇴하시겠습니까?')) {
            try {
                // sessionStorage에서 persist:root 가져오기
                const persistRoot = sessionStorage.getItem('persist:root');
                if (!persistRoot) {
                    console.warn('persist:root가 없습니다.');
                    alert('로그인이 필요합니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                    return;
                }
    
                // persist:root에서 memberSlice 파싱
                const parsedRoot = JSON.parse(persistRoot);
                const memberSlice = JSON.parse(parsedRoot.memberSlice);
    
                // userId와 token 가져오기
                const userId = memberSlice.id;
                const token = localStorage.getItem('token');
    
                if (!userId || !token) {
                    console.warn('유효하지 않은 userId 또는 token');
                    alert('로그인이 필요합니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                    return;
                }
    
                // 서버에 DELETE 요청 보내기
                const response = await axios.delete(`http://localhost:9090/members/${userId}/delete`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
    
                if (response.status === 200) {
                    alert('계정이 삭제되었습니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                } else {
                    alert('계정 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('오류:', error);
                if (error.response) {
                    alert(error.response.data.statusMessage || '계정 삭제 중 서버 오류가 발생했습니다.');
                } else {
                    alert('계정 삭제 중 네트워크 오류가 발생했습니다.');
                }
            }
        }
    };
    
    
    
    
    

    return (
        <Content>
            <Profile>
                <div className="profile-image">
                    <img src={userProfile} alt=""/>
                </div>
                <div className="profile-user">
                    <div className="profile-type">{userData.role === 'ROLE_COUNSELOR' ? '상담사' : '내담자'}</div>
                    <div className="profile-name">{userData.name} 님</div>
                </div>
                <div className="change-profile-btn" onClick={handleProfilehangeClick}>프로필 변경</div>
            </Profile>
            <Menu>
                <div className="menu-button" onClick={handleStarredPlaceClick}>
                    <div className="menu-button-icon">
                        <StarIcon/>
                    </div>
                    <div className="menu-button-text">즐겨찾기 장소</div>
                </div>
                <div className="menu-button" onClick={handleConsultationHistoryClick}>
                    <div className="menu-button-icon">
                        <PeopleIcon/>
                    </div>
                    <div className="menu-button-text">상담 내역</div>
                </div>
                <div className="menu-button" onClick={handleDonationRecordClick}>
                    <div className="menu-button-icon">
                        <AccountBalanceWalletIcon/>
                    </div>
                    <div className="menu-button-text">기부 내역</div>
                </div>
            </Menu>
            <DividerBox>
                <DividerButton onClick={handlePasswordChangeClick}>비밀번호 변경</DividerButton>
                <DividerButton onClick={handleSocialLinkClick}>소셜 연동</DividerButton>
                <DividerButton onClick={handleLogoutClick}>로그아웃</DividerButton>
            </DividerBox>
            <MenuList>
                <div className='section'>
                    <div className="menu-item">
                        <span className="menu-item-text" onClick={handleSupportClick}>지원</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className='section'>
                    <div className="menu-item" onClick={handleDeveloperInfoClick}>
                        <span className="menu-item-text" style={{marginLeft:"-20px"}}>개발자 정보</span>
                        <RotatingArrow style={{ color: "#999", marginRight:"-15px"}} rotate={showDeveloperInfo} />
                    </div>
                    {showDeveloperInfo && (
                        <DeveloperInfo>
                            <p>민수정 (full stack) - soojeongmin@soongsil.ac.kr</p>
                            <p>김대휘 (full stack) - whee990731@naver.com</p>
                            <p>김서연 (full stack) - kimseoyeon0332@gmail.com</p>
                            <p>반재형 (full stack) - publicdev2024@gmail.com</p>
                            <p>송민교 (full stack) - alsrysong@gmail.com</p>
                            <p>정다은 (full stack) - dechung1004@naver.com</p>
                            <p>한서준 (full stack) - watashijxxnsuka@gmail.com</p>
                        </DeveloperInfo>
                        )}
                    </div>
                    <hr style={{border: "0.5px solid #999"}}/>
                    <div className="menu-item">
                        <span className="menu-item-text" onClick={handleAccountDeleteClick}>탈퇴하기</span>
                        <ArrowForwardIosIcon style={{color:"#999"}}/>
                    </div>
                    <div className="menu-item">
                        <span className="menu-item-text2">© 마음이음. 모든 권리 보유.</span>
                    </div>
                </div>
            </MenuList>
        </Content>
    );
};

export default MyPage;
