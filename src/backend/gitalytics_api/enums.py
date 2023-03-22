from enum import Enum


class CookieKey(Enum):
    SESSION_ID = "session-id"
    ACTIVE_WORKSPACE_ID = "active-workspace"
    AUTH_STATE = "auth-state"
