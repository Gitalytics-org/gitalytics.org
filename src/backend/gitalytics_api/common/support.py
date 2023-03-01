#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import inspect
import logging
import functools


def add_error_logging(*, reraise_exception: bool, default_return=None):
    r"""
    writes every exception that is happening withing this function to the logging-file

    :param default_return: what to return in case of catching the exception
    :param reraise_exception: whether to catch the exception or let it through
    """
    if reraise_exception and default_return is not None:
        import warnings
        warnings.warn("if your use reraise_exception your shouldn't use default_return")

    def decorator(function):
        if inspect.iscoroutine(function):
            @functools.wraps(function)
            async def wrapper(*args, **kwargs):
                try:
                    return await function(*args, **kwargs)
                except Exception as exception:
                    logging.exception(f"{function} raised an {exception.__class__.__name__}", exc_info=exception)
                    if reraise_exception:
                        raise
                    else:
                        return default_return
        else:
            @functools.wraps(function)
            def wrapper(*args, **kwargs):
                try:
                    return function(*args, **kwargs)
                except Exception as exception:
                    logging.exception(f"{function} raised an {exception.__class__.__name__}", exc_info=exception)
                    if reraise_exception:
                        raise
                    else:
                        return default_return
        return wrapper
    return decorator
