from pydantic import BaseModel
from typing import Optional


class InitiateChatResponse(BaseModel):
    conversation_id: int
    message_id: int
    message_num: int
    sender: str
    content: str

class AdvanceChatRequest(BaseModel):
    conversation_id: int
    user_message: str
    message_step_num: int

class AdvanceChatResponse(BaseModel):
    message_id: int
    message_num: int
    sender: str
    content: str

# Simplified chat schemas for guest mode (no auth required)
class SimpleChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class SimpleChatResponse(BaseModel):
    conversation_id: str
    message: str
    sender: str

