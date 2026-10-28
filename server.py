import http.server
import socketserver
import os
import sys

# Configure stdout and stderr for UTF-8 on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

PORT = 8888
DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(DIR)

class ThreadedAtelierServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True

class AtelierRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        "": "application/octet-stream",
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".mjs": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".pdf": "application/pdf",
        ".ico": "image/x-icon"
    }

    def end_headers(self):
        # Disable caching for instant updates
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def handle(self):
        try:
            super().handle()
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass

    def log_message(self, format, *args):
        # Silent clean logging
        pass

def find_free_port(start_port=8888):
    import socket
    port = start_port
    while port < start_port + 50:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(("", port))
                return port
        except OSError:
            port += 1
    return start_port

if __name__ == "__main__":
    final_port = find_free_port(PORT)
    print("=" * 60)
    print(f"STITCHABLE Atelier Server is Running!")
    print(f"Open URL in Browser: http://localhost:{final_port}")
    print(f"Serving Directory:   {DIR}")
    print("=" * 60)
    
    httpd = ThreadedAtelierServer(("", final_port), AtelierRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down STITCHABLE Atelier server.")
        httpd.server_close()
