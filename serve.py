"""Локальный сервер для разработки: отдаёт файлы с запретом кэша.

Запуск: python serve.py [порт]
Хостится на http://127.0.0.1:<порт>/
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8377
    ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()
