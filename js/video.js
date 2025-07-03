let localStream;
let remoteStream;
let peerConnection;
let isCallStarted = false;

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

// DOM elements
const startButton = document.getElementById('startButton');
const muteButton = document.getElementById('muteButton');
const endCallButton = document.getElementById('endCallButton');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const statusDiv = document.getElementById('status');

// Event listeners
startButton.addEventListener('click', startVideo);
muteButton.addEventListener('click', toggleMute);
endCallButton.addEventListener('click', endCall);

async function startVideo() {
    try {
        // Get local media stream
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        
        // Show local video
        localVideo.srcObject = localStream;
        
        // Update UI
        startButton.disabled = true;
        muteButton.disabled = false;
        endCallButton.disabled = false;
        updateStatus('Camera started. Connecting to remote peer...');
        
        // Initialize WebRTC
        await initializePeerConnection();
        
    } catch (error) {
        console.error('Error accessing media devices:', error);
        updateStatus('Error accessing camera. Please check permissions.', 'danger');
    }
}

async function initializePeerConnection() {
    try {
        // Create peer connection
        peerConnection = new RTCPeerConnection(configuration);
        
        // Add local stream
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
        
        // Handle incoming stream
        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
            remoteStream = event.streams[0];
            updateStatus('Connected to remote peer', 'success');
        };
        
        // Handle connection state changes
        peerConnection.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', peerConnection.iceConnectionState);
            if (peerConnection.iceConnectionState === 'disconnected') {
                updateStatus('Peer disconnected', 'warning');
            }
        };
        
        // Create and set local description
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        // Here you would typically send the offer to a signaling server
        // For demo purposes, we'll just log it
        console.log('Local description set:', offer);
        updateStatus('Waiting for remote peer to connect...', 'info');
        
    } catch (error) {
        console.error('Error setting up peer connection:', error);
        updateStatus('Error connecting to remote peer', 'danger');
    }
}

function toggleMute() {
    if (!localStream) return;
    
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        muteButton.textContent = audioTrack.enabled ? 'Mute' : 'Unmute';
        muteButton.classList.toggle('btn-outline-primary');
        muteButton.classList.toggle('btn-primary');
    }
}

function endCall() {
    // Stop all tracks
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    
    // Close peer connection
    if (peerConnection) {
        peerConnection.close();
    }
    
    // Reset video elements
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    
    // Reset streams
    localStream = null;
    remoteStream = null;
    
    // Reset UI
    startButton.disabled = false;
    muteButton.disabled = true;
    endCallButton.disabled = true;
    
    updateStatus('Call ended', 'info');
}

function updateStatus(message, type = 'info') {
    statusDiv.className = `alert alert-${type}`;
    statusDiv.textContent = message;
} 