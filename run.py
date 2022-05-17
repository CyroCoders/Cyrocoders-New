from app import server
from Retica.Sockets import HTTP_Socket

if __name__ == '__main__':
    socket = HTTP_Socket("0.0.0.0", 90)
    server.run([socket])