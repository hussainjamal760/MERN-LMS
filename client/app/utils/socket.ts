import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "http://localhost:8000";

class SocketService {
    private static instance: SocketService;
    public socket: Socket | null = null;
    private isInitialized = false;

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public initialize(): Socket {
        if (this.isInitialized && this.socket) {
            console.log("♻️ Socket already initialized, returning existing instance");
            return this.socket;
        }

        console.log("🚀 Initializing new socket connection to:", ENDPOINT);

        this.socket = io(ENDPOINT, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
        });

        // Connection event listeners
        this.socket.on("connect", () => {
            console.log("✅ Socket connected successfully!");
            console.log("Socket ID:", this.socket?.id);
            console.log("Transport:", this.socket?.io.engine.transport.name);
            this.isInitialized = true;
        });

        this.socket.on("connect_error", (error) => {
            console.error("❌ Socket connection error:", error.message);
            console.log("Attempting to connect to:", ENDPOINT);
        });

        this.socket.on("disconnect", (reason) => {
            console.log("🔌 Socket disconnected:", reason);
            if (reason === "io server disconnect") {
                // Reconnect manually if server initiated disconnect
                this.socket?.connect();
            }
        });

        this.socket.on("reconnect", (attemptNumber) => {
            console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
            this.isInitialized = true;
        });

        this.socket.on("welcome", (data) => {
            console.log("👋 Welcome message from server:", data);
        });

        return this.socket;
    }

    public getSocket(): Socket | null {
        if (!this.socket) {
            return this.initialize();
        }
        return this.socket;
    }

    public disconnect(): void {
        if (this.socket) {
            console.log("🔴 Disconnecting socket...");
            this.socket.disconnect();
            this.socket = null;
            this.isInitialized = false;
        }
    }
}

// Export singleton instance
export const socketService = SocketService.getInstance();
export const getSocket = () => socketService.getSocket();
export default socketService;