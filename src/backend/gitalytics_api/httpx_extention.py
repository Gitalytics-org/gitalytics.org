import httpx
import typing as t


class HttpxBearerAuth(httpx.Auth):
    """
    Allows the 'auth' argument to be passed as a (username, password) pair,
    and uses HTTP Basic authentication.
    """

    def __init__(self, bearer: str):
        self._auth_header = f"Bearer {bearer}"

    def auth_flow(self, request: httpx.Request) -> t.Generator[httpx.Request, httpx.Response, None]:
        request.headers["Authorization"] = self._auth_header
        yield request
