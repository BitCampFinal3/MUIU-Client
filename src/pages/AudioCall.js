import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
  background: linear-gradient(to bottom, #272727, #4b4b4b); 
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Header = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 0.5;
`;

const AcceptCall = styled.div`
  width: 100px;
  height: 100px;
  background-color: #4CD964;
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  position: fixed;
  bottom: 150px;
  left: 60px;
`;

const Call = styled(CallIcon)`
  color: #fff;
  scale: 2.5;
`;

const EndCall = styled.div`
  width: 100px;
  height: 100px;
  background-color: #E02D2D;
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  position: fixed;
  bottom: 150px;
  right: 60px; 
`;

const End = styled(CloseIcon)`
  color: #fff;
  scale: 2.5;
`;

const AudioCall = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(100);
  const [callPartner, setCallPartner] = useState({
    role: '상담사',
    name: '송민교'
  });
  
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnection = useRef(null);
  const webSocket = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결
    webSocket.current = new WebSocket('ws://localhost:9090/my-websocket');
    webSocket.current.onopen = () => console.log('WebSocket 연결 성공');

    // WebSocket 메시지 수신
    webSocket.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);

      if (data.offer) {
        console.log('Received SDP Offer');
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        webSocket.current.send(JSON.stringify({ answer }));
        console.log('Sent SDP Answer:', answer);
      } else if (data.answer) {
        console.log('Received SDP Answer');
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.iceCandidate) {
        console.log('Received ICE Candidate');
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
      }
    };

    // PeerConnection 설정
    const setupPeerConnection = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Sending ICE Candidate:', event.candidate);
          webSocket.current.send(JSON.stringify({ iceCandidate: event.candidate }));
        }
      };

      // ICE 연결 상태 변화 감지
      peerConnection.current.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.current.iceConnectionState);
      };

      // 원격 오디오 스트림 수신
      peerConnection.current.ontrack = (event) => {
        console.log('Received remote track');
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch(error => {
          console.error("Error playing remote audio:", error);
        });
      };

      try {
        // 로컬 오디오 스트림 설정
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localAudioRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
          console.log('Added local track:', track);
        });
        console.log('Local audio stream started');
      } catch (error) {
        console.error('Error accessing local audio stream:', error);
      }
    };

    setupPeerConnection();

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 및 PeerConnection 종료
      if (webSocket.current) webSocket.current.close();
      if (peerConnection.current) peerConnection.current.close();
    };
  }, []);

  // 통화 시작
  const initiateCall = async () => {
    console.log('Initiating call...');
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    webSocket.current.send(JSON.stringify({ offer }));
    console.log('Sent SDP Offer:', offer);
    setIsConnected(true);

    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // 통화 종료
  const endCall = async () => {
    console.log('Ending call...');
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setIsConnected(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const formatCallDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Container>
        <Header>
          <h4>{callPartner.role}</h4>
          <h2>{callPartner.name}</h2>
          <h5>{formatCallDuration(callDuration)}</h5>
        </Header>
        <audio ref={localAudioRef} autoPlay muted playsInline />
        <audio ref={remoteAudioRef} autoPlay playsInline />
        <AcceptCall onClick={initiateCall} disabled={isConnected}>
          <Call />
        </AcceptCall>
        <EndCall onClick={endCall} disabled={!isConnected}>
          <End />
        </EndCall>
      </Container>
    </>
  );
};

export default AudioCall;
