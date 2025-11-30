import os
import dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

dotenv.load_dotenv(".env.development.local")

class Settings(BaseSettings):
    app_name: str = "cfci_server"
    environment: str = "development"
    debug: bool = True

    # Keys and auth
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "your-super-secret-key-change-in-production")

    # API settings and keys
    openai_key: str = os.getenv("OPENAI_KEY", "")
    airtable_api_key: str = os.getenv("AIRTABLE_API_KEY", "")
    postgres_url: str = os.getenv("POSTGRES_URL", "sqlite:///./cfci.db")

    model_config: SettingsConfigDict = {
        "env_file": (
            ".env.development",
            ".env.development.local"
        ),
        "env_file_encoding": "utf-8",
    }


@lru_cache
def get_settings() -> Settings:
    return Settings()

