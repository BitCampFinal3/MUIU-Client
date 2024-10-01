import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    position: relative;
    margin: 5vh auto;
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    height: 85%;
    overflow: hidden;
`;

const ImagesBox = styled.div`
    flex: 1;
    overflow-y: auto;
    background-color: white;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 5px;
    overflow-y: auto;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;

    &.active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    &:hover {
        color: #FFD700;
    }
`;

const TabsInfoPicture = styled.div`
    display: flex;
    margin-bottom: 20px;

    .tab {
        border-bottom: 2px solid #A1A1A1;
    }

    .active {
        color: #FFD700;
        border-bottom: 5px solid #FFD700;
    }

    .tab:hover {
        color: #FFD700;
    }
`;

const BackBtn = styled.button`
    width: 100%;
    height: 30px;
    text-align: left;
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #A1A1A1;
    cursor: pointer;
    padding-left: 15px;
`;

const HS_PhotoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClick={onClose}>
            <ModalContent>
                <BackBtn onClick={onClose}>&lt; </BackBtn>

                <TabsInfoPicture>
                    <Tab style={{borderBottom: '2px solid #A1A1A1'}}>정보</Tab>
                    <Tab className="active">사진</Tab>
                </TabsInfoPicture>

                <ImagesBox>
                    <Image src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 1.jpg`} alt="병원 예시 이미지 1" />
                    <Image src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 2.jpg`} alt="병원 예시 이미지 2" />
                    <Image src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 3.jpg`} alt="병원 예시 이미지 3" />
                    <Image src={`${process.env.PUBLIC_URL}/HS_images/병원 예시 이미지 4.jpg`} alt="병원 예시 이미지 4" />
                </ImagesBox>
            </ModalContent>
        </Modal>
    );
};

export default HS_PhotoModal;