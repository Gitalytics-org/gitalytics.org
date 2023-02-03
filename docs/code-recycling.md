```python
@router.get("/")
async def endpoint(response: Response):
    fernet = Fernet(KEY)
    token = fernet.encrypt(value.encode())
    response.set_cookie(key, token.decode())
```
```python
class _SessionWrapper:
    def __init__(self, request: fastapi.Request, response: fastapi.Response):
        self.fernet = Fernet(settings.COOKIE_KEY)
        self.request = request
        self.response = response

    def get(self, key: str, *, default=...):
        try:
            token: str = self.request.cookies[key]
        except KeyError:
            if isinstance(default, type(Ellipsis)):
                raise
            return default
        else:
            return self.fernet.decrypt(token.encode()).decode()

    def set(self, key: str, value: str):
        token = self.fernet.encrypt(value.encode())
        self.response.set_cookie(key, token.decode())


@fastapi.Depends
def Session(request: fastapi.Request, response: fastapi.Response):
    r"""
    @router.get("/")
    async def endpoint(session: Session):
        session.set("key", "value")
    """
    return _SessionWrapper(request, response)
```
