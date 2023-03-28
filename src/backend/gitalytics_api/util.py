#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import time
import functools
import typing as t


def simple_endpoint_cache(max_age: int = 60):
    r"""
    @router.get("/")
    @simple_endpoint_cache()
    async def endpoint():
        return heavy_computation()
    important: no args for endpoint
    """
    def decorator(func: t.Callable[[t.Any, t.Any], t.Awaitable]):
        response: t.Any = None
        last_refresh: int = 0

        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            nonlocal response, last_refresh

            if last_refresh + max_age < time.time():
                response = await func(*args, **kwargs)
                last_refresh = time.time()
            return response

        return wrapper
    return decorator
