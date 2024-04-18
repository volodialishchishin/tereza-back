import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('join')
  async handleJoinRoom(
    @MessageBody() data: { name: string; room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    const { user, isExist } = this.chatService.addUser(data);
    const userMessage = isExist
      ? `${user.name}, here you go again`
      : `Hey my love ${user.name}`;

    const messages = await this.chatService.getMessages(data.room);
    console.log(messages);
    client.emit('initMessages', messages);

    client.emit('messages', { user: { name: 'Admin' }, message: userMessage });
    client.broadcast.to(data.room).emit('message', {
      user: { name: 'Admin' },
      message: `${user.name} has joined`,
    });
    this.server
      .to(data.room)
      .emit('room', { users: this.chatService.getRoomUsers(data.room) });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { message: string; params: any }) {
    const user = this.chatService.findUser(data.params);

    if (user) {
      this.server
        .to(user.room)
        .emit('message', { user, message: data.message });

      this.chatService.saveMessage(user.name, data.message, user.room);
    }
  }

  @SubscribeMessage('leftRoom')
  handleLeaveRoom(@MessageBody() data: { params: any }) {
    const user = this.chatService.removeUser(data.params);
    if (user) {
      this.server.to(user.room).emit('message', {
        user: { name: 'Admin' },
        message: `${user.name} has left`,
      });
      this.server
        .to(user.room)
        .emit('room', { users: this.chatService.getRoomUsers(user.room) });
    }
  }
}
