import inspect
import functools
import logging

def add_error_logging(*, reraise_exception: bool):
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
            @functools.wraps(function)
            def wrapper(*args, **kwargs):
                try:
                    return function(*args, **kwargs)
                except Exception as exception:
                    logging.exception(f"{function} raised an {exception.__class__.__name__}", exc_info=exception)
                    if reraise_exception:
                        raise
        return wrapper
    return decorator
