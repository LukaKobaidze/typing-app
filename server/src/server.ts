import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fetchQuote, generateCode, startCountdown } from './helpers';

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

export type RoomPlayerState = {
  id: string;
  wordIndex: number;
  charIndex: number;
  result?: {
    showResults: boolean;
    timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
    errors: number;
    testType: string | null;
    date?: number;
    quoteAuthor?: string;
  };
  playAgain?: boolean;
  disconnected?: boolean;
};

const clientRooms: { [key: string]: string } = {};
const roomState: {
  [key: string]: {
    players: { player1: RoomPlayerState; player2?: RoomPlayerState };
    testText?: string;
  };
} = {};

io.on('connection', (socket) => {
  console.log('New Connection: ', socket.id);

  socket.on('createRoom', () => {
    const roomCode = generateCode(6);

    clientRooms[socket.id] = roomCode;
    roomState[roomCode] = {
      players: { player1: { id: socket.id, wordIndex: 0, charIndex: 0 } },
    };

    socket.join(roomCode);
    socket.emit('joinedRoom', roomCode);
    io.sockets.to(roomCode).emit('roomState', roomState[roomCode]);
  });

  socket.on('joinRoom', (roomCode: string) => {
    if (!roomState.hasOwnProperty(roomCode)) {
      socket.emit('joinRoomError');
      return;
    }

    clientRooms[socket.id] = roomCode;
    roomState[roomCode].players.player2 = {
      id: socket.id,
      wordIndex: 0,
      charIndex: 0,
    };
    socket.join(roomCode);
    socket.emit('joinedRoom', roomCode);

    fetchQuote()
      .then((quote: string) => {
        roomState[roomCode].testText = quote;
        io.sockets.to(roomCode).emit('testText', quote);
      })
      .then(() => {
        startCountdown(roomCode, io);
      });

    io.sockets.to(roomCode).emit('roomState', roomState[roomCode]);
  });

  socket.on(
    'caretPositionChange',
    ({ wordIndex, charIndex }: { wordIndex: number; charIndex: number }) => {
      const roomCode = clientRooms[socket.id];

      if (!roomCode || !roomState[roomCode]) {
        return;
      }

      const player =
        roomState[roomCode].players.player1.id === socket.id ? 'player1' : 'player2';

      roomState[roomCode].players[player] = {
        id: roomState[roomCode].players[player]!.id,
        wordIndex,
        charIndex,
      };

      socket.broadcast
        .to(roomCode)
        .emit('caretPositionChange', { player, wordIndex, charIndex });
    }
  );

  socket.on('result', (result) => {
    const roomCode = clientRooms[socket.id];

    if (!roomCode || !roomState.hasOwnProperty(roomCode)) {
      console.error("room doesn't exist`");
      return;
    }

    const player =
      roomState[roomCode].players.player1.id === socket.id ? 'player1' : 'player2';

    const opponentPlayer = player === 'player1' ? 'player2' : 'player1';

    if (roomState[roomCode].players[player]) {
      roomState[roomCode].players[player]!.result = result;

      const typedWords = roomState[roomCode].testText?.split(' ')!;
      io.sockets.to(roomCode).emit('caretPositionChange', {
        player,
        wordIndex: typedWords.length - 1,
        charIndex: typedWords[typedWords.length - 1].length,
      });
    }

    if (roomState[roomCode].players[opponentPlayer]?.result) {
      io.sockets.to(roomCode).emit('roomPlayersState', roomState[roomCode].players);
    }
  });

  socket.on('playAgain', () => {
    const roomCode = clientRooms[socket.id];

    if (!roomCode || !roomState.hasOwnProperty(roomCode)) {
      console.error("room doesn't exist");
      return;
    }

    let state = roomState[roomCode];

    const player = state.players.player1.id === socket.id ? 'player1' : 'player2';

    const opponentPlayer = player === 'player1' ? 'player2' : 'player1';

    if (state.players[opponentPlayer]?.playAgain) {
      roomState[roomCode] = {
        testText: '',
        players: {
          player1: { id: state.players.player1.id, wordIndex: 0, charIndex: 0 },
          player2: { id: state.players.player2!.id, wordIndex: 0, charIndex: 0 },
        },
      };

      io.sockets.to(roomCode).emit('roomState', roomState[roomCode]);

      fetchQuote()
        .then((quote: string) => {
          roomState[roomCode].testText = quote;
          io.sockets.to(roomCode).emit('testText', quote);
        })
        .then(() => {
          startCountdown(roomCode, io);
        });
    } else {
      roomState[roomCode].players[player]!.playAgain = true;

      io.to(state.players[opponentPlayer]!.id).emit('opponentPlayAgain');
    }
  });

  const handleRoomDisconnect = () => {
    const roomCode = clientRooms[socket.id];

    if (!roomCode || !roomState[roomCode]) {
      return;
    }

    socket.leave(roomCode);
    delete clientRooms[socket.id];

    const player =
      roomState[roomCode].players.player1.id === socket.id ? 'player1' : 'player2';

    const opponentPlayer = player === 'player1' ? 'player2' : 'player1';

    if (roomState[roomCode].players[opponentPlayer]?.disconnected) {
      delete roomState[roomCode];
    } else {
      roomState[roomCode].players[player]!.disconnected = true;
      io.to(roomState[roomCode].players[opponentPlayer]!.id).emit(
        'opponentDisconnected'
      );
    }

  };

  socket.on('leaveRoom', handleRoomDisconnect);

  socket.on('disconnect', handleRoomDisconnect);
});

httpServer.listen(PORT);
