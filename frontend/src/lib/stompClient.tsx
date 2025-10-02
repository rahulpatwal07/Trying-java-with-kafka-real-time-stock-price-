import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const stompClient = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default stompClient;