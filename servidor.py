# Servidor local mínimo. Fuerza los tipos MIME correctos (en Windows .js a veces se sirve mal y bloquea los módulos).
import http.server, mimetypes, socketserver, webbrowser
mimetypes.add_type('text/javascript', '.js'); mimetypes.add_type('application/json', '.json')
PUERTO = 8000
class Servidor(socketserver.TCPServer): allow_reuse_address = True
with Servidor(('127.0.0.1', PUERTO), http.server.SimpleHTTPRequestHandler) as s:
    print(f'Abierto en http://localhost:{PUERTO}  (Ctrl+C para detener)')
    webbrowser.open(f'http://localhost:{PUERTO}')
    s.serve_forever()
