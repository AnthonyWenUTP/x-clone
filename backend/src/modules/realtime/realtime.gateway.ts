import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(
    socket: Socket
  ) {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      socket.join(userId);
    }
  }

  handleDisconnect(
    socket: Socket,
  ) {
    console.log(
      'Socket disconnected:',
      socket.id
    );
  }

  sendNotification(
    userId: string,
    payload: any,
  ) {
    this.server
      .to(userId)
      .emit(
        'notification',
        payload
      );
  }

  sendLikeUpdate(
    postId: string,
    payload: any,
  ) {
    this.server
      .to(`post:${postId}`)
      .emit(
        'like:update',
        payload
      );
  }

}