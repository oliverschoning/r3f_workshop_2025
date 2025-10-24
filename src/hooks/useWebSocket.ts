import { useCallback, useEffect, useRef, useState } from "react"

export function useWebSocket(onMessage: (message: MessageEvent) => void) {
  const url: string = "ws://localhost:1234";
  const [websocket, setWebSocket] = useState<WebSocket>(null!)

  function sendMessage(message: string) {
    if (websocket.readyState !== WebSocket.OPEN) {
      return
    }
    websocket.send(message);
  }

  useEffect(() => {
    let socket: WebSocket

    const connect = () => {
      socket = new WebSocket(url)
      socket.onerror = () => {
        setTimeout(connect, 100);
      }
      socket.onmessage = onMessage;
      setWebSocket(socket);
    }

    connect();

    return () => {
      socket.close()
    }
  }, [])

  return { onMessage, sendMessage }
}

