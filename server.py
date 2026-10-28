import http.server
import socketserver
import os
import sys
import json
import urllib.request
import urllib.error

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
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/mentor":
            self.handle_mentor_api()
        else:
            self.send_error(404, "Endpoint not found")

    def handle_mentor_api(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)
            payload = json.loads(post_body.decode("utf-8")) if post_body else {}

            query = payload.get("query", "").strip()
            lang = payload.get("lang", "en")
            project_context = payload.get("projectContext", None)

            gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()
            groq_key = os.environ.get("GROQ_API_KEY", "").strip()

            if gemini_key:
                response_data = self.call_gemini_api(gemini_key, query, lang, project_context)
                if response_data:
                    self.send_json_response(200, response_data)
                    return

            # If no API key configured on server or external call failed, respond gracefully
            self.send_json_response(200, {
                "ok": False,
                "message": "Local expert mode active. Using verified NIFT curriculum knowledge base.",
                "useExpert": True
            })

        except Exception as e:
            self.send_json_response(200, {
                "ok": False,
                "error": str(e),
                "useExpert": True
            })

    def call_gemini_api(self, api_key, query, lang, project_context):
        try:
            is_te = lang == "te"
            context_str = ""
            if project_context:
                context_str = f"\nUser's Active Project Context: {json.dumps(project_context)}"

            system_prompt = (
                f"You are 'Master Ji', a world-class tailoring and couture fashion mentor. "
                f"Respond in {'pure Telugu with authentic tailoring vocabulary' if is_te else 'clear tailoring terminology'}. "
                f"Never fabricate measurements. Explain formulas deterministically.{context_str}"
            )

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            req_data = json.dumps({
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"{system_prompt}\n\nUser Question: {query}"}]
                    }
                ]
            }).encode("utf-8")

            req = urllib.request.Request(
                url,
                data=req_data,
                headers={"Content-Type": "application/json"},
                method="POST"
            )

            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    res_json = json.loads(response.read().decode("utf-8"))
                    text = res_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                    if text:
                        return {
                            "ok": True,
                            "title": "మాస్టర్ జీ లైవ్ సమాధానం" if is_te else "Master Ji Live AI Analysis",
                            "content": text,
                            "actionTag": "లైవ్ AI" if is_te else "Live AI"
                        }
        except Exception:
            pass
        return None

    def send_json_response(self, code, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

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
