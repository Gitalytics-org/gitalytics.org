#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import inspect
import functools
import typing as t


def add_exception_handler(
        ExceptionClass: t.Type[Exception] | t.Iterable[t.Type[Exception]],
        handler: t.Callable[[Exception], t.Any]):
    r"""
    @router.get(...)
    @add_exception_handler(Exception, handler)
    async def endpoint(...):
        ...

    note:
     @add_exception_handler() can be called multiple time or with a list of exception classes


    @router.get(...)
    @add_exception_handler(ValueError, handler1)
    @add_exception_handler(TypeError, handler2)
    async def endpoint(...):
        ...

    @router.get(...)
    @add_exception_handler((ValueError, TypeError), handler)
    async def endpoint(...):
        ...

    :param ExceptionClass: Exception or [Exception] to catch
    :param handler: callable to handle the exception {(Exception) -> Any}
    :return:
    """

    def decorator(function):
        if inspect.iscoroutine(function):
            @functools.wraps(function)
            async def wrapper(*args, **kwargs):
                try:
                    return await function(*args, **kwargs)
                except ExceptionClass as exc:
                    return handler(exc)
        else:
            @functools.wraps(function)
            def wrapper(*args, **kwargs):
                try:
                    return function(*args, **kwargs)
                except ExceptionClass as exc:
                    return handler(exc)
        return wrapper

    return decorator
